import { getJudgemeReviews } from 'lib/judgeme';
import { getCollectionProducts } from 'lib/shopify';
import { ProductCarouselClient } from './ProductsCarouselClient';

export async function ProductCarousel() {
  const homepageItems = await getCollectionProducts({
    collection: 'plite-din-fonta'
  }); 
  if (!homepageItems?.length) return null;

  const productsWithRatings = await Promise.all(
    homepageItems.map(async (product) => {
      const reviewsData = await getJudgemeReviews(product.id);

      const { rating, reviewCount } = reviewsData || { rating: 0, reviewCount: 0 };

      return {
        ...product,
          rating: rating || 0,
          reviewCount: reviewCount || 0
      };
    })
  );

  return <ProductCarouselClient products={productsWithRatings} />;
}