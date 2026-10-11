import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TimeSlot } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `$${price}`;
}

export interface DayOption {
  dateString: string; // YYYY-MM-DD
  dayOfWeek: string;  // e.g. "Thu"
  dayNumber: number;  // e.g. 16
  monthName: string;  // e.g. "Oct"
  fullFormatted: string; // e.g. "Thursday, Oct 16"
  isClosed: boolean;  // Monday is closed
}

export function getUpcomingDays(count: number = 14): DayOption[] {
  const days: DayOption[] = [];
  const today = new Date();

  // Start from tomorrow or today depending on time, let's offer today + count
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const dayIndex = d.getDay(); // 0 is Sunday, 1 is Monday
    const isClosed = dayIndex === 1; // Studio closed on Mondays (Private sessions only)

    const dateString = d.toISOString().split('T')[0];
    const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const fullFormatted = d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    days.push({
      dateString,
      dayOfWeek,
      dayNumber,
      monthName,
      fullFormatted,
      isClosed,
    });
  }

  return days;
}

export function getAvailableSlots(dateString: string, barberId: string): TimeSlot[] {
  // Base daily operational slots
  const allSlots = [
    '10:00 AM',
    '11:00 AM',
    '11:45 AM',
    '01:00 PM',
    '02:15 PM',
    '03:30 PM',
    '04:30 PM',
    '05:45 PM',
    '06:30 PM',
    '07:15 PM',
  ];

  // Deterministic seed based on date and barberId to simulate real-world booked vs open slots
  const seed = (dateString + barberId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return allSlots.map((time, index) => {
    // Keep ~70% slots available, some booked
    const isAvailable = (seed + index * 7) % 5 !== 0;
    return {
      time,
      available: isAvailable,
      barberId,
    };
  });
}

export function generateBookingRef(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `NS-${randomNum}`;
}
