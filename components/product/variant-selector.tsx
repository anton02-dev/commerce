'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ProductOption, ProductVariant } from 'lib/shopify/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { scale: 0.95 }
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return (
    <div className="space-y-8 mb-10">
      {options.map((option, index) => (
        <motion.form 
          key={option.id}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
        >
          <dl>
            <dt className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-900">
              {option.name}
            </dt>
            <dd className="flex flex-wrap gap-3">
              <AnimatePresence mode="popLayout">
                {option.values.map((value) => {
                  const optionNameLowerCase = option.name.toLowerCase();
                  const optionParams = { ...state, [optionNameLowerCase]: value };

                  const filtered = Object.entries(optionParams).filter(([key, value]) =>
                    options.find(
                      (option) => option.name.toLowerCase() === key && option.values.includes(value)
                    )
                  );
                  const isAvailableForSale = combinations.find((combination) =>
                    filtered.every(
                      ([key, value]) => combination[key] === value && combination.availableForSale
                    )
                  );

                  const isActive = state[optionNameLowerCase] === value;

                  return (
                    <motion.button
                      key={value}
                      formAction={() => {
                        const newState = updateOption(optionNameLowerCase, value);
                        updateURL(newState);
                      }}
                      aria-disabled={!isAvailableForSale}
                      disabled={!isAvailableForSale}
                      title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                      variants={buttonVariants}
                      initial="initial"
                      whileHover={isAvailableForSale ? "hover" : "initial"}
                      whileTap={isAvailableForSale ? "tap" : "initial"}
                      layout
                      className={clsx(
                        'relative flex min-w-[56px] items-center justify-center rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200',
                        {
                          'border-white bg-amber-600 text-white shadow-md': isActive,
                          'border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400 hover:shadow-sm':
                            !isActive && isAvailableForSale,
                          'cursor-not-allowed border-neutral-200 bg-neutral-50 text-neutral-400':
                            !isAvailableForSale
                        }
                      )}
                    >
                      {!isAvailableForSale && (
                        <motion.span
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="h-px w-full rotate-[-20deg] bg-neutral-300" />
                        </motion.span>
                      )}
                      <span className={clsx({ 'relative z-10': !isAvailableForSale })}>
                        {value}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="absolute inset-0 rounded-lg"
                          style={{ zIndex: -1 }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </dd>
          </dl>
        </motion.form>
      ))}
    </div>
  );
}