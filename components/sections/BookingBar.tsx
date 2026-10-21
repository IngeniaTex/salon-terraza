'use client';

import { useState, type FormEvent } from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { eventTypes, guestRanges } from '@/data/site';
import { buildMessage, formatDate, openWhatsApp } from '@/lib/whatsapp';

const today = () => new Date().toISOString().slice(0, 10);

function Cell({ label, children, icon }: { label: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <label className="relative flex h-16 items-center justify-between border-b border-white/10 lg:h-14 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-10">
      <span className="grid min-w-0 flex-1 gap-1">
        <span className="font-cond text-base font-semibold uppercase leading-none tracking-[.04em] text-white">{label}</span>
        {children}
      </span>
      <span className="pointer-events-none text-primary">{icon}</span>
    </label>
  );
}

/** 4. Barra de consulta de fecha debajo de la portada → abre WhatsApp con los datos. */
export default function BookingBar() {
  const [date, setDate] = useState('');
  const [type, setType] = useState(eventTypes[0]);
  const [guests, setGuests] = useState(guestRanges[1]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    openWhatsApp(buildMessage('Hola, Salón Terraza. Quiero saber si tienen disponible esta fecha.', {
      'Fecha': formatDate(date) || 'por definir', 'Evento': type, 'Invitados': guests,
    }));
  };

  const control = 'w-full appearance-none bg-transparent text-[13px] text-[#9a948a] outline-none [color-scheme:dark]';
  return (
    <section aria-label="Consulta de fecha" className="bg-dark">
      <form onSubmit={submit} className="container grid py-5 lg:h-[100px] lg:grid-cols-[1fr_1fr_1fr_220px] lg:items-center lg:py-0">
        <Cell label="Fecha del evento" icon={<CalendarDays className="h-[18px] w-[18px]" />}>
          <input type="date" min={today()} value={date} onChange={e => setDate(e.target.value)} onClick={e => e.currentTarget.showPicker?.()} className={`date-input ${control}`} aria-label="Fecha del evento" />
        </Cell>
        <Cell label="Tipo de evento" icon={<ChevronDown className="h-[18px] w-[18px]" />}>
          <select value={type} onChange={e => setType(e.target.value)} className={`${control} cursor-pointer`} aria-label="Tipo de evento">
            {eventTypes.map(t => <option key={t} className="text-dark">{t}</option>)}
          </select>
        </Cell>
        <Cell label="Invitados" icon={<ChevronDown className="h-[18px] w-[18px]" />}>
          <select value={guests} onChange={e => setGuests(e.target.value)} className={`${control} cursor-pointer`} aria-label="Número de invitados">
            {guestRanges.map(g => <option key={g} className="text-dark">{g}</option>)}
          </select>
        </Cell>
        <button type="submit" className="btn mt-4 h-[52px] lg:ml-[30px] lg:mt-0">Consultar fecha</button>
      </form>
    </section>
  );
}
