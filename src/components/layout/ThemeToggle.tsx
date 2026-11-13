/**
 * ============================================================================
 * ফাইল: src/components/layout/ThemeToggle.tsx
 * কাজ (Purpose): এক ক্লিকে সাইটের থিম Dark Mode এবং Light Mode-এ পরিবর্তন করা।
 * কেন গুরুত্বপূর্ণ: দিন বা রাতের বেলা ভিজিটরের চোখের আরাম অনুযায়ী রিডিং অভিজ্ঞতা দেয়।
 * কোথায় ব্যবহৃত হবে: src/components/layout/Navbar.tsx
 * ============================================================================
 */

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ক্লায়েন্ট সাইডে মাউন্ট হওয়ার পর আইকন দেখানো (Hydration mismatch রোধ করতে)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
      aria-label="Toggle Dark or Light Mode"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}