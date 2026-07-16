'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import LogoOngo from './LogoOngo';
import { CartIcon } from '@/components/cart/CartIcon';

/**
 * HeaderMyceliumClient — Client Component.
 * Maneja:
 *  - Menú móvil colapsable
 *  - Integración con CartIcon (que ya consume useCart() y abre el drawer)
 *
 * Recibe la NAV como prop del server component padre.
 */

export interface HeaderMyceliumClientProps {
  siteName: string;
  nav: { href: string; label: string }[];
}

export default function HeaderMyceliumClient({
  nav,
}: HeaderMyceliumClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-mycelium-line bg-mycelium-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" aria-label="Inicio Mycelium" onClick={() => setMobileOpen(false)}>
          <LogoOngo />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item, idx) => (
              <li key={`${item.href}-${idx}`}>
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
          <Link
            href="/account"
            className="hidden font-moderat text-sm text-mycelium-ink hover:text-mycelium-primary md:block"
          >
            Ingresar
          </Link>

          {/* CartIcon: abre el drawer global, no navega a /cart */}
          <CartIcon />

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-mycelium-line text-mycelium-ink transition-colors hover:border-mycelium-primary hover:text-mycelium-primary md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav
          aria-label="Menú móvil"
          className="border-t border-mycelium-line bg-mycelium-cream md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {nav.map((item, idx) => (
              <li key={`mobile-${item.href}-${idx}`}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 font-moderat text-sm text-mycelium-ink transition-colors hover:bg-mycelium-soft hover:text-mycelium-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-mycelium-line pt-2">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 font-moderat text-sm text-mycelium-ink transition-colors hover:bg-mycelium-soft hover:text-mycelium-primary"
              >
                Ingresar
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}