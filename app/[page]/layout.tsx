/**
 * Layout para /[page] (catch-all WordPress).
 * Header y Footer los provee el root layout.
 * Aquí solo centramos el contenido en una columna angosta.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="mx-8 max-w-2xl py-12 sm:mx-auto">{children}</div>
    </div>
  );
}