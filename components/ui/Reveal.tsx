'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: 'up' | 'left' | 'right';
};

/** Entrada suave al aparecer en pantalla (una sola vez). Sin animación si el usuario prefiere menos movimiento. */
export default function Reveal({ children, className, delay = 0, from = 'up' }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const offset = from === 'up' ? { y: 40 } : { x: from === 'left' ? -50 : 50 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
