/**
 * ============================================================================
 * ফাইল: src/app/affiliate-disclosure/page.tsx
 * কাজ (Purpose): FTC এবং Amazon Associates Operating Agreement অনুযায়ী পূর্ণাঙ্গ ডিসক্লোজার।
 * কেন গুরুত্বপূর্ণ: অ্যামাজন অ্যাফিলিয়েট অ্যাকাউন্ট অনুমোদন ও সচল রাখার জন্য এটি বাধ্যতামূলক।
 * ============================================================================
 */

import type { Metadata } from 'next';
import siteConfigData from '@/data/siteConfig.json';
import { Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure & Editorial Ethics',
  description: `Full FTC and Amazon Associates affiliate disclosure for ${siteConfigData.siteName}.`,
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Info className="w-4 h-4" /> Transparency & Compliance
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Affiliate Disclosure
        </h1>

        {/* অফিশিয়াল অ্যামাজন স্টেটমেন্ট হাইলাইট */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {siteConfigData.disclosureText}
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>{siteConfigData.siteName}</strong> is an independent hardware review and comparison publication. To keep our buying guides, side-by-side comparison tools, and AI shopping assistant 100% free for readers, we participate in affiliate marketing programs—primarily the <strong>Amazon Services LLC Associates Program</strong>.
          </p>

          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 pt-2">
            How Affiliate Links Work
          </h2>
          <p>
            When you click on a &quot;Check Price on Amazon&quot; button on our website and make a purchase, we may receive a small referral commission at <strong>zero additional cost to you</strong>. The price you pay on Amazon remains identical whether you use our link or visit Amazon directly.
          </p>

          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 pt-2">
            Editorial Independence
          </h2>
          <p>
            Our editorial verdicts, star ratings, and &quot;Buy or Skip&quot; recommendations are based strictly on hands-on evaluation and technical merit. Affiliate partnerships never dictate which products we recommend or critique.
          </p>
        </div>
      </div>
    </div>
  );
}