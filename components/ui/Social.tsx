import { site } from '@/data/site';
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from './Icons';

const items = [
  { href: site.social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: site.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: site.social.tiktok, label: 'TikTok', Icon: TikTokIcon },
  { href: site.social.youtube, label: 'YouTube', Icon: YouTubeIcon },
];

/** variant "plain": íconos sueltos (barra superior). "circle": círculos con contorno (pie y menú lateral). */
export default function Social({ variant = 'plain', className = '' }: { variant?: 'plain' | 'circle'; className?: string }) {
  return (
    <ul className={`flex items-center ${variant === 'circle' ? 'gap-2.5' : 'gap-4'} ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} en ${label}`}
            className={
              variant === 'circle'
                ? 'grid h-10 w-10 place-items-center rounded-full border border-[#6d675d] text-white transition-colors hover:border-primary hover:bg-primary'
                : 'text-white transition-colors hover:text-primary'
            }
          >
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
