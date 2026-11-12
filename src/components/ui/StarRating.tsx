/**
 * ============================================================================
 * ফাইল: src/components/ui/StarRating.tsx
 * কাজ (Purpose): প্রোডাক্টের রেটিং সংখ্যাকে (যেমন 4.9) স্টার আইকনসহ ভিজ্যুয়ালি দেখানো।
 * কেন গুরুত্বপূর্ণ: ভিজিটরের চোখে দ্রুত প্রোডাক্টের মান ও বিশ্বাসযোগ্যতা তুলে ধরে।
 * কোথায় ব্যবহৃত হবে: হোমপেজের প্রোডাক্ট কার্ড, রিভিউ পেজের হেডার এবং কম্পেয়ার টেবিলে।
 * ============================================================================
 */

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StarRatingProps {
  rating: number;         // যেমন: 4.8
  maxStars?: number;      // ডিফল্ট ৫টি স্টার
  showNumber?: boolean;   // স্টারের পাশে সংখ্যা (4.8) দেখাবে কি না
  size?: 'sm' | 'md';
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  showNumber = true,
  size = 'sm',
  className,
}: StarRatingProps) {
  const roundedRating = Math.round(rating);
  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div
      className={cn('inline-flex items-center gap-1.5', className)}
      aria-label={`Rated ${rating} out of ${maxStars} stars`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, index) => {
          const isFilled = index < roundedRating;
          return (
            <Star
              key={index}
              className={cn(
                starSize,
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-transparent text-slate-300 dark:text-slate-600'
              )}
            />
          );
        })}
      </div>

      {showNumber && (
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}