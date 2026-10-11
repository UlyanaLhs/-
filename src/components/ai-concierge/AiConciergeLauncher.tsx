'use client';

import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';

interface AiConciergeLauncherProps {
  onOpenConcierge: () => void;
  onOpenBooking: () => void;
}

export function AiConciergeLauncher({ onOpenConcierge, onOpenBooking }: AiConciergeLauncherProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-3">
      {/* Floating Quick Book Button (Mobile & Desktop) */}
      <button
        onClick={onOpenBooking}
        className="hidden sm:inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-charcoal/90 border border-ivory/15 hover:border-bronze text-ivory text-xs font-semibold uppercase tracking-wider shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Quick Book Session"
      >
        <Calendar className="w-3.5 h-3.5 text-bronze" />
        <span>Book Chair</span>
      </button>

      {/* Floating AI Concierge Launcher Pill */}
      <button
        onClick={onOpenConcierge}
        className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-bronze hover:bg-bronze-light text-obsidian shadow-glow-bronze transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Open AI Booking Concierge"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-obsidian opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-obsidian"></span>
        </span>

        <Sparkles className="w-4 h-4 text-obsidian shrink-0" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-obsidian text-bronze px-1.5 py-0.5 rounded">
          AI
        </span>
        <span className="font-sans text-xs font-bold uppercase tracking-wider pr-1">
          Concierge
        </span>
      </button>
    </div>
  );
}
