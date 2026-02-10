'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';


export default function AnnouncementBar() {

  const t = useTranslations("Navbar")
  const items = [
  { text: t("announcement1"), href: '/returns' },
  { text: t("announcement2"), href: '/contact' },
  { text: t("announcement3"), href: '/price-guarantee' }
];


  return (
    <div className="w-full bg-gray-50 border-t border-gray-100 py-2 overflow-hidden select-none group">
      {/* 1. Added 'group' class to the parent container above.
         2. Added 'group-hover:[animation-play-state:paused]' to BOTH moving containers below.
      */}
      
      <div className="flex w-full gap-8">
        
        {/* Container 1 */}
        <div className="flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <div key={i} className="flex items-center">
              <Link
                href={item.href}
                className="text-[11px] md:text-xs uppercase tracking-widest font-semibold text-gray-600 hover:text-black whitespace-nowrap"
              >
                {item.text}
              </Link>
              <span className="ml-8 h-1 w-1 bg-gray-300 rounded-full"></span>
            </div>
          ))}
        </div>

        {/* Container 2 (The Twin) */}
        <div aria-hidden="true" className="flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <div key={i} className="flex items-center">
              <Link
                href={item.href}
                className="text-[11px] md:text-xs uppercase tracking-widest font-semibold text-gray-600 hover:text-black whitespace-nowrap"
              >
                {item.text}
              </Link>
              <span className="ml-8 h-1 w-1 bg-gray-300 rounded-full"></span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}