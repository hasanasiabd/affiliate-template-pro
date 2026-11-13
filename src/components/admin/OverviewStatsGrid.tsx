/**
 * ============================================================================
 * ফাইল: src/components/admin/OverviewStatsGrid.tsx
 * কাজ (Purpose): অ্যাডমিন ড্যাশবোর্ডে মোট প্রোডাক্ট, মোট অ্যামাজন ক্লিক এবং প্রোডাক্ট-ভিত্তিক CTR দেখানো।
 * কেন গুরুত্বপূর্ণ: কোন প্রোডাক্টটি ভিজিটররা সবচেয়ে বেশি কিনতে আগ্রহী তা এক নজরে বোঝা যায়।
 * কোথায় ব্যবহৃত হবে: src/app/admin/page.tsx
 * ============================================================================
 */

import { ClickStatsData } from '@/types/admin.types';
import { formatDate } from '@/lib/utils/formatters';
import {
  MousePointerClick,
  PackageCheck,
  TrendingUp,
  Bot,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface OverviewStatsGridProps {
  totalProducts: number;
  totalBlogs: number;
  aiEnabled: boolean;
  clickStats: ClickStatsData;
}

export default function OverviewStatsGrid({
  totalProducts,
  totalBlogs,
  aiEnabled,
  clickStats,
}: OverviewStatsGridProps) {
  // ক্লিক সংখ্যা অনুযায়ী প্রোডাক্টগুলোকে বেশি থেকে কম ক্রমানুসারে সাজানো
  const sortedStats = Object.values(clickStats.productStats || {}).sort(
    (a, b) => b.totalClicks - a.totalClicks
  );

  const topProduct = sortedStats[0]?.productTitle || 'No clicks recorded yet';

  return (
    <div className="space-y-8">
      {/* ১. উপরের ৪টি মেট্রিক সামারি কার্ড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Total Amazon Clicks</span>
            <MousePointerClick className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
            {clickStats.totalOutboundClicks}
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Tracked outbound CTA clicks
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Published Content</span>
            <PackageCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
            {totalProducts} <span className="text-sm font-normal text-slate-400">Reviews</span>
          </p>
          <span className="text-[11px] text-slate-500">
            + {totalBlogs} Buying Guides indexed
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Top Converting Gear</span>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100 line-clamp-2">
            {topProduct}
          </p>
          <span className="text-[11px] text-slate-500">
            Highest affiliate click share
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Gemini AI Concierge</span>
            <Bot className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {aiEnabled ? 'Active' : 'Paused'}
          </p>
          <span className="text-[11px] text-slate-500">
            Catalog-grounded assistant
          </span>
        </div>
      </div>

      {/* ২. প্রোডাক্ট অনুযায়ী আউটবাউন্ড ক্লিকের বিস্তারিত টেবিল */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            Outbound Amazon Click Breakdown
          </h3>
          <span className="text-xs text-slate-500">
            Live data from data/clickStats.json
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <th className="py-3 px-5 font-bold">Product Name</th>
                <th className="py-3 px-5 font-bold">Total Clicks</th>
                <th className="py-3 px-5 font-bold">Last Clicked</th>
                <th className="py-3 px-5 font-bold text-right">Page Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {sortedStats.map((stat) => (
                <tr key={stat.productSlug} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-slate-100">
                    {stat.productTitle}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {stat.totalClicks} clicks
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-500">
                    {formatDate(stat.lastClickedAt)}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      href={`/products/${stat.productSlug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                    >
                      View <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}