'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Form from 'next/form';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
// Configuration for the flags
const LANGUAGES = [
  { code: 'ro', flag: '/flags/romania.png', label: 'Română' },
  { code: 'en', flag: '/flags/uk.png', label: 'English' }, 
  { code: 'it', flag: '/flags/italy.png', label: 'Italiano' },
  { code: 'de', flag: '/flags/german.png', label: 'Deutsch' },
  { code: 'es', flag: '/flags/spain.png', label: 'Español' },
];

export default function Search() {
  const searchParams = useSearchParams();
  const t = useTranslations("Navbar");

   const switchLanguage = async (newLocale: string) => {
    await fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: newLocale })
    });
    window.location.reload();
  };

  const handleLanguageChange = (langCode: any) => {
    switchLanguage(langCode)
  };

  return (
    <div className='flex flex-col md:flex-row items-center gap-2'>
      <div className="flex items-center gap-3 mr-4">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            aria-label={`Switch to ${lang.label}`}
            className="text-xl hover:scale-110 transition-transform duration-200 cursor-pointer p-1 rounded-md hover:bg-neutral-100"
            title={lang.label}
          >
            <Image src={lang.flag} alt="flag" width={80} height={80}/>
          </button>
        ))}
      </div>

      <Form action="/search" className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
        <input
          key={searchParams?.get('q')}
          type="text"
          name="q"
          placeholder={t("search")}
          autoComplete="off"
          defaultValue={searchParams?.get('q') || ''}
          className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <MagnifyingGlassIcon className="h-4" />
        </div>
      </Form>
    </div>
  );
}
export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
