import clsx from 'clsx';

type LogoMyceliumProps = {
  variant?: 'dark' | 'light';
  className?: string;
  withWordmark?: boolean;
};

/**
 * Logo Mycelium · Isotipo + wordmark
 * Red de hifas (micelio) estilizada que conecta 5 nodos;
 * sugiere "neuronas conectadas + naturaleza viva + tecnología".
 */
export default function LogoMycelium({
  variant = 'dark',
  className,
  withWordmark = true,
}: LogoMyceliumProps) {
  const stroke = variant === 'dark' ? 'var(--brand-primary)' : 'var(--brand-bg)';
  const dot = variant === 'dark' ? 'var(--brand-primary-dark)' : 'var(--brand-accent)';
  const text = variant === 'dark' ? 'var(--brand-ink)' : 'var(--brand-bg)';
  const sub = variant === 'dark' ? 'var(--brand-primary)' : 'var(--brand-accent)';

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <svg
        role="img"
        aria-label="Mycelium logo"
        viewBox="0 0 40 40"
        className="h-8 w-8"
        fill="none"
      >
        {/* Red de hifas */}
        <g stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.9">
          <path d="M8 32 L20 12" />
          <path d="M20 12 L32 30" />
          <path d="M8 32 L32 30" />
          <path d="M20 12 L14 24" />
          <path d="M14 24 L32 30" />
          <path d="M14 24 L26 14" />
        </g>
        {/* Nodos (esporas / conexiones) */}
        <g>
          <circle cx="20" cy="12" r="2.2" fill={dot} />
          <circle cx="8" cy="32" r="2.2" fill={dot} />
          <circle cx="32" cy="30" r="2.2" fill={dot} />
          <circle cx="14" cy="24" r="1.6" fill={dot} />
          <circle cx="26" cy="14" r="1.6" fill={dot} />
        </g>
      </svg>

      {withWordmark && (
        <div className="leading-tight">
          <span
            className="block font-belleza text-xl tracking-tight"
            style={{ color: text }}
          >
            Mycelium
          </span>
          <span
            className="block font-moderat text-[10px] uppercase tracking-[0.22em]"
            style={{ color: sub }}
          >
            Tecnología Natural
          </span>
        </div>
      )}
    </div>
  );
}
