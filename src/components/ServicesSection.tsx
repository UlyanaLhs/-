'use client';

import React, { useState } from 'react';
import { SERVICES } from '@/data/services';
import { ServiceCategory } from '@/types';
import { Clock, Check, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const categories: { label: string; value: ServiceCategory | 'all' }[] = [
    { label: 'All Rituals', value: 'all' },
    { label: 'Haircraft', value: 'haircraft' },
    { label: 'Beard & Shave', value: 'beard' },
    { label: 'Complete Rituals', value: 'ritual' },
  ];

  return (
    <section id="services" className="relative py-28 md:py-36 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-ivory/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze block mb-3">
              Curated Menu &amp; Pricing
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight">
              The Services
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm text-stone max-w-md font-light">
            All appointments include personal consultation, hot towel wrap, organic botanical neck lather, and a complimentary glass from our private bar.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              role="tab"
              aria-selected={activeCategory === cat.value}
              className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat.value
                  ? 'bg-ivory text-obsidian font-semibold shadow-md'
                  : 'bg-charcoal/60 text-stone hover:text-ivory hover:bg-charcoal border border-ivory/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid (Double-bezel architectural layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`relative flex flex-col justify-between p-1.5 sm:p-2 rounded-[1.75rem] transition-all duration-300 group ${
                service.popular
                  ? 'bg-gradient-to-b from-bronze/30 via-ivory/5 to-transparent border border-bronze/30'
                  : 'bg-charcoal/30 border border-ivory/10 hover:border-ivory/20'
              }`}
            >
              {/* Inner card container */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 rounded-[calc(1.75rem-0.375rem)] bg-charcoal/90 backdrop-blur-md">
                <div>
                  {/* Top Bar: duration & popular tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1.5 text-xs text-stone font-mono">
                      <Clock className="w-3.5 h-3.5 text-bronze" />
                      <span>{service.durationMinutes} min</span>
                    </div>

                    {service.popular && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-bronze/15 border border-bronze/30 text-bronze text-[10px] font-mono tracking-widest uppercase font-semibold">
                        <Sparkles className="w-3 h-3 mr-1" /> Signature
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-bronze transition-colors">
                      {service.name}
                    </h3>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-ivory shrink-0">
                      ${service.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  {/* What is included */}
                  <div className="space-y-2 mb-8 border-t border-ivory/5 pt-4">
                    {service.includes.map((item, i) => (
                      <div key={i} className="flex items-start text-xs text-ivory/70 space-x-2">
                        <Check className="w-3.5 h-3.5 text-bronze shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Booking CTA */}
                <button
                  onClick={() => onSelectService(service.id)}
                  className={`w-full py-3.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-200 active:scale-[0.98] ${
                    service.popular
                      ? 'bg-bronze hover:bg-bronze-light text-obsidian shadow-sm'
                      : 'border border-ivory/15 bg-charcoal-elevated/50 hover:bg-charcoal-elevated hover:border-ivory/30 text-ivory'
                  }`}
                >
                  <span>Select &amp; Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
