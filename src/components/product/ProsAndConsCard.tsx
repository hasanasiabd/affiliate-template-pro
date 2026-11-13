/**
 * ============================================================================
 * ফাইল: src/components/product/ProsAndConsCard.tsx
 * কাজ (Purpose): প্রোডাক্টের ভালো দিক (Pros) এবং দুর্বল দিকগুলো (Cons) পাশাপাশি তুলে ধরা।
 * কেন গুরুত্বপূর্ণ: গুগল এবং AI সার্চ বটগুলো রিভিউয়ের নিরপেক্ষতা যাচাই করতে এই অংশটি স্ক্যান করে।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

import { ThumbsUp, ThumbsDown, Check, X } from 'lucide-react';

interface ProsAndConsCardProps {
  pros: string[];
  cons: string[];
}

export default function ProsAndConsCard({ pros, cons }: ProsAndConsCardProps) {
  return (
    <section aria-label="Pros and Cons" className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ১. ভালো দিকসমূহ (Pros) */}
      <div className="bg-emerald-500/5 dark:bg-emerald-950/15 border border-emerald-500/25 rounded-3xl p-6">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-emerald-500/20">
          <div className="p-2 rounded-xl bg-emerald-600 text-white">
            <ThumbsUp className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
            What We Liked (Pros)
          </h3>
        </div>

        <ul className="space-y-3">
          {pros.map((pro, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 stroke-[2.5]" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ২. সীমাবদ্ধতা বা দুর্বল দিকসমূহ (Cons) */}
      <div className="bg-rose-500/5 dark:bg-rose-950/15 border border-rose-500/25 rounded-3xl p-6">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-rose-500/20">
          <div className="p-2 rounded-xl bg-rose-600 text-white">
            <ThumbsDown className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
            Room for Improvement (Cons)
          </h3>
        </div>

        <ul className="space-y-3">
          {cons.map((con, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
              <X className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5 stroke-[2.5]" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}