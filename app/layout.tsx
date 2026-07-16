import type { Metadata } from 'next';
import './globals.css';
import { RecentlyViewedProvider } from '@/components/providers/RecentlyViewedProvider';
import { CartProvider } from '@/components/providers/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import HeaderMycelium from '@/components/brand/HeaderMycelium';
import FooterMycelium from '@/components/brand/FooterMycelium';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';
import { JsonLdScript } from '@/lib/json-ld-script';

export const metadata: Metadata = {
  title: {
    default: 'Mycelium · Hongos funcionales con Tecnología Natural',
    template: '%s | Mycelium'
  },
  description:
    'Mycelium convierte el poder del micelio en cápsulas, polvos, bebidas y kits de cultivo. Nutrición viva con la precisión de un laboratorio.',
  keywords: ['mycelium', 'hongos funcionales', 'tecnología natural', 'adaptógenos', 'bienestar'],
  authors: [{ name: 'Mycelium' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://example.com',
    siteName: 'Mycelium · Hongos funcionales',
    title: 'Mycelium · Hongos funcionales con Tecnología Natural',
    description:
      'Hongos funcionales cultivados, formulados y empacados con estándares de laboratorio. Tecnología natural para el bienestar cotidiano.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="es">
      <head>
        {/* Structured Data global para SEO */}
        <JsonLdScript data={organizationSchema} />
        <JsonLdScript data={webSiteSchema} />
      </head>
      <body className="antialiased">
        {/* Skip Link para accesibilidad - permite saltar al contenido principal */}
        <a
          href="#main-content"
          className="skip-link"
        >
          Saltar al contenido principal
        </a>

        <CartProvider>
          <RecentlyViewedProvider>
            <HeaderMycelium />
            <main id="main-content" className="min-h-screen bg-mycelium-cream">
              {children}
            </main>
            <FooterMycelium />
          </RecentlyViewedProvider>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}