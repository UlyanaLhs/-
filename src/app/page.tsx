'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { BrandStatement } from '@/components/BrandStatement';
import { ServicesSection } from '@/components/ServicesSection';
import { BarbersSection } from '@/components/BarbersSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { GallerySection } from '@/components/GallerySection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { LocationSection } from '@/components/LocationSection';
import { CallToAction } from '@/components/CallToAction';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/ai-concierge/BookingModal';
import { AiConciergeLauncher } from '@/components/ai-concierge/AiConciergeLauncher';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [selectedBarberId, setSelectedBarberId] = useState<string | undefined>();
  const [bookingMode, setBookingMode] = useState<'guided' | 'chat'>('guided');

  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    setSelectedServiceId(serviceId);
    setSelectedBarberId(barberId);
    setBookingMode('guided');
    setIsBookingOpen(true);
  };

  const handleOpenAiConcierge = () => {
    setSelectedServiceId(undefined);
    setSelectedBarberId(undefined);
    setBookingMode('chat');
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-obsidian text-ivory">
      {/* Top Navigation */}
      <Navigation
        onOpenBooking={() => handleOpenBooking()}
        onOpenAiConcierge={handleOpenAiConcierge}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Brand Statement & Craft Philosophy */}
        <BrandStatement />

        {/* Curated Services & Pricing */}
        <ServicesSection onSelectService={(serviceId) => handleOpenBooking(serviceId)} />

        {/* Resident Master Barbers */}
        <BarbersSection onSelectBarber={(barberId) => handleOpenBooking(undefined, barberId)} />

        {/* 4-Step Grooming Experience Journey */}
        <ExperienceSection />

        {/* Visual Lookbook & Interactive Lightbox Gallery */}
        <GallerySection />

        {/* Client Testimonials */}
        <TestimonialsSection />

        {/* SoHo Atelier Studio, Hours & Architectural Map */}
        <LocationSection />

        {/* Final Conversion Section */}
        <CallToAction
          onOpenBooking={() => handleOpenBooking()}
          onOpenAiConcierge={handleOpenAiConcierge}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Concierge Launcher */}
      <AiConciergeLauncher
        onOpenConcierge={handleOpenAiConcierge}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* AI Booking Assistant Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
        initialBarberId={selectedBarberId}
        initialMode={bookingMode}
      />
    </div>
  );
}
