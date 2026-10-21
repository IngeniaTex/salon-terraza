import Image from 'next/image';
import { about } from '@/data/contenido';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icons';
import CheckList from '@/components/ui/CheckList';

/** 5. El salón: texto + collage con overlaps. */
export default function About() {
  return (
    <section id="salon" className="py-[72px] lg:py-[120px]">
      <div className="container grid items-start gap-10 lg:grid-cols-2">
        <div className="grid gap-6 lg:pr-8">
          <SectionTitle eyebrow={about.eyebrow} title={about.title} />
          <Reveal className="grid gap-6">
            <p className="font-body text-lg font-semibold leading-[1.6] text-primary">{about.highlight}</p>
            <div className="grid grid-cols-2 gap-3 py-1 sm:gap-5">
              {about.features.map(f => (
                <div key={f.title[0]} className="flex items-center gap-2.5 sm:gap-[18px]">
                  <Icon name={f.icon} className="h-10 w-10 flex-none text-dark sm:h-[52px] sm:w-[52px]" />
                  <h3 className="text-lg leading-tight sm:text-2xl">{f.title[0]}<br />{f.title[1]}</h3>
                </div>
              ))}
            </div>
            <CheckList items={about.checklist} />
            <a href="#contacto" className="btn justify-self-start">Conócenos</a>
          </Reveal>
        </div>

        <Reveal from="right" className="relative h-[480px] sm:h-[620px] xl:h-[720px]">
          <span className="absolute right-[72%] top-0 h-40 w-[18px] bg-primary sm:right-[400px] sm:h-[250px] sm:w-[30px]" aria-hidden="true" />
          <div className="absolute right-0 top-0 h-[360px] w-[72%] sm:h-[480px] sm:w-[400px] xl:h-[560px]">
            <Image src="/img/brindis.jpg" alt="Invitados brindando con copas entre confeti dorado" fill sizes="(min-width: 576px) 400px, 72vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 h-[220px] w-[52%] sm:h-[300px] sm:w-[290px] xl:h-[330px]">
            <Image src="/img/xv.jpg" alt="Letras XV iluminadas en una mesa decorada" fill sizes="(min-width: 576px) 290px, 52vw" className="object-cover object-[60%_50%]" />
          </div>
          <div className="absolute bottom-0 right-0 grid h-[200px] w-[58%] place-content-center justify-items-center gap-3 bg-ink p-4 text-center sm:bottom-[100px] sm:left-[230px] sm:right-auto sm:h-[250px] sm:w-[260px] sm:p-6">
            <Icon name="gem" className="h-11 w-11 text-primary" />
            <h3 className="text-xl !text-white sm:text-2xl">{about.card.title}</h3>
            <p className="text-[13px] leading-relaxed text-[#bdb6aa] sm:text-sm">{about.card.text}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
