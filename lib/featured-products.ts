/**
 * FEATURED PRODUCTS · Mycelium
 *
 * Helper centralizado para identificar y ordenar productos destacados
 * (ofertas, lanzamientos, etc.) en el catálogo.
 *
 * Para añadir más destacados, agregarlos al array FEATURED_SLUGS en orden
 * de prioridad. El primer slug será el más visible.
 */

export const FEATURED_SLUGS = ['enigma'] as const;
export type FeaturedSlug = (typeof FEATURED_SLUGS)[number];

/**
 * ¿Este producto es destacado?
 * Por ahora solo chequeamos por slug. Si en el futuro se quiere
 * discriminar por categoría o tag, hacerlo aquí.
 */
export function isFeaturedProduct(slug: string | null | undefined): boolean {
  if (!slug) return false;
  return FEATURED_SLUGS.includes(slug as FeaturedSlug);
}

/**
 * ¿Este producto está en oferta?
 * Devuelve true si el backend Woo devolvió un salePrice distinto al regularPrice.
 *
 * Los precios de WooGraphQL suelen llegar como strings HTML-encoded tipo
 * "&nbsp;$45.000" — antes de comparar los limpiamos y los dejamos en CLP.
 */
export function isOnSale(
  price: string | null | undefined,
  regularPrice: string | null | undefined,
): boolean {
  const p = stripPrice(price);
  const r = stripPrice(regularPrice);
  if (!p || !r) return false;
  // Si tienen el mismo valor numérico, no es oferta
  return p !== r && Number(r) > Number(p);
}

/**
 * Extrae solo los dígitos de un precio string de WooCommerce.
 * "$45.000" → 45000
 * "&nbsp;$45.000&nbsp;CLP" → 45000
 */
export function stripPrice(price: string | null | undefined): string {
  if (!price) return '';
  return price.replace(/[^0-9]/g, '');
}

/**
 * Formatea un número como precio CLP con separador de miles.
 * 45000 → "$45.000"
 */
export function formatCLP(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  const num = typeof value === 'string' ? Number(stripPrice(value)) : value;
  if (Number.isNaN(num)) return '';
  return `$${num.toLocaleString('es-CL')}`;
}

/**
 * Ordena un array de productos poniendo los destacados primero,
 * manteniendo el orden relativo del resto.
 *
 * Uso:
 *   const products = await getFeaturedProducts();
 *   const sorted = sortFeaturedFirst(products);
 */
export function sortFeaturedFirst<T extends { slug: string }>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    const aIdx = FEATURED_SLUGS.indexOf(a.slug as FeaturedSlug);
    const bIdx = FEATURED_SLUGS.indexOf(b.slug as FeaturedSlug);
    // Si ambos son destacados, gana el que está primero en FEATURED_SLUGS
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    // Si solo a es destacado, va primero
    if (aIdx !== -1) return -1;
    // Si solo b es destacado, va primero
    if (bIdx !== -1) return 1;
    // Ninguno destacado → mantener orden original
    return 0;
  });
}

/**
 * Filtra productos destacados del array.
 * Útil cuando el producto ya se muestra en otro componente (ej: hero)
 * y no quieres duplicarlo en el grid.
 */
export function excludeFeatured<T extends { slug: string }>(products: T[]): T[] {
  return products.filter((p) => !isFeaturedProduct(p.slug));
}