'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import 'swiper/css';
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

/** 12. Tipos de evento (adaptación de «Latest News»). Cada tarjeta abre WhatsApp para cotizar. */
export default function Events() {
  return (
    <section id="eventos" className="relative overflow-hidden py-[72px] lg:py-[120px]">
      <WaveLines />
      <div className="container relative">
        <SectionTitle center eyebrow="Eventos" title={['¿Qué vas a', 'celebrar?']} className="mb-9 lg:mb-14" />
        <Swiper
          modules={[Pagination, A11y]}
          slidesPerView={1.08}
          spaceBetween={16}
          breakpoints={{ 768: { slidesPerView: 2, spaceBetween: 24 }, 992: { slidesPerView: 3, spaceBetween: 24 } }}
          pagination={{ el: '.events-pagination', clickable: true }}
          className="!pb-6"
        >
          {events.map(e => (
            <SwiperSlide key={e.title}>
              <article className="relative h-[520px] lg:h-[560px]">
                <div className="relative h-[430px] lg:h-[460px]">
                  <Image src={e.image} alt="" fill sizes="(min-width: 992px) 380px, (min-width: 768px) 50vw, 92vw" className="object-cover" style={{ objectPosition: e.position }} />
                </div>
                <span className="absolute right-7 top-0 grid h-[82px] w-[62px] place-content-center bg-primary text-center font-cond text-[13px] uppercase leading-tight tracking-[.08em] text-white">
                  {e.badge[0]}<b className="block font-body text-[22px] font-normal leading-tight">{e.badge[1]}</b>
                </span>
                <div className="absolute inset-x-6 top-[340px] bg-white shadow-card lg:top-[360px]">
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
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="events-pagination dots-pagination mt-6 [&_.swiper-pagination-bullet]:bg-[#d8d2c6]" />
      </div>
    </section>
  );
}
