'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronDown, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-obsidian pt-24 pb-12">
      {/* Background Image Container with cinematic scrim */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/images/noir-hero.jpg"
          alt="NOIR & STEEL Editorial Grooming Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] md:object-center opacity-45 md:opacity-55 filter brightness-[0.88] contrast-[1.05]"
        />
        {/* Editorial Vignette & Multi-layer Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-transparent z-10 w-full md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/70 z-10" />
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none z-10" />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-ivory/10 bg-charcoal/80 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/90 font-medium">
              Independent Barbering · Est. 2020
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ivory leading-[1.08] mb-6">
            More Than a Haircut.{' '}
            <span className="block italic font-normal text-bronze-light font-serif">
              A Statement.
            </span>
          </h1>

          {/* Supporting Copy (under 20 words as mandated) */}
          <p className="text-base sm:text-lg text-ivory/80 font-light leading-relaxed max-w-xl mb-8">
            Precision grooming for those who understand that the details define everything. Master shears, straight-razor lines, and tailored sanctuary.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10">
            {/* Primary Booking Button */}
            <button
              onClick={onOpenBooking}
              className="group relative inline-flex items-center justify-between sm:justify-start pl-7 pr-2.5 py-3.5 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-glow-bronze active:scale-[0.98]"
            >
              <span className="sm:mr-4 font-bold">Book Your Session</span>
              <div className="w-8 h-8 rounded-full bg-obsidian text-bronze flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </button>

            {/* Secondary Services Explorer */}
            <a
              href="#services"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-ivory/15 bg-charcoal/40 hover:bg-charcoal hover:border-ivory/30 text-ivory text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 backdrop-blur-md"
            >
              Explore Our Services
            </a>
          </div>

          {/* Subtle Location & Hours Indicator */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 border-t border-ivory/10 text-xs text-stone font-mono tracking-wider">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-bronze" />
              <span>74 Mercer Street, SoHo, NY</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-bronze" />
              <span>Tue–Sun · 10:00–20:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <a
        href="#brand-statement"
        aria-label="Scroll down to brand philosophy"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center space-y-2 text-stone hover:text-bronze transition-colors opacity-70 hover:opacity-100"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
