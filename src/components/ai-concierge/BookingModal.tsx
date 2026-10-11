'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SERVICES } from '@/data/services';
import { BARBERS, ANY_BARBER } from '@/data/barbers';
import { Service, Barber, TimeSlot, BookingSubmission, BookingRecord, ChatMessage } from '@/types';
import { getUpcomingDays, DayOption } from '@/lib/utils';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  User,
  Check,
  ArrowRight,
  ArrowLeft,
  Send,
  RefreshCw,
  Wine,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Scissors
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialBarberId?: string;
  initialMode?: 'guided' | 'chat';
}

type BookingStep = 'service' | 'barber' | 'date' | 'time' | 'details' | 'summary' | 'confirmed';

export function BookingModal({
  isOpen,
  onClose,
  initialServiceId,
  initialBarberId,
  initialMode = 'guided',
}: BookingModalProps) {
  // Mode: Guided Reservation vs Conversational AI Concierge
  const [activeTab, setActiveTab] = useState<'guided' | 'chat'>(initialMode);

  // Booking Flow State
  const [step, setStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<DayOption | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Form Details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [drinkPreference, setDrinkPreference] = useState('Single Malt Bourbon');
  const [notes, setNotes] = useState('');

  // Async States
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Good day. I am the Noir & Steel AI Concierge. How may I assist you with your grooming ritual or chair reservation today?',
      timestamp: 'Now',
      options: [
        { label: 'Explore Service Menu', action: 'ask_services' },
        { label: 'Consult on Haircut vs Fade', action: 'ask_haircut_advice' },
        { label: 'Meet the Master Barbers', action: 'view_barbers' },
        { label: 'Reserve an Appointment', action: 'start_booking' },
      ],
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Days list for date step
  const [days, setDays] = useState<DayOption[]>([]);

  useEffect(() => {
    setDays(getUpcomingDays(14));
  }, []);

  // Initialize or reset when props change
  useEffect(() => {
    if (initialServiceId) {
      const found = SERVICES.find((s) => s.id === initialServiceId);
      if (found) {
        setSelectedService(found);
        setStep('barber');
      }
    }

    if (initialBarberId) {
      const found = BARBERS.find((b) => b.id === initialBarberId);
      if (found) {
        setSelectedBarber(found);
        if (selectedService) {
          setStep('date');
        }
      }
    }

    if (initialMode) {
      setActiveTab(initialMode);
    }
  }, [initialServiceId, initialBarberId, initialMode, isOpen]);

  // Fetch slots whenever date or barber changes
  useEffect(() => {
    if (selectedDate && step === 'time') {
      const fetchSlots = async () => {
        setIsLoadingSlots(true);
        try {
          const res = await fetch(
            `/api/availability?date=${selectedDate.dateString}&barberId=${selectedBarber?.id || 'any'}`
          );
          const data = await res.json();
          if (data.success) {
            setAvailableSlots(data.slots);
          }
        } catch (e) {
          console.error('Failed to load slots', e);
        } finally {
          setIsLoadingSlots(false);
        }
      };

      fetchSlots();
    }
  }, [selectedDate, selectedBarber, step]);

  // Scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat' && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isAiTyping, activeTab]);

  // Handle Chat Submission
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsAiTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: chatMessages.slice(-6),
        }),
      });

      const data = await res.json();
      setIsAiTyping(false);

      if (data.reply) {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: data.options,
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (e) {
      setIsAiTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'I apologize, our concierge line experienced a momentary flicker. How may I assist you with reserving your appointment?',
          timestamp: 'Just now',
        },
      ]);
    }
  };

  // Quick Action Handler in Chat
  const handleQuickAction = (action: string, payload?: any) => {
    if (action === 'select_service') {
      const found = SERVICES.find((s) => s.id === payload);
      if (found) {
        setSelectedService(found);
        setActiveTab('guided');
        setStep('barber');
      }
    } else if (action === 'select_barber') {
      const found = payload === 'any' ? ANY_BARBER : BARBERS.find((b) => b.id === payload);
      if (found) {
        setSelectedBarber(found);
        setActiveTab('guided');
        setStep(selectedService ? 'date' : 'service');
      }
    } else if (action === 'book_direct') {
      const s = SERVICES.find((item) => item.id === payload.serviceId);
      const b = BARBERS.find((item) => item.id === payload.barberId);
      if (s) setSelectedService(s);
      if (b) setSelectedBarber(b);
      setActiveTab('guided');
      setStep('date');
    } else if (action === 'start_booking') {
      setActiveTab('guided');
      setStep('service');
    } else if (action === 'ask_services') {
      handleSendMessage('What services and treatments do you offer?');
    } else if (action === 'ask_haircut_advice') {
      handleSendMessage('What is the difference between your signature haircut and skin fade?');
    } else if (action === 'view_barbers') {
      handleSendMessage('Tell me about your master barbers and their specialties.');
    }
  };

  // Handle Final Booking Submission
  const handleConfirmReservation = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    if (!clientName.trim() || !clientEmail.trim()) {
      setSubmitError('Please enter your full name and a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const submission: BookingSubmission = {
      serviceId: selectedService.id,
      barberId: selectedBarber?.id || 'any',
      date: selectedDate.dateString,
      time: selectedTime,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim() || '+1 (212) 555-0100',
      drinkPreference,
      notes: notes.trim(),
    };

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (data.success && data.booking) {
        setConfirmedBooking(data.booking);
        setStep('confirmed');

        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#C5A880', '#F4F0EA', '#DFCCA8', '#8C867E'],
          });
        } catch (e) {
          // ignore in environments where canvas is restricted
        }
      } else {
        setSubmitError(data.error || 'Failed to complete reservation. Please try again.');
      }
    } catch (e) {
      setIsSubmitting(false);
      setSubmitError('A network error occurred while connecting to the booking registry.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Noir and Steel Booking Concierge"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-[2rem] bg-charcoal border border-ivory/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ivory/10 bg-obsidian/70">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-charcoal-elevated border border-bronze/30 flex items-center justify-center text-bronze">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg font-bold text-ivory">NOIR AI CONCIERGE</span>
                <span className="px-2 py-0.5 rounded-full bg-bronze/15 border border-bronze/30 text-[9px] font-mono text-bronze uppercase tracking-widest font-semibold">
                  Demonstration Mode
                </span>
              </div>
              <span className="text-[11px] text-stone font-mono">
                {activeTab === 'guided' ? 'Interactive Reservation Atelier' : 'Conversational Concierge'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Mode Switcher */}
            <div className="hidden sm:flex rounded-full bg-charcoal-elevated p-1 border border-ivory/10">
              <button
                onClick={() => setActiveTab('guided')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'guided'
                    ? 'bg-bronze text-obsidian font-semibold'
                    : 'text-stone hover:text-ivory'
                }`}
              >
                Guided Booking
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-bronze text-obsidian font-semibold'
                    : 'text-stone hover:text-ivory'
                }`}
              >
                AI Chat
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-ivory/10 hover:border-bronze text-ivory hover:text-bronze transition-colors"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex sm:hidden border-b border-ivory/10 bg-charcoal-elevated">
          <button
            onClick={() => setActiveTab('guided')}
            className={`flex-1 py-2 text-xs font-medium text-center ${
              activeTab === 'guided' ? 'border-b-2 border-bronze text-ivory font-semibold' : 'text-stone'
            }`}
          >
            Guided Booking
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 text-xs font-medium text-center ${
              activeTab === 'chat' ? 'border-b-2 border-bronze text-ivory font-semibold' : 'text-stone'
            }`}
          >
            AI Chat Concierge
          </button>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'guided' ? (
            /* GUIDED BOOKING TAB */
            <div className="space-y-6">
              {/* Step indicator breadcrumbs */}
              {step !== 'confirmed' && (
                <div className="flex items-center justify-between pb-4 border-b border-ivory/10 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="text-bronze font-bold">
                      STEP {step === 'service' ? '1' : step === 'barber' ? '2' : step === 'date' ? '3' : step === 'time' ? '4' : step === 'details' ? '5' : '6'}/6
                    </span>
                    <span className="text-stone">·</span>
                    <span className="text-ivory font-medium uppercase tracking-wider">
                      {step === 'service' && 'Select Your Service'}
                      {step === 'barber' && 'Choose Master Barber'}
                      {step === 'date' && 'Select Date'}
                      {step === 'time' && 'Select Chair Time'}
                      {step === 'details' && 'Guest Details'}
                      {step === 'summary' && 'Review Reservation'}
                    </span>
                  </div>

                  {step !== 'service' && (
                    <button
                      onClick={() => {
                        if (step === 'barber') setStep('service');
                        else if (step === 'date') setStep('barber');
                        else if (step === 'time') setStep('date');
                        else if (step === 'details') setStep('time');
                        else if (step === 'summary') setStep('details');
                      }}
                      className="inline-flex items-center text-stone hover:text-ivory text-xs"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                    </button>
                  )}
                </div>
              )}

              {/* STEP 1: SERVICE SELECTION */}
              {step === 'service' && (
                <div className="space-y-3">
                  <p className="text-xs text-stone font-light mb-4">
                    Please select a signature service or complete ritual from our bespoke menu:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setSelectedService(s);
                          setStep('barber');
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                          selectedService?.id === s.id
                            ? 'border-bronze bg-charcoal-elevated shadow-md'
                            : 'border-ivory/10 bg-charcoal/60 hover:border-ivory/30 hover:bg-charcoal'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-serif text-base font-bold text-ivory">{s.name}</h4>
                          <span className="font-serif text-lg font-bold text-bronze">${s.price}</span>
                        </div>
                        <p className="text-[11px] text-stone leading-relaxed mb-3">{s.description}</p>
                        <div className="flex items-center justify-between text-[11px] text-stone/80 font-mono">
                          <span>{s.durationMinutes} minutes</span>
                          <span className="text-bronze font-semibold">Select &rarr;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: BARBER SELECTION */}
              {step === 'barber' && (
                <div className="space-y-4">
                  <p className="text-xs text-stone font-light">
                    Select your preferred resident master barber or allow our atelier to assign the first available chair:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Any available barber option */}
                    <div
                      onClick={() => {
                        setSelectedBarber(ANY_BARBER);
                        setStep('date');
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center space-x-4 ${
                        selectedBarber?.id === 'any'
                          ? 'border-bronze bg-charcoal-elevated shadow-md'
                          : 'border-ivory/10 bg-charcoal/60 hover:border-ivory/30'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-charcoal border border-ivory/15 flex items-center justify-center shrink-0">
                        <Scissors className="w-6 h-6 text-bronze" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-bold text-ivory">Any Available Master</h4>
                        <p className="text-[11px] text-stone">First open chair best suited for your service</p>
                      </div>
                    </div>

                    {/* Specific Resident Barbers */}
                    {BARBERS.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          setSelectedBarber(b);
                          setStep('date');
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center space-x-4 ${
                          selectedBarber?.id === b.id
                            ? 'border-bronze bg-charcoal-elevated shadow-md'
                            : 'border-ivory/10 bg-charcoal/60 hover:border-ivory/30'
                        }`}
                      >
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-ivory/15 shrink-0 bg-charcoal">
                          <Image src={b.image} alt={b.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-serif text-base font-bold text-ivory">{b.name}</h4>
                          <span className="font-mono text-[10px] text-bronze uppercase tracking-wider block">
                            {b.role}
                          </span>
                          <span className="text-[11px] text-stone">{b.experienceYears} Years Experience</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: DATE SELECTION */}
              {step === 'date' && (
                <div className="space-y-4">
                  <p className="text-xs text-stone font-light">
                    Select a date for your session at 74 Mercer Street (Tuesdays through Sundays):
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {days.map((day) => (
                      <button
                        key={day.dateString}
                        disabled={day.isClosed}
                        onClick={() => {
                          setSelectedDate(day);
                          setStep('time');
                        }}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center transition-all ${
                          day.isClosed
                            ? 'border-ivory/5 bg-obsidian/40 opacity-40 cursor-not-allowed'
                            : selectedDate?.dateString === day.dateString
                            ? 'border-bronze bg-bronze text-obsidian font-bold shadow-md'
                            : 'border-ivory/10 bg-charcoal hover:border-bronze/40 hover:bg-charcoal-elevated text-ivory'
                        }`}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-wider block">
                          {day.dayOfWeek}
                        </span>
                        <span className="font-serif text-xl font-bold my-1">
                          {day.dayNumber}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-stone">
                          {day.isClosed ? 'Closed' : day.monthName}
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] font-mono text-stone pt-2">
                    * Mondays are strictly reserved for private client reservations and closed to standard booking.
                  </p>
                </div>
              )}

              {/* STEP 4: TIME SLOT SELECTION */}
              {step === 'time' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-stone font-light">
                      Available chair times for <span className="text-ivory font-medium">{selectedDate?.fullFormatted}</span> with{' '}
                      <span className="text-bronze font-medium">{selectedBarber?.name || 'Any Master'}</span>:
                    </p>
                    {isLoadingSlots && <RefreshCw className="w-4 h-4 text-bronze animate-spin" />}
                  </div>

                  {isLoadingSlots ? (
                    <div className="py-12 text-center text-xs text-stone font-mono">
                      Querying atelier chair availability...
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => {
                            setSelectedTime(slot.time);
                            setStep('details');
                          }}
                          className={`py-3 px-2 rounded-xl border text-xs font-mono transition-all ${
                            !slot.available
                              ? 'border-ivory/5 bg-obsidian/40 text-stone/40 line-through cursor-not-allowed'
                              : selectedTime === slot.time
                              ? 'border-bronze bg-bronze text-obsidian font-bold shadow-md'
                              : 'border-ivory/10 bg-charcoal hover:border-bronze/50 hover:bg-charcoal-elevated text-ivory'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 5: CLIENT DETAILS & BEVERAGE PREFERENCE */}
              {step === 'details' && (
                <div className="space-y-4">
                  <p className="text-xs text-stone font-light">
                    Please provide your contact details for confirmation. No credit card required in demonstration mode.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ivory mb-1">
                        Full Name <span className="text-bronze">*</span>
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Julian Vance"
                        className="w-full px-4 py-2.5 rounded-xl bg-charcoal-elevated border border-ivory/15 text-ivory text-xs placeholder:text-stone focus:border-bronze focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ivory mb-1">
                        Email Address <span className="text-bronze">*</span>
                      </label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. julian@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-charcoal-elevated border border-ivory/15 text-ivory text-xs placeholder:text-stone focus:border-bronze focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ivory mb-1">
                        Mobile Phone (For SMS Reminders)
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (212) 555-0198"
                        className="w-full px-4 py-2.5 rounded-xl bg-charcoal-elevated border border-ivory/15 text-ivory text-xs placeholder:text-stone focus:border-bronze focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ivory mb-1">
                        Complimentary Bar Selection
                      </label>
                      <select
                        value={drinkPreference}
                        onChange={(e) => setDrinkPreference(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-charcoal-elevated border border-ivory/15 text-ivory text-xs focus:border-bronze focus:outline-none"
                      >
                        <option value="Single Malt Bourbon">Single Malt Bourbon (On Hand-Carved Ice)</option>
                        <option value="Brooklyn Roasted Espresso">Brooklyn Double Espresso</option>
                        <option value="San Pellegrino Sparkling">San Pellegrino Sparkling Mineral Water</option>
                        <option value="Japanese Sencha Tea">Japanese Organic Sencha Green Tea</option>
                        <option value="No Refreshment">No Refreshment</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-ivory mb-1">
                        Styling Notes or Preferences (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Low drop fade, skin sensitivity around neckline, taper blend."
                        className="w-full px-4 py-2 rounded-xl bg-charcoal-elevated border border-ivory/15 text-ivory text-xs placeholder:text-stone focus:border-bronze focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setStep('summary')}
                      disabled={!clientName.trim() || !clientEmail.trim()}
                      className="px-8 py-3 rounded-full bg-bronze hover:bg-bronze-light text-obsidian text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue to Review &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: SUMMARY & CONFIRMATION */}
              {step === 'summary' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-charcoal-elevated border border-ivory/15 space-y-4">
                    <h3 className="font-serif text-lg font-bold text-ivory border-b border-ivory/10 pb-3 flex items-center justify-between">
                      <span>Appointment Summary</span>
                      <span className="font-mono text-xs text-bronze">74 Mercer St Atelier</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-stone block mb-0.5">Service:</span>
                        <span className="font-semibold text-ivory">{selectedService?.name}</span>
                        <span className="text-stone block">{selectedService?.durationMinutes} mins · ${selectedService?.price}</span>
                      </div>

                      <div>
                        <span className="text-stone block mb-0.5">Master Barber:</span>
                        <span className="font-semibold text-ivory">{selectedBarber?.name}</span>
                        <span className="text-stone block">{selectedBarber?.role}</span>
                      </div>

                      <div>
                        <span className="text-stone block mb-0.5">Date &amp; Time:</span>
                        <span className="font-semibold text-ivory">{selectedDate?.fullFormatted}</span>
                        <span className="text-stone block">{selectedTime}</span>
                      </div>

                      <div>
                        <span className="text-stone block mb-0.5">Guest &amp; Lounge Selection:</span>
                        <span className="font-semibold text-ivory">{clientName}</span>
                        <span className="text-stone block">{clientEmail} · {drinkPreference}</span>
                      </div>
                    </div>

                    {notes && (
                      <div className="text-xs pt-2 border-t border-ivory/5">
                        <span className="text-stone block mb-0.5">Special Requests:</span>
                        <p className="text-ivory italic">{notes}</p>
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Demonstration Disclaimer Note */}
                  <div className="p-3 rounded-xl bg-obsidian border border-bronze/20 text-[11px] font-mono text-stone space-y-1">
                    <div className="flex items-center space-x-1.5 text-bronze font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>DEMONSTRATION SYSTEM VERIFICATION</span>
                    </div>
                    <p>
                      Submitting registers this session in the local simulated booking backend. No actual fees or phone charges will be incurred.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setStep('details')}
                      className="text-xs text-stone hover:text-ivory underline"
                    >
                      Edit details
                    </button>

                    <button
                      onClick={handleConfirmReservation}
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-full bg-bronze hover:bg-bronze-light text-obsidian text-xs uppercase tracking-wider font-bold transition-all shadow-glow-bronze flex items-center space-x-2 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Securing Chair...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm &amp; Reserve Chair</span>
                          <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 7: CONFIRMED RESERVATION SCREEN */}
              {step === 'confirmed' && confirmedBooking && (
                <div className="text-center py-6 px-4 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-bronze/15 border border-bronze text-bronze flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-1">
                      Reservation Successfully Confirmed
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                      We Look Forward to Welcoming You
                    </h3>
                  </div>

                  {/* Confirmation Card */}
                  <div className="max-w-md mx-auto p-6 rounded-2xl bg-charcoal-elevated border border-ivory/15 text-left text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-ivory/10 pb-3">
                      <span className="text-stone">Booking Reference:</span>
                      <span className="font-mono text-sm font-bold text-bronze tracking-wider">
                        {confirmedBooking.bookingRef}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-stone">Guest:</span>
                      <span className="text-ivory font-semibold">{confirmedBooking.clientName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-stone">Service:</span>
                      <span className="text-ivory font-semibold">
                        {confirmedBooking.service.name} (${confirmedBooking.service.price})
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-stone">Master Barber:</span>
                      <span className="text-ivory font-semibold">{confirmedBooking.barber.name}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-stone">Scheduled:</span>
                      <span className="text-ivory font-semibold">
                        {confirmedBooking.date} at {confirmedBooking.time}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-stone">Lounge Refreshment:</span>
                      <span className="text-ivory">{confirmedBooking.drinkPreference}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone max-w-sm mx-auto font-light">
                    A confirmation email and SMS reminder have been simulated and logged in the studio registry. Please arrive 10 minutes prior to relax in the lounge.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={onClose}
                      className="px-8 py-3 rounded-full bg-bronze text-obsidian font-semibold text-xs uppercase tracking-wider"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* CONVERSATIONAL AI CONCIERGE CHAT TAB */
            <div className="flex flex-col h-[520px]">
              {/* Chat Messages Log */}
              <div
                ref={chatScrollRef}
                className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scroll-smooth"
              >
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-bronze text-obsidian font-medium rounded-tr-none'
                          : 'bg-charcoal-elevated border border-ivory/10 text-ivory rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] font-mono text-stone mt-1 px-1">
                      {msg.sender === 'user' ? 'You' : 'Noir AI Concierge'} · {msg.timestamp}
                    </span>

                    {/* Quick Reply Pills */}
                    {msg.options && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickAction(opt.action, opt.payload)}
                            className="px-3 py-1 rounded-full border border-bronze/30 bg-charcoal hover:bg-bronze hover:text-obsidian text-stone hover:text-obsidian text-[11px] font-medium transition-all"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isAiTyping && (
                  <div className="flex items-center space-x-2 text-stone text-xs font-mono p-2">
                    <div className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
                    <span>Noir AI Concierge is typing...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="pt-3 border-t border-ivory/10 flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about cuts, master barbers, SoHo hours, or chair availability..."
                  className="flex-1 px-4 py-3 rounded-full bg-charcoal-elevated border border-ivory/15 text-xs text-ivory placeholder:text-stone focus:border-bronze focus:outline-none"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="p-3 rounded-full bg-bronze hover:bg-bronze-light text-obsidian disabled:opacity-40 transition-colors"
                  aria-label="Send message to concierge"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
