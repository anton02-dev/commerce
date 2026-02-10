import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getCollections, getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import { ActiveLink } from './ActiveLink';
import AnnouncementBar from './Announcement';
import CategoriesDropdown from './dropdown';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');
  const collections = await getCollections();

  if (!collections?.length) return null;

  const visibleCollections = collections
    .filter((collection) => !collection.handle.startsWith('hidden-'))
    .slice(1);
  
  const desktopLinkStyle = "text-sm text-gray-700 font-semibold whitespace-nowrap px-3 py-1 rounded-lg transition-colors duration-150 hover:bg-gray-100 hover:text-black";

  return (
    <div className='flex flex-col items-center fixed w-full top-0 z-50'>
      <nav className="relative flex items-center justify-between bg-white shadow-lg w-full py-4 px-4 md:px-[8px] lg:px-[20px] xl:px-[40px] 2xl:px-[180px]">
        <div className="flex w-full items-center justify-between">
          
          {/* Left section */}
          <div className='flex items-center gap-3 lg:gap-6 flex-1 min-w-0'>
            
            {/* Mobile Menu */}
            <div className="block md:hidden">
              <Suspense fallback={null}>
                <MobileMenu menu={menu} collections={visibleCollections} />
              </Suspense>
            </div>
            
            {/* Desktop Links */}
            <div className='hidden md:flex items-center gap-1 lg:gap-2 flex-shrink-0'>
              <Suspense>
                <ActiveLink />                
                <CategoriesDropdown collections={visibleCollections} />
                
              </Suspense>
            </div>
          </div>
          
          {/* Center logo */}
          <Link 
            href="/" 
            prefetch={true} 
            className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0"
          >
            <LogoSquare />
          </Link>
          
          {/* Right section */}
          <div className='flex items-center justify-end gap-2 lg:gap-3 flex-1 min-w-0'>
            <div className="hidden md:block w-full max-w-[200px] lg:max-w-[300px] xl:max-w-[30rem]">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <div className="flex-shrink-0">
              <Suspense>
                <CartModal />
              </Suspense>
            </div>
          </div>
        </div>
      </nav>
      <AnnouncementBar />
    </div>
  );
}