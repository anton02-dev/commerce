import { getJudgemeReviews } from 'lib/judgeme';
import { ProductReviewsClient } from './reviews-client';

export async function ProductReviews({ product }: { product: any }) {
  const reviewsData = await getJudgemeReviews(product.id);

  return <ProductReviewsClient product={product} reviewsData={reviewsData} />;
}