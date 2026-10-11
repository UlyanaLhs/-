'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Instagram, Music, BookOpen } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian-deep border-t border-ivory/10 pt-20 pb-12 text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-ivory/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="#" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-ivory">
                NOIR <span className="text-bronze">&amp;</span> STEEL
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-stone mt-1">
                Precision · Character · Ritual
              </span>
            </Link>

            <p className="text-xs text-stone font-light max-w-sm leading-relaxed">
              Independent luxury barbering atelier in the heart of SoHo. Dedicated to the anatomical preservation of traditional men’s grooming craft.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-charcoal border border-ivory/10 font-mono text-[10px] text-bronze uppercase tracking-widest">
                Demonstration Portfolio Atelier
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-4">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-stone">
              <li>
                <a href="#services" className="hover:text-ivory transition-colors">
                  Services &amp; Pricing
                </a>
              </li>
              <li>
                <a href="#barbers" className="hover:text-ivory transition-colors">
                  Master Barbers
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-ivory transition-colors">
                  The Ritual Journey
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-ivory transition-colors">
                  Visual Lookbook
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-ivory transition-colors">
                  Studio Location
                </a>
              </li>
            </ul>
          </div>

          {/* Services Menu */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-4">
              Signature Menu
            </span>
            <ul className="space-y-2 text-xs text-stone">
              <li>Signature Haircut ($55)</li>
              <li>Master Skin Fade ($60)</li>
              <li>Artisan Beard Sculpting ($35)</li>
              <li>Haircut &amp; Beard Ritual ($80)</li>
              <li>The Executive Ritual ($100)</li>
              <li>Junior Gentleman ($35)</li>
            </ul>
          </div>

          {/* Studio Details */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-bronze block mb-4">
              Studio &amp; Hours
            </span>
            <p className="text-xs text-stone leading-relaxed">
              74 Mercer Street, SoHo
              <br />
              New York, NY 10012
            </p>
            <p className="text-xs font-mono text-stone pt-2">
              Tue–Fri: 10:00 – 20:00
              <br />
              Sat: 09:00 – 19:00
              <br />
              Sun: 11:00 – 18:00
            </p>
            <p className="text-xs font-mono text-bronze pt-1">
              +1 (212) 555-0198
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone">
          <div className="flex flex-wrap items-center gap-6">
            <span>&copy; {new Date().getFullYear()} NOIR &amp; STEEL. All rights reserved.</span>
            <span className="text-stone/50">·</span>
            <span>Crafted as a flagship portfolio project</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Social media placeholders */}
            <span className="text-stone/80 hover:text-bronze cursor-pointer transition-colors p-2" title="Atelier Instagram">
              <Instagram className="w-4 h-4" />
            </span>
            <span className="text-stone/80 hover:text-bronze cursor-pointer transition-colors p-2" title="Studio Spotify Session">
              <Music className="w-4 h-4" />
            </span>
            <span className="text-stone/80 hover:text-bronze cursor-pointer transition-colors p-2" title="Grooming Journal">
              <BookOpen className="w-4 h-4" />
            </span>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="ml-4 w-9 h-9 rounded-full bg-charcoal border border-ivory/10 hover:border-bronze text-ivory flex items-center justify-center transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
