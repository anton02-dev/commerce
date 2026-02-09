'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

export function useProductTranslation(product: any) {
  const locale = useLocale();
  const [translatedProduct, setTranslatedProduct] = useState(product);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If English or no product, return original
    if (locale === 'en' || !product?.id) {
      setTranslatedProduct(product);
      return;
    }

    // Translate product
    const translateProduct = async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch('/api/translate-product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            product: {
                title: product.title,
                description: product.description,
                descriptionHtml: product.descriptionHtml,
                seo: {
                title: product.seo?.title,
                description: product.seo?.description
                }
            },
            targetLang: locale
            })
        });

        if (response.ok) {
          const translated = await response.json();
          setTranslatedProduct({
            ...product,
            ...translated
          });
        }
      } catch (error) {
        console.error('Translation failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    translateProduct();
  }, [locale, product?.id]);

  return { product: translatedProduct, isLoading };
}