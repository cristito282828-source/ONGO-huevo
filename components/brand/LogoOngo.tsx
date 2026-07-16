import Image from 'next/image';
import clsx from 'clsx';

type LogoOngoProps = {
  variant?: 'dark' | 'light';
  className?: string;
  withWordmark?: boolean;
};

/**
 * Logo ONGO · Isotipo + wordmark
 *
 * Usa la imagen real de favicon-ongo.jpg para el isotipo
 * (circuitos azul + tipografía ONGO blanca/celeste) y compone
 * el wordmark "ONGO" al lado en CSS, manteniendo la coherencia
 * visual con la paleta Mycelium.
 *
 * Si quieres solo el isotipo (favicon-style), pasa `withWordmark={false}`.
 */
export default function LogoOngo({
  className,
  withWordmark = true,
}: LogoOngoProps) {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {/* Isotipo: imagen real de ONGO (logo oficial) */}
      <Image
        src="/favicon-ongo.jpg"
        alt="ONGO logo"
        width={40}
        height={40}
        className="h-8 w-8 rounded-md object-cover"
        priority
      />

      {withWordmark && (
        <div className="leading-tight">
          <span className="block font-belleza text-xl font-semibold tracking-tight text-mycelium-ink">
            ONGO
          </span>
          <span className="block font-moderat text-[10px] uppercase tracking-[0.22em] text-mycelium-primary">
            Tecnología Natural
          </span>
        </div>
      )}
    </div>
  );
}