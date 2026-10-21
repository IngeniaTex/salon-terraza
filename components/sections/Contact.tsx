'use client';

import { useState, type FormEvent } from 'react';
import { Clock, Mail, Navigation, PhoneCall } from 'lucide-react';
import { site } from '@/data/site';
import { buildMessage, openWhatsApp } from '@/lib/whatsapp';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

const rows = [
  { Icon: PhoneCall, title: 'Llámanos', value: site.phoneDisplay, href: `tel:+52${site.phone}` },
  { Icon: Mail, title: 'Escríbenos', value: site.email, href: `mailto:${site.email}` },
  { Icon: Navigation, title: 'Visítanos', value: site.address.short, href: site.mapsUrl, external: true },
  { Icon: Clock, title: 'Atención y visitas', value: site.hours },
].filter(r => r.value);

/** 14. Contacto: formulario (→ WhatsApp) y datos del salón. */
export default function Contact() {
  const [msg, setMsg] = useState<{ type: 'error' | 'ok'; text: string } | null>(null);

  // TODO: cuando haya endpoint (por ejemplo un Worker de Cloudflare en /api/contacto), enviar también por correo.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!f.nombre?.trim() || !f.mensaje?.trim()) {
      setMsg({ type: 'error', text: 'Escribe tu nombre y tu mensaje para poder ayudarte.' });
      return;
    }
    openWhatsApp(buildMessage(`Hola, Salón Terraza. Soy ${f.nombre.trim()}.`, {
      'Asunto': f.asunto, 'Correo': f.correo, 'Teléfono': f.telefono, 'Mensaje': f.mensaje,
    }));
    setMsg({ type: 'ok', text: 'Abrimos WhatsApp con tu mensaje. Solo falta que lo envíes.' });
  };

  return (
    <section id="contacto" className="pb-20 pt-5 lg:pb-[130px] lg:pt-10">
      <div className="container grid gap-10 lg:grid-cols-2 lg:gap-x-[70px]">
        <div>
          <SectionTitle eyebrow="Escríbenos" title={['Estamos para', 'ayudarte']} className="mb-10" />
          <Reveal>
            <form onSubmit={submit} onReset={() => setMsg(null)} noValidate className="grid gap-4 sm:grid-cols-2">
              <label className="sr-only" htmlFor="c-nombre">Nombre</label>
              <input id="c-nombre" name="nombre" autoComplete="name" placeholder="Nombre" className="field-soft" />
              <label className="sr-only" htmlFor="c-correo">Correo</label>
              <input id="c-correo" name="correo" type="email" autoComplete="email" placeholder="Correo" className="field-soft" />
              <label className="sr-only" htmlFor="c-asunto">Asunto</label>
              <input id="c-asunto" name="asunto" placeholder="Asunto" className="field-soft" />
              <label className="sr-only" htmlFor="c-tel">Teléfono</label>
              <input id="c-tel" name="telefono" type="tel" inputMode="tel" autoComplete="tel" placeholder="Teléfono" className="field-soft" />
              <label className="sr-only" htmlFor="c-msg">Mensaje</label>
              <textarea id="c-msg" name="mensaje" placeholder="Mensaje" className="field-soft h-[136px] resize-y pt-[22px] sm:col-span-2" />
              {msg && <p role={msg.type === 'error' ? 'alert' : 'status'} className={`text-sm sm:col-span-2 ${msg.type === 'error' ? 'text-primary-dark' : 'text-dark'}`}>{msg.text}</p>}
              <div className="flex gap-2.5 sm:col-span-2">
                <button type="submit" className="btn btn-line btn-sm">Enviar mensaje</button>
                <button type="reset" className="btn btn-line btn-sm">Borrar</button>
              </div>
            </form>
          </Reveal>
        </div>

        <div className="grid content-start gap-[22px]">
          <SectionTitle eyebrow="¿Necesitas ayuda?" title="Contáctanos" />
          <Reveal className="grid gap-[22px]">
            <p className="mb-3.5 leading-[1.85]">Escríbenos por WhatsApp o llámanos. Podemos diseñar un paquete a la medida de su presupuesto.</p>
            {rows.map(({ Icon, title, value, href, external }) => {
              const body = (
                <>
                  <span className="grid h-16 w-16 flex-none place-items-center bg-peach transition-colors group-hover:bg-primary group-hover:text-white lg:h-[82px] lg:w-[82px]">
                    <Icon className="h-7 w-7" strokeWidth={1.3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="mb-2 block font-title text-[21px] text-dark">{title}</span>
                    <span className="text-[15px] text-[#555] lg:text-[17px]">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a key={title} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-[18px] text-dark lg:gap-[26px]">{body}</a>
              ) : (
                <div key={title} className="group flex items-center gap-[18px] text-dark lg:gap-[26px]">{body}</div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
