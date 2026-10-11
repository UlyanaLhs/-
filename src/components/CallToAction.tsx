'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CallToActionProps {
  onOpenBooking: () => void;
  onOpenAiConcierge: () => void;
}

export function CallToAction({ onOpenBooking, onOpenAiConcierge }: CallToActionProps) {
  return (
    <section className="relative py-28 md:py-36 bg-obsidian overflow-hidden">
      {/* Background imagery with dark scrim */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/images/noir-lounge.jpg"
          alt="Noir and Steel Private Lounge"
          fill
          sizes="100vw"
          className="object-cover opacity-25 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian z-10" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-ivory/10 bg-charcoal/80 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/80 font-medium">
            Strictly Private Appointments
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-tight mb-6">
          Your Next Best Cut Starts Here.
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-stone font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Reserve your chair. We’ll take care of the details. Select single malt scotch, hot botanical steam, and anatomical scissor precision await.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Booking Button */}
          <button
            onClick={onOpenBooking}
            className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start pl-8 pr-3 py-4 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-glow-bronze active:scale-[0.98]"
          >
            <span className="mr-4">Book Your Session</span>
            <div className="w-8 h-8 rounded-full bg-obsidian text-bronze flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>

          {/* Secondary AI Concierge Button */}
          <button
            onClick={onOpenAiConcierge}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border border-ivory/15 bg-charcoal/70 hover:bg-charcoal hover:border-bronze/40 text-ivory text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 backdrop-blur-md space-x-2"
          >
            <Sparkles className="w-4 h-4 text-bronze" />
            <span>Ask Our AI Concierge</span>
          </button>
        </div>
      </div>
    </section>
  );
}
