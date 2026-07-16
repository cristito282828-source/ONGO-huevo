import { Suspense } from 'react';
import { getProducts } from 'lib/woocommerce';
import { ProductGridSkeleton } from '@/components/ui/skeleton';
import ProductCardMycelium from '@/components/brand/ProductCardMycelium';
import { sortFeaturedFirst } from '@/lib/featured-products';

export const metadata = {
  title: 'Tienda',
}

// Revalidar cada 60 segundos para mantener productos actualizados
export const revalidate = 60;

async function AllProductsGrid({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as { [key: string]: string };

  const products = await getProducts({ query: searchValue });

  const adapted = sortFeaturedFirst(
    (products || []).map((product: any) => ({
      id: product.id,
      name: product.name || 'Producto',
      slug: product.slug,
      price: product.price || 'Consultar precio',
      regularPrice: product.regularPrice || null,
      image: product.image?.sourceUrl || product.image?.url || null,
      shortDescription: product.shortDescription || '',
      stockStatus: product.stockStatus
    }))
  );

  return adapted.length > 0 ? (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {adapted.map((product) => (
        <ProductCardMycelium key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="text-center py-8 col-span-full">
      <p className="text-lg text-gray-900 mb-2">
        No se encontraron productos para <span className="font-bold">&quot;{searchValue}&quot;</span>.
      </p>
      <p className="text-sm text-gray-600">
        Intenta buscar con otras palabras o navega por nuestras categorías.
      </p>
    </div>
  );
}

export default async function AllProductsPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = (await props.searchParams) || {};
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-belleza text-3xl font-light tracking-wide mb-8 text-gray-900">Todos los productos</h1>
        <Suspense fallback={<ProductGridSkeleton count={12} />}>
          <AllProductsGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}