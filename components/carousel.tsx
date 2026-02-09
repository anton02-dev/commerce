import { getCollections } from 'lib/shopify';
import { CarouselClient } from './clientcarousel';

export async function Carousel() {
  const collections = await getCollections();

  if (!collections?.length) return null;

  const visibleCollections = collections
    .filter((collection) => !collection.handle.startsWith('hidden-'))
    .slice(1);

  return <CarouselClient collections={visibleCollections} />;
}