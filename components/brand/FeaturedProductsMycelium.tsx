import Link from 'next/link';
import ProductCardMycelium, { type ProductCardData } from './ProductCardMycelium';
import EmptyStateMycelium from './EmptyStateMycelium';
import { excludeFeatured } from '@/lib/featured-products';

/**
 * Productos destacados · Home Mycelium
 * Trae los productos del WPGraphQL real y los pinta con ProductCardMycelium.
 * Si falla el endpoint, muestra fallback estático (no rompe la home).
 *
 * Los productos en FEATURED_SLUGS (ej: 'enigma') se EXCLUYEN de este grid
 * porque ya se muestran prominentemente en el HeroMycelium. Evita duplicarlos.
 */
async function getFeaturedProducts(): Promise<ProductCardData[]> {
  try {
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductsQuery } = await import('@/lib/woocommerce/queries/product');

    const res = await woocommerceFetch<any>({
      query: getProductsQuery,
      variables: {}
    });

    const nodes = res.body?.data?.products?.nodes ?? [];

    const products: ProductCardData[] = nodes.map((p: any) => ({
      id: p.id,
      name: p.name || 'Producto',
      slug: p.slug,
      price: p.price || 'Consultar precio',
      regularPrice: p.regularPrice || null,
      image: p.image?.sourceUrl || p.image?.url || null,
      shortDescription: p.shortDescription || '',
      stockStatus: p.stockStatus
    }));

    // Excluimos los destacados (ya están en el hero) y limitamos a 8
    return excludeFeatured(products).slice(0, 8);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export default async function FeaturedProductsMycelium() {
  const products = await getFeaturedProducts();

  return (
    <section className="bg-mycelium-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mycelium-pill">Lote en vivo</span>
            <h2 className="mt-4 font-belleza text-4xl leading-tight tracking-tight text-mycelium-ink md:text-5xl">
              Productos <span className="text-mycelium-primary">disponibles</span> en este momento.
            </h2>
            <p className="mt-3 font-moderat text-base leading-relaxed text-mycelium-muted">
              Estos son los lotes que acaban de salir del laboratorio.
              Cuando se agoten, los reponemos en la siguiente cosecha.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {products.length > 0 && (
              <span className="rounded-full border border-mycelium-line bg-mycelium-cream px-3 py-1 font-moderat text-xs uppercase tracking-[0.2em] text-mycelium-ink">
                {products.length} en stock
              </span>
            )}
            <Link href="/search" className="btn-mycelium-outline">
              Ver catálogo
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="mt-12">
            <EmptyStateMycelium
              title="Aún no publicamos este lote"
              description="Estamos preparando los primeros cultivos. Mientras tanto, déjame tu correo y te avisamos cuando salgan."
              ctaHref="/#newsletter"
              ctaLabel="Quiero que me avisen"
            />
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCardMycelium key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
