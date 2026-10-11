'use client';

import React from 'react';
import { TESTIMONIALS } from '@/data/testimonials';

export function TestimonialsSection() {
  return (
    <section className="relative py-28 md:py-36 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-bronze block mb-3">
            Client Words
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight mb-3">
            Character Recognized
          </h2>
          <p className="text-xs text-stone font-mono tracking-wider uppercase">
            Demonstration accounts from regular patrons of the atelier
          </p>
        </div>

        {/* 3 Testimonials in Double-Bezel Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative p-2 rounded-[2rem] bg-charcoal/40 border border-ivory/10 hover:border-bronze/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7 rounded-[calc(2rem-0.5rem)] bg-charcoal/90 flex flex-col justify-between h-full">
                {/* Service Tag */}
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bronze font-semibold">
                    {t.service}
                  </span>
                  <span className="font-serif text-2xl text-ivory/20 leading-none">“</span>
                </div>

                {/* Quote (Clean, ≤3 lines) */}
                <blockquote className="font-serif text-base sm:text-lg text-ivory leading-relaxed mb-6 font-normal italic">
                  “{t.quote}”
                </blockquote>

                {/* Author Info */}
                <div className="pt-4 border-t border-ivory/10">
                  <div className="font-sans text-sm font-semibold text-ivory">
                    {t.author}
                  </div>
                  <div className="text-xs text-stone mt-0.5">
                    {t.role} · <span className="text-stone/80">{t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
