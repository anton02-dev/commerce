import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getJudgemeReviews } from 'lib/judgeme';
import { Product } from 'lib/shopify/types';
import { ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} produse`
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { 
    sort, 
    minPrice,
    maxPrice,
    filters 
  } = searchParams as { [key: string]: string };
  
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  let products = await getCollectionProducts({collection: params.collection, sortKey, reverse});

  if (minPrice) {
    const min = parseFloat(minPrice);
    products = products.filter((product: Product) => 
      parseFloat(product.priceRange.minVariantPrice.amount) >= min
    );
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    products = products.filter((product: Product) => 
      parseFloat(product.priceRange.maxVariantPrice.amount) <= max
    );
  }

  if (filters) {
    const selectedFilters = filters.split(',');

    selectedFilters.forEach((filter: string) => {
      switch (filter) {
        case 'În stoc':
          products = products.filter((product: Product) => product.availableForSale);
          break;
        
        case 'Reducere':
          products = products.filter((product: Product) => {
            const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
            const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
            return product.compareAtPriceRange && 
                   parseFloat(product.compareAtPriceRange.minVariantPrice.amount) > minPrice;
          });
          break;
        
        case 'Livrare gratuită':
          products = products.filter((product: Product) => 
            product.tags?.includes('free-shipping') || false
          );
          break;
        
    
      }
    });
  }
    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const reviewsData = await getJudgemeReviews(product.id);
  
        const { rating, reviewCount } = reviewsData || { rating: 0, reviewCount: 0 };;
  
        return {
          ...product,
          rating: rating || 0,
          reviewCount: reviewCount || 0
        };
      })
    );

  return (
    <section>
      {products.length === 0 ? (
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 max-w-full h-[90vh] text-center">
            {/* Icon */}
            <ShoppingBagIcon className="w-16 h-16 text-gray-400 mb-4" />
            
            {/* Heading */}
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Aici e Liniște...
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">
              Se pare că nu există produse care să se potrivească criteriilor tale de căutare sau filtrare.
            </p>
            
            {/* Actionable Button (Optional: Link back to the main shop) */}
            <Link 
              href="/search" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-black hover:bg-gray-800 transition-colors"
            >
              Vezi Toate Produsele
            </Link>
          </div>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductGridItems products={productsWithRatings} />
        </Grid>
      )}
    </section>
  );
}
