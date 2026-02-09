import { Carousel } from 'components/carousel';
// import { ThreeItemGrid } from 'components/grid/three-items';
import HeroSection from 'components/home/HeroSection';
import { ProductCarousel } from 'components/home/ProductsCarousel';
import PartnerModal from 'components/popup';
export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
    <PartnerModal/>
      <HeroSection/>
      <div className='w-full px-4 md:px-[8px] lg:px-[20px] xl:px-[40px] 2xl:px-[180px]'>
        <Carousel />
        {/* <Features/> */}
        <ProductCarousel/>  
      </div>
    </>
  );
}
