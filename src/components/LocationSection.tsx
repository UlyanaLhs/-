'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Compass, ExternalLink } from 'lucide-react';

export function LocationSection() {
  const schedule = [
    { day: 'Monday', hours: 'Private Sessions Only (By Inquiry)', highlight: false },
    { day: 'Tuesday – Friday', hours: '10:00 AM – 8:00 PM', highlight: true },
    { day: 'Saturday', hours: '9:00 AM – 7:00 PM', highlight: true },
    { day: 'Sunday', hours: '11:00 AM – 6:00 PM', highlight: true },
  ];

  return (
    <section id="location" className="relative py-28 md:py-36 bg-obsidian-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-ivory/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze block mb-3">
              Visit The Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight">
              Studio &amp; Hours
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm text-stone max-w-md font-light">
            Situated on cobblestone Mercer Street in SoHo. Accessible by Prince St (N/R/W) and Spring St (C/E/6) subway stations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            {/* Hours Block */}
            <div className="p-8 rounded-3xl bg-charcoal/40 border border-ivory/10">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-bronze mb-6">
                <Clock className="w-4 h-4" />
                <span>Operating Schedule</span>
              </div>

              <div className="space-y-4">
                {schedule.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-ivory/5 text-sm"
                  >
                    <span className="text-ivory font-medium mb-1 sm:mb-0">{slot.day}</span>
                    <span className={`font-mono text-xs ${slot.highlight ? 'text-bronze-light' : 'text-stone'}`}>
                      {slot.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Contact Block */}
            <div className="p-8 rounded-3xl bg-charcoal/40 border border-ivory/10">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-bronze mb-6">
                <Compass className="w-4 h-4" />
                <span>Concierge &amp; Inquiries</span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-bronze shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-ivory block">74 Mercer Street</span>
                    <span className="text-xs text-stone">SoHo, New York, NY 10012</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-bronze shrink-0" />
                  <a
                    href="tel:+12125550198"
                    className="text-ivory hover:text-bronze transition-colors text-xs font-mono"
                  >
                    +1 (212) 555-0198
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-bronze shrink-0" />
                  <a
                    href="mailto:concierge@noirandsteel.com"
                    className="text-ivory hover:text-bronze transition-colors text-xs font-mono"
                  >
                    concierge@noirandsteel.com
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-ivory/10">
                <a
                  href="https://maps.google.com/?q=74+Mercer+Street+New+York+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-ivory/15 bg-charcoal hover:bg-charcoal-elevated text-ivory text-xs uppercase tracking-wider font-semibold inline-flex items-center space-x-2 transition-colors"
                >
                  <span>Directions via Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-bronze" />
                </a>

                <a
                  href="tel:+12125550198"
                  className="px-5 py-2.5 rounded-full border border-ivory/10 hover:border-bronze/40 text-stone hover:text-ivory text-xs uppercase tracking-wider font-medium inline-flex items-center space-x-1.5 transition-colors"
                >
                  <span>Call Concierge</span>
                </a>
              </div>
            </div>
          </div>

          {/* Architectural Vector Map Column */}
          <div className="lg:col-span-6 min-h-[380px] rounded-3xl bg-charcoal border border-ivory/10 overflow-hidden relative p-6 flex flex-col justify-between">
            {/* Vector Stylized Map Background */}
            <div className="absolute inset-0 z-0">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 600 500"
                className="w-full h-full object-cover"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background block fills */}
                <rect width="600" height="500" fill="#141312" />
                
                {/* Blocks in SoHo grid */}
                <rect x="40" y="40" width="140" height="180" rx="8" fill="#1A1918" stroke="#252422" strokeWidth="2" />
                <rect x="220" y="40" width="140" height="180" rx="8" fill="#1A1918" stroke="#252422" strokeWidth="2" />
                <rect x="400" y="40" width="160" height="180" rx="8" fill="#1A1918" stroke="#252422" strokeWidth="2" />

                <rect x="40" y="260" width="140" height="200" rx="8" fill="#1A1918" stroke="#252422" strokeWidth="2" />
                <rect x="220" y="260" width="140" height="200" rx="8" fill="#1A1918" stroke="#252422" strokeWidth="2" />
                <rect x="400" y="260" width="160" height="200" rx="8" fill="#1A1918" stroke="#252422" strokeWidth="2" />

                {/* Street Lines */}
                {/* Mercer Street (Vertical North-South) */}
                <line x1="200" y1="0" x2="200" y2="500" stroke="#0D0D0C" strokeWidth="36" />
                <line x1="200" y1="0" x2="200" y2="500" stroke="#C5A880" strokeWidth="1.5" strokeDasharray="6 6" strokeOpacity="0.4" />

                {/* Broadway (Parallel) */}
                <line x1="380" y1="0" x2="380" y2="500" stroke="#0D0D0C" strokeWidth="32" />

                {/* Spring Street (Horizontal East-West) */}
                <line x1="0" y1="240" x2="600" y2="240" stroke="#0D0D0C" strokeWidth="40" />
                <line x1="0" y1="240" x2="600" y2="240" stroke="#C5A880" strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.3" />

                {/* Street Typography */}
                <text x="200" y="30" fill="#8C867E" fontSize="10" fontFamily="monospace" letterSpacing="0.2em" textAnchor="middle">
                  MERCER ST
                </text>
                <text x="380" y="30" fill="#8C867E" fontSize="10" fontFamily="monospace" letterSpacing="0.2em" textAnchor="middle">
                  BROADWAY
                </text>
                <text x="50" y="235" fill="#8C867E" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
                  SPRING STREET
                </text>
                <text x="50" y="480" fill="#8C867E" fontSize="10" fontFamily="monospace" letterSpacing="0.2em">
                  BROOME STREET
                </text>

                {/* Atelier Location Beacon Pin */}
                <g transform="translate(200, 160)">
                  {/* Pulsing beacon circles */}
                  <circle cx="0" cy="0" r="28" fill="#C5A880" fillOpacity="0.15" />
                  <circle cx="0" cy="0" r="16" fill="#C5A880" fillOpacity="0.35" />
                  <circle cx="0" cy="0" r="7" fill="#F4F0EA" stroke="#C5A880" strokeWidth="2" />
                </g>
              </svg>
            </div>

            {/* Map Header Card */}
            <div className="relative z-10 p-4 rounded-xl bg-obsidian/90 backdrop-blur-md border border-ivory/10 max-w-xs">
              <div className="flex items-center space-x-2 text-xs font-serif font-bold text-ivory mb-0.5">
                <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
                <span>NOIR &amp; STEEL ATELIER</span>
              </div>
              <p className="text-[11px] text-stone font-mono">
                74 Mercer St · Historic Cast Iron District
              </p>
            </div>

            {/* Map Footer Info */}
            <div className="relative z-10 p-3 rounded-lg bg-obsidian/85 backdrop-blur-md border border-ivory/5 text-[10px] font-mono text-stone tracking-wide self-start">
              Demonstration Studio Address · SoHo Manhattan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
