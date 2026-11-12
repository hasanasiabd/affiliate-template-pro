/**
 * ============================================================================
 * ফাইল: src/components/ui/SectionHeading.tsx
 * কাজ (Purpose): হোমপেজ বা বিভিন্ন সেকশনের জন্য স্ট্যান্ডার্ড টাইটেল ও সাবটাইটেল হেডিং রেন্ডার করা।
 * কোথায় ব্যবহৃত হবে: হোমপেজের প্রোডাক্ট গ্রিড, ব্লগ সেকশন এবং কম্পেয়ার পেজে।
 * ============================================================================
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8',
        align === 'center' ? 'text-center max-w-2xl mx-auto' : 'text-left',
        className
      )}
    >
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}