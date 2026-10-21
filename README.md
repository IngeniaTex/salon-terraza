# Salón Terraza · Sitio web

Sitio de una sola página de Salón Terraza (Los Reyes La Paz, Edo. Méx.). Sigue la maqueta aprobada
(`../Propuesta-diseno/`) y `../PROMPT-desarrollo-sitio.md`.

Stack: Next.js 15 (App Router, exportación estática) · TypeScript · Tailwind CSS 3 · Swiper · Framer Motion · Lucide.

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera el sitio estático en out/
npm start        # sirve out/ en local
```

## Dónde se edita el contenido

| Qué | Archivo |
|---|---|
| Teléfono, WhatsApp, correo, dirección, horario, redes, menú | `data/site.ts` |
| Portada, El salón, servicios, paquetes y precios, banquete, opiniones, promoción, eventos | `data/contenido.ts` |
| Fotos y video (el hero usa `public/media/hero.mp4`, que es `contenido/3.mp4`) | `public/img/`, `public/media/` |
| PDF de paquetes y menú (se abren en el navegador) | `public/docs/` |
| Colores y tipografías | `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx` |
| Aviso de privacidad | `app/aviso-de-privacidad/page.tsx` |

Cada sección es un componente en `components/sections/`, numerado igual que la maqueta:

1–2 Header · 3 Hero · 4 BookingBar · 5 About · 6 Services · 7 Packages · 8 Banquet · 9 WhyUs · 10 Reviews ·
11 Promo · 12 Events · 13 Contact · 14 Footer

## Formularios

Los tres formularios (consulta de fecha, «Reserva tu fecha» y contacto) arman un mensaje y abren WhatsApp
al **55 2725 1748** con los datos. No hay servidor. Para recibir también por correo, agrega un endpoint
(por ejemplo un Worker de Cloudflare en `/api/contacto`) y llámalo desde `components/sections/Contact.tsx`.

## Pendientes antes de publicar (`TODO:` en el código)

- Precios de los paquetes: el material del cliente no los trae, así que cada paquete se cotiza por WhatsApp.
- Reseñas reales de Google o Facebook. Mientras sean de ejemplo, la sección Opiniones no se muestra
  (se activa sola al poner `ejemplo: false` en `data/contenido.ts`).
- Fotos reales del salón. Las actuales son de banco.
- Enlaces reales de redes sociales. Borra las redes que no existan.
- Horario de atención (`site.hours`; vacío = no se muestra).
- Dominio definitivo en `NEXT_PUBLIC_SITE_URL` (SEO y Open Graph).
- Revisar el aviso de privacidad con el cliente.
- Si cambian los paquetes en `data/contenido.ts`, regenera el PDF con `npm run pdf:paquetes` (usa Google Chrome).
- La página `/aviso-de-privacidad/` sigue existiendo, pero ya no está enlazada en el pie (ahí va «Sitio por Ingeniatex»).

## Despliegue

El build es estático (`out/`), así que funciona en cualquier hosting de archivos.

**Cloudflare Pages:** comando de build `npm run build`, carpeta de salida `out`, variable `NEXT_PUBLIC_SITE_URL=https://tu-dominio`.

**Vercel:** importa el repositorio. Detecta Next.js y respeta `output: 'export'`.
