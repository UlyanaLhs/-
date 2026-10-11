export type ServiceCategory = 'haircraft' | 'beard' | 'ritual';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  description: string;
  includes: string[];
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  image: string;
  availableServices: string[];
}

export interface TimeSlot {
  time: string; // e.g. "11:00 AM"
  available: boolean;
  barberId?: string;
}

export interface BookingSubmission {
  serviceId: string;
  barberId: string;
  date: string; // YYYY-MM-DD
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  drinkPreference?: string;
  notes?: string;
}

export interface BookingRecord extends BookingSubmission {
  id: string;
  bookingRef: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
  isSimulatedDemo: boolean;
  service: Service;
  barber: Barber;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  options?: {
    label: string;
    action: string;
    payload?: any;
  }[];
  step?: 'service' | 'barber' | 'date' | 'time' | 'details' | 'summary' | 'confirmed';
}
