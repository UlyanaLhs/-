import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0D0D0C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://noirandsteel.com'),
  title: 'NOIR & STEEL | Luxury Barbering & Grooming Atelier · SoHo, NYC',
  description:
    'Independent luxury barbering and men’s grooming atelier at 74 Mercer Street, SoHo. Precision scissor craft, traditional straight-razor hot lather shaves, and bespoke styling rituals.',
  keywords: [
    'luxury barbershop nyc',
    'soho barbershop',
    'noir and steel',
    'precision skin fade',
    'straight razor shave new york',
    'artisan beard sculpting',
    'mens grooming atelier',
  ],
  authors: [{ name: 'Noir & Steel Atelier' }],
  creator: 'Noir & Steel',
  publisher: 'Noir & Steel Independent Barbering',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'NOIR & STEEL · Precision Barbering & Grooming Atelier',
    description:
      'More Than a Haircut. A Statement. Precision grooming for those who understand that the details define everything. 74 Mercer St, SoHo.',
    url: 'https://noirandsteel.com',
    siteName: 'NOIR & STEEL',
    images: [
      {
        url: '/images/noir-hero.jpg',
        width: 1200,
        height: 675,
        alt: 'NOIR & STEEL Editorial Campaign',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOIR & STEEL · Luxury Barbershop SoHo',
    description: 'More Than a Haircut. A Statement. 74 Mercer Street, SoHo, NY.',
    images: ['/images/noir-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD schema for Local Business (clearly marked for portfolio demonstration)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    name: 'NOIR & STEEL',
    image: 'https://noirandsteel.com/images/noir-hero.jpg',
    telephone: '+1-212-555-0198',
    email: 'concierge@noirandsteel.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '74 Mercer Street',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10012',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7223,
      longitude: -74.0001,
    },
    url: 'https://noirandsteel.com',
    priceRange: '$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '11:00',
        closes: '18:00',
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable} font-sans bg-obsidian text-ivory antialiased selection:bg-bronze selection:text-obsidian min-h-[100dvh] flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
