'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onOpenBooking: (serviceId?: string, barberId?: string) => void;
  onOpenAiConcierge: () => void;
}

export function Navigation({ onOpenBooking, onOpenAiConcierge }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Master Barbers', href: '#barbers' },
    { label: 'The Ritual', href: '#experience' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Studio & Hours', href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-obsidian/90 backdrop-blur-xl border-b border-ivory/10 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Wordmark Logo */}
            <Link
              href="#"
              className="group flex flex-col items-start focus:outline-none"
              aria-label="Noir and Steel Home"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-ivory group-hover:text-bronze transition-colors duration-300">
                NOIR <span className="text-bronze font-normal">&amp;</span> STEEL
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-stone mt-0.5">
                Atelier · SoHo NYC
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.16em] font-medium text-ivory/80 hover:text-bronze transition-colors duration-200 relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-bronze transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* AI Concierge Trigger Pill */}
              <button
                onClick={onOpenAiConcierge}
                className="group flex items-center space-x-2 px-3.5 py-2 rounded-full border border-ivory/10 bg-charcoal/60 hover:bg-charcoal hover:border-bronze/40 text-ivory text-xs font-medium tracking-wide transition-all duration-200 shadow-sm"
                aria-label="Consult AI Concierge"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bronze opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-bronze"></span>
                </span>
                <span className="font-mono text-[10px] text-bronze uppercase tracking-widest font-semibold">AI</span>
                <span className="text-ivory/90 group-hover:text-ivory">Concierge</span>
              </button>

              {/* Primary Booking CTA (Button-in-button luxury style) */}
              <button
                onClick={() => onOpenBooking()}
                className="group relative inline-flex items-center pl-5 pr-2 py-1.5 rounded-full bg-bronze hover:bg-bronze-light text-obsidian font-semibold text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98] shadow-glow-bronze"
              >
                <span className="mr-3 font-medium tracking-widest">Book Session</span>
                <div className="w-7 h-7 rounded-full bg-obsidian text-bronze flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Mobile Menu Button & Quick Book */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => onOpenBooking()}
                className="px-3 py-1.5 rounded-full bg-bronze text-obsidian text-[11px] font-semibold uppercase tracking-wider"
              >
                Book
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-ivory hover:text-bronze focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze"
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:hidden animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
            <span className="font-serif text-xl font-bold tracking-[0.2em] text-ivory">
              NOIR <span className="text-bronze">&amp;</span> STEEL
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full border border-ivory/10 text-ivory hover:text-bronze"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 my-auto py-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl tracking-wide text-ivory hover:text-bronze transition-colors flex items-center justify-between"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-stone tracking-widest">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col space-y-3 pt-6 border-t border-ivory/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAiConcierge();
              }}
              className="w-full py-3.5 rounded-full border border-bronze/30 bg-charcoal text-ivory flex items-center justify-center space-x-2 text-xs uppercase tracking-widest font-medium"
            >
              <Sparkles className="w-4 h-4 text-bronze" />
              <span>Talk to AI Concierge</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-bronze text-obsidian text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Session</span>
            </button>

            <p className="text-center font-mono text-[10px] text-stone tracking-widest pt-2">
              74 MERCER STREET · SOHO · (212) 555-0198
            </p>
          </div>
        </div>
      )}
    </>
  );
}
