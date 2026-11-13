/**
 * ============================================================================
 * ফাইল: src/app/about/page.tsx
 * কাজ (Purpose): সাইটের লক্ষ্য, লেখকের পরিচয় এবং প্রোডাক্ট টেস্টিং মেথডোলজি তুলে ধরা।
 * কেন গুরুত্বপূর্ণ: গুগল E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 *               স্কোর বাড়াতে এই পেজটি সরাসরি ভূমিকা রাখে।
 * ============================================================================
 */

import type { Metadata } from 'next';
import siteConfigData from '@/data/siteConfig.json';
import Badge from '@/components/ui/Badge';
import { ShieldCheck, FlaskConical, Cpu, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & Our Hardware Testing Methodology',
  description: `Learn how ${siteConfigData.siteName} tests, benchmarks, and reviews ergonomic developer hardware and coding peripherals.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* হেডার */}
      <header className="border-b border-slate-200 dark:border-slate-800 pb-8">
        <Badge variant="emerald" className="mb-3">
          Our Editorial Standard
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
          About {siteConfigData.siteName} & How We Test Gear
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {siteConfigData.siteDescription}
        </p>
      </header>

      {/* লেখকের পরিচিতি বক্স */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-500" />
          Lead Reviewer & Technical Editor
        </h2>
        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          {siteConfigData.author.name} — {siteConfigData.author.role}
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {siteConfigData.author.bio}
        </p>
      </section>

      {/* ৩টি টেস্টিং পিলার */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
          <FlaskConical className="w-6 h-6 text-emerald-500 mb-3" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mb-2">
            Real Coding Workflows
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every mouse, mechanical keyboard, and monitor is tested across real IDE sessions, terminal navigation, and multi-OS setups before earning a rating.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
          <ShieldCheck className="w-6 h-6 text-emerald-500 mb-3" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mb-2">
            Zero Sponsored Ratings
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Brands cannot buy higher scores or alter our verdicts. We highlight both strengths and deal-breaking flaws in every single review.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
          <Cpu className="w-6 h-6 text-emerald-500 mb-3" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mb-2">
            Long-Term Ergonomics
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Specs on paper rarely tell the whole story. We focus on wrist strain reduction, switch fatigue, text clarity, and build durability.
          </p>
        </div>
      </section>
    </div>
  );
}