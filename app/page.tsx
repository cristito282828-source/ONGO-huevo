import type { Metadata } from 'next';
import HeaderMycelium from '@/components/brand/HeaderMycelium';
import HeroMycelium from '@/components/brand/HeroMycelium';
import FeaturedProductsMycelium from '@/components/brand/FeaturedProductsMycelium';
import ScienceMycelium from '@/components/brand/ScienceMycelium';
import NewsletterMycelium from '@/components/brand/NewsletterMycelium';
import FooterMycelium from '@/components/brand/FooterMycelium';

export const metadata: Metadata = {
  title: 'Mycelium · Hongos funcionales con Tecnología Natural',
  description:
    'Mycelium convierte el poder del micelio en cápsulas, polvos, bebidas y kits de cultivo. Nutrición viva con la precisión de un laboratorio.',
  keywords: ['mycelium', 'hongos funcionales', 'tecnología natural', 'adaptógenos', 'bienestar'],
};

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HeaderMycelium />
      <main id="main-content" className="min-h-screen bg-mycelium-cream">
        <HeroMycelium />
        <FeaturedProductsMycelium />
        <ScienceMycelium />
        <NewsletterMycelium />
      </main>
      <FooterMycelium />
    </>
  );
}
