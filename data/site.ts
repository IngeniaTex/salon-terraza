// Datos generales del negocio. Todo el sitio lee de aquí.

import { showReviews } from './contenido';

export const site = {
  name: 'Salón Terraza',
  slogan: 'Creando recuerdos',
  // TODO: confirmar el dominio definitivo para SEO y Open Graph.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description:
    'Salón de eventos en Los Reyes La Paz, Edo. Méx. Bodas, XV años, bautizos, graduaciones y fiestas temáticas con salón, banquete, música y decoración en un solo lugar.',
  phone: '5527251748',
  phoneDisplay: '55 2725 1748',
  whatsapp: '525527251748',
  // Así aparece en la hoja membretada y la tarjeta del salón.
  email: 'salonteraza@gmail.com',
  address: {
    street: 'Tabachines Mz 34 Lt 1',
    neighborhood: 'Fracc. Floresta',
    city: 'Los Reyes La Paz',
    state: 'Estado de México',
    country: 'MX',
    short: 'Tabachines Mz 34 Lt 1, Fracc. Floresta, Los Reyes La Paz',
    full: 'Tabachines Mz 34 Lt 1, Fracc. Floresta, Los Reyes La Paz, Edo. Méx.',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tabachines+Mz+34+Lt+1+Fracc+Floresta+Los+Reyes+La+Paz',
  // TODO: horario de atención y visitas. Vacío = no se muestra (no viene en el material del cliente).
  hours: '',
  // PDF que se abren en el navegador (public/docs).
  docs: {
    paquetes: '/docs/paquetes-salon-terraza-2026.pdf',
    menu: '/docs/menu-salon-terraza.pdf',
  },
  // TODO: reemplazar por los perfiles reales del salón. Si una red no existe, bórrala.
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
    youtube: 'https://www.youtube.com/',
  },
};

// «Opiniones» solo aparece cuando haya reseñas reales (data/contenido.ts).
const withReviews = <T extends { href: string }>(links: T[]) => links.filter(l => showReviews || l.href !== '#opiniones');

export const nav = withReviews([
  { label: 'Inicio', href: '#inicio' },
  { label: 'El salón', href: '#salon' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'Opiniones', href: '#opiniones' },
  { label: 'Contacto', href: '#contacto' },
]);

export const footerLinks = withReviews([
  { label: 'Inicio', href: '#inicio' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'El salón', href: '#salon' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Opiniones', href: '#opiniones' },
  { label: 'Banquete', href: '#banquete' },
  { label: 'Contacto', href: '#contacto' },
]);

export const eventTypes = ['Boda', 'XV años', 'Bautizo', 'Graduación', 'Evento social', 'Fiesta temática'];

export const guestRanges = ['50 a 100 personas', '100 a 150 personas', '150 a 200 personas', 'Más de 200 personas'];
