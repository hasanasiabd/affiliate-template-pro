/**
 * ============================================================================
 * ফাইল: src/components/home/HeroSection.tsx
 * কাজ (Purpose): হোমপেজের একদম উপরের আকর্ষণীয় ব্যানার, ট্রাস্ট ব্যাজ এবং কল-টু-অ্যাকশন বাটন।
 * কেন গুরুত্বপূর্ণ: ভিজিটর সাইটে ঢোকার প্রথম ৩ সেকেন্ডের মধ্যে সাইটের মূল উদ্দেশ্য ও বিশ্বাসযোগ্যতা বুঝতে পারে।
 * কোথায় ব্যবহৃত হবে: src/app/page.tsx (হোমপেজ)
 * ============================================================================
 */

import Link from 'next/link';
import siteConfigData from '@/data/siteConfig.json';
import Badge from '@/components/ui/Badge';
import { ShieldCheck, Sparkles, ArrowRight, Scale } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* উপরের ট্রাস্ট ব্যাজ */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="emerald" className="px-3 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5" /> 2026 Hands-On Hardware Reviews
          </Badge>
        </div>

        {/* মূল শিরোনাম (H1) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight mb-6">
          {siteConfigData.siteTagline}
        </h1>

        {/* সাবটাইটেল */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {siteConfigData.siteDescription}
        </p>

        {/* বাটন গ্রুপ */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link
            href="#top-picks"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition active:scale-95"
          >
            Explore Top Picks <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700 transition"
          >
            <Scale className="w-4 h-4 text-emerald-500" /> Compare Gear Side-by-Side
          </Link>
        </div>

        {/* নিচের E-E-A-T অথরিটি সিগন্যাল */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-900/80 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Independent Testing
          </span>
          <span>•</span>
          <span>Curated by {siteConfigData.author.name}</span>
          <span>•</span>
          <span>AI-Assisted Buying Guides</span>
        </div>
      </div>
    </section>
  );
}