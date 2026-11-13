/**
 * ============================================================================
 * ফাইল: src/components/layout/Navbar.tsx
 * কাজ (Purpose): সাইটের প্রধান স্টিকি নেভিগেশন বার।
 * কোথায় ব্যবহৃত হবে: src/app/layout.tsx
 * এডিট গাইড: মেনুতে নতুন পেজ যোগ করতে চাইলে navItems অ্যারেতে নতুন অবজেক্ট যোগ করুন।
 * ============================================================================
 */

import Link from 'next/link';
import siteConfigData from '@/data/siteConfig.json';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import { Cpu, Scale } from 'lucide-react';

const navItems = [
  { label: 'Top Picks', href: '/#top-picks' },
  { label: 'All Reviews', href: '/#all-reviews' },
  { label: 'Buying Guides', href: '/blog' },
  { label: 'Compare Gear', href: '/compare' },
  { label: 'About & Testing', href: '/about' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* ১. ব্র্যান্ড লোগো */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            {siteConfigData.logoText}
            <span className="text-emerald-600 dark:text-emerald-400">.</span>
          </span>
        </Link>

        {/* ২. ডেস্কটপ মেনু লিংক */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ৩. ডান পাশের অ্যাকশন বাটন (Compare, ThemeToggle, MobileMenu) */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/compare"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition"
          >
            <Scale className="w-3.5 h-3.5" />
            Compare
          </Link>

          <ThemeToggle />
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}