import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductCard from 'components/product/card';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductBuyingBox, ProductTitle, ProductVariants } from 'components/product/product-description';
import { ProductReviews } from 'components/product/reviews';
import Prose from 'components/prose';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getJudgemeReviews } from 'lib/judgeme';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Image, Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const tProduct = useTranslations('product');
  const tReviews = useTranslations('reviews');

  const hasRealVariants =
    product.variants?.length > 1 ||
    product.variants?.[0]?.title !== 'Default Title';

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />

      <div className="max-w-(--breakpoint-2xl) mx-auto px-4 py-8 lg:py-12">
        {/* Product Title */}
        <div className="mb-8">
          <Suspense fallback={null}>
            <ProductTitle product={product} />
          </Suspense>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="relative aspect-square w-full bg-gray-100 rounded-lg animate-pulse" />
              }
            >
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-8 space-y-8">
              {/* Buying Box */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
                <Suspense fallback={null}>
                  <ProductBuyingBox product={product} />
                </Suspense>
              </div>

              {/* Variants */}
              {hasRealVariants && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
                  <h3 className="text-xl font-bold mb-4">
                    {tProduct('selectOptions')}
                  </h3>
                  <Suspense fallback={null}>
                    <ProductVariants product={product} />
                  </Suspense>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Description */}
        {product.descriptionHtml && (
          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
            <Suspense fallback={null}>
              <h2 className="text-2xl font-bold mb-6 pb-4 border-b">
                {tProduct('description')}
              </h2>
              <Prose
                className="text-base leading-relaxed text-gray-700 prose-headings:text-gray-900 prose-p:text-gray-700"
                html={product.descriptionHtml}
              />
            </Suspense>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
          <h2 className="text-2xl font-bold mb-6 pb-4 border-b">
            {tReviews('customerReviews')}
          </h2>
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            }
          >
            <ProductReviews product={product} />
          </Suspense>
        </div>
      </div>
    </ProductProvider>
  );
}

async function RelatedProducts({ product }: { product: Product }) {
  const tProduct = useTranslations('product');

  const id = product.id;
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  const reviewsData = await getJudgemeReviews(id);
  const { rating, reviewCount } = reviewsData || { rating: 0, reviewCount: 0 };

  return (
    <div className="py-10 w-full max-w-full">
      <div className="flex items-center mb-4 gap-1">
        <img src="/imgs/star.png" alt="star" className="w-6 h-6 flex-shrink-0" />
        <h2 className="text-2xl font-bold break-words">
          <strong className="text-red-600 font-bold">
            {tProduct('relatedProducts')}
          </strong>
        </h2>
      </div>

      <div className="overflow-x-auto overflow-y-hidden pb-4">
        <ul className="flex gap-4">
          {relatedProducts.map((product) => (
            <li
              key={product.handle}
              className="w-[200px] flex-shrink-0 sm:w-[180px] md:w-[200px] lg:w-[250px]"
            >
              <ProductCard
                product={product}
                rating={rating}
                reviewCount={reviewCount}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
