import HeaderMyceliumClient from './HeaderMyceliumClient';

/**
 * HeaderMycelium — Server Component (entry point).
 * Pasa configuración estática al Client Component que maneja la interactividad
 * (menú móvil, CartIcon, etc.).
 */

const SITE_NAME = 'Mycelium';

const NAV = [
  { href: '/search', label: 'Catálogo' },
  { href: '/search', label: 'Ciencia' },
  { href: '/search', label: 'Cultivo' },
  { href: '/account', label: 'Nosotros' },
];

export default function HeaderMycelium() {
  return (
    <HeaderMyceliumClient
      siteName={SITE_NAME}
      nav={NAV}
    />
  );
}