import { NextRequest, NextResponse } from 'next/server';
import { bookingStore } from '@/lib/bookingStore';
import { BookingSubmission } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: BookingSubmission = await request.json();

    // Input sanitization & validation
    if (!body.clientName || body.clientName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide your full name for the salon reservation.' },
        { status: 400 }
      );
    }

    if (!body.clientEmail || !body.clientEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required to receive appointment details.' },
        { status: 400 }
      );
    }

    if (!body.serviceId || !body.date || !body.time) {
      return NextResponse.json(
        { success: false, error: 'Incomplete reservation parameters. Please pick service, date, and chair time.' },
        { status: 400 }
      );
    }

    const result = bookingStore.createBooking({
      ...body,
      clientName: body.clientName.trim(),
      clientEmail: body.clientEmail.trim().toLowerCase(),
      clientPhone: body.clientPhone ? body.clientPhone.trim() : '+1 (212) 555-0100',
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 409 });
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment successfully reserved in demonstration registry.',
      booking: result.booking,
      demoNotice: 'Demonstration Mode: This appointment has been confirmed in the local simulation registry. No real credit card or phone charges occurred.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Malformed reservation request.' },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');

  if (ref) {
    const booking = bookingStore.findByRef(ref);
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Reservation code not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, booking });
  }

  // List recent demonstration bookings
  return NextResponse.json({
    success: true,
    bookings: bookingStore.getAll().slice(0, 10),
  });
}
