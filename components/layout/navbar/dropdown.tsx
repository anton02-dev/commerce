'use client';

import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Fragment } from 'react';

interface Collection {
  handle: string;
  title: string;
  path?: string;
}

export default function CategoriesDropdown({ collections }: { collections: Collection[] }) {
  if (!collections || collections.length === 0) return null;

  return (
    <HeadlessMenu as="div" className="relative inline-block text-left">
      <div>
        <HeadlessMenu.Button className="flex items-center text-sm text-gray-700 font-semibold whitespace-nowrap px-3 py-1 rounded-lg transition-colors duration-150 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-black">
          Categorii
          <ChevronDownIcon
            className="-mr-1 ml-2 h-4 w-4 transition-transform duration-200 ui-open:rotate-180"
            aria-hidden="true"
          />
        </HeadlessMenu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items className="absolute left-0 mt-3 w-max min-w-[300px] max-h-[80vh] overflow-y-auto origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none p-4 z-[100]">
          <div className="text-sm font-medium text-gray-600 mb-2 border-b pb-1">
            Explorează
          </div>
          
          {/* Multi-Column Grid Layout */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-2">
            {collections.map((collection) => (
              <HeadlessMenu.Item key={collection.handle}>
                {({ active }) => (
                  <Link
                    href={collection.path ?? `/search/${collection.handle}`}
                    className={`
                      ${active ? 'bg-gray-50 text-black' : 'text-gray-700'}
                      group flex items-center rounded-md p-2 transition-colors duration-150
                    `}
                  >
                    <svg 
                        className="mr-2 h-2 w-2 text-gray-500 fill-current" 
                        viewBox="0 0 10 10" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="5" cy="5" r="5" />
                    </svg>
                    <span className="truncate">{collection.title}</span>
                  </Link>
                )}
              </HeadlessMenu.Item>
            ))}
          </div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
}