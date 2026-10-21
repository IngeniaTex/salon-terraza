import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import BookingBar from '@/components/sections/BookingBar';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Packages from '@/components/sections/Packages';
import Banquet from '@/components/sections/Banquet';
import WhyUs from '@/components/sections/WhyUs';
import Reviews from '@/components/sections/Reviews';
import Promo from '@/components/sections/Promo';
import Events from '@/components/sections/Events';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import Floating from '@/components/ui/Floating';
import { showReviews } from '@/data/contenido';

// El orden y la numeración siguen la maqueta aprobada (Propuesta-diseno/) y PROMPT-desarrollo-sitio.md.
export default function Home() {
  return (
    <>
      <Header />            {/* 1–2 */}
      <main>
        <Hero />            {/* 3 */}
        <BookingBar />      {/* 4 */}
        <About />           {/* 5 */}
        <Services />        {/* 6 */}
        <Packages />        {/* 7 */}
        <Banquet />         {/* 8 */}
        <WhyUs />           {/* 9 */}
        {showReviews && <Reviews />}  {/* 10: se oculta mientras las reseñas sean de ejemplo */}
        <Promo overlap={showReviews} /> {/* 11 */}
        <Events />          {/* 12 */}
        <Contact />         {/* 13 */}
      </main>
      <Footer />            {/* 14 */}
      <Floating />
    </>
  );
}
