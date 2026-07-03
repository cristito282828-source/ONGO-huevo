import Link from 'next/link';

export default function EmptyStateMycelium({
  title = 'Aún no cultivamos este lote',
  description = 'Estamos preparando más unidades. Mientras tanto, echa un vistazo al resto del catálogo.',
  ctaHref = '/search',
  ctaLabel = 'Ver todo el catálogo',
}: {
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-mycelium-line bg-mycelium-cream px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mycelium-bg text-mycelium-primary shadow-sm">
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="8" cy="22" r="1.7" fill="currentColor" stroke="none" />
          <circle cx="24" cy="22" r="1.7" fill="currentColor" stroke="none" />
          <circle cx="16" cy="10" r="1.7" fill="currentColor" stroke="none" />
          <path d="M16 10 L8 22" />
          <path d="M16 10 L24 22" />
          <path d="M8 22 L24 22" />
        </svg>
      </div>
      <h2 className="mt-6 font-belleza text-2xl text-mycelium-ink">{title}</h2>
      <p className="mt-2 font-moderat text-sm leading-relaxed text-mycelium-muted">{description}</p>
      <Link href={ctaHref} className="btn-mycelium mt-6">
        {ctaLabel}
      </Link>
    </div>
  );
}
