/**
 * ============================================================================
 * ফাইল: src/components/product/BuyOrSkipBox.tsx
 * কাজ (Purpose): কোন ধরনের ইউজারের প্রোডাক্টটি কেনা উচিত এবং কার এড়িয়ে চলা উচিত তা পাশাপাশি দেখানো।
 * কেন গুরুত্বপূর্ণ: নিরপেক্ষ রিভিউ হিসেবে ভিজিটরের আস্থা অর্জন করে এবং বাউন্স রেট কমায়।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

import { CheckCircle2, XCircle } from 'lucide-react';

interface BuyOrSkipBoxProps {
  buyIf: string[];
  skipIf: string[];
}

export default function BuyOrSkipBox({ buyIf, skipIf }: BuyOrSkipBoxProps) {
  return (
    <section className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* বাম কার্ড: কারা কিনবে (Buy This If) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <h3 className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5" /> Buy This If...
        </h3>
        <ul className="space-y-3">
          {buyIf.map((point, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ডান কার্ড: কারা এড়িয়ে চলবে (Skip This If) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <h3 className="text-base font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-2 mb-4">
          <XCircle className="w-5 h-5" /> Skip This If...
        </h3>
        <ul className="space-y-3">
          {skipIf.map((point, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}