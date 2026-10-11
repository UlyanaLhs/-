'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GALLERY_ITEMS, GalleryItem } from '@/data/gallery';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export function GallerySection() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedItemIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % GALLERY_ITEMS.length);
    }
  }, [selectedItemIndex]);

  const handlePrev = useCallback(() => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex(
        (selectedItemIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
      );
    }
  }, [selectedItemIndex]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, handleCloseLightbox, handleNext, handlePrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedItemIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedItemIndex]);

  const activeItem = selectedItemIndex !== null ? GALLERY_ITEMS[selectedItemIndex] : null;

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-obsidian-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-ivory/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bronze block mb-3">
              Visual Archives
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight">
              The Lookbook
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm text-stone max-w-md font-light">
            An intimate glimpse into our atelier: precision blade work, custom Damascus steel, and the atmosphere of 74 Mercer Street.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item, index) => {
            // Asymmetrical span rules for editorial cadence
            const isLarge = index === 0 || index === 4;

            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className={`group relative overflow-hidden rounded-2xl bg-charcoal cursor-pointer border border-ivory/10 hover:border-bronze/40 transition-all duration-300 ${
                  isLarge ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-square'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={isLarge ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
                  className="object-cover filter brightness-90 contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-bronze block">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-base font-bold text-ivory">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-obsidian/80 border border-ivory/20 flex items-center justify-center text-ivory">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Interactive Lightbox Modal */}
      {activeItem && selectedItemIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-charcoal border border-ivory/15 text-ivory hover:text-bronze hover:border-bronze transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev & Next navigation controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-charcoal/80 border border-ivory/15 text-ivory hover:text-bronze transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-charcoal/80 border border-ivory/15 text-ivory hover:text-bronze transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <div className="relative w-full max-h-[75vh] h-[55vh] sm:h-[70vh] rounded-2xl overflow-hidden border border-ivory/10 shadow-2xl bg-black">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Captions and counter */}
            <div className="w-full flex items-center justify-between pt-4 px-2 text-xs">
              <div>
                <span className="font-mono text-bronze uppercase tracking-widest text-[10px] block">
                  {activeItem.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-ivory">
                  {activeItem.title}
                </h4>
                <p className="text-stone font-light text-xs mt-0.5 max-w-xl">
                  {activeItem.caption}
                </p>
              </div>

              <div className="font-mono text-stone text-xs tracking-widest shrink-0 pl-4">
                {selectedItemIndex + 1} / {GALLERY_ITEMS.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
