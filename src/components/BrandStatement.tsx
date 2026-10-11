'use client';

import React from 'react';
import Image from 'next/image';
import { Scissors, Compass, ShieldCheck } from 'lucide-react';

export function BrandStatement() {
  const pillars = [
    {
      icon: Scissors,
      title: 'Anatomical Precision',
      desc: 'Cuts designed around your unique head morphology, hair grain, and personal lifestyle. Never a cookie-cutter stencil.',
    },
    {
      icon: Compass,
      title: 'Bespoke Consultation',
      desc: 'Every session begins with an unrushed dialog over single-origin espresso or private-stock bourbon to calibrate your aesthetic.',
    },
    {
      icon: ShieldCheck,
      title: 'Artisan Heritage',
      desc: 'Mastery of hand-honed Japanese steel shears, Japanese folding straight razors, and organic botanical skin formulations.',
    },
  ];

  return (
    <section id="brand-statement" className="relative py-28 md:py-36 bg-obsidian-deep overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-bronze/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetrical Typography & Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-tight leading-[1.1] mb-6">
              Your Standard.{' '}
              <span className="block font-serif italic font-normal text-bronze">
                Our Craft.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-stone font-light leading-relaxed mb-8">
              At NOIR &amp; STEEL, grooming is neither a transactional chore nor an assembly line. It is a quiet ritual of precision and character—conducted in an intimate, private setting where time slows down and master craftsmanship prevails.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-4 border-t border-ivory/10">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={pillar.title} className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 rounded-full border border-ivory/10 bg-charcoal flex items-center justify-center shrink-0 group-hover:border-bronze/40 group-hover:bg-charcoal-elevated transition-colors duration-200">
                      <IconComponent className="w-4 h-4 text-bronze" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-ivory mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-stone leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Original Editorial Photography with Double-Bezel Framing */}
          <div className="lg:col-span-6">
            <div className="relative p-2 sm:p-3 rounded-[2rem] bg-charcoal/40 border border-ivory/10 shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(2rem-0.75rem)] border border-ivory/5">
                <Image
                  src="/images/noir-interior.jpg"
                  alt="Noir and Steel Studio Interior SoHo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle bottom badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-obsidian/85 backdrop-blur-md border border-ivory/10 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-sm font-semibold text-ivory block">
                      The Mercer Sanctuary
                    </span>
                    <span className="font-mono text-[10px] text-stone tracking-wider uppercase">
                      Private Appointment Only · SoHo NYC
                    </span>
                  </div>
                  <span className="font-mono text-xs text-bronze font-bold">EST. 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
