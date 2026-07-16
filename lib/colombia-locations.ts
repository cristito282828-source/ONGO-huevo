/**
 * COLOMBIA · Departamentos y ciudades
 *
 * Lista oficial de los 33 departamentos de Colombia (incluye Bogotá D.C.
 * como distrito capital). Las ciudades incluyen las capitales y las
 * principales poblaciones por población e importancia logística.
 *
 * Uso:
 *   import { DEPARTAMENTOS, getCiudadesByDepartamento } from '@/lib/colombia-locations';
 *   const ciudades = getCiudadesByDepartamento('Antioquia');
 */

export interface Departamento {
  nombre: string;
  ciudades: string[];
}

export const DEPARTAMENTOS: Departamento[] = [
  {
    nombre: 'Amazonas',
    ciudades: ['Leticia', 'Puerto Nariño'],
  },
  {
    nombre: 'Antioquia',
    ciudades: [
      'Medellín',
      'Bello',
      'Envigado',
      'Itagüí',
      'Rionegro',
      'Sabaneta',
      'Apartadó',
      'Turbo',
      'Caucasia',
      'Caldas',
      'Carmen de Viboral',
      'Girardota',
      'Marinilla',
      'Carepa',
      'Chigorodó',
      'La Ceja',
      'Santa Fe de Antioquia',
    ],
  },
  {
    nombre: 'Arauca',
    ciudades: ['Arauca', 'Arauquita', 'Saravena', 'Tame'],
  },
  {
    nombre: 'Atlántico',
    ciudades: [
      'Barranquilla',
      'Soledad',
      'Malambo',
      'Sabanalarga',
      'Puerto Colombia',
      'Baranoa',
      'Galapa',
      'Usiacurí',
    ],
  },
  {
    nombre: 'Bogotá D.C.',
    ciudades: ['Bogotá D.C.'],
  },
  {
    nombre: 'Bolívar',
    ciudades: [
      'Cartagena',
      'Magangué',
      'Turbaco',
      'Arjona',
      'El Carmen de Bolívar',
      'Mompós',
      'San Juan Nepomuceno',
    ],
  },
  {
    nombre: 'Boyacá',
    ciudades: [
      'Tunja',
      'Duitama',
      'Sogamoso',
      'Chiquinquirá',
      'Paipa',
      'Villa de Leyva',
      'Puerto Boyacá',
      'Moniquirá',
    ],
  },
  {
    nombre: 'Caldas',
    ciudades: [
      'Manizales',
      'La Dorada',
      'Chinchiná',
      'Villamaría',
      'Riosucio',
      'Anserma',
    ],
  },
  {
    nombre: 'Caquetá',
    ciudades: ['Florencia', 'San Vicente del Caguán', 'Puerto Rico'],
  },
  {
    nombre: 'Casanare',
    ciudades: ['Yopal', 'Aguazul', 'Villanueva', 'Tauramena', 'Paz de Ariporo'],
  },
  {
    nombre: 'Cauca',
    ciudades: ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Patía'],
  },
  {
    nombre: 'Cesar',
    ciudades: ['Valledupar', 'Aguachica', 'Codazzi', 'Bosconia', 'La Jagua de Ibirico'],
  },
  {
    nombre: 'Chocó',
    ciudades: ['Quibdó', 'Istmina', 'Condoto', 'Tadó'],
  },
  {
    nombre: 'Córdoba',
    ciudades: [
      'Montería',
      'Cereté',
      'Sahagún',
      'Lorica',
      'Planeta Rica',
      'Tierralta',
      'Montelíbano',
    ],
  },
  {
    nombre: 'Cundinamarca',
    ciudades: [
      'Soacha',
      'Facatativá',
      'Zipaquirá',
      'Chía',
      'Mosquera',
      'Madrid',
      'Funza',
      'Cajicá',
      'Girardot',
      'Fusagasugá',
      'Bogotá (despachos)', // Para usuarios que viven en Cundinamarca cerca a Bogotá
    ],
  },
  {
    nombre: 'Guainía',
    ciudades: ['Inírida'],
  },
  {
    nombre: 'Guaviare',
    ciudades: ['San José del Guaviare', 'Calamar', 'Miraflores'],
  },
  {
    nombre: 'Huila',
    ciudades: ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'San Agustín'],
  },
  {
    nombre: 'La Guajira',
    ciudades: ['Riohacha', 'Maicao', 'Uribia', 'Fonseca', 'San Juan del Cesar'],
  },
  {
    nombre: 'Magdalena',
    ciudades: ['Santa Marta', 'Ciénaga', 'Fundación', 'Aracataca', 'El Banco'],
  },
  {
    nombre: 'Meta',
    ciudades: ['Villavicencio', 'Acacías', 'Granada', 'Puerto López'],
  },
  {
    nombre: 'Nariño',
    ciudades: [
      'Pasto',
      'Tumaco',
      'Ipiales',
      'Túquerres',
      'Samaniego',
      'Barbacoas',
    ],
  },
  {
    nombre: 'Norte de Santander',
    ciudades: [
      'Cúcuta',
      'Ocaña',
      'Pamplona',
      'Villa del Rosario',
      'Los Patios',
      'Tibú',
    ],
  },
  {
    nombre: 'Putumayo',
    ciudades: ['Mocoa', 'Puerto Asís', 'Orito', 'Sibundoy'],
  },
  {
    nombre: 'Quindío',
    ciudades: ['Armenia', 'Calarcá', 'La Tebaida', 'Montenegro', 'Quimbaya'],
  },
  {
    nombre: 'Risaralda',
    ciudades: ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia'],
  },
  {
    nombre: 'San Andrés y Providencia',
    ciudades: ['San Andrés', 'Providencia'],
  },
  {
    nombre: 'Santander',
    ciudades: [
      'Bucaramanga',
      'Floridablanca',
      'Girón',
      'Piedecuesta',
      'Barrancabermeja',
      'San Gil',
      'Socorro',
      'Málaga',
    ],
  },
  {
    nombre: 'Sucre',
    ciudades: ['Sincelejo', 'Corozal', 'Sampués', 'Tolú', 'Coveñas'],
  },
  {
    nombre: 'Tolima',
    ciudades: [
      'Ibagué',
      'Espinal',
      'Melgar',
      'Honda',
      'Lérida',
      'Chaparral',
      'Libano',
    ],
  },
  {
    nombre: 'Valle del Cauca',
    ciudades: [
      'Cali',
      'Palmira',
      'Buenaventura',
      'Tuluá',
      'Cartago',
      'Buga',
      'Jamundí',
      'Yumbo',
      'Sevilla',
      'Candelaria',
    ],
  },
  {
    nombre: 'Vaupés',
    ciudades: ['Mitú'],
  },
  {
    nombre: 'Vichada',
    ciudades: ['Puerto Carreño', 'La Primavera', 'Santa Rosalía', 'Cumaribo'],
  },
];

/**
 * Devuelve las ciudades de un departamento.
 * Si el departamento no existe, devuelve array vacío.
 */
export function getCiudadesByDepartamento(departamento: string): string[] {
  const dep = DEPARTAMENTOS.find((d) => d.nombre === departamento);
  return dep ? dep.ciudades : [];
}

/**
 * Devuelve la lista plana de nombres de departamentos.
 * Útil para popular un <select>.
 */
export const DEPARTAMENTO_NOMBRES: string[] = DEPARTAMENTOS.map((d) => d.nombre);