/**
 * ============================================================================
 * ফাইল: src/components/ui/Button.tsx
 * কাজ (Purpose): পুরো সাইটে ব্যবহারের জন্য কাস্টমাইজযোগ্য রিউজেবল বাটন কম্পোনেন্ট।
 * কেন গুরুত্বপূর্ণ: বাটনের রঙ, সাইজ বা হোভার ইফেক্ট এক জায়গা থেকে নিয়ন্ত্রণ করা যায়।
 * কোথায় ব্যবহৃত হবে: হোমপেজ, প্রোডাক্ট কার্ড, অ্যাডমিন ফরম এবং মডালে।
 * এডিট গাইড: বাটনের প্রাইমারি ব্র্যান্ড কালার (emerald) বদলাতে চাইলে variants অবজেক্ট এডিট করুন।
 * ============================================================================
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}: ButtonProps) {
  // ১. বাটনের কালার ভ্যারিয়েন্ট (Dark & Light Mode সাপোর্টেড)
  const variants = {
    primary:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/15 border border-transparent',
    secondary:
      'bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-transparent',
    outline:
      'bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400',
    ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/70 text-slate-600 dark:text-slate-300',
  };

  // ২. বাটনের সাইজ ভ্যারিয়েন্ট
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3.5 text-base rounded-2xl',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}