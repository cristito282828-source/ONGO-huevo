import { Suspense } from 'react';
import CategorySectionMinimal from '@/components/custom/CategorySectionMinimal';
import { getCollections as getWooCollections } from '@/lib/woocommerce';

async function CategorySectionWrapper() {
  try {
    const collections = await getWooCollections();
    return <CategorySectionMinimal collections={collections} />;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

/**
 * Layout para /search y /search/[collection].
 * Header y Footer los provee el root layout.
 * Este layout solo agrega la barra de categorías mínima arriba del contenido.
 */
export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-mycelium-cream">
      <Suspense fallback={<div className="h-40 bg-mycelium-soft" />}>
        <CategorySectionWrapper />
      </Suspense>

      <div className="mx-auto max-w-screen-2xl px-4">
        {children}
      </div>
    </div>
  );
}