'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface Collection {
  handle: string;
  title: string;
  image?: { url: string };
}

export function CarouselClient({ collections }: { collections: Collection[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
    <div className="relative px-4 py-12 lg:py-20">
      {/* Header with fade-in animation */}
      <motion.div 
        className="mb-4 flex flex-col items-start justify-between gap-3 px-2 sm:flex-row sm:items-center sm:gap-0 md:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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
            Cele mai populare <span className="text-black">categorii:</span>
          </span>
        </h2>
        <Link 
          href="/search" 
          className="flex items-center text-xs font-medium uppercase text-gray-700 hover:text-red-600 sm:text-sm"
        >
          VEZI TOATE
          <span className="ml-1">→</span>
        </Link>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative">
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
          className="overflow-x-auto overflow-y-hidden px-0 scrollbar-hide md:px-12 cursor-grab active:cursor-grabbing"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <ul className="flex gap-3 sm:gap-4 md:gap-6">
            {collections.map((collection, index) => (
              <motion.li
                key={collection.handle}
                className="flex-none w-28 sm:w-32 md:w-36 lg:w-40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ y: -8 }}
              >
                <Link 
                  href={`/search/${collection.handle}`} 
                  className="group block"
                  onClick={(e) => isDragging && e.preventDefault()}
                >
                  <motion.div 
                    className="aspect-square overflow-hidden rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {collection.image?.url ? (
                      <img
                        src={collection.image.url}
                        alt={collection.title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <span className="text-2xl text-gray-400 sm:text-3xl md:text-4xl">📦</span>
                      </div>
                    )}
                  </motion.div>
                  <p className="mt-2 text-center text-xs text-gray-700 sm:text-sm">
                    {collection.title}
                  </p>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Arrow */}
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
    </div>
  );
}