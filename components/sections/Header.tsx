'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { nav, site } from '@/data/site';
import { waLink } from '@/lib/whatsapp';
import Social from '@/components/ui/Social';
import { WhatsAppIcon } from '@/components/ui/Icons';

const waHref = waLink('Hola, quiero informes de Salón Terraza.');

function useActiveSection() {
  const [active, setActive] = useState('#inicio');
  useEffect(() => {
    const ids = nav.map(n => n.href.slice(1));
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function NavLinks({ active, onClick, className = '' }: { active: string; onClick?: () => void; className?: string }) {
  return (
    <ul className={className}>
      {nav.map(n => (
        <li key={n.href}>
          <a
            href={n.href}
            onClick={onClick}
            aria-current={active === n.href ? 'true' : undefined}
            className={`font-cond text-base font-medium uppercase tracking-[.12em] transition-colors hover:text-primary xl:text-lg ${active === n.href ? 'text-primary' : 'text-dark'}`}
          >
            {n.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#inicio" className={`block flex-none ${className}`} aria-label={`${site.name}, ir al inicio`}>
      <Image src="/img/logo-claro.png" alt={`${site.name} · ${site.slogan}`} width={600} height={452} priority className="h-full w-auto" />
    </a>
  );
}

/** Botón de WhatsApp: con texto desde tableta, solo ícono en celular. */
function WhatsAppButton({ tabIndex }: { tabIndex?: number }) {
  return (
    <a href={waHref} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex} aria-label="Escríbenos por WhatsApp" className="btn btn-sm !px-0 h-11 w-11 rounded-full !bg-[#25d366] hover:!bg-[#1da851] md:h-auto md:w-auto md:!px-6">
      <WhatsAppIcon className="h-6 w-6 md:h-5 md:w-5" />
      <span className="hidden md:inline">WhatsApp</span>
    </a>
  );
}

export default function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  // Escritorio: el menú se muestra completo. La hamburguesa solo existe en celular y tableta.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      {/* 1. Barra superior a todo el ancho (solo escritorio) */}
      <div className="hidden bg-ink text-sm text-[#cfcac0] lg:block">
        <div className="flex h-12 items-center justify-between px-8 xl:px-12">
          <p className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-primary" strokeWidth={1.6} />{site.address.short}</p>
          <div className="flex items-center gap-6">
            <a href={`tel:+52${site.phone}`} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 text-primary" strokeWidth={1.6} />{site.phoneDisplay}</a>
            <span className="flex items-center gap-4">Síguenos: <Social /></span>
          </div>
        </div>
      </div>

      {/* 2. Menú a todo el ancho: sobre la portada en escritorio; barra blanca fija en celular */}
      <header className="sticky top-0 z-40 bg-white shadow-sm lg:absolute lg:inset-x-0 lg:top-12 lg:shadow-none">
        <div className="flex h-[76px] items-center justify-between gap-6 px-[15px] sm:px-6 lg:h-[104px] lg:px-8 xl:px-12">
          <Logo className="h-14 lg:h-20" />
          <nav aria-label="Principal" className="hidden lg:block"><NavLinks active={active} className="flex gap-6 xl:gap-10" /></nav>
          <div className="flex items-center gap-3">
            <WhatsAppButton />
            <button type="button" onClick={() => setOpen(true)} aria-label="Abrir menú" aria-expanded={open} aria-controls="menu-lateral" className="grid h-11 w-11 place-items-center text-dark transition-colors hover:text-primary lg:hidden">
              <Menu className="h-8 w-8" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú fijo al bajar (escritorio) */}
      <div className={`fixed inset-x-0 top-0 z-50 hidden bg-white shadow-[0_6px_24px_rgba(0,0,0,.08)] transition-transform duration-500 lg:block ${stuck ? 'translate-y-0' : '-translate-y-full'}`} aria-hidden={!stuck}>
        <div className="flex h-[84px] items-center justify-between gap-6 px-8 xl:px-12">
          <Logo className="h-16" />
          <nav aria-label="Principal fija"><NavLinks active={active} className="flex gap-6 xl:gap-10" /></nav>
          <WhatsAppButton tabIndex={stuck ? 0 : -1} />
        </div>
      </div>

      {/* Menú lateral (celular y tableta) */}
      <div className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside
        id="menu-lateral"
        aria-label="Menú"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 right-0 z-[61] flex w-[min(360px,88vw)] flex-col gap-8 overflow-y-auto bg-dark px-8 py-8 text-[#cfc8bb] transition-transform duration-500 lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-start justify-between">
          <Image src="/img/logo-oscuro.png" alt={site.name} width={600} height={452} className="h-20 w-auto" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú" className="grid h-10 w-10 place-items-center text-white hover:text-primary">
            <X className="h-7 w-7" strokeWidth={1.6} />
          </button>
        </div>
        <nav aria-label="Menú lateral">
          <ul className="grid">
            {nav.map(n => (
              <li key={n.href} className="border-b border-white/10">
                <a href={n.href} onClick={() => setOpen(false)} className={`block py-3.5 font-cond text-[17px] uppercase tracking-[.14em] hover:text-primary ${active === n.href ? 'text-primary' : 'text-white'}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn rounded-full !bg-[#25d366] hover:!bg-[#1da851]">
          <WhatsAppIcon className="h-5 w-5" /> Escríbenos por WhatsApp
        </a>
        <div className="grid gap-5 text-[15px]">
          <a href={`tel:+52${site.phone}`} className="flex gap-3 hover:text-white"><Phone className="mt-1 h-4 w-4 text-primary" /><span><small className="block font-cond text-xs uppercase tracking-[.16em] text-white/60">Llámanos</small>{site.phoneDisplay}</span></a>
          <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-white"><Mail className="mt-1 h-4 w-4 text-primary" /><span><small className="block font-cond text-xs uppercase tracking-[.16em] text-white/60">Escríbenos</small>{site.email}</span></a>
        </div>
        <Social variant="circle" className="mt-auto" />
      </aside>
    </>
  );
}
