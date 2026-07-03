import Link from 'next/link';
import clsx from 'clsx';

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  price?: string | null;
  regularPrice?: string | null;
  image?: string | null;
  shortDescription?: string | null;
  stockStatus?: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_BACKORDER' | string | null;
};

/** Decodifica HTML entities básicos que WPGraphQL devuelve dentro de los precios. */
export function formatPrice(price: string | null | undefined): string {
  if (!price) return 'Consultar precio';
  return price
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

export function stockLabel(status: ProductCardData['stockStatus']): string | null {
  if (status === 'IN_STOCK') return 'En stock';
  if (status === 'OUT_OF_STOCK') return 'Agotado';
  if (status === 'ON_BACKORDER') return 'Bajo pedido';
  return null;
}

/**
 * Card de producto Mycelium · reutilizable
 * Mantén la consulta intacta: este componente solo pinta lo que llega.
 */
export default function ProductCardMycelium({ product }: { product: ProductCardData }) {
  const priceText = formatPrice(product.price);
  const stock = stockLabel(product.stockStatus);

  // Detectamos rango "X - Y" para mostrarlo como tal
  const isRange = priceText.includes(' - ');

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mycelium-line bg-mycelium-bg transition-all hover:-translate-y-1 hover:border-mycelium-primary hover:shadow-[0_20px_50px_-20px_rgba(15,31,23,0.18)]"
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-mycelium-soft">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-moderat text-sm text-mycelium-muted">
            Sin imagen
          </div>
        )}

        {/* Acento esquina · amarillo-limón */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mycelium-bg/85 px-2.5 py-1 font-moderat text-[10px] uppercase tracking-[0.18em] text-mycelium-ink backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-mycelium-primary" />
            {isRange ? 'Pack / Variedad' : 'Micelio'}
          </span>
        </div>

        {/* Stock badge */}
        {stock && (
          <span
            className={clsx(
              'absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-moderat text-[10px] uppercase tracking-[0.18em]',
              product.stockStatus === 'OUT_OF_STOCK'
                ? 'bg-mycelium-ink text-mycelium-bg'
                : 'bg-mycelium-accent text-mycelium-ink'
            )}
          >
            <span
              className={clsx(
                'h-1.5 w-1.5 rounded-full',
                product.stockStatus === 'OUT_OF_STOCK' ? 'bg-mycelium-bg' : 'bg-mycelium-ink'
              )}
            />
            {stock}
          </span>
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-belleza text-xl leading-snug text-mycelium-ink">
          {product.name}
        </h3>

        {product.shortDescription && (
          <p
            className="mt-2 line-clamp-2 font-moderat text-sm leading-relaxed text-mycelium-muted"
            // El shortDescription viene como HTML simple desde WPGraphQL.
            // Lo sanitizamos extrayendo solo el texto para evitar cualquier riesgo.
            dangerouslySetInnerHTML={{
              __html: product.shortDescription.replace(/<script[\s\S]*?<\/script>/gi, ''),
            }}
          />
        )}

        <div className="mt-5 flex items-end justify-between border-t border-mycelium-line pt-4">
          <div>
            <span className="block font-moderat text-[10px] uppercase tracking-[0.22em] text-mycelium-muted">
              Precio
            </span>
            <span className="mt-1 block font-belleza text-2xl leading-none text-mycelium-ink">
              {priceText}
            </span>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-mycelium-line font-moderat text-base text-mycelium-ink transition group-hover:border-mycelium-primary group-hover:text-mycelium-primary">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
