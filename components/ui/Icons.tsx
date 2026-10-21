import {
  CakeSlice, Camera, Car, ClipboardCheck, Clock, Flower2, Gem, GraduationCap, LayoutGrid, Mic, Music, Sparkles, Sun, Users, UtensilsCrossed, Wallet,
  type LucideProps,
} from 'lucide-react';

const map = {
  sun: Sun,
  sparkles: Sparkles,
  gem: Gem,
  utensils: UtensilsCrossed,
  music: Music,
  flower: Flower2,
  cake: CakeSlice,
  users: Users,
  car: Car,
  clipboard: ClipboardCheck,
  grid: LayoutGrid,
  graduation: GraduationCap,
  clock: Clock,
  mic: Mic,
  camera: Camera,
  wallet: Wallet,
};

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C strokeWidth={1.3} aria-hidden="true" {...props} />;
}

/* Íconos de redes (Lucide ya no incluye logotipos de marcas). */
type SvgProps = { className?: string };

export function WhatsAppIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.03c-.24.68-1.42 1.3-1.96 1.35-.5.05-1.13.07-1.83-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2.01.89 2.16.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.58.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.1 1.69.8 1.98.94.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
    </svg>
  );
}

export function FacebookIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20 20 0 0 0 14.3 4.3c-2.24 0-3.8 1.37-3.8 3.9v2.3H8v3h2.5V21h3z" />
    </svg>
  );
}

export function InstagramIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M16.6 3c.32 2.1 1.6 3.63 3.9 3.85v2.62a6.9 6.9 0 0 1-3.84-1.18v6.06c0 3.3-2.4 5.65-5.6 5.65A5.4 5.4 0 0 1 5.5 14.6c0-3.2 2.62-5.6 6.2-5.3v2.75c-1.66-.3-3.3.7-3.3 2.5 0 1.48 1.15 2.6 2.6 2.6 1.6 0 2.73-1.1 2.73-3.05V3h2.87z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
    </svg>
  );
}
