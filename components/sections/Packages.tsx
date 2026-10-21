'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, Clock, FileText, Wallet } from 'lucide-react';
import { packageNotes, packages } from '@/data/contenido';
import { site } from '@/data/site';
import { waLink } from '@/lib/whatsapp';
import SectionTitle from '@/components/ui/SectionTitle';
import CheckList from '@/components/ui/CheckList';
import Reveal from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/Icons';

const VISIBLE = 7;

function PackageCard({ p }: { p: (typeof packages)[number] }) {
  const [all, setAll] = useState(false);
  const hidden = p.items.length - VISIBLE;
  const items = all || hidden <= 0 ? p.items : p.items.slice(0, VISIBLE);
  const msg = `Hola, Salón Terraza. Quiero cotizar el ${p.name}${p.guests ? ` (${p.guests.toLowerCase()})` : ''}.`;
  return (
    <article className="flex h-full flex-col bg-beige">
      <div className="relative h-[200px] flex-none">
        <Image src={p.image} alt="" fill sizes="(min-width: 1200px) 300px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
        {p.extraHour && (
          <span className="absolute left-0 top-5 flex items-center gap-2 bg-primary px-4 py-2 font-cond text-[13px] uppercase tracking-[.1em] text-white">
            <Clock className="h-4 w-4" aria-hidden="true" /> 1 hora extra gratis
          </span>
        )}
      </div>
      <div className="relative flex flex-1 flex-col gap-4 px-[26px] pb-8 pt-10">
        <span className="tab-gold !left-[26px]" aria-hidden="true" />
        <div>
          {p.guests && <span className="font-cond text-sm uppercase tracking-[.14em] text-primary">{p.guests}</span>}
          <h3 className="mt-1 text-[26px]">{p.name}</h3>
        </div>
        <CheckList items={items} className="[&_li]:items-start [&_li]:text-[14.5px] [&_svg]:mt-[3px]" />
        {hidden > 0 && (
          <button type="button" onClick={() => setAll(v => !v)} aria-expanded={all} className="flex items-center gap-1.5 justify-self-start font-cond text-sm uppercase tracking-[.1em] text-primary hover:text-dark">
            {all ? 'Ver menos' : `Ver todo lo que incluye (+${hidden})`}
            <ChevronDown className={`h-4 w-4 transition-transform ${all ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        )}
        <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm mt-auto self-start">
          <WhatsAppIcon className="h-4 w-4" /> Cotizar
        </a>
      </div>
    </article>
  );
}

/** 7. Paquetes del material del cliente (contenido/PAQUETES PARA 100 PERSONAS BODA.docx). */
export default function Packages() {
  return (
    <section id="paquetes" className="py-[72px] lg:py-[120px]">
      <div className="container">
        <SectionTitle center eyebrow={packageNotes.validity} title={['Paquetes para cada', 'celebración']} className="mb-9 lg:mb-14" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 0.08} className="h-full">
              <PackageCard p={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 grid gap-6 border border-[#ece4d6] p-6 md:grid-cols-[1fr_auto] md:items-center lg:p-9">
          <div className="grid gap-3 text-[15px] leading-relaxed">
            <p className="flex gap-3"><Clock className="mt-1 h-[18px] w-[18px] flex-none text-primary" aria-hidden="true" />{packageNotes.extraHour}</p>
            <p className="flex gap-3"><Wallet className="mt-1 h-[18px] w-[18px] flex-none text-primary" aria-hidden="true" />{packageNotes.payment} {packageNotes.custom}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:flex-col">
            <a href={site.docs.paquetes} target="_blank" rel="noopener noreferrer" className="btn btn-sm"><FileText className="h-4 w-4" aria-hidden="true" /> Paquetes en PDF</a>
            <a href={site.docs.menu} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-sm"><FileText className="h-4 w-4" aria-hidden="true" /> Menú en PDF</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
