'use client';

import { motion } from 'framer-motion';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// Filter Item Component for Collections
export function PathFilterItem({ item } : {item: any}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? 'div' : Link;

  newParams.delete('q');

  return (
    <DynamicTag
      href={createUrl(item.path, newParams)}
      className={`block w-full text-left rounded-md px-3 py-2.5 mt-1 text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-gradient-to-br from-red-50 to-orange-50 text-black-800'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <motion.div
        className="flex items-center"
        whileHover={!active ? { x: 2 } : {}}
        transition={{ duration: 0.2 }}
      >
        {active && (
          <motion.div
            layoutId="active-indicator"
            className="mr-2 h-1.5 w-1.5 rounded-full bg-red-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <span className="truncate">{item.title}</span>
      </motion.div>
    </DynamicTag>
  );
}

// Sort Filter Item Component
export function SortFilterItem({ item } : {item: any}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('sort') === item.slug;
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug })
    })
  );
  const DynamicTag = active ? 'div' : Link;

  return (
    <DynamicTag
      prefetch={!active ? false : undefined}
      href={href}
      className={`block w-full text-left rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-amber-50 text-amber-700'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <motion.div
        className="flex items-center"
        whileHover={!active ? { x: 2 } : {}}
        transition={{ duration: 0.2 }}
      >
        {active && (
          <motion.div
            layoutId="active-sort-indicator"
            className="mr-2 h-1.5 w-1.5 rounded-full bg-amber-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <span className="truncate">{item.title}</span>
      </motion.div>
    </DynamicTag>
  );
}

