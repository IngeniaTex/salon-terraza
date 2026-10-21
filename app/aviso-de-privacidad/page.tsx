import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: `Aviso de privacidad de ${site.name}.`,
  alternates: { canonical: '/aviso-de-privacidad/' },
};

// TODO: borrador basado en la LFPDPPP. Debe revisarlo el cliente (y de preferencia un asesor legal) antes de publicar:
// nombre o razón social del responsable, fecha de actualización y medios reales para ejercer derechos ARCO.
export default function AvisoPrivacidad() {
  return (
    <>
      <header className="border-b border-[#eee] bg-white">
        <div className="container flex h-[80px] items-center justify-between">
          <Link href="/" aria-label={`${site.name}, inicio`}><Image src="/img/logo-claro.png" alt={site.name} width={600} height={452} className="h-12 w-auto" /></Link>
          <Link href="/" className="btn btn-sm">Volver al inicio</Link>
        </div>
      </header>
      <main id="inicio" className="container max-w-[820px] py-16 lg:py-24">
        <h1 className="h2 mb-8">Aviso de privacidad</h1>
        <div className="grid gap-5 text-[16px] leading-[1.8] [&_h2]:mt-6 [&_h2]:text-2xl">
          <p>
            {site.name}, con domicilio en {site.address.full}, es responsable del uso y protección de tus datos personales,
            conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
          </p>
          <h2>Datos que recabamos</h2>
          <p>Nombre, teléfono o WhatsApp, correo electrónico y los detalles del evento que nos compartes (tipo de evento, fecha y número de invitados).</p>
          <h2>Para qué los usamos</h2>
          <p>Para responder tus solicitudes de información, enviarte cotizaciones, confirmar la disponibilidad de fechas y dar seguimiento a la contratación y realización de tu evento.</p>
          <h2>Transferencias</h2>
          <p>No compartimos tus datos con terceros, salvo con proveedores necesarios para realizar tu evento y en los casos que la ley lo permita o exija.</p>
          <h2>Derechos ARCO</h2>
          <p>
            Puedes solicitar el acceso, rectificación, cancelación u oposición al uso de tus datos, o revocar tu consentimiento, escribiendo a{' '}
            <a href={`mailto:${site.email}`} className="text-primary underline">{site.email}</a> o llamando al {site.phoneDisplay}.
          </p>
          <h2>Cambios a este aviso</h2>
          <p>Cualquier cambio se publicará en esta página.</p>
          <p className="text-sm text-[#888]">Última actualización: {/* TODO: fecha de publicación */}octubre de 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
