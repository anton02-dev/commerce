'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import { ProductProvider } from 'components/product/product-context';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useRef, useState } from 'react';

export function ProductCarouselClient({ products }: { products: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const t = useTranslations("HomeCarousel");

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative py-12 lg:py-20 overflow-hidden">
      {/* Header with fade-in animation */}
      <motion.div 
        className="mb-4 flex flex-col items-start justify-between gap-3 px-4 sm:flex-row sm:items-center sm:gap-0 md:mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="flex items-center justify-start text-lg font-bold sm:text-xl md:text-2xl">
          <Image 
            src='/imgs/star.png' 
            alt='Star' 
            width={20} 
            height={20} 
            className='mr-2 mt-0.5 sm:mt-1 sm:h-6 sm:w-6'
          />
          <span className='text-red-600'>
            {t("idealProducts")} <span className="text-black">{t("idealProducts2")}:</span>
          </span>
        </h2>
        <Link 
          href="/search" 
          className="flex items-center text-xs font-medium uppercase text-gray-700 hover:text-red-600 sm:text-sm"
        >
          {t("viewButton")}
          <span className="ml-1">→</span>
        </Link>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Left Arrow */}
        <motion.button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50 md:block"
          aria-label="Previous"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xl">&lt;</span>
        </motion.button>

        {/* Carousel with drag */}
        <motion.div 
          ref={scrollRef}
          className="overflow-x-scroll overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing px-4 md:px-12"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <ul className="flex gap-3 sm:gap-4 md:gap-6 w-max ">
            <Suspense>
            {products.map((product: any, index: number) => (
    
                <ProductProvider key={product.handle} >
              <motion.li
            className="flex-none w-72 py-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ y: -8 }}
          >
            <div
              className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden max-h-[590px]"
              onClick={(e) => isDragging && e.preventDefault()}
            >
              <div className="relative">
                {Number(product.compareAtPriceRange.maxVariantPrice.amount) > 0 && (
                    <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-sm font-semibold z-10">
                        -{Math.round(((Number(product.compareAtPriceRange.maxVariantPrice.amount) - Number(product.priceRange.maxVariantPrice.amount)) / Number(product.compareAtPriceRange.maxVariantPrice.amount)) * 100)}% Reducere
                    </div>
                )}
            
           
                        <motion.div 
                        className="aspect-square overflow-hidden bg-white p-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        >
                        {product.featuredImage?.url ? (
                            <img
                            src={product.featuredImage.url}
                            alt={product.title}
                            className="h-full w-full object-contain"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                            <span className="text-4xl text-gray-400">📦</span>
                            </div>
                        )}
                        </motion.div>
                    </div>

            <div className="px-4 py-2">
                <a href={`/product/${product.handle}`} >
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {product.title}
                        </h3>

                        <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star
                            key={i}
                            size={16}
                            className={i < (product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}
                            />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                            {product.rating} | ({product.reviewCount || "0"})
                        </span>
                        </div>

                        <div className="flex items-topline gap-2 mb-3">
                        <span className="text-2xl font-bold text-red-600">
                            {product.priceRange.maxVariantPrice.amount} RON
                        </span>
                         {Number(product.compareAtPriceRange.maxVariantPrice.amount) > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                            {product.compareAtPriceRange.maxVariantPrice.amount} RON
                        </span>
                         )}
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                            {product.description}
                        </p>
                </a>
                <div className="flex gap-2">
                  <a href={`/product/${product.handle}`} className="flex-1 bg-[#fcefdf] hover:bg-[#fce5cf] text-center text-black cursor-pointer px-4 py-2 rounded font-semibold  transition-colors duration-200">
                    {t("details")}
                  </a>
                    <AddToCart product={product} />
                </div>
              </div>
            </div>
          </motion.li>
          </ProductProvider>
            ))}
            </Suspense>
          </ul>
        </motion.div>

        <motion.button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50 md:block"
          aria-label="Next"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xl">&gt;</span>
        </motion.button>
      </div>
      
            <motion.div 
              initial={{opacity:0, y:20}}
              whileInView={{opacity:1, y:0}}
              transition={{duration: 0.3}}
              className="flex justify-center mt-12"
            >
              <a
                href='/search'
                className="relative w-[220px] h-[50px] bg-[#fcefdf] hover:bg-[#fce5cf] rounded-lg border-0 overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <span className="relative z-10 text-base font-bold text-black flex items-center justify-center h-full">
                  {t("viewMore")} →
                </span>
              </a>
            </motion.div>
    </div>
  );
}