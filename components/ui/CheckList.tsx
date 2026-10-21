import { CircleCheck } from 'lucide-react';

export default function CheckList({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`grid gap-[11px] ${className}`}>
      {items.map(t => (
        <li key={t} className="flex items-center gap-2.5 text-[15px] leading-snug">
          <CircleCheck className="h-[17px] w-[17px] flex-none fill-primary text-white" strokeWidth={2} aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}
