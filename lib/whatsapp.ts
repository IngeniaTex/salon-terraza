import { site } from '@/data/site';

export function waLink(text?: string) {
  return `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

/** Arma un mensaje de WhatsApp con las líneas que tengan valor. */
export function buildMessage(intro: string, fields: Record<string, string | undefined>) {
  const lines = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v!.trim()}`);
  return [intro, ...lines].join('\n');
}

export function openWhatsApp(text: string) {
  window.open(waLink(text), '_blank', 'noopener');
}

/** "2026-03-14" → "sábado, 14 de marzo de 2026" */
export function formatDate(value: string) {
  if (!value) return '';
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
