'use client';

import React from 'react';
import Image from 'next/image';
import { BARBERS } from '@/data/barbers';
import { Award, ArrowRight } from 'lucide-react';

interface BarbersSectionProps {
  onSelectBarber: (barberId: string) => void;
}

export function BarbersSection({ onSelectBarber }: BarbersSectionProps) {
  return (
    <section id="barbers" className="relative py-28 md:py-36 bg-obsidian-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-ivory/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze block mb-3">
              Master Artisans
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight">
              The Resident Barbers
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm text-stone max-w-md font-light">
            Each chair is held by a dedicated craftsman with over a decade of mastery in classic shear work, modern zero fades, and straight-razor detailing.
          </p>
        </div>

        {/* 3 Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="flex flex-col rounded-[2rem] bg-charcoal/40 border border-ivory/10 p-2 sm:p-2.5 overflow-hidden group hover:border-bronze/40 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[calc(2rem-0.5rem)] mb-6 bg-charcoal">
                <Image
                  src={barber.image}
                  alt={`Master Barber ${barber.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Experience Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-obsidian/85 backdrop-blur-md border border-ivory/15 text-[11px] font-mono text-ivory">
                  <Award className="w-3.5 h-3.5 text-bronze" />
                  <span>{barber.experienceYears} Years Master Craft</span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bronze font-semibold block mb-1">
                    {barber.specialty}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-ivory mb-2">
                    {barber.name}
                  </h3>

                  <p className="text-xs text-stone leading-relaxed mb-6 font-light">
                    {barber.bio}
                  </p>
                </div>

                {/* Booking Button Preselected */}
                <button
                  onClick={() => onSelectBarber(barber.id)}
                  className="w-full py-3 px-4 rounded-full border border-ivory/15 bg-charcoal-elevated hover:bg-bronze hover:text-obsidian hover:border-bronze text-ivory text-xs uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center space-x-2 active:scale-[0.98]"
                >
                  <span>Book with {barber.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Note */}
        <p className="text-center font-mono text-[10px] text-stone tracking-widest mt-12 uppercase">
          Profiles and portraiture created for portfolio demonstration · All services performed by licensed specialists
        </p>
      </div>
    </section>
  );
}
