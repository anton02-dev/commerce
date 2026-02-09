'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid, ListFilter, SlidersHorizontal, SortAsc, Sparkles } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FilterDropdown from './dropdown';
import { PathFilterItem, SortFilterItem } from './item';

interface FiltersState {
  priceRange: [string, string];
  selectedFilters: string[];
}

export default function FilterList({ list, title } : {list: any, title: string}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: ['', ''],
    selectedFilters: []
  });
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger animation when sort or category changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [pathname, searchParams.get('sort')]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePriceRangeChange = (index: number, value: string) => {
    const newRange = [...filters.priceRange] as [string, string];
    newRange[index] = value;
    setFilters({ ...filters, priceRange: newRange });
    applyFilters({ ...filters, priceRange: newRange });
  };

  const toggleFilter = (filterName: string) => {
    const newSelectedFilters = filters.selectedFilters.includes(filterName)
      ? filters.selectedFilters.filter(f => f !== filterName)
      : [...filters.selectedFilters, filterName];
    
    const newFilters = {
      ...filters,
      selectedFilters: newSelectedFilters
    };
    
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters: FiltersState) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Apply price range
    if (currentFilters.priceRange[0]) {
      params.set('minPrice', currentFilters.priceRange[0]);
    } else {
      params.delete('minPrice');
    }
    
    if (currentFilters.priceRange[1]) {
      params.set('maxPrice', currentFilters.priceRange[1]);
    } else {
      params.delete('maxPrice');
    }
    
    // Apply selected filters
    if (currentFilters.selectedFilters.length > 0) {
      params.set('filters', currentFilters.selectedFilters.join(','));
    } else {
      params.delete('filters');
    }
    
    // Preserve the current path (including category) when applying filters
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const newFilters = {
      priceRange: ['', ''] as [string, string],
      selectedFilters: []
    };
    setFilters(newFilters);
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('filters');
    
    // Preserve the current path when clearing filters
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Load filters from URL on mount
  useEffect(() => {
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const filtersParam = searchParams.get('filters');
    const selectedFilters = filtersParam ? filtersParam.split(',') : [];
    
    setFilters({
      priceRange: [minPrice, maxPrice],
      selectedFilters
    });
  }, [searchParams]);

  // Sort options
  const sortOptions = [
    {title: "Cele mai recente", slug: 'rec'},
    { title: 'Preț: Crescător', slug: 'price-asc' },
    { title: 'Preț: Descrescător', slug: 'price-desc' },
  ];

  // Example filters - you can customize these based on your data
  const availableFilters = [
    { id: 1, name: 'În stoc' },
    { id: 2, name: 'Reducere' },
    { id: 5, name: 'Livrare gratuită' }
  ];

  // Determine active category
  const activeItem = list.find((item: any) => 
    'path' in item && pathname === item.path      
  );
  const activeCategory = activeItem?.title || 'Toate Produsele';

  // Determine active sort
  const activeSort = sortOptions.find(opt => 
    searchParams.get('sort') === opt.slug
  )?.title || sortOptions[0]?.title;

  // Animation variants
  const headerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <div className="col-span-2 h-full w-full flex-none">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="xl:w-72 flex-shrink-0"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-red-100 sticky top-4">
          
          {/* Header Info with Animation */}
          <div className="mb-6 pb-4 border-b border-gray-100">
            <AnimatePresence mode="wait">
              <motion.div 
                key={animationKey}
                variants={headerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 mb-2"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <LayoutGrid className="w-6 h-6 text-red-600 flex-shrink-0" />
                </motion.div>
                <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                  {activeCategory}
                </h2>
              </motion.div>
            </AnimatePresence>
            <motion.p 
              key={`sort-${animationKey}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-gray-500 mt-2 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-red-500" />
              {list.length} {title || 'Categorii'}
            </motion.p>
          </div>

          {/* Category Dropdown (Mobile) */}
          <div className="mb-6 lg:hidden">
            <h3 className="font-bold text-sm text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-red-600" />
              {title || 'Categorii'}
            </h3>
            <FilterDropdown
              list={list.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >

                  {'path' in item ? (
                    <PathFilterItem item={item} />
                  ) : (
                    <SortFilterItem item={item} />
                  )}
                </motion.div>
              ))}
              activeTitle={activeCategory}
              type="category"
            />
          </div>

          {/* Category List (Desktop) */}
          <div className="mb-6 hidden lg:block">
            <h3 className="font-bold text-sm text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-red-600" />
              {title || 'Categorii'}
            </h3>
            <div className="space-y-1">
              {list.map((item: any, i: number) => (
                <div key={i}>
                  <>
           
                    {'path' in item ? (
                      <PathFilterItem item={item} />
                    ) : (
                      <SortFilterItem item={item} />
                    )}
                  </>
                </div>
              ))}
            </div>
          </div>

          {/* Sort Controls - Dropdown on Mobile */}
          <div className="mb-6 lg:hidden">
            <h3 className="font-bold text-sm text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-red-600" />
              Sortează După
            </h3>
            <FilterDropdown
              list={sortOptions.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <SortFilterItem item={item} />
                </motion.div>
              ))}
              activeTitle={activeSort || ""}
              type="sort"
            />
          </div>

          {/* Sort Controls - List on Desktop */}
          <div className="mb-6 hidden lg:block">
            <h3 className="font-bold text-sm text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-red-600" />
              Sortează După
            </h3>
            <div className="space-y-1">
              {sortOptions.map((item, i) => (
                <SortFilterItem key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Toggle Filters Button (Mobile) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="w-full lg:hidden px-5 py-2.5 bg-gradient-to-r from-red-100 to-orange-100 hover:from-red-200 hover:to-orange-200 rounded-xl flex items-center justify-center gap-2 font-semibold text-red-700 transition-all shadow-md mb-6"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? 'Ascunde' : 'Arată'} Filtre Detaliate
          </motion.button>

          {/* Detailed Filters */}
          <motion.div
            initial={false}
            animate={showFilters || isLargeScreen ? "visible" : "hidden"}
            variants={{
              visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
              hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } }
            }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <ListFilter className="w-4 h-4 text-red-600" />
                  Filtre
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1 rounded-lg hover:bg-red-50 transition-all"
                >
                  Resetează
                </motion.button>
              </div>

              {/* Price Range Filter */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 mb-4"
              >
                <h4 className="font-semibold text-xs text-gray-900 mb-3">Interval de Preț (Lei)</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    placeholder="Min"
                    className="w-1/2 px-2 py-1.5 border border-red-200 rounded-md text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  />
                  <span className="text-gray-400">la</span>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    placeholder="Max"
                    className="w-1/2 px-2 py-1.5 border border-red-200 rounded-md text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </motion.div>

              {/* Checkbox Filters */}
              {availableFilters.length > 0 && (
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-xs text-gray-900 mb-3">Caracteristici</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                    {availableFilters.map(filter => (
                      <motion.label 
                        key={filter.id}
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.selectedFilters.includes(filter.name)}
                          onChange={() => toggleFilter(filter.name)}
                          className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700">{filter.name}</span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}