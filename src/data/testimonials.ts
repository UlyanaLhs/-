export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  service: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'The level of precision Marcus brings to the straight razor and beard contour is simply unmatched. You leave feeling renewed.',
    author: 'Julian Vance',
    role: 'Creative Director',
    location: 'SoHo, Manhattan',
    service: 'Haircut & Beard Ritual',
  },
  {
    id: 't-2',
    quote: 'Noir & Steel feels more like an exclusive private salon in Mayfair than a typical barbershop. The craftsmanship speaks for itself.',
    author: 'Dr. Ethan Gallagher',
    role: 'Architectural Historian',
    location: 'West Village, NY',
    service: 'The Executive Ritual',
  },
  {
    id: 't-3',
    quote: 'Alex understood my facial architecture immediately. The fade transition was flawless, and the atmosphere was calm and refined.',
    author: 'Soren Lindqvist',
    role: 'Industrial Designer',
    location: 'Tribeca, NY',
    service: 'Signature Haircut',
  },
];
