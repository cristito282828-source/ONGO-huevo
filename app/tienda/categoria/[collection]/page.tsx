import { getCollection, getCollections } from 'lib/woocommerce';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CategorySectionMinimal from '@/components/custom/CategorySectionMinimal';

// Revalidar cada 60 segundos para mantener productos actualizados
export const revalidate = 60;

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} productos`,
  };
}

export default async function CategoryPage({
  params: promiseParams,
}: {
  params: Promise<{ collection: string }>;
}) {
  const params = await promiseParams;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  const collections = await getCollections();

  return (
    <section>
      {/* Categorías minimalistas */}
      <div className="bg-mycelium-cream pt-8">
        <CategorySectionMinimal collections={collections} />
      </div>

      {/* Contenido principal */}
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        <h1 className="font-belleza text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide mb-8 text-gray-900">
          {collection.title}
        </h1>

        <p className="py-3 text-lg text-gray-600">Explora los productos de esta categoría.</p>
      </div>
    </section>
  );
}