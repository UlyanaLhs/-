'use client';

import React from 'react';
import Image from 'next/image';
import { GlassWater, Scissors, Flame, Sparkles } from 'lucide-react';

export function ExperienceSection() {
  const steps = [
    {
      num: '01',
      title: 'Consultation & Welcome',
      icon: GlassWater,
      description:
        'Step inside our SoHo sanctuary. Your session begins with a relaxed conversation over Brooklyn-roasted espresso or single malt scotch to analyze your head shape, hair density, and styling aspirations.',
    },
    {
      num: '02',
      title: 'Precision Craft',
      icon: Scissors,
      description:
        'Every cut is sculpted using hand-honed Japanese shears and surgical clipper zero-gapping. We map weight distribution and natural growth patterns for longevity between cuts.',
    },
    {
      num: '03',
      title: 'The Finishing Touches',
      icon: Flame,
      description:
        'A steaming herbal towel infused with organic eucalyptus and tea tree opens the pores. Warm lather and a traditional straight razor clean the neck and jawline with surgical crispness.',
    },
    {
      num: '04',
      title: 'The Final Result',
      icon: Sparkles,
      description:
        'Finished with tailored botanical styling paste, a relaxing scalp massage, and a 360-degree mirror review. You depart energized and composed for whatever follows.',
    },
  ];

  return (
    <section id="experience" className="relative py-28 md:py-36 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-bronze block mb-3">
            The Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight mb-4">
            The Grooming Ritual
          </h2>
          <p className="text-sm text-stone font-light leading-relaxed">
            Four deliberate stages designed to transform an everyday appointment into an elevated personal sanctuary.
          </p>
        </div>

        {/* 4-Step Narrative Grid with Photographic Interludes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Step 1 & 2 */}
          <div className="lg:col-span-4 space-y-8">
            {steps.slice(0, 2).map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl bg-charcoal/40 border border-ivory/10 hover:border-bronze/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-bronze/70">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center border border-ivory/10">
                      <Icon className="w-4 h-4 text-bronze" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ivory mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Centerpiece Photography with double-bezel framing */}
          <div className="lg:col-span-4">
            <div className="relative p-2 rounded-[2rem] bg-charcoal/50 border border-ivory/10 shadow-2xl">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[calc(2rem-0.5rem)]">
                <Image
                  src="/images/ritual-experience.jpg"
                  alt="Hot towel grooming ritual at Noir and Steel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-mono text-[10px] text-bronze uppercase tracking-widest block mb-1">
                    Signature Experience
                  </span>
                  <p className="font-serif text-base text-ivory font-semibold">
                    Steaming Herbal Towel &amp; Scalp Relief
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 & 4 */}
          <div className="lg:col-span-4 space-y-8">
            {steps.slice(2, 4).map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl bg-charcoal/40 border border-ivory/10 hover:border-bronze/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-bronze/70">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center border border-ivory/10">
                      <Icon className="w-4 h-4 text-bronze" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ivory mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
