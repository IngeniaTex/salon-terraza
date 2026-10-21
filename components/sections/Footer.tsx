import Image from 'next/image';
import Link from 'next/link';
import { Crosshair, FileText, Mail, MapPin, Phone } from 'lucide-react';
import { footerLinks, site } from '@/data/site';
import { packages } from '@/data/contenido';
import Social from '@/components/ui/Social';

/** 15. Pie de página. Los enlaces usan "/#seccion" para funcionar también desde otras páginas. */
export default function Footer() {
  return (
    <footer className="bg-dark text-[#a9a397]">
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1fr_1fr] lg:gap-[50px] lg:pb-[70px] lg:pt-[90px]">
        <div>
          <Image src="/img/logo-oscuro.png" alt={site.name} width={600} height={452} className="mb-[22px] h-[92px] w-auto" />
          <p className="text-[15px] leading-[1.8]">Salón de eventos en Los Reyes La Paz. Bodas, XV años, bautizos, graduaciones y fiestas temáticas.</p>
          <Social variant="circle" className="mt-[26px]" />
        </div>
        <nav aria-label="Enlaces del pie">
          <h2 className="mb-[30px] text-[25px] !text-white">Enlaces</h2>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-3.5 text-[14.5px]">
            {footerLinks.map(l => (
              <li key={l.href}><Link href={`/${l.href}`} className="flex items-center gap-2.5 transition-colors hover:text-primary"><Crosshair className="h-3.5 w-3.5 text-[#cfc8bb]" aria-hidden="true" />{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-[30px] text-[25px] !text-white">Paquetes</h2>
          <ul className="grid gap-3.5 text-[14.5px]">
            {packages.map(p => (
              <li key={p.name}><Link href="/#paquetes" className="flex items-center gap-2.5 transition-colors hover:text-primary"><Crosshair className="h-3.5 w-3.5 text-[#cfc8bb]" aria-hidden="true" />{p.name}</Link></li>
            ))}
            {[{ label: 'Paquetes en PDF', href: site.docs.paquetes }, { label: 'Menú en PDF', href: site.docs.menu }].map(d => (
              <li key={d.href}><a href={d.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-primary transition-colors hover:text-white"><FileText className="h-3.5 w-3.5" aria-hidden="true" />{d.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-[30px] text-[25px] !text-white">Información</h2>
          <ul className="grid gap-4 text-[15px] leading-[1.6]">
            <li><a href={`tel:+52${site.phone}`} className="flex gap-3.5 hover:text-primary"><Phone className="mt-1 h-4 w-4 flex-none text-primary" aria-hidden="true" />{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex gap-3.5 hover:text-primary"><Mail className="mt-1 h-4 w-4 flex-none text-primary" aria-hidden="true" />{site.email}</a></li>
            <li><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3.5 hover:text-primary"><MapPin className="mt-1 h-4 w-4 flex-none text-primary" aria-hidden="true" />{site.address.full}</a></li>
          </ul>
        </div>
      </div>
      <div className="bg-[#141210] text-sm">
        <div className="container flex flex-col gap-2 py-[22px] text-center md:flex-row md:justify-between md:text-left">
          <span>© {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</span>
          <a href="https://ingeniatex.com" target="_blank" rel="noopener" className="hover:text-primary">Sitio por Ingeniatex</a>
        </div>
      </div>
    </footer>
  );
}
