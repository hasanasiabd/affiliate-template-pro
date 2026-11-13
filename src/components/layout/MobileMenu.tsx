/**
 * ============================================================================
 * ফাইল: src/components/layout/MobileMenu.tsx
 * কাজ (Purpose): মোবাইল স্ক্রিনে হ্যামবার্গার আইকনে ক্লিক করলে নেভিগেশন লিংক দেখানো।
 * কোথায় ব্যবহৃত হবে: src/components/layout/Navbar.tsx
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-2 z-50">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}