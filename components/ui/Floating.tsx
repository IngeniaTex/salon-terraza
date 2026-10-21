'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Botón flotante para volver arriba. WhatsApp vive en el encabezado. */
export default function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      href="#inicio"
      aria-label="Volver arriba"
      className={`fixed bottom-[calc(24px+env(safe-area-inset-bottom))] right-[23px] z-50 grid h-[46px] w-[46px] place-items-center bg-primary text-white transition-all duration-300 hover:bg-dark lg:right-[38px] ${show ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp className="h-5 w-5" />
    </a>
  );
}
