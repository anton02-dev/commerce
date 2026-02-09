
'use client';

import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;
  const [direction, setDirection] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setDirection(index > imageIndex ? 1 : -1);
    const newState = updateImage(index.toString());
    updateURL(newState);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-lg bg-white shadow-md">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={imageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            <Image
              className="h-full w-full object-contain"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={images[imageIndex]?.altText || ''}
              src={images[imageIndex]?.src || ''}
              priority={true}
            />
          </motion.div>
        </AnimatePresence>

        {/* Compact progress indicator */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {imageIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {images.length > 1 ? (
        <ul className="mt-4 flex items-center justify-center gap-2 overflow-x-auto overflow-y-hidden">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-16 w-16 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleThumbnailClick(index)}
                  aria-label={`Select image ${index + 1}`}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={64}
                    height={64}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
