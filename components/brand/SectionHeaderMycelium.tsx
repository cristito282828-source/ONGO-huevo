import Link from 'next/link';

type Crumb = { href?: string; label: string };

export default function SectionHeaderMycelium({
  eyebrow,
  title,
  subtitle,
  count,
  crumbs,
  cta,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  count?: number;
  crumbs?: Crumb[];
  cta?: { href: string; label: string };
}) {
  return (
    <header className="border-b border-mycelium-line bg-mycelium-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Migas" className="mb-6 font-moderat text-xs text-mycelium-muted">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-mycelium-primary">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-mycelium-ink">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span className="text-mycelium-line">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <span className="mycelium-pill">{eyebrow}</span>}

        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="max-w-3xl font-belleza text-4xl leading-tight tracking-tight text-mycelium-ink md:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl font-moderat text-base leading-relaxed text-mycelium-muted">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {typeof count === 'number' && (
              <span className="rounded-full border border-mycelium-line bg-mycelium-cream px-3 py-1 font-moderat text-xs uppercase tracking-[0.2em] text-mycelium-ink">
                {count} {count === 1 ? 'producto' : 'productos'}
              </span>
            )}
            {cta && (
              <Link href={cta.href} className="btn-mycelium-outline">
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
