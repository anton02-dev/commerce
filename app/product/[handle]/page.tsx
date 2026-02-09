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
                <div className="relative aspect-square w-full bg-gray-100 rounded-lg animate-pulse " />
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
                  <h3 className="text-xl font-bold mb-4">Selectează opțiuni</h3>
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
              <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Descriere produs</h2>
              <Prose
                className="text-base leading-relaxed text-gray-700 prose-headings:text-gray-900 prose-p:text-gray-700"
                html={product.descriptionHtml}
              />
            </Suspense>
          </div>
        )}

        {/* Reviews Section */}
         <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
          <h2 className="text-2xl font-bold mb-6 pb-4 border-b">Recenzii clienți</h2>
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

        {/* Related Products */}
        <div className="mt-12 ">
          <RelatedProducts product={product} />
        </div>
      </div>
    </ProductProvider>
  );
}

// function ProductReviews({ product }: { product: any }) {
//   const getProductRating = (product: any): number | null => {
//     if (!product.metafields) return null;

//     const ratingMetafield = product.metafields?.find(
//       (m: any) => m?.namespace === 'reviews' && m.key === 'rating'
//     );
    
//     if (!ratingMetafield) return null;
    
//     try {
//       const parsed = JSON.parse(ratingMetafield.value);
//       return parseFloat(parsed.value);
//     } catch {
//       return null;
//     }
//   }

//   const getProductReviewCount = (product: any): number | null => {
//     if (!product.metafields) return null;

//     const countMetafield = product.metafields?.find(
//       (m: any) => m?.namespace === 'reviews' && m.key === 'rating_count'
//     );
    
//     if (!countMetafield) return null;
    
//     try {
//       const value = countMetafield.value;
//       if (value.startsWith('{')) {
//         const parsed = JSON.parse(value);
//         return parseInt(parsed.value, 10);
//       }
//       return parseInt(value, 10);
//     } catch {
//       return null;
//     }
//   }

//   const rating = getProductRating(product);
//   const reviewCount = getProductReviewCount(product);

//   if (!rating || !reviewCount) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500 text-lg mb-4">Acest produs nu are încă recenzii.</p>
//         <p className="text-gray-600">Fii primul care lasă o recenzie!</p>
//         <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 cursor-pointer mt-4 transition-colors">
//           Scrie o recenzie
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-8 pb-6 border-b">
//         <div className="text-center">
//           <div className="text-5xl font-bold text-gray-900 mb-2">{rating.toFixed(1)}</div>
//           <div className="flex items-center justify-center gap-1 mb-2">
//             {[...Array(5)].map((_, i) => (
//               <svg
//                 key={i}
//                 className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//               </svg>
//             ))}
//           </div>
//           <p className="text-sm text-gray-600">{reviewCount} recenzii</p>
//         </div>
        
//         <div className="flex-1 space-y-2">
//           {[5, 4, 3, 2, 1].map((stars) => (
//             <div key={stars} className="flex items-center gap-3">
//               <span className="text-sm text-gray-600 w-12">{stars} stele</span>
//               <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-yellow-400"
//                   style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
//                 />
//               </div>
//               <span className="text-sm text-gray-600 w-12 text-right">
//                 {stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="text-center py-8">
//         <p className="text-gray-600 mb-4">Recenziile detaliate vor fi afișate aici.</p>
//         <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
//           Scrie o recenzie
//         </button>
//       </div>
//     </div>
//   );
// }

async function RelatedProducts({ product }: { product: Product }) {
  const id = product.id
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;
  
  const reviewsData = await getJudgemeReviews(id);
  const { rating, reviewCount } = reviewsData || { rating: 0, reviewCount: 0 };
  
  return (
    <div className="py-10 w-full max-w-full">
      <div className='flex items-center mb-4 gap-1'>
        <img src="/imgs/star.png" alt="star" className="w-6 h-6 flex-shrink-0" />
        <h2 className="text-2xl font-bold break-words"><strong className='text-red-600 font-bold'>Produse</strong> asemanatoare:</h2>
      </div>
      <div className="overflow-x-auto overflow-y-hidden pb-4">
        <ul className="flex gap-4">
          {relatedProducts.map((product) => (
            <li
              key={product.handle}
              className="w-[200px] flex-shrink-0 sm:w-[180px] md:w-[200px] lg:w-[250px]"
            >
              <ProductCard product={product} rating={rating} reviewCount={reviewCount} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
