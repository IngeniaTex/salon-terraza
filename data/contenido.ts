// Contenido de las secciones. Edita textos, paquetes y fotos aquí sin tocar los componentes.
// Fuente: carpeta contenido/ («PAQUETES PARA 100 PERSONAS BODA.docx» y «Menu.pdf»). Las imágenes viven en /public/img.

export const hero = {
  video: '/media/hero.mp4', // contenido/3.mp4 convertido con fast-start
  poster: '/img/hero-poster.jpg',
  eyebrow: 'Salón de eventos en Los Reyes La Paz',
  title: 'Creando recuerdos',
  text: 'Reserva tu fecha con un pago inicial de $5,000 y paga de forma semanal, quincenal o mensual.',
};

export const about = {
  eyebrow: 'Salón Terraza',
  title: ['Un espacio hecho', 'para celebrar'],
  highlight:
    'Para preservar en su memoria un evento tan importante: salón con 7 horas de servicio, banquete, DJ, decoración y coordinador del evento.',
  features: [
    { icon: 'clock', title: ['7 horas', 'de servicio'] },
    { icon: 'sparkles', title: ['Pista LED', 'de 4 × 5 m'] },
  ],
  checklist: [
    'Coordinador del evento',
    'Degustación de cortesía una vez formalizado el contrato',
    'Paquetes a la medida de su presupuesto',
  ],
  card: { title: 'Creando recuerdos', text: '¡Será un placer servirle!' },
} as const;

export const services = [
  { icon: 'utensils', title: 'Banquete', text: 'Banquete a dos o tres tiempos: crema o pasta, plato fuerte y guarnición, con pan y paneras.' },
  { icon: 'music', title: 'DJ e iluminación', text: 'DJ profesional y equipo de iluminación con 6 horas de servicio. Pista LED de 4 × 5 m.' },
  { icon: 'flower', title: 'Mobiliario y decoración', text: 'Mesas, sillas, mantelería, cubre mantel, fundas, servilletas de tela y arreglos florales.' },
  { icon: 'mic', title: 'Animación', text: 'Maestro de ceremonias, animador durante el evento y batucada con souvenirs.' },
  { icon: 'users', title: 'Personal', text: 'Coordinador del evento, meseros, personal de recepción y de limpieza para baños y salón.' },
  { icon: 'camera', title: 'Foto, video y música', text: 'Fotografía y video profesional Full HD, grupo versátil, mariachis, regional mexicano y cabezones.' },
] as const;

const salon = 'Salón con 7 horas de servicio, incluyendo treinta minutos de recepción y treinta minutos de salida.';
const mobiliario = 'Mobiliario de mesas, sillas y mantelería, cubre mantel y fundas.';
const personal = ['Coordinador del evento.', 'Personal de recepción.', 'Personal de limpieza para baños y salón.'];
const refresco = 'Hielo y refresco: Coca Cola, Squirt y Manzana (servicio por copeo).';
const degustacion = '(Degustación de cortesía para paladear la sazón del chef, una vez formalizado el contrato).';

// Los paquetes no traen precio en el material del cliente («Costos vigentes para 2026»); se cotizan por WhatsApp.
export const packages = [
  {
    name: 'Paquete Básico',
    guests: '',
    image: '/img/brindis.jpg',
    extraHour: false,
    items: [salon, 'Encargado de salón.', 'Personal de limpieza y recepción.'],
  },
  {
    name: 'Paquete Básico Más',
    guests: 'Para 100 personas',
    image: '/img/mesa.jpg',
    extraHour: false,
    items: [
      salon,
      mobiliario,
      'Mesa principal, mesa para regalos y pastel de cortesía.',
      ...personal,
      'DJ profesional y equipo de iluminación (6 horas de servicio).',
    ],
  },
  {
    name: 'Paquete Venus',
    guests: 'Para 100 personas',
    image: '/img/champagne.jpg',
    extraHour: true,
    items: [
      salon,
      mobiliario,
      'Servilletas de tela.',
      'Mesa principal, mesa para pastel y de regalos de cortesía.',
      'Arreglo floral básico por mesa de invitados (dos modelos a elegir).',
      'Arreglo floral para mesa de honor.',
      ...personal,
      'DJ profesional y equipo de iluminación (6 horas de servicio).',
      'Maestro de ceremonias.',
      'Batucada con souvenirs.',
      `Alimentos: banquete a dos tiempos. Crema o pasta, plato fuerte y guarnición. ${degustacion}`,
      'Complementos: pan y paneras.',
      'Loza a dos tiempos: plato sopero o plato pasta, plato trinche, cubiertos y vaso de cristal.',
      refresco,
      'Servicio de meseros (6 meseros).',
    ],
  },
  {
    name: 'Paquete Orión',
    guests: 'Para 100 personas',
    image: '/img/disco.jpg',
    extraHour: true,
    items: [
      salon,
      mobiliario,
      'Servilletas de tela.',
      'Mesa principal, mesa para pastel y de regalos de cortesía.',
      'Arreglo floral básico por mesa.',
      'Arreglo floral para mesa de honor.',
      ...personal,
      'DJ profesional y equipo de iluminación (6 horas de servicio).',
      'Pista LED de 4 × 5 m.',
      'Animador durante el evento.',
      'Batucada con souvenirs.',
      `Alimentos: banquete a tres tiempos. Crema, pasta, plato fuerte y guarnición. ${degustacion}`,
      'Complementos: pan y paneras.',
      'Loza a tres tiempos: plato sopero, plato pasta, plato trinche, cubiertos y vaso de cristal.',
      refresco,
      'Servicio de meseros.',
    ],
  },
];

export const packageNotes = {
  extraHour: 'En los paquetes Orión y Venus le ofrecemos como valor agregado una hora extra gratis en salón con mobiliario, personal de limpieza y recepción.',
  validity: 'Costos vigentes para 2026',
  payment: 'Puede reservar la fecha con un pago inicial de $5,000.00 y diseñar un plan de pagos semanal, quincenal o mensual.',
  custom: 'Podemos diseñar un paquete a la medida de su presupuesto.',
  extras: ['Diversos paquetes de fotografía y video profesional, calidad Full HD', 'Pistas de baile iluminada y/o de LED', 'Cabezones', 'Grupo versátil, mariachis, regional mexicano'],
};

export const banquet = {
  eyebrow: 'Banquete',
  title: ['Sabor y servicio', 'a la altura'],
  text: 'Banquete a dos o tres tiempos según el paquete: crema o pasta, plato fuerte y guarnición, con pan y paneras. Degustación de cortesía para paladear la sazón del chef, una vez formalizado el contrato.',
  quote: '¡Será un placer servirle!',
  video: '/media/salon-terraza.mp4',
  columns: [
    { title: 'Cremas y pastas', items: ['9 cremas: elote, poblana, nuez, champiñones…', '8 pastas: hawaiana, boloñesa, al chipotle, campesina…'] },
    { title: 'Plato fuerte', items: ['Pechuga rellena: Cordón Blue, Fogoncito, Especial o Azteca', 'Lomo o pieza de pollo', '10 salsas: mango, ciruela, tamarindo, almendrado…'] },
    { title: 'Guarnición', items: ['Ensaladas: frutos rojos, Reyna, Waldorf o de manzana', 'Verduras gourmet o puré de papa'] },
    { title: 'Bebidas', items: ['Hielo y refresco: Coca Cola, Squirt y Manzana', 'Servicio por copeo'] },
  ],
};

export const whyUs = [
  { icon: 'clipboard', title: 'Coordinador del evento', text: 'Coordinador, encargado de salón y personal de recepción y limpieza durante tu evento.' },
  { icon: 'utensils', title: 'Degustación de cortesía', text: 'Para paladear la sazón del chef, una vez formalizado el contrato.' },
  { icon: 'clock', title: 'Hora extra gratis', text: 'En los paquetes Venus y Orión: una hora extra en salón con mobiliario, personal de limpieza y recepción.' },
  { icon: 'wallet', title: 'Plan de pagos', text: 'Aparta con $5,000.00 y paga de forma semanal, quincenal o mensual.' },
] as const;

// TODO: sustituir por reseñas reales (Google Maps o Facebook) con permiso del cliente.
// Mientras todas tengan `ejemplo: true`, la sección Opiniones no se muestra (ver `showReviews`).
export const reviews = [
  { name: 'Nombre del cliente', event: 'Boda · Mes 2026', text: 'Aquí va la reseña real de una pareja que celebró su boda en el salón.', ejemplo: true },
  { name: 'Nombre del cliente', event: 'XV años · Mes 2026', text: 'Aquí va la reseña real de una familia que festejó unos XV años.', ejemplo: true },
  { name: 'Nombre del cliente', event: 'Bautizo · Mes 2026', text: 'Aquí va la reseña real de un bautizo o una graduación.', ejemplo: true },
  { name: 'Nombre del cliente', event: 'Graduación · Mes 2026', text: 'Aquí va la reseña real de una generación que celebró su graduación.', ejemplo: true },
];

export const showReviews = reviews.some(r => !r.ejemplo);

export const promo = {
  small: 'Costos vigentes para 2026',
  title: 'Aparta tu fecha con $5,000',
  cta: 'Reservar fecha',
};

export const events = [
  { image: '/img/mesa.jpg', position: '50% 50%', badge: ['Boda', '♥'], icon: 'gem', title: 'Bodas' },
  { image: '/img/xv.jpg', position: '62% 50%', badge: ['XV', 'Años'], icon: 'sparkles', title: 'XV años' },
  { image: '/img/brindis.jpg', position: '50% 50%', badge: ['Grad', '26'], icon: 'graduation', title: 'Graduaciones' },
  { image: '/img/disco.jpg', position: '50% 50%', badge: ['Fiesta', 'Disco'], icon: 'music', title: 'Fiestas temáticas' },
] as const;
