'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import { ProductProvider } from 'components/product/product-context';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function ProductCard({ product, rating, reviewCount }: { product: any, rating: number, reviewCount: number }) {

  return (
    <Suspense>
      <ProductProvider key={product.handle}>
        <motion.div
          className="w-full max-w-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.3,
            ease: "easeOut"
          }}
        >
          <div className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
            <div className="relative">
              {Number(product.compareAtPriceRange.maxVariantPrice.amount) > 0 && (
                <div className="absolute top-0 left-0 bg-red-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold z-10 rounded-br-lg">
                  -{Math.round(((Number(product.compareAtPriceRange.maxVariantPrice.amount) - Number(product.priceRange.maxVariantPrice.amount)) / Number(product.compareAtPriceRange.maxVariantPrice.amount)) * 100)}%
                </div>
              )}
          
              <motion.div 
                className="aspect-square overflow-hidden bg-white p-2 sm:p-4"
                transition={{ duration: 0.3 }}
              >
                {product.featuredImage?.url ? (
                  <img
                    src={product.featuredImage.url}
                    alt={product.title}
                    className="h-full w-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full max-w-full items-center justify-center bg-gray-100">
                    <span className="text-2xl sm:text-4xl text-gray-400">📦</span>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="p-3 sm:p-4 flex-1 flex flex-col">
              <Link href={`/product/${product.handle}`} className="flex-1 flex flex-col">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                  {product.title}
                </h3>

                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`sm:w-4 sm:h-4 ${i < (rating|| 0) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                  <span className="text-xs sm:text-sm text-gray-600 ml-1">
                    {rating} | ({reviewCount || "0"})
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
                    {product.priceRange.maxVariantPrice.amount} RON
                  </span>
                  {Number(product.compareAtPriceRange.maxVariantPrice.amount) > 0 && (
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      {product.compareAtPriceRange.maxVariantPrice.amount} RON
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {product.description}
                </p>
              </Link>
              
              <div className="flex gap-2 mt-auto">
                <a 
                  href={`/product/${product.handle}`} 
                  className="flex-1 bg-[#fcefdf] hover:bg-[#fce5cf] text-center text-black cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base font-semibold transition-colors duration-200"
                >
                  Detalii
                </a>
                <AddToCart product={product} />
              </div>
            </div>
          </div>
        </motion.div>
      </ProductProvider>
    </Suspense>
  );
}