import { Fragment, type ReactNode } from 'react';
import Reveal from './Reveal';

export function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-[9px] w-[30px] flex-none ${className}`} viewBox="0 0 30 9" aria-hidden="true">
      <path d="M1 5c3-4 6-4 9 0s6 4 9 0 6-4 10 0" fill="none" stroke="#BD933A" strokeWidth="1.4" />
    </svg>
  );
}

type Props = {
  eyebrow: string;
  title: string | readonly string[];
  center?: boolean;
  light?: boolean;
  as?: 'h2' | 'h3';
  className?: string;
  children?: ReactNode;
};

/** Subtítulo con ornamento ondulado + título en Gilda Display. Los arreglos se parten en líneas. */
export default function SectionTitle({ eyebrow, title, center, light, as: Tag = 'h2', className = '', children }: Props) {
  const lines = typeof title === 'string' ? [title] : title;
  return (
    <Reveal className={`grid gap-3.5 ${center ? 'justify-items-center text-center' : ''} ${className}`}>
      <span className={`eyebrow ${light ? '!text-[#d9d4cb]' : ''}`}>
        {center && <Ornament />}
        {eyebrow}
        <Ornament />
      </span>
      <Tag className={`h2 ${light ? '!text-white' : ''}`}>
        {lines.map((l, i) => (
          <Fragment key={i}>
            {i > 0 && <br className="hidden sm:block" />}
            {i > 0 && ' '}
            {l}
          </Fragment>
        ))}
      </Tag>
      {children}
    </Reveal>
  );
}
