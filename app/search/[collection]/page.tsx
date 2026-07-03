import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getProducts as getWooProducts,
  getCollections as getWooCollections
} from '@/lib/woocommerce';
import ProductCardMycelium from '@/components/brand/ProductCardMycelium';
import SectionHeaderMycelium from '@/components/brand/SectionHeaderMycelium';
import EmptyStateMycelium from '@/components/brand/EmptyStateMycelium';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const collections = await getWooCollections();
  const category = collections.find(
    (c: any) => c.slug === collection || c.handle === collection
  );

  if (!category) return { title: 'Categoría no encontrada' };

  return {
    title: `${category.title || category.name} · Mycelium`,
    description: category.description || `Productos de ${category.title || category.name}`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collection } = await props.params;
  await props.searchParams;

  const collections = await getWooCollections();
  const category = collections.find(
    (c: any) => c.slug === collection || c.handle === collection
  );
  if (!category) notFound();

  // Productos por categoría (sin tocar lógica)
  const { woocommerceFetch } = await import('@/lib/woocommerce');
  const { getProductsByCategoryQuery } = await import(
    '@/lib/woocommerce/queries/product'
  );

  let products: any[] = [];
  try {
    const res = await woocommerceFetch<any>({
      query: getProductsByCategoryQuery,
      variables: { category: collection }
    });
    products = res.body.data.products?.nodes || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    products = await getWooProducts({});
  }

  const adaptedProducts = products.map((product: any) => ({
    id: product.id,
    name: product.name || 'Sin nombre',
    slug: product.slug,
    price: product.price || 'Consultar precio',
    regularPrice: product.regularPrice || null,
    image: product.image?.sourceUrl || product.image?.url || null,
    shortDescription: product.shortDescription || '',
    stockStatus: product.stockStatus
  }));

  return (
    <>
      <SectionHeaderMycelium
        eyebrow={`Colección · ${category.title || category.name}`}
        title={category.title || category.name}
        subtitle={
          category.description ||
          'Una selección curada por nuestro laboratorio. Hongos funcionales cultivados y empacados con estándares de precisión.'
        }
        count={adaptedProducts.length}
        crumbs={[
          { href: '/', label: 'Inicio' },
          { href: '/search', label: 'Catálogo' },
          { label: category.title || category.name }
        ]}
        cta={{ href: '/search', label: 'Ver todo' }}
      />

      <section className="bg-mycelium-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {adaptedProducts.length === 0 ? (
            <EmptyStateMycelium
              title={`Aún no cultivamos esta categoría`}
              description={`Pronto abriremos el lote de ${category.title || category.name}. Mientras tanto explora el resto del catálogo.`}
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {adaptedProducts.map((product) => (
                <ProductCardMycelium key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
