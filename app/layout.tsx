import { CartProvider } from 'components/cart/cart-context';
import Footer from 'components/layout/footer';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { ReactNode, Suspense } from 'react';
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

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const cart = getCart();

  return (
    <html lang="en" className={`${GeistSans.variable} light`}>
      <body className="bg-[#fafafa] text-black selection:bg-teal-300 min-h-screen overflow-x-hidden">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main className='mt-32'>
            <Suspense>
             {children}
            </Suspense>
          </main>
            <Footer />
        </CartProvider>

      </body>
    </html>
  );
}