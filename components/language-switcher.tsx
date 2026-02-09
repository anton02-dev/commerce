'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '../i18n';

const languageNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  gr: 'German',
  it: 'Italian',
  ro: 'Romanian'
};

const flagEmojis: Record<string, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  gr: 'gr',
  it: 'it',
  ro: 'ro'
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Remove current locale from pathname if it exists
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // Add new locale prefix if it's not the default
    const newPath = newLocale === 'en' 
      ? pathnameWithoutLocale || '/'
      : `/${newLocale}${pathnameWithoutLocale || '/'}`;
    
    router.push(newPath);
  };

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 pr-8 text-sm cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {flagEmojis[loc]} {languageNames[loc]}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}