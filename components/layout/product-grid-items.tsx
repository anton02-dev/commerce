'use client'

import Grid from 'components/grid';
import ProductCard from 'components/product/card';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from 'lib/shopify/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants: any = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={products.map(p => p.handle).join('-')}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="contents"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.handle}
            variants={itemVariants}
            custom={index}
            layout
            className="contents"
          >
            <Grid.Item className="group">
              <ProductCard product={product} rating={product.rating} reviewCount={product.reviewCount} />
            </Grid.Item>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}