import { CartProvider } from 'components/cart/cart-context';
import Footer from 'components/layout/footer';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
<<<<<<< HEAD
import { ReactNode, Suspense } from 'react';
=======
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode, Suspense } from 'react';
import { locales } from '../i18n';
>>>>>>> 7d0c5fc38a37eb5184071f4d615eb506bcff6830
import './globals.css';
const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
    params: { locale }
}: {
  children: ReactNode;
    params: { locale: string };
}) {
  const cart = getCart();

  const messages = await getMessages();
  return (
<<<<<<< HEAD
    <html lang="en" className={`${GeistSans.variable} light`}>
=======
    <html lang={locale} className={`${GeistSans.variable} light`}>
>>>>>>> 7d0c5fc38a37eb5184071f4d615eb506bcff6830
      <body className="bg-[#fafafa] text-black selection:bg-teal-300 min-h-screen overflow-x-hidden">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main className='mt-32'>
            <Suspense>
<<<<<<< HEAD
             {children}
=======
              <NextIntlClientProvider messages={messages}>
               {children}
              </NextIntlClientProvider>
>>>>>>> 7d0c5fc38a37eb5184071f4d615eb506bcff6830
            </Suspense>
          </main>
            <Footer />
        </CartProvider>

      </body>
    </html>
  );
}