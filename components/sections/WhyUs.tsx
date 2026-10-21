'use client';

import { useState, type FormEvent } from 'react';
import { CalendarDays, ChevronDown, CircleCheck } from 'lucide-react';
import { whyUs } from '@/data/contenido';
import { eventTypes, guestRanges } from '@/data/site';
import { buildMessage, formatDate, openWhatsApp } from '@/lib/whatsapp';
import SectionTitle, { Ornament } from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icons';

/** 9. Por qué elegirnos + formulario «Reserva tu fecha» → WhatsApp. */
export default function WhyUs() {
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('nombre') || '').trim();
    const phone = String(f.get('whatsapp') || '').replace(/\D/g, '');
    if (!name || phone.length !== 10) {
      setError('Escribe tu nombre y un WhatsApp de 10 dígitos para poder contestarte.');
      return;
    }
    setError('');
    openWhatsApp(buildMessage(`Hola, Salón Terraza. Soy ${name} y quiero cotizar un evento.`, {
      'Evento': String(f.get('evento')),
      'Fecha': formatDate(String(f.get('fecha'))) || 'por definir',
      'Invitados': String(f.get('invitados') || '') || 'por definir',
      'Mi WhatsApp': phone,
    }));
    setSent(true);
  };

  return (
    <section className="pb-[90px] lg:pb-[140px] lg:pt-5" aria-label="Por qué elegirnos y cotización">
      <div className="container grid items-start gap-10 lg:grid-cols-2 lg:gap-[70px]">
        <div className="grid gap-[22px] lg:pt-8">
          <SectionTitle eyebrow="Por qué elegirnos" title={['Tu fiesta, sin', 'preocupaciones.']} className="mb-2.5" />
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.1} className="flex items-start gap-[18px] py-2.5 lg:gap-[26px]">
              <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-white shadow-soft lg:h-[84px] lg:w-[84px]">
                <Icon name={w.icon} className="h-[30px] w-[30px] text-primary lg:h-[38px] lg:w-[38px]" />
              </span>
              <div>
                <h3 className="mb-2.5 mt-1 text-xl lg:mt-2.5 lg:text-[23px]">{w.title}</h3>
                <p className="max-w-[380px] text-[15px] leading-[1.75]">{w.text}</p>
              </div>
            </Reveal>
          ))}
          <a href="#contacto" className="btn btn-dark mt-3 justify-self-start">Agenda una visita</a>
        </div>

        <Reveal from="right" className="relative">
          <span className="bg-dots absolute -bottom-10 -right-[15px] h-[260px] w-40 lg:-bottom-[110px] lg:-right-[70px] lg:h-[480px] lg:w-[300px]" aria-hidden="true" />
          <div id="cotizar" className="relative bg-beige px-6 py-[46px] lg:p-[70px]">
            <span className="tab-gold !left-6 lg:!left-[70px]" aria-hidden="true" />
            <span className="eyebrow">Cotiza tu evento <Ornament /></span>
            <h2 className="h2 mb-7 mt-2.5 lg:mb-10 lg:mt-3.5 lg:!text-[46px]">Reserva tu fecha</h2>
            <form onSubmit={submit} noValidate className="grid gap-3.5">
              <div className="relative">
                <label htmlFor="r-fecha" className="sr-only">Fecha del evento</label>
                <input id="r-fecha" name="fecha" type="date" className="field date-input relative pr-12 text-[#555]" onClick={e => e.currentTarget.showPicker?.()} />
                <CalendarDays className="pointer-events-none absolute right-[22px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary" aria-hidden="true" />
              </div>
              <div className="relative">
                <label htmlFor="r-evento" className="sr-only">Tipo de evento</label>
                <select id="r-evento" name="evento" className="field cursor-pointer appearance-none">{eventTypes.map(t => <option key={t}>{t}</option>)}</select>
                <ChevronDown className="pointer-events-none absolute right-[22px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary" aria-hidden="true" />
              </div>
              <div className="relative">
                <label htmlFor="r-invitados" className="sr-only">Número de invitados</label>
                <select id="r-invitados" name="invitados" defaultValue="" className="field cursor-pointer appearance-none invalid:text-[#888]" required>
                  <option value="" disabled>Número de invitados</option>
                  {guestRanges.map(g => <option key={g}>{g}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-[22px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary" aria-hidden="true" />
              </div>
              <label htmlFor="r-nombre" className="sr-only">Nombre</label>
              <input id="r-nombre" name="nombre" autoComplete="name" placeholder="Nombre" className="field" />
              <label htmlFor="r-wa" className="sr-only">WhatsApp</label>
              <input id="r-wa" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="WhatsApp (10 dígitos)" className="field" />
              {error && <p role="alert" className="text-sm text-primary-dark">{error}</p>}
              <button type="submit" className="btn btn-dark mt-1.5 h-[58px] w-full tracking-[.16em]">Consultar disponibilidad</button>
              {sent && (
                <p role="status" className="flex items-start gap-2 text-sm text-dark">
                  <CircleCheck className="mt-0.5 h-4 w-4 flex-none text-primary" />
                  Abrimos WhatsApp con tus datos. Envía el mensaje y te respondemos con disponibilidad y cotización.
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
