import Link from 'next/link';
import LogoMycelium from './LogoMycelium';

/**
 * Hero Mycelium · Primera impresión del bran.
 * Fondo crema + red de micelio + tarjeta "tarjeta técnica" del producto estrella.
 */
export default function HeroMycelium() {
  return (
    <section className="relative overflow-hidden bg-mycelium-network">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-12 md:py-32 lg:gap-16 lg:px-8">
        {/* Texto */}
        <div className="md:col-span-7">
          <span className="mycelium-pill">Innovación · Bienestar · Hongos funcionales</span>

          <h1 className="mt-6 font-belleza text-5xl leading-[1.05] tracking-tight text-mycelium-ink md:text-7xl">
            Hongos que <span className="text-mycelium-primary">piensan,</span>
            <br />
            naturaleza que <span className="text-mycelium-primary">tecnifica.</span>
          </h1>

          <p className="mt-6 max-w-xl font-moderat text-lg leading-relaxed text-mycelium-muted">
            En Mycelium convertimos el poder del micelio en productos comestibles,
            suplementos y bebidas que tu cuerpo entiende como tecnología silenciosa.
            Nutrición viva con la precisión de un laboratorio.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/catalogo" className="btn-mycelium">
              Explorar productos
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/ciencia" className="btn-mycelium-outline">
              La ciencia del micelio
            </Link>
          </div>

          {/* Métricas rápidas */}
          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-mycelium-line pt-8">
            <div>
              <dt className="font-moderat text-xs uppercase tracking-[0.2em] text-mycelium-muted">
                Adaptógenos
              </dt>
              <dd className="mt-1 font-belleza text-3xl text-mycelium-ink">7</dd>
            </div>
            <div>
              <dt className="font-moderat text-xs uppercase tracking-[0.2em] text-mycelium-muted">
                Hongos bioactivos
              </dt>
              <dd className="mt-1 font-belleza text-3xl text-mycelium-ink">12</dd>
            </div>
            <div>
              <dt className="font-moderat text-xs uppercase tracking-[0.2em] text-mycelium-muted">
                Dosis diaria
              </dt>
              <dd className="mt-1 font-belleza text-3xl text-mycelium-ink">100%</dd>
            </div>
          </dl>
        </div>

        {/* Visual: tarjeta técnica del producto estrella */}
        <div className="relative md:col-span-5">
          <div className="relative mx-auto max-w-md rounded-[28px] border border-mycelium-line bg-mycelium-bg p-8 shadow-[0_30px_80px_-30px_rgba(15,31,23,0.25)]">
            <div className="flex items-center justify-between">
              <LogoMycelium withWordmark={false} className="scale-110" />
              <span className="rounded-full border border-mycelium-line px-3 py-1 font-moderat text-[10px] uppercase tracking-[0.2em] text-mycelium-muted">
                Lote · 0426
              </span>
            </div>

            {/* Diagrama circular del producto */}
            <div className="relative mx-auto mt-8 h-56 w-56">
              <div className="absolute inset-0 rounded-full bg-mycelium-soft" />
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full animate-[spin_30s_linear_infinite]"
                aria-hidden="true"
              >
                <g stroke="var(--brand-primary)" strokeWidth="0.8" fill="none">
                  <circle cx="100" cy="100" r="78" strokeDasharray="2 5" opacity="0.4" />
                  <circle cx="100" cy="100" r="58" strokeDasharray="2 5" opacity="0.5" />
                  <circle cx="100" cy="100" r="38" strokeDasharray="2 5" opacity="0.6" />
                  <path d="M100 22 L100 178" />
                  <path d="M22 100 L178 100" />
                  <path d="M44 44 L156 156" />
                  <path d="M44 156 L156 44" />
                </g>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-mycelium-primary text-mycelium-bg">
                  <span className="font-belleza text-3xl">M</span>
                </div>
              </div>
              {/* Etiquetas orbitales */}
              <span className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-mycelium-accent px-2 py-1 font-moderat text-[10px] font-semibold uppercase text-mycelium-ink">
                Focus
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-mycelium-bg px-2 py-1 font-moderat text-[10px] font-semibold uppercase text-mycelium-ink shadow-sm">
                Energy
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-mycelium-bg px-2 py-1 font-moderat text-[10px] font-semibold uppercase text-mycelium-ink shadow-sm">
                Calm
              </span>
              <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-mycelium-bg px-2 py-1 font-moderat text-[10px] font-semibold uppercase text-mycelium-ink shadow-sm">
                Immunity
              </span>
            </div>

            <div className="mt-8">
              <h3 className="font-belleza text-2xl text-mycelium-ink">
                Mycelium Daily Stack
              </h3>
              <p className="mt-2 font-moderat text-sm text-mycelium-muted">
                Lion&apos;s Mane · Reishi · Cordyceps · Chaga · Maitake
              </p>
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-mycelium-line pt-4">
              <div>
                <span className="block font-moderat text-xs uppercase tracking-[0.2em] text-mycelium-muted">
                  Plan 30 días
                </span>
                <span className="mt-1 block font-belleza text-3xl text-mycelium-ink">
                  $48.000
                </span>
              </div>
              <span className="rounded-full bg-mycelium-accent px-3 py-1 font-moderat text-xs font-semibold text-mycelium-ink">
                Bestseller
              </span>
            </div>
          </div>

          {/* Etiqueta flotante · acento eléctrico */}
          <div className="absolute -right-2 top-10 hidden rotate-6 rounded-xl bg-mycelium-ink px-3 py-2 font-moderat text-xs text-mycelium-bg shadow-lg md:block">
            <span className="font-semibold text-mycelium-accent">●</span> micelio bioactivo
          </div>
        </div>
      </div>

      {/* Línea inferior de categorías */}
      <div className="border-t border-mycelium-line bg-mycelium-bg/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4 text-xs uppercase tracking-[0.2em] text-mycelium-muted lg:px-8">
          <span className="font-semibold text-mycelium-ink">Línea:</span>
          <span>Cápsulas</span>
          <span>Polvos</span>
          <span>Bebidas</span>
          <span>Snacks</span>
          <span>Kits de cultivo</span>
          <span className="ml-auto text-mycelium-electric">#TecnologíaNatural</span>
        </div>
      </div>
    </section>
  );
}
