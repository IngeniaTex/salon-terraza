'use client';

import { Check, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import { reviews } from '@/data/contenido';
import SectionTitle from '@/components/ui/SectionTitle';

/** 10. Opiniones sobre fondo negro texturizado. */
export default function Reviews() {
  return (
    <section id="opiniones" className="bg-noise pb-[150px] pt-[72px] lg:pb-[210px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle center light eyebrow="Lo que dicen nuestros clientes" title="Opiniones" className="mb-9 lg:mb-14" />
        <Swiper
          modules={[Pagination, Autoplay, A11y]}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{ 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }}
          autoplay={{ delay: 7000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          pagination={{ el: '.reviews-pagination', clickable: true }}
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <article className="grid h-full justify-items-center gap-1.5 bg-white px-9 pb-[46px] pt-11 text-center">
                {r.ejemplo && <span className="mb-2 rounded-full bg-beige px-3 py-0.5 font-cond text-[11px] uppercase tracking-[.18em] text-primary-dark">Formato de ejemplo</span>}
                <div className="contents">
                  <h3 className="text-2xl">{r.name}</h3>
                  <span className="font-cond text-sm uppercase tracking-[.08em] text-primary">{r.event}</span>
                </div>
                <span className="relative mb-[26px] mt-[22px] grid h-24 w-24 place-items-center rounded-full bg-gold font-title text-[34px] text-white" aria-hidden="true">
                  {r.name.charAt(0)}
                  <span className="absolute -bottom-3.5 left-1/2 grid h-[30px] w-[30px] -translate-x-1/2 place-items-center rounded-full border-[3px] border-white bg-primary">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                </span>
                <blockquote className="max-w-[300px] text-[15.5px] leading-[1.75]">{r.text}</blockquote>
                <span className="mt-3 flex gap-1 text-[#f3b63a]" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" aria-hidden="true" />)}
                </span>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="reviews-pagination dots-pagination mt-10" />
      </div>
    </section>
  );
}
