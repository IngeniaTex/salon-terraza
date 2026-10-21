import type { Config } from 'tailwindcss';

// Tokens del sistema de diseño (ver PROMPT-desarrollo-sitio.md). Los mismos valores viven como variables CSS en app/globals.css.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: { sm: '576px', md: '768px', lg: '992px', xl: '1200px' },
    container: { center: true, padding: '15px', screens: { xl: '1230px' } },
    extend: {
      colors: {
        primary: { DEFAULT: '#BD933A', dark: '#9c7629' },
        beige: '#faf7f2',
        peach: '#f6ece0',
        dark: '#1a1814',
        ink: '#0c0b09',
        body: '#666666',
        field: '#F2F3F5',
      },
      fontFamily: {
        title: ['var(--font-title)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Arial', 'sans-serif'],
        cond: ['var(--font-cond)', 'Arial Narrow', 'sans-serif'],
      },
      backgroundImage: {
        gold: 'linear-gradient(90deg,#FFC97A,#C9962E 45%,#7E5418)',
      },
      boxShadow: {
        soft: '0 6px 24px rgba(0,0,0,.09)',
        card: '0 14px 40px rgba(0,0,0,.09)',
      },
      keyframes: {
        fadeOut: { to: { opacity: '0', visibility: 'hidden' } },
      },
      animation: {
        preloader: 'fadeOut .5s ease .9s forwards',
      },
    },
  },
  plugins: [],
};

export default config;
