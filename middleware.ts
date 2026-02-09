import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // No /en prefix for default language
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};