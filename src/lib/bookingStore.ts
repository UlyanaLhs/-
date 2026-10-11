import { BookingRecord, BookingSubmission } from '@/types';
import { SERVICES } from '@/data/services';
import { BARBERS, ANY_BARBER } from '@/data/barbers';
import { generateBookingRef } from './utils';

// Persistent in-memory storage during server runtime
class BookingStore {
  private bookings: BookingRecord[] = [];

  constructor() {
    // Seed with a couple of simulated existing appointments
    this.bookings.push({
      id: 'seed-1',
      bookingRef: 'NS-71934',
      serviceId: 'signature-haircut',
      barberId: 'alex-morgan',
      date: new Date().toISOString().split('T')[0],
      time: '02:15 PM',
      clientName: 'Alexander Hayes',
      clientEmail: 'a.hayes@example.com',
      clientPhone: '+1 (212) 555-0144',
      drinkPreference: 'Single Malt Bourbon',
      notes: 'Prefers scissors over heavy clippers on crown.',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      status: 'confirmed',
      isSimulatedDemo: true,
      service: SERVICES[0],
      barber: BARBERS[0],
    });
  }

  public getAll(): BookingRecord[] {
    return [...this.bookings];
  }

  public findByRef(ref: string): BookingRecord | undefined {
    return this.bookings.find((b) => b.bookingRef.toLowerCase() === ref.toLowerCase());
  }

  public isSlotAvailable(date: string, time: string, barberId: string): boolean {
    if (barberId === 'any') return true;
    return !this.bookings.some(
      (b) => b.date === date && b.time === time && (b.barberId === barberId || b.barberId === 'any')
    );
  }

  public createBooking(data: BookingSubmission): { success: boolean; booking?: BookingRecord; error?: string } {
    // Basic validation
    if (!data.serviceId || !data.date || !data.time || !data.clientName || !data.clientEmail) {
      return { success: false, error: 'Missing mandatory reservation parameters.' };
    }

    const service = SERVICES.find((s) => s.id === data.serviceId);
    if (!service) {
      return { success: false, error: 'Requested service is not found in the atelier catalog.' };
    }

    let barber = BARBERS.find((b) => b.id === data.barberId);
    if (!barber) {
      barber = ANY_BARBER;
    }

    // Check conflict
    if (!this.isSlotAvailable(data.date, data.time, data.barberId)) {
      return {
        success: false,
        error: `This chair slot at ${data.time} on ${data.date} has just been reserved. Please select another time.`,
      };
    }

    const newRecord: BookingRecord = {
      ...data,
      id: `booking-${Date.now()}`,
      bookingRef: generateBookingRef(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      isSimulatedDemo: true, // Transparent demo indicator
      service,
      barber,
    };

    this.bookings.unshift(newRecord);
    return { success: true, booking: newRecord };
  }
}

// Global singleton across hot reloads in development
const globalForBookings = globalThis as unknown as {
  bookingStore: BookingStore | undefined;
};

export const bookingStore = globalForBookings.bookingStore ?? new BookingStore();

if (process.env.NODE_ENV !== 'production') {
  globalForBookings.bookingStore = bookingStore;
}
