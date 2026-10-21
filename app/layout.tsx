import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed, Gilda_Display } from 'next/font/google';
import { site } from '@/data/site';
import './globals.css';

const title = Gilda_Display({ weight: '400', subsets: ['latin'], variable: '--font-title', display: 'swap' });
const body = Barlow({ weight: ['400', '500', '600'], subsets: ['latin'], variable: '--font-body', display: 'swap' });
const cond = Barlow_Condensed({ weight: ['400', '500', '600'], subsets: ['latin'], variable: '--font-cond', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Salón de eventos en Los Reyes La Paz`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ['salón de eventos Los Reyes La Paz', 'salón de fiestas', 'salón para XV años', 'salón para bodas', 'bautizos', 'graduaciones', 'Estado de México'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: site.name,
    title: `${site.name} · ${site.slogan}`,
    description: site.description,
    images: [{ url: '/img/og.jpg', width: 1200, height: 628, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', images: ['/img/og.jpg'] },
};

export const viewport: Viewport = { themeColor: '#1a1814', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: site.name,
  slogan: site.slogan,
  description: site.description,
  url: site.url,
  telephone: `+52${site.phone}`,
  email: site.email,
  image: `${site.url}/img/og.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street}, ${site.address.neighborhood}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: site.address.country,
  },
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${title.variable} ${body.variable} ${cond.variable}`}>
      <body>
        {/* Preloader breve con el candil; se desvanece solo por CSS, aunque falle el JavaScript. */}
        <div className="pointer-events-none fixed inset-0 z-[100] grid animate-preloader place-items-center bg-white" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/candil.png" alt="" width={120} height={49} className="animate-pulse" />
        </div>
        <a href="#inicio" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[101] focus:bg-white focus:px-4 focus:py-2">Saltar al contenido</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
