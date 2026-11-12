/**
 * ============================================================================
 * ফাইল: src/components/layout/TopDisclosureBar.tsx
 * কাজ (Purpose): সাইটের একদম উপরে অ্যামাজন অ্যাফিলিয়েট ডিসক্লোজার নোটিশ বার দেখানো।
 * কেন গুরুত্বপূর্ণ: অ্যামাজন অ্যাকাউন্ট ব্যান বা রেস্ট্রিকশন এড়ানোর জন্য এটি প্রথম দিনের শর্ত।
 * কোথায় ব্যবহৃত হবে: src/app/layout.tsx (রুট লেআউট)
 * ============================================================================
 */

import siteConfigData from '@/data/siteConfig.json';
import { Info } from 'lucide-react';

export default function TopDisclosureBar() {
  return (
    <aside aria-label="Affiliate Disclosure" className="bg-slate-900 text-slate-300 dark:bg-slate-950 dark:text-slate-400 border-b border-slate-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
        <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <p>
          <span className="font-semibold text-slate-200 dark:text-slate-300">Affiliate Disclosure:</span>{' '}
          {siteConfigData.disclosureText}
        </p>
      </div>
    </aside>
  );
}