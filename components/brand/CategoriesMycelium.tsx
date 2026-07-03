import Link from 'next/link';

const CATEGORIES = [
  {
    name: 'Cápsulas',
    description: 'Dosis concentradas de micelio bioactivo. Lion\'s Mane, Reishi y Cordyceps.',
    href: '/catalogo/capsulas',
    accent: 'var(--brand-primary)',
    badge: 'Diarias',
  },
  {
    name: 'Polvos funcionales',
    description: 'Para mezclar en café, smoothies o recetas. Hongos enteros, nano-pulverizados.',
    href: '/catalogo/polvos',
    accent: 'var(--brand-accent)',
    badge: 'Versátiles',
  },
  {
    name: 'Bebidas elíxir',
    description: 'Café y té enriquecido con extracto de micelio. Listos para tomar.',
    href: '/catalogo/bebidas',
    accent: 'var(--brand-electric)',
    badge: 'Recién lanzadas',
  },
  {
    name: 'Kits de cultivo',
    description: 'Cultiva tu propio micelio en casa. Tecnología viva paso a paso.',
    href: '/catalogo/kits',
    accent: 'var(--brand-primary-dark)',
    badge: 'Experiencia',
  },
];

export default function CategoriesMycelium() {
  return (
    <section className="bg-mycelium-bg">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mycelium-pill">Catálogo</span>
            <h2 className="mt-4 max-w-2xl font-belleza text-4xl leading-tight tracking-tight text-mycelium-ink md:text-5xl">
              Cuatro formas de integrar <span className="text-mycelium-primary">hongos funcionales</span> a tu rutina.
            </h2>
          </div>
          <Link href="/catalogo" className="font-moderat text-sm underline-offset-4 hover:underline">
            Ver todo →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative flex h-full flex-col rounded-2xl border border-mycelium-line bg-mycelium-cream p-6 transition-all hover:-translate-y-1 hover:border-mycelium-primary hover:shadow-[0_20px_50px_-20px_rgba(15,31,23,0.18)]"
            >
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full px-2.5 py-1 font-moderat text-[10px] uppercase tracking-[0.18em]"
                style={{ background: `${cat.accent}`, color: 'var(--brand-bg)' }}
              >
                {cat.badge}
              </span>

              <h3 className="mt-6 font-belleza text-2xl text-mycelium-ink">
                {cat.name}
              </h3>
              <p className="mt-2 flex-1 font-moderat text-sm leading-relaxed text-mycelium-muted">
                {cat.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-mycelium-line pt-4">
                <span className="font-moderat text-xs uppercase tracking-[0.2em] text-mycelium-ink">
                  Explorar
                </span>
                <span className="text-mycelium-primary transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
