/**
 * ============================================================================
 * ফাইল: src/components/ui/Badge.tsx
 * কাজ (Purpose): প্রোডাক্টের ক্যাটাগরি, "Editor's Choice" বা বিশেষ ট্যাগ হাইলাইট করার ব্যাজ।
 * কোথায় ব্যবহৃত হবে: ProductCard.tsx, ReviewHeader.tsx এবং ব্লগ কার্ডে।
 * এডিট গাইড: নতুন কোনো রঙের ব্যাজ চাইলে badgeVariants অবজেক্টে নতুন নাম যোগ করুন।
 * ============================================================================
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'rose' | 'slate';
  className?: string;
}

export default function Badge({
  children,
  variant = 'emerald',
  className,
}: BadgeProps) {
  const badgeVariants = {
    emerald:
      'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    amber:
      'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    rose:
      'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
    slate:
      'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border',
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}