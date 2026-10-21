'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FileText, MessageSquareQuote, Play, SquareCheck, X } from 'lucide-react';
import { banquet } from '@/data/contenido';
import { site } from '@/data/site';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

function VideoModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label="Video de Salón Terraza" className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-4" onClick={onClose}>
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar video" className="absolute right-4 top-4 grid h-12 w-12 place-items-center text-white hover:text-primary">
        <X className="h-8 w-8" strokeWidth={1.5} />
      </button>
      <video src={banquet.video} poster="/img/video-poster.jpg" controls autoPlay playsInline className="aspect-video w-full max-w-5xl bg-black" onClick={e => e.stopPropagation()} />
    </div>
  );
}

/** 8. Banquete: foto a sangre izquierda con botón de video y caja dorada con frase. */
export default function Banquet() {
  const [open, setOpen] = useState(false);
  return (
    <section id="banquete" className="pb-[72px] lg:pb-[120px]">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,35%)_1fr] lg:gap-[7%]">
        <Reveal from="left" className="relative pb-[110px] lg:pb-[30px]">
          <div className="relative h-[420px] lg:h-[750px]">
            <Image src="/img/champagne.jpg" alt="Copas de champaña con serpentinas doradas y luces cálidas" fill sizes="(min-width: 992px) 35vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <button type="button" onClick={() => setOpen(true)} aria-label="Reproducir video del salón" className="group absolute left-1/2 top-1/3 grid h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white transition-colors hover:bg-white/15 lg:h-[150px] lg:w-[150px]">
              <span className="absolute inset-0 animate-ping rounded-full border border-white/40 [animation-duration:2.4s]" aria-hidden="true" />
              <Play className="h-8 w-8 fill-white text-white" />
            </button>
          </div>
          <div className="absolute bottom-0 left-5 right-5 flex items-center gap-4 bg-primary p-6 lg:left-[22%] lg:right-[-75px] lg:h-[190px] lg:gap-[26px] lg:px-10">
            <MessageSquareQuote className="h-10 w-10 flex-none text-dark lg:h-14 lg:w-14" strokeWidth={1.2} aria-hidden="true" />
            <p className="font-cond text-lg leading-normal text-white lg:text-[21px]">{banquet.quote}</p>
          </div>
        </Reveal>

        <div className="grid content-start gap-6 px-[15px] lg:max-w-[620px] lg:px-0 lg:pt-12">
          <SectionTitle eyebrow={banquet.eyebrow} title={banquet.title} />
          <Reveal className="grid gap-6">
            <p className="leading-[1.85]">{banquet.text}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-8">
              {banquet.columns.map(c => (
                <div key={c.title}>
                  <h3 className="mb-4 text-[19px] sm:text-[22px]">{c.title}</h3>
                  <ul className="grid gap-3">
                    {c.items.map(t => (
                      <li key={t} className="flex items-start gap-3 text-[14px] leading-snug sm:text-[15px]">
                        <SquareCheck className="mt-0.5 h-[17px] w-[17px] flex-none text-primary" strokeWidth={1.5} aria-hidden="true" />{t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <a href={site.docs.menu} target="_blank" rel="noopener noreferrer" className="btn btn-sm justify-self-start"><FileText className="h-4 w-4" aria-hidden="true" /> Ver menú completo (PDF)</a>
            <div className="mt-1 grid grid-cols-2 gap-[22px]">
              <div className="relative h-[140px] sm:h-[210px]"><Image src="/img/mesa.jpg" alt="Mesa con centro de flores" fill sizes="300px" className="object-cover object-[30%_50%]" /></div>
              <div className="relative h-[140px] sm:h-[210px]"><Image src="/img/brindis.jpg" alt="Brindis entre invitados" fill sizes="300px" className="object-cover" /></div>
            </div>
          </Reveal>
        </div>
      </div>
      {open && <VideoModal onClose={() => setOpen(false)} />}
    </section>
  );
}
