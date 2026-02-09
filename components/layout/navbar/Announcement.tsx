'use client';

import Link from 'next/link';

const items = [
  { text: 'Garanție de 60 zile pentru returnarea banilor', href: '/returns' },
  { text: 'Serviciu clienți profesional', href: '/contact' },
  { text: 'Garanție de preț', href: '/price-guarantee' }
];

export default function AnnouncementBar() {
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