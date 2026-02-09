'use client';

import { AddToCartDetails } from 'components/cart/add-to-cartForDetails';
import Price from 'components/price';
import { useProduct } from 'components/product/product-context';
import { motion, Variants } from 'framer-motion';
import { Product } from 'lib/shopify/types';
import { Package, Shield, Star, Truck } from 'lucide-react';
import { VariantSelector } from './variant-selector';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function ProductBuyingBox({ product }: { product: Product }) {
  const { state } = useProduct();
  
  const selectedVariant = product.variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => state[option.name.toLowerCase()] === option.value
    )
  );

  const currentVariant = selectedVariant || product.variants[0];
  
  const currentPrice = currentVariant?.price || product.priceRange.maxVariantPrice;
  const compareAtPrice = currentVariant?.compareAtPrice;
  const discountPercentage = compareAtPrice && Number(compareAtPrice.amount) > 0
    ? Math.round(((Number(compareAtPrice.amount) - Number(currentPrice.amount)) / Number(compareAtPrice.amount)) * 100)
    : null;

   const getProductRating = (product: Product): number | null => {
    if (!product.metafields) return null;

    const ratingMetafield = product.metafields?.find(
      m => m?.namespace === 'reviews' && m.key === 'rating'
    );
    
    if (!ratingMetafield) return null;
    
    try {
      const parsed = JSON.parse(ratingMetafield.value);
      return parseFloat(parsed.value);
    } catch (error) {
      console.error('Failed to parse rating metafield:', error);
      return null;
    }
  }

  const getProductReviewCount = (product: Product): number | null => {
    if (!product.metafields) return null;

    const countMetafield = product.metafields?.find(
      m => m?.namespace === 'reviews' && m.key === 'rating_count'
    );
    
    if (!countMetafield) return null;
    
    try {
      const value = countMetafield.value;
      if (value.startsWith('{')) {
        const parsed = JSON.parse(value);
        return parseInt(parsed.value, 10);
      }
      return parseInt(value, 10);
    } catch (error) {
      console.error('Failed to parse review count metafield:', error);
      return null;
    }
  }
  const rating = getProductRating(product);
  const reviewCount = getProductReviewCount(product);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Rating Section */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={`${rating ? i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-base text-gray-700 font-medium">
            {rating?.toFixed(1)} ({reviewCount || 0} recenzii)
          </span>
        </motion.div>

   <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
          <Price
            className="text-3xl sm:text-4xl font-bold text-red-600 break-words"
            amount={currentPrice.amount}
            currencyCode={currentPrice.currencyCode}
          />
          
          {compareAtPrice && Number(compareAtPrice.amount) > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Price
                className="text-lg sm:text-xl text-gray-400 line-through break-words"
                amount={compareAtPrice.amount}
                currencyCode={compareAtPrice.currencyCode}
              />
              {discountPercentage && (
                <motion.span 
                  className="inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-xs sm:text-sm font-bold text-white whitespace-nowrap"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.2 }}
                >
                  -{discountPercentage}%
                </motion.span>
              )}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500">TVA inclus</p>
      </motion.div>

      {/* Stock Status */}
      {product.availableForSale ? (
        <motion.div variants={itemVariants} className="flex items-center gap-2 text-green-600">
          <Package size={20} />
          <span className="font-semibold">În stoc - Livrare rapidă</span>
        </motion.div>
      ): (
        <motion.div variants={itemVariants} className="flex items-center gap-2 text-red-600">
          <Package size={20} />
          <span className="font-semibold">Stoc indisponibil</span>
        </motion.div>
      )}
    

      {/* Add to Cart */}
      <motion.div variants={itemVariants}>
        <AddToCartDetails product={product} />
      </motion.div>

      {/* Trust Badges */}
      <motion.div variants={itemVariants} className="pt-6 border-t space-y-3">
        <div className="flex items-start gap-3 text-gray-700">
          <Truck size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm leading-relaxed">Livrare gratuită peste 200 RON</span>
        </div>
        <div className="flex items-start gap-3 text-gray-700">
          <Shield size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm leading-relaxed">Garanție 24 luni</span>
        </div>
        <div className="flex items-start gap-3 text-gray-700">
          <Package size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm leading-relaxed">Retur gratuit în 30 zile</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductVariants({ product }: { product: Product }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <VariantSelector options={product.options} variants={product.variants} />
      </motion.div>
    </motion.div>
  );
}

export function ProductTitle({ product }: { product: Product }) {
  return (
    <motion.h1 
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {product.title}
    </motion.h1>
  );
}