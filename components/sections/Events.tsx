import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { events } from '@/data/contenido';
import { waLink } from '@/lib/whatsapp';
import SectionTitle from '@/components/ui/SectionTitle';
import { Icon, WhatsAppIcon } from '@/components/ui/Icons';

function WaveLines() {
  const rows = Array.from({ length: 21 }, (_, i) => i * 16);
  return (
    <svg className="pointer-events-none absolute -left-[120px] top-[300px] hidden h-[520px] w-[700px] opacity-60 lg:block" viewBox="0 0 700 520" fill="none" stroke="#ece6dc" strokeWidth="1" aria-hidden="true">
      {rows.map(y => <path key={y} d={`M0 ${40 + y}c120-60 240 60 360 0s240-60 340 0`} />)}
    </svg>
  );
}

/** 12. Tipos de evento (adaptación de «Latest News»). Cada tarjeta abre WhatsApp para cotizar.
 *  Escritorio: cuadrícula de 3 × 2. Tableta: 2 columnas. Celular: fila que se desliza de lado. */
export default function Events() {
  return (
    <section id="eventos" className="relative overflow-hidden py-[72px] lg:py-[120px]">
      <WaveLines />
      <div className="container relative">
        <SectionTitle center eyebrow="Eventos" title={['¿Qué vas a', 'celebrar?']} className="mb-9 lg:mb-14" />
        <ul className="-mx-[15px] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[15px] pb-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {events.map(e => (
            <li key={e.title} className="w-[86%] flex-none snap-start md:w-auto">
              <article className="relative h-[380px]">
                <div className="relative h-[290px]">
                  <Image src={e.image} alt="" fill sizes="(min-width: 992px) 380px, (min-width: 768px) 50vw, 92vw" className="object-cover" style={{ objectPosition: e.position }} />
                </div>
                <span className="absolute right-7 top-0 grid h-[82px] min-w-[62px] place-content-center px-2.5 bg-primary text-center font-cond text-[13px] uppercase leading-tight tracking-[.08em] text-white">
                  {e.badge[0]}<b className="block font-body text-[22px] font-normal leading-tight">{e.badge[1]}</b>
                </span>
                <div className="absolute inset-x-6 top-[214px] bg-white shadow-card">
                  <div className="px-7 pb-[22px]">
                    <div className="-mt-6 mb-4 flex items-center gap-3.5">
                      <span className="grid h-12 w-12 place-items-center border-2 border-primary bg-beige"><Icon name={e.icon} className="h-[22px] w-[22px] text-primary" /></span>
                      <span className="mt-6 text-sm">Paquetes para 100 personas</span>
                    </div>
                    <h3 className="text-[22px] leading-[1.3] lg:text-[23px]">{e.title}</h3>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#eee] pl-7">
                    <span className="flex items-center gap-2 text-[13px]"><WhatsAppIcon className="h-[15px] w-[15px] text-primary" />WhatsApp</span>
                    <a href={waLink(`Hola, Salón Terraza. Quiero cotizar un evento de ${e.title}.`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-beige px-5 py-4 font-cond text-[13px] uppercase leading-none tracking-[.1em] text-dark transition-colors hover:bg-primary hover:text-white">
                      Cotizar <ArrowRight className="h-[15px] w-[15px]" />
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
