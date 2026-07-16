import type { Metadata } from 'next';
import ProductCardMycelium from '@/components/brand/ProductCardMycelium';
import SectionHeaderMycelium from '@/components/brand/SectionHeaderMycelium';
import EmptyStateMycelium from '@/components/brand/EmptyStateMycelium';
import { sortFeaturedFirst } from '@/lib/featured-products';

export const metadata: Metadata = {
  title: 'Catálogo · Mycelium',
  description:
    'Hongos funcionales cultivados, formulados y empacados con estándares de laboratorio. Tecnología natural para el bienestar cotidiano.',
};

export const revalidate = 60;

async function getAllProducts() {
  try {
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductsQuery } = await import('@/lib/woocommerce/queries/product');

    const res = await woocommerceFetch<any>({
      query: getProductsQuery,
      variables: {}
    });

    const products = res.body.data.products?.nodes || [];

    const adapted = products.map((product: any) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price || 'Consultar precio',
      regularPrice: product.regularPrice || null,
      image: product.image?.sourceUrl || product.image?.url || null,
      shortDescription: product.shortDescription || '',
      stockStatus: product.stockStatus
    }));

    return sortFeaturedFirst(adapted);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function SearchPage() {
  const products = await getAllProducts();

  return (
    <>
      <SectionHeaderMycelium
        eyebrow="Catálogo · todos los productos"
        title="Hongos funcionales vivos, listos para integrar a tu rutina."
        subtitle="Cultivamos lotes cortos, los analizamos por HPLC y los entregamos en formatos que tu cuerpo entiende como tecnología silenciosa."
        count={products.length}
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Catálogo' }]}
      />

      <section className="bg-mycelium-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {products.length === 0 ? (
            <EmptyStateMycelium />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product: any) => (
                <ProductCardMycelium key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
