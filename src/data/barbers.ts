import { Barber } from '@/types';

export const BARBERS: Barber[] = [
  {
    id: 'alex-morgan',
    name: 'Alex Morgan',
    role: 'Lead Stylist & Creative Director',
    experienceYears: 8,
    specialty: 'Precision Fades & Contemporary Cuts',
    bio: 'Trained in London and New York, Alex combines sharp architectural geometry with textured editorial aesthetics. Specializes in low-taper transitions and modern scissor work.',
    image: '/images/barber-alex.jpg',
    availableServices: ['signature-haircut', 'skin-fade', 'haircut-beard-ritual', 'junior-cut'],
  },
  {
    id: 'marcus-reed',
    name: 'Marcus Reed',
    role: 'Master Craftsman & Shave Specialist',
    experienceYears: 14,
    specialty: 'Classic Cuts & Artisan Beard Sculpting',
    bio: 'Fourteen years behind the vintage chair. Marcus is celebrated for traditional hot lather straight-razor artistry, beard sculpting geometry, and timeless heritage pompadours.',
    image: '/images/barber-marcus.jpg',
    availableServices: ['signature-haircut', 'beard-sculpting', 'haircut-beard-ritual', 'executive-grooming'],
  },
  {
    id: 'james-carter',
    name: 'James Carter',
    role: 'Executive Style Director',
    experienceYears: 11,
    specialty: 'Executive Grooming & Bespoke Styling',
    bio: 'Dedicated to luxury men’s grooming rituals. James curates complete transformations for leaders, creative directors, and high-profile events with customized hair & scalp therapies.',
    image: '/images/barber-james.jpg',
    availableServices: ['signature-haircut', 'skin-fade', 'haircut-beard-ritual', 'executive-grooming'],
  },
];

export const ANY_BARBER: Barber = {
  id: 'any',
  name: 'Any Available Master Barber',
  role: 'Studio Senior Team',
  experienceYears: 10,
  specialty: 'All Studio Specialties',
  bio: 'Allow our concierge to assign the first available master barber best suited for your selected service and requested schedule.',
  image: '/images/barber-craft.jpg',
  availableServices: ['signature-haircut', 'skin-fade', 'beard-sculpting', 'haircut-beard-ritual', 'executive-grooming', 'junior-cut'],
};
