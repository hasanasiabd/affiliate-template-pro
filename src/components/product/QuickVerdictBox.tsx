/**
 * ============================================================================
 * ফাইল: src/components/product/QuickVerdictBox.tsx
 * কাজ (Purpose): রিভিউয়ের শুরুতেই ২-৩ লাইনের সরাসরি চূড়ান্ত সিদ্ধান্ত (BLUF) এবং টেস্টিং সামারি দেখানো।
 * কেন গুরুত্বপূর্ণ: গুগল এবং AI সার্চ বট (ChatGPT/Gemini) এই বক্স থেকেই মূল উত্তর সংগ্রহ করে।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

import { Award, FlaskConical } from 'lucide-react';

interface QuickVerdictBoxProps {
  quickVerdict: string;
  testingSummary: string;
  rating: number;
}

export default function QuickVerdictBox({
  quickVerdict,
  testingSummary,
  rating,
}: QuickVerdictBoxProps) {
  return (
    <section
      aria-label="Quick Verdict"
      className="my-8 bg-emerald-500/5 dark:bg-emerald-950/20 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-emerald-500/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-600 text-white">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              The Quick Verdict (Bottom Line)
            </h2>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              AI-Ready Summary & Hands-On Evaluation
            </p>
          </div>
        </div>

        {/* ওভারঅল স্কোর ব্যাজ */}
        <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-emerald-500/30 self-start sm:self-auto">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-500 font-semibold leading-tight">
            Out of 5.0<br />Editor Score
          </span>
        </div>
      </div>

      {/* মূল সিদ্ধান্ত টেক্সট */}
      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-5 font-medium">
        {quickVerdict}
      </p>

      {/* কীভাবে টেস্ট করা হয়েছে (E-E-A-T প্রমাণ) */}
      <div className="flex items-start gap-2.5 bg-white/80 dark:bg-slate-900/70 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        <FlaskConical className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 dark:text-slate-100">How We Tested: </strong>
          {testingSummary}
        </div>
      </div>
    </section>
  );
}