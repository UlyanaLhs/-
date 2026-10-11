import { NextRequest, NextResponse } from 'next/server';
import { SERVICES } from '@/data/services';
import { BARBERS } from '@/data/barbers';

const SYSTEM_PROMPT = `You are NOIR AI Concierge, the personal digital host of NOIR & STEEL, a luxury independent barbershop situated at 74 Mercer Street, SoHo, New York.
Your voice is refined, courteous, articulate, and knowledgeable—like a head concierge at an exclusive private members club.

Brand Information:
- Address: 74 Mercer St, SoHo, New York, NY 10012. Phone: +1 (212) 555-0198.
- Hours: Tuesday–Friday 10:00–20:00, Saturday 09:00–19:00, Sunday 11:00–18:00. Monday: Private bespoke bookings only.
- Master Barbers:
  1. Alex Morgan (8 yrs): Precision Fades, contemporary scissor crops, low-taper transitions.
  2. Marcus Reed (14 yrs): Classic heritage cuts, straight-razor detailing, beard sculpting geometry.
  3. James Carter (11 yrs): Executive grooming rituals, facial acupressure, bespoke styling for executives.
- Services:
  - Signature Haircut: $55 (45 min)
  - Master Skin Fade: $60 (50 min)
  - Artisan Beard Sculpting: $35 (30 min)
  - Haircut & Beard Ritual: $80 (75 min, most popular)
  - The Executive Ritual: $100 (90 min, includes hot towel, scalp detox, clay mask)
  - Junior Gentleman: $35 (30 min, under 14)
- Studio Amenities: Complimentary single malt scotch, espresso, sparkling mineral water, hot botanical towels with eucalyptus.

Guidelines:
1. Always maintain a sophisticated, polite, helpful tone.
2. Keep responses concise (2-4 sentences maximum unless elaborating on a specific service).
3. If the user wants to book, guide them to click the service or chair button, or select their preferred date and time.
4. When relevant, suggest matching services or master barbers.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const trimmedMsg = message.trim().toLowerCase();
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Try Gemini API if key is present
    if (apiKey) {
      try {
        const contents = [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          ...conversationHistory.map((m: { sender: string; text: string }) => ({
            role: m.sender === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.text }],
          })),
          { role: 'user', parts: [{ text: message }] },
        ];

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            'I would be delighted to assist you with reserving your chair at Noir & Steel.';

          return NextResponse.json({
            reply: replyText,
            isModelDriven: true,
            mode: 'gemini-live-ai',
          });
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to deterministic concierge engine', err);
      }
    }

    // 2. Intelligent Deterministic Concierge Engine (Zero external dependencies, instant & reliable)
    let reply = '';
    let options: { label: string; action: string; payload?: any }[] | undefined = undefined;

    if (trimmedMsg.includes('service') || trimmedMsg.includes('price') || trimmedMsg.includes('cost') || trimmedMsg.includes('menu')) {
      reply =
        'Our menu offers tailored haircraft and grooming rituals. Our Signature Haircut is $55, Master Skin Fade is $60, Artisan Beard Sculpting is $35, and the complete Haircut & Beard Ritual is $80. Which service would you prefer to explore?';
      options = [
        { label: 'Signature Cut ($55)', action: 'select_service', payload: 'signature-haircut' },
        { label: 'Skin Fade ($60)', action: 'select_service', payload: 'skin-fade' },
        { label: 'Haircut & Beard ($80)', action: 'select_service', payload: 'haircut-beard-ritual' },
        { label: 'Executive Ritual ($100)', action: 'select_service', payload: 'executive-grooming' },
      ];
    } else if (trimmedMsg.includes('fade') || trimmedMsg.includes('skin fade')) {
      reply =
        'For precision fades, Lead Stylist Alex Morgan is renowned for seamless low, mid, and high skin transitions with foil finish and razor-sharp contouring ($60). Would you like to reserve a chair with Alex?';
      options = [
        { label: 'Book Skin Fade with Alex', action: 'book_direct', payload: { serviceId: 'skin-fade', barberId: 'alex-morgan' } },
        { label: 'Explore All Barbers', action: 'view_barbers' },
      ];
    } else if (trimmedMsg.includes('beard') || trimmedMsg.includes('shave') || trimmedMsg.includes('razor')) {
      reply =
        'Master Craftsman Marcus Reed specializes in traditional Japanese straight-razor detailing, hot lather therapy, and anatomical beard shaping ($35 for beard, or $80 for cut & beard ritual). Would you like to book Marcus?';
      options = [
        { label: 'Artisan Beard Sculpt ($35)', action: 'select_service', payload: 'beard-sculpting' },
        { label: 'Haircut & Beard Ritual ($80)', action: 'select_service', payload: 'haircut-beard-ritual' },
      ];
    } else if (trimmedMsg.includes('alex') || trimmedMsg.includes('marcus') || trimmedMsg.includes('james') || trimmedMsg.includes('barber') || trimmedMsg.includes('team')) {
      reply =
        'Noir & Steel is helmed by three master artisans: Alex Morgan (precision fades & modern styling), Marcus Reed (classic cuts & straight razor shaving), and James Carter (executive grooming & bespoke hair therapy). You may book directly with your preferred master.';
      options = [
        { label: 'Book with Alex', action: 'select_barber', payload: 'alex-morgan' },
        { label: 'Book with Marcus', action: 'select_barber', payload: 'marcus-reed' },
        { label: 'Book with James', action: 'select_barber', payload: 'james-carter' },
        { label: 'First Available Chair', action: 'select_barber', payload: 'any' },
      ];
    } else if (trimmedMsg.includes('hour') || trimmedMsg.includes('time') || trimmedMsg.includes('open') || trimmedMsg.includes('when')) {
      reply =
        'We welcome guests Tuesday through Friday from 10:00 AM to 8:00 PM, Saturday from 9:00 AM to 7:00 PM, and Sunday from 11:00 AM to 6:00 PM. Mondays are reserved exclusively for private client sessions.';
      options = [{ label: 'Book Next Available Chair', action: 'start_booking' }];
    } else if (trimmedMsg.includes('where') || trimmedMsg.includes('address') || trimmedMsg.includes('location') || trimmedMsg.includes('soho')) {
      reply =
        'We are located at 74 Mercer Street in SoHo, Manhattan (between Broome and Spring Streets). Valet assistance and nearby garage parking are available, along with private lounge check-in upon arrival.';
      options = [{ label: 'Reserve Appointment', action: 'start_booking' }];
    } else if (trimmedMsg.includes('drink') || trimmedMsg.includes('whiskey') || trimmedMsg.includes('coffee') || trimmedMsg.includes('beverage')) {
      reply =
        'Every appointment includes complimentary refreshments from our private bar: select single malt scotches, artisanal espresso roasted in Brooklyn, sparkling San Pellegrino, or herbal teas.';
      options = [{ label: 'Reserve a Session', action: 'start_booking' }];
    } else if (trimmedMsg.includes('book') || trimmedMsg.includes('appointment') || trimmedMsg.includes('reserve') || trimmedMsg.includes('chair') || trimmedMsg.includes('schedule')) {
      reply =
        'I will gladly assist you with your reservation. Please choose your desired grooming service below to view open dates and times.';
      options = [
        { label: 'Signature Haircut ($55)', action: 'select_service', payload: 'signature-haircut' },
        { label: 'Master Skin Fade ($60)', action: 'select_service', payload: 'skin-fade' },
        { label: 'Haircut & Beard Ritual ($80)', action: 'select_service', payload: 'haircut-beard-ritual' },
        { label: 'Executive Ritual ($100)', action: 'select_service', payload: 'executive-grooming' },
      ];
    } else {
      reply =
        'Welcome to Noir & Steel. As your digital concierge, I can guide you through our service menu, recommend a master barber based on your style, or check chair availability for this week.';
      options = [
        { label: 'Explore Services & Pricing', action: 'ask_services' },
        { label: 'Meet the Master Barbers', action: 'view_barbers' },
        { label: 'Reserve an Appointment', action: 'start_booking' },
      ];
    }

    return NextResponse.json({
      reply,
      options,
      isModelDriven: false,
      mode: 'concierge-expert-engine',
      notice: 'Operating in high-fidelity concierge mode with domain rules.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Concierge system error' }, { status: 500 });
  }
}
