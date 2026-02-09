'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, EnvelopeIcon, HomeIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Menu } from 'lib/shopify/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { AnimatedMenuLink } from './ActiveLink';
import Search, { SearchSkeleton } from './search';

export default function MobileMenu({ menu, collections }: { menu: Menu[], collections: any[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  // Force close menu and cleanup on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ButtonStyle = "flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-black transition-colors hover:border-black hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2";

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
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 400
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.15,
        duration: 0.3
      }
    }
  };

  const categoryHeaderVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.3,
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Open Button */}
      <motion.button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className={`${ButtonStyle} md:hidden`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bars3Icon className="h-5 w-5" />
      </motion.button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeMobileMenu} className="relative z-[99999]">
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          </Transition.Child>

          {/* Panel */}
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 top-0 flex h-full w-4/5 max-w-sm flex-col bg-white shadow-xl overflow-y-auto">
              <div className="p-4 flex flex-col h-full">
                
                {/* Header */}
                <motion.div 
                  variants={headerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-between items-center mb-6"
                >
                  <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                  <motion.button
                    className={ButtonStyle}
                    onClick={closeMobileMenu}
                    aria-label="Close mobile menu"
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </motion.button>
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                  variants={searchVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 w-full"
                >
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search /> 
                  </Suspense>
                </motion.div>

                {/* Primary Links */}
                <motion.nav 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className='flex flex-col space-y-1 mb-6 border-b border-gray-100 pb-4'
                >
                  <motion.div variants={itemVariants} className="w-full">
                    <AnimatedMenuLink href="/" className="block w-full">
                      <motion.div 
                        className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-black transition-colors w-full"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <HomeIcon className="h-5 w-5 mr-3" />
                        <span className="text-base font-medium">Acasa</span>
                      </motion.div>
                    </AnimatedMenuLink>
                  </motion.div>

                  <motion.div variants={itemVariants} className="w-full">
                    <AnimatedMenuLink href="/contact" className="block w-full">
                      <motion.div 
                        className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-black transition-colors w-full"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <EnvelopeIcon className="h-5 w-5 mr-3" />
                        <span className="text-base font-medium">Contact</span>
                      </motion.div>
                    </AnimatedMenuLink>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="w-full">
                    <AnimatedMenuLink href="/search" className="block w-full">
                      <motion.div 
                        className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-black transition-colors w-full"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingBagIcon className="h-5 w-5 mr-3" />
                        <span className="text-base font-medium">Magazin</span>
                      </motion.div>
                    </AnimatedMenuLink>
                  </motion.div>
                </motion.nav>

                {/* Categories Section */}
                <div className='flex flex-col flex-grow'>
                  <motion.p 
                    variants={categoryHeaderVariants}
                    initial="hidden"
                    animate="visible"
                    className='text-lg font-bold mb-3 text-gray-800 border-b border-gray-200 pb-2'
                  >
                    Categorii
                  </motion.p>
                  <motion.ul 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className='flex flex-col space-y-1 overflow-y-auto'
                  >
                    {collections.map((c) => (
                      <motion.li 
                        key={c.handle}
                        variants={itemVariants}
                        className='rounded-lg transition-colors duration-150 hover:bg-gray-100 w-full'
                      >
                        <AnimatedMenuLink href={c.path ?? `/search/${c.handle}`} className="block w-full">
                          <motion.div 
                            className="flex items-center py-2 px-3 w-full"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.svg 
                              className="mr-3 h-2 w-2 text-gray-500 fill-current flex-shrink-0" 
                              viewBox="0 0 10 10" 
                              xmlns="http://www.w3.org/2000/svg"
                              whileHover={{ scale: 1.2 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <circle cx="5" cy="5" r="5" />
                            </motion.svg>
                            <span className="text-base font-normal text-gray-700 hover:text-black flex-1">
                              {c.title}
                            </span>
                          </motion.div>
                        </AnimatedMenuLink>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}