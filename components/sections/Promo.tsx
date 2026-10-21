import { promo } from '@/data/contenido';
import Reveal from '@/components/ui/Reveal';

function Waves({ className = '' }: { className?: string }) {
  const rows = Array.from({ length: 13 }, (_, i) => i * 12);
  return (
    <svg className={className} viewBox="0 0 520 180" fill="none" stroke="#e2d9c9" strokeWidth="1" aria-hidden="true" preserveAspectRatio="none">
      {rows.map(y => <path key={y} d={`M-20 ${20 + y}c80-30 160 30 240 0s160-30 320 10`} />)}
    </svg>
  );
}

/** 11. Banner de promoción. Con `overlap` se monta sobre la sección negra de Opiniones. */
export default function Promo({ overlap = false }: { overlap?: boolean }) {
  return (
    <section aria-label="Promoción" className={`relative z-10 ${overlap ? '-mt-20 lg:-mt-[90px]' : ''}`}>
      <Reveal className="container">
        <div className="relative flex flex-col items-start gap-5 overflow-hidden bg-beige px-[26px] py-[34px] md:flex-row md:items-center md:justify-between lg:h-[180px] lg:px-[100px] lg:py-0">
          <Waves className="absolute inset-y-0 left-0 h-full w-[520px] max-w-full opacity-60" />
          <div className="relative grid gap-3">
            <span className="text-[15px]">{promo.small}</span>
            <h2 className="text-[28px] lg:text-[40px]">{promo.title}</h2>
          </div>
          <a href="#cotizar" className="btn relative">{promo.cta}</a>
        </div>
      </Reveal>
    </section>
  );
}
