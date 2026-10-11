import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/utils';
import { bookingStore } from '@/lib/bookingStore';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const barberId = searchParams.get('barberId') || 'any';

  // Base slots
  const slots = getAvailableSlots(date, barberId);

  // Filter against booked appointments in store
  const liveSlots = slots.map((slot) => {
    const isBookedInStore = !bookingStore.isSlotAvailable(date, slot.time, barberId);
    return {
      ...slot,
      available: slot.available && !isBookedInStore,
    };
  });

  return NextResponse.json({
    success: true,
    date,
    barberId,
    slots: liveSlots,
    demoMode: true,
  });
}
