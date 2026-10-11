export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: 'landscape' | 'portrait' | 'square';
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Modern Silhouette',
    category: 'Campaign',
    image: '/images/noir-hero.jpg',
    aspect: 'landscape',
    caption: 'Editorial portrait showcasing sharp taper transitions and contemporary styling.',
  },
  {
    id: 'g-2',
    title: 'Artisan Shear Craft',
    category: 'Craftsmanship',
    image: '/images/barber-craft.jpg',
    aspect: 'portrait',
    caption: 'Master shears honed to surgical tolerances for featherweight texture.',
  },
  {
    id: 'g-3',
    title: 'The SoHo Sanctuary',
    category: 'Interior',
    image: '/images/noir-interior.jpg',
    aspect: 'landscape',
    caption: 'Fluted walnut paneling, honed black granite, and warm architectural perimeter light.',
  },
  {
    id: 'g-4',
    title: 'Straight Razor Precision',
    category: 'The Ritual',
    image: '/images/beard-grooming.jpg',
    aspect: 'portrait',
    caption: 'Single-bevel traditional razor sculpting along cheek and jaw contours.',
  },
  {
    id: 'g-5',
    title: 'Damascus & Sandalwood',
    category: 'Still Life',
    image: '/images/grooming-tools.jpg',
    aspect: 'landscape',
    caption: 'Japanese steel blades, custom bone combs, and botanical shaving preparations.',
  },
  {
    id: 'g-6',
    title: 'The Client Finish',
    category: 'Portfolio',
    image: '/images/signature-haircut.jpg',
    aspect: 'portrait',
    caption: 'A tailored textured crop and low fade harmonized with natural bone structure.',
  },
  {
    id: 'g-7',
    title: 'Steaming Herbal Wrap',
    category: 'The Ritual',
    image: '/images/ritual-experience.jpg',
    aspect: 'portrait',
    caption: 'Eucalyptus and tea tree hot towel treatment to prepare skin and soothe senses.',
  },
  {
    id: 'g-8',
    title: 'Lounge & Reception',
    category: 'Atmosphere',
    image: '/images/noir-lounge.jpg',
    aspect: 'landscape',
    caption: 'Single malt selections, private appointments registry, and bespoke hospitality.',
  },
];
