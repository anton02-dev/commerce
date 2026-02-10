export type Locale = (typeof locales)[number];

export const locales = ['en', 'ro', 'it', 'de', 'es'] as const;
export const defaultLocale: Locale = 'ro';