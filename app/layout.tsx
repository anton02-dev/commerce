import { CartProvider } from 'components/cart/cart-context';
import Footer from 'components/layout/footer';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { Suspense } from 'react';
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


import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const cart = getCart();
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${GeistSans.variable} light`}>
      <body className="bg-[#fafafa] text-black selection:bg-teal-300 min-h-screen overflow-x-hidden">
        <Suspense>
        <CartProvider cartPromise={cart}>
              <NextIntlClientProvider messages={messages}>

          <Navbar />
          <main className='mt-32'>
            <Suspense>
                {children}
            
            </Suspense>
          </main>
            <Footer />
              </NextIntlClientProvider>
        </CartProvider>
        </Suspense>
      </body>
    </html>
  );
}