import Link from 'next/link';

const PILLARS = [
  {
    label: 'Bioactivo',
    title: 'Lo que tu cuerpo absorbe, no lo que compras.',
    body:
      'Cada cápsula se elabora con extracto dual: agua + alcohol, para garantizar todos los beta-glucanos disponibles y asimilables.',
  },
  {
    label: 'Trazable',
    title: 'De la espora al sello, en una sola línea de tiempo.',
    body:
      'Cultivamos en lotes cortos, secamos a baja temperatura y empacamos en atmósfera controlada. Cada frasco tiene un QR que va al lote.',
  },
  {
    label: 'Tecnológico',
    title: 'Hongos vistos con la precisión de un laboratorio.',
    body:
      'Estandarizamos potencia por HPLC, analizamos metales pesados y microbiología, y publicamos el certificado de cada lote.',
  },
];

export default function ScienceMycelium() {
  return (
    <section id="ciencia" className="bg-mycelium-soft">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="mycelium-pill">Ciencia</span>
            <h2 className="mt-4 font-belleza text-4xl leading-tight tracking-tight text-mycelium-ink md:text-5xl">
              Tecnología <span className="text-mycelium-primary">natural</span>,<br />
              medida como un fármaco.
            </h2>
            <p className="mt-6 max-w-md font-moderat text-base leading-relaxed text-mycelium-muted">
              Creemos que la innovación más potente empieza en el bosque. Tomamos
              los compuestos que la naturaleza tardó millones de años en afinar
              y los entregamos en formatos que tu rutina ya entiende.
            </p>

            <Link href="/ciencia" className="btn-mycelium-outline mt-8">
              Ver papers y laboratorio
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-mycelium-line bg-mycelium-line lg:col-span-7 lg:grid-cols-1">
            {PILLARS.map((p) => (
              <li
                key={p.label}
                className="flex flex-col gap-2 bg-mycelium-bg p-8 transition-colors hover:bg-mycelium-cream"
              >
                <span className="font-moderat text-xs uppercase tracking-[0.22em] text-mycelium-primary">
                  {p.label}
                </span>
                <h3 className="font-belleza text-2xl leading-snug text-mycelium-ink">
                  {p.title}
                </h3>
                <p className="font-moderat text-sm leading-relaxed text-mycelium-muted">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
