import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getJudgemeReviews } from 'lib/judgeme';
import { getProducts } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';
export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { 
    sort, 
    q: searchValue,
    minPrice,
    maxPrice,
    filters 
  } = searchParams as { [key: string]: string };
  
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  let products = await getProducts({ sortKey, reverse, query: searchValue });
    
  // Apply price range filters
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

  // Apply checkbox filters
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
            product.tags?.includes('livrare-gratuita') || false
          );
          break;
        
    
      }
    });
  }

  // const resultsText = products.length > 1 ? 'results' : 'result';
  const productsWithRatings = await Promise.all(
    products.map(async (product) => {
      const reviewsData = await getJudgemeReviews(product.id);

      const { rating, reviewCount } = reviewsData || { rating: 0, reviewCount: 0 };

      return {
        ...product,
          rating: rating || 0,
          reviewCount: reviewCount || 0
      };
    })
  );
  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length !== 0 &&
          <span >Au fost gasite <strong>{products.length}</strong> produse potrivind cautarii tale: <strong>&quot;{searchValue}&quot;</strong></span>
          }
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          <ProductGridItems products={productsWithRatings} />
        </Grid>
      ) : (
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
      )}
    </>
  );
}