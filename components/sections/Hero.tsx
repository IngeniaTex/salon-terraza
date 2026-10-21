'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { hero } from '@/data/contenido';
import { site } from '@/data/site';

/** 3. Portada con el video del logotipo de fondo (contenido/3.mp4). Sin movimiento, se queda el póster. */
export default function Hero() {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const anim = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const } };

  useEffect(() => {
    if (reduce) video.current?.pause();
  }, [reduce]);

  return (
    <section id="inicio" aria-label="Portada" className="relative h-[620px] overflow-hidden bg-black md:h-[760px] lg:h-screen lg:max-h-[1000px] lg:min-h-[760px]">
      <video
        ref={video}
        src={hero.video}
        poster={hero.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,3,.45),rgba(8,6,3,.32)_50%,rgba(8,6,3,.7))]" />
      <div className="relative z-10 grid h-full place-content-center justify-items-center gap-5 px-5 text-center lg:pt-36">
        <motion.p {...anim(0.15)} className="font-body text-[13px] uppercase tracking-[.08em] text-white md:text-[17px]">{hero.eyebrow}</motion.p>
        <motion.h1 {...anim(0.3)} className="h1 uppercase tracking-[.02em] !text-white">
          <span className="sr-only">{site.name} · </span>{hero.title}
        </motion.h1>
        <motion.p {...anim(0.42)} className="max-w-[560px] text-[15px] leading-relaxed text-white/85 md:text-lg">{hero.text}</motion.p>
        <motion.div {...anim(0.55)}><a href="#paquetes" className="btn mt-1">Ver paquetes</a></motion.div>
      </div>
    </section>
  );
}
