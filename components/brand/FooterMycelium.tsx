import Link from 'next/link';
import LogoMycelium from './LogoMycelium';

const COLS = [
  {
    title: 'Productos',
    links: [
      { href: '/catalogo/capsulas', label: 'Cápsulas' },
      { href: '/catalogo/polvos', label: 'Polvos' },
      { href: '/catalogo/bebidas', label: 'Bebidas' },
      { href: '/catalogo/kits', label: 'Kits de cultivo' },
    ],
  },
  {
    title: 'Aprender',
    links: [
      { href: '/ciencia', label: 'Ciencia del micelio' },
      { href: '/cultivo', label: 'Cultivo en casa' },
      { href: '/blog', label: 'Blog' },
      { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
    ],
  },
  {
    title: 'Mycelium',
    links: [
      { href: '/nosotros', label: 'Nosotros' },
      { href: '/lab', label: 'Laboratorio' },
      { href: '/prensa', label: 'Prensa' },
      { href: '/contacto', label: 'Contacto' },
    ],
  },
];

export default function FooterMycelium() {
  return (
    <footer className="border-t border-mycelium-line bg-mycelium-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <LogoMycelium />
            <p className="mt-4 max-w-sm font-moderat text-sm leading-relaxed text-mycelium-muted">
              Hongos funcionales cultivados, formulados y empacados con estándares
              de laboratorio. Tecnología natural para el bienestar cotidiano.
            </p>
            <div className="mt-6 flex gap-3">
              {['IG', 'TT', 'YT'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-mycelium-line font-moderat text-xs text-mycelium-ink transition hover:border-mycelium-primary hover:text-mycelium-primary"
                  aria-label={`Mycelium en ${s}`}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-moderat text-xs uppercase tracking-[0.22em] text-mycelium-ink">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="font-moderat text-sm text-mycelium-muted hover:text-mycelium-primary">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-mycelium-line pt-6 font-moderat text-xs text-mycelium-muted md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Mycelium · Tecnología Natural</span>
          <div className="flex gap-6">
            <Link href="/terminos-y-condiciones" className="hover:text-mycelium-ink">
              Términos
            </Link>
            <Link href="/politica-proteccion-datos" className="hover:text-mycelium-ink">
              Datos
            </Link>
            <Link href="/politica-envios" className="hover:text-mycelium-ink">
              Envíos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
