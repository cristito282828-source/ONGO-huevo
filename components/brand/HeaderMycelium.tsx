import Link from 'next/link';
import LogoMycelium from './LogoMycelium';

const NAV = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/ciencia', label: 'Ciencia' },
  { href: '/cultivo', label: 'Cultivo' },
  { href: '/nosotros', label: 'Nosotros' },
];

export default function HeaderMycelium() {
  return (
    <header className="sticky top-0 z-40 border-b border-mycelium-line bg-mycelium-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" aria-label="Inicio Mycelium">
          <LogoMycelium />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-moderat text-sm text-mycelium-ink transition-colors hover:text-mycelium-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cuenta" className="hidden font-moderat text-sm text-mycelium-ink hover:text-mycelium-primary md:block">
            Ingresar
          </Link>
          <Link href="/carrito" className="btn-mycelium">
            Carrito
            <span aria-hidden="true">·</span>
            <span className="font-moderat text-xs">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
