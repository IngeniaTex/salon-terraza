import { services } from '@/data/contenido';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icons';

function Skyline() {
  return (
    <svg className="pointer-events-none absolute -left-10 bottom-0 hidden h-[300px] w-[520px] opacity-50 md:block" viewBox="0 0 520 300" fill="none" stroke="#cfc6b6" strokeWidth="1" aria-hidden="true">
      <path d="M0 300V160l120-70 140 60v150M120 90v210M260 150l120-80 140 70v160M380 70v230M40 300V190h50v110M160 300V180h60v120M300 300V200h50v100M420 300V190h60v110" />
      <path d="M0 220h520M0 250h520M0 280h520" strokeDasharray="3 6" />
    </svg>
  );
}

/** 6. Servicios: tarjetas con lo que incluyen los paquetes y los servicios adicionales.
 *  Si la última tarjeta quedaría sola en su fila, ocupa todo el ancho. */
export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-beige py-[72px] lg:py-[120px]">
      <Skyline />
      <div className="container relative">
        <SectionTitle center eyebrow="Nuestros servicios" title="Todo para tu evento" className="mb-9 lg:mb-14" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.1} className={i === services.length - 1 ? `${services.length % 2 ? 'md:col-span-2' : ''} ${services.length % 3 === 1 ? 'lg:col-span-3' : ''}` : undefined}>
              <article className="group grid h-full gap-[18px] bg-white px-[26px] py-[30px] shadow-[inset_0_0_0_var(--color-primary)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_-3px_0_var(--color-primary)] lg:px-10 lg:py-11">
                <div className="flex items-center gap-[22px]">
                  <span className="relative h-14 w-14 flex-none">
                    <span className="absolute -bottom-2 -right-2 h-[30px] w-[30px] rounded-full bg-beige" aria-hidden="true" />
                    <Icon name={s.icon} className="relative h-[52px] w-[52px] text-primary" />
                  </span>
                  <h3 className="text-2xl">{s.title}</h3>
                </div>
                <p className="text-[15px] leading-[1.75]">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
