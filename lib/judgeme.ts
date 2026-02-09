// lib/judgeme.ts

const JUDGEME_API_TOKEN = process.env.JUDGEME_API_TOKEN;
const JUDGEME_SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;

export interface JudgemeReview {
  id: number;
  title: string;
  body: string;
  rating: number;
  reviewer: {
    name: string;
    email?: string;
  };
  created_at: string;
  verified_buyer: boolean;
  pictures: Array<{
    urls: {
      original: string;
      small: string;
    };
  }>;
}

export interface JudgemeProductReviews {
  rating: number;
  reviewCount: number;
  reviews: JudgemeReview[];
}

type JudgeMeReview = {
  rating: number;
};

export const getProductRating = (
  reviews: JudgeMeReview[]
): number | null => {
  if (!reviews || reviews.length === 0) return null;

  const total = reviews.reduce((sum, review) => {
    return sum + (Number(review.rating) || 0);
  }, 0);

  const average = total / reviews.length;

  return Number(average.toFixed(1));
};

/**
 * Get Judge.me internal product ID from Shopify product ID
 */
async function getJudgemeProductId(shopifyProductId: string): Promise<number | null> {
  if (!JUDGEME_API_TOKEN || !JUDGEME_SHOP_DOMAIN) {
    return null;
  }

  try {
    const numericId = shopifyProductId.split('/').pop();

    const response = await fetch(
      `https://judge.me/api/v1/products/-1?api_token=${JUDGEME_API_TOKEN}&shop_domain=${JUDGEME_SHOP_DOMAIN}&external_id=${numericId}`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error(`Judge.me product lookup failed: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.product?.id || null;
  } catch (error) {
    console.error('Error fetching Judge.me product ID:', error);
    return null;
  }
}

/**
 * Fetch reviews for a product from Judge.me API
 * @param productId - Shopify product ID (GID format)
 */
export async function getJudgemeReviews(
  productId: string
): Promise<JudgemeProductReviews | null> {
  if (!JUDGEME_API_TOKEN || !JUDGEME_SHOP_DOMAIN) {
    console.error('Judge.me API credentials not configured');
    return null;
  }

  try {
    // Step 1: Get Judge.me internal product ID
    const judgemeProductId = await getJudgemeProductId(productId);
    
    if (!judgemeProductId) {
      console.log(`No Judge.me product found for Shopify ID: ${productId}`);
      return {
        rating: 0,
        reviewCount: 0,
        reviews: []
      };
    }

    // Step 2: Fetch reviews using Judge.me product ID
    const response = await fetch(
      `https://judge.me/api/v1/reviews?api_token=${JUDGEME_API_TOKEN}&shop_domain=${JUDGEME_SHOP_DOMAIN}&product_id=${judgemeProductId}&per_page=50`,
      {
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Judge.me API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      rating: getProductRating(data.reviews) || 0,
      reviewCount: (data.reviews || []).length,
      reviews: data.reviews || []
    };
  } catch (error) {
    console.error('Error fetching Judge.me reviews:', error);
    return null;
  }
}

/**
 * Get widget data for a product (rating summary)
 */
export async function getJudgemeWidgetData(productId: string) {
  if (!JUDGEME_API_TOKEN || !JUDGEME_SHOP_DOMAIN) {
    return null;
  }

  try {
    const judgemeProductId = await getJudgemeProductId(productId);
    
    if (!judgemeProductId) {
      return {
        rating: 0,
        reviewCount: 0,
        ratingDistribution: {}
      };
    }

    const response = await fetch(
      `https://judge.me/api/v1/widgets/product_review?api_token=${JUDGEME_API_TOKEN}&shop_domain=${JUDGEME_SHOP_DOMAIN}&product_id=${judgemeProductId}`,
      {
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return {
      rating: parseFloat(data.rating) || 0,
      reviewCount: parseInt(data.reviewCount) || 0,
      ratingDistribution: data.ratingDistribution || {}
    };
  } catch (error) {
    console.error('Error fetching Judge.me widget data:', error);
    return null;
  }
}