import Link from 'next/link';

export default function NewsletterMycelium() {
  return (
    <section className="bg-mycelium-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 text-mycelium-bg md:grid-cols-12 md:gap-16 lg:px-8">
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-mycelium-bg/20 bg-mycelium-bg/5 px-3 py-1 font-moderat text-[10px] uppercase tracking-[0.22em]">
            <span className="h-1.5 w-1.5 rounded-full bg-mycelium-accent" />
            Boletín mensual
          </span>
          <h2 className="mt-6 font-belleza text-4xl leading-tight md:text-5xl">
            Una carta cada 15 días. <span className="text-mycelium-accent">Investigación, recetas y drops</span> directos a tu bandeja.
          </h2>
          <p className="mt-4 max-w-xl font-moderat text-base leading-relaxed text-mycelium-bg/70">
            Sin spam. Solo lo que nos gustaría leer: qué hay detrás de cada lote,
            los hongos que estamos probando y los descuentos para suscriptores.
          </p>
        </div>

        <form className="md:col-span-5">
          <label htmlFor="newsletter-email" className="sr-only">
            Tu correo
          </label>
          <div className="flex flex-col gap-3 rounded-2xl border border-mycelium-bg/20 bg-mycelium-bg/5 p-2 backdrop-blur sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              placeholder="tu@correo.com"
              className="flex-1 rounded-xl bg-transparent px-4 py-3 font-moderat text-mycelium-bg placeholder:text-mycelium-bg/40 focus:outline-none"
              required
            />
            <button type="submit" className="btn-mycelium bg-mycelium-accent text-mycelium-ink hover:brightness-95">
              Suscribirme
            </button>
          </div>
          <p className="mt-3 font-moderat text-xs text-mycelium-bg/50">
            Al suscribirme acepto la{' '}
            <Link href="/politica-proteccion-datos" className="underline underline-offset-2">
              política de datos
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
