/**
 * ============================================================================
 * ফাইল: src/components/compare/SideBySideTable.tsx
 * কাজ (Purpose): একাধিক প্রোডাক্টের ফিচার, দাম, রেটিং এবং ভালো-মন্দ দিক পাশাপাশি তুলনা করা।
 * কেন গুরুত্বপূর্ণ: ভিজিটরকে দ্রুত সিদ্ধান্ত নিতে সাহায্য করে এবং উচ্চ কনভার্সন নিশ্চিত করে।
 * কোথায় ব্যবহৃত হবে: src/app/compare/page.tsx
 * ============================================================================
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product.types';
import { getAffiliateUrl } from '@/lib/utils/affiliateLink';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { ExternalLink, Check, X, ArrowRight } from 'lucide-react';

interface SideBySideTableProps {
  products: Product[];
}

export default function SideBySideTable({ products }: SideBySideTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500">
          Select at least 2 products above to compare their specs side-by-side.
        </p>
      </div>
    );
  }

  return (
    <div
      id="comparison-table"
      className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm scroll-mt-24"
    >
      <table className="w-full text-left border-collapse min-w-[640px]">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            <th className="p-5 w-44 bg-slate-50/80 dark:bg-slate-800/50 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 align-middle">
              Feature / Metric
            </th>
            {products.map((product) => (
              <th key={product.id} className="p-5 align-top w-1/3">
                <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                </div>
                {product.badgeText && (
                  <Badge variant="emerald" className="mb-2">
                    {product.badgeText}
                  </Badge>
                )}
                <Link
                  href={`/products/${product.slug}`}
                  className="block text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 hover:text-emerald-500 transition line-clamp-2"
                >
                  {product.title}
                </Link>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
          {/* ১. দাম এবং তারিখ */}
          <tr>
            <td className="p-5 font-bold bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
              Baseline Price
            </td>
            {products.map((product) => (
              <td key={product.id} className="p-5">
                <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                  {product.price}
                </span>
                <span className="block text-[11px] text-slate-400">
                  as of {product.priceUpdatedDate}
                </span>
              </td>
            ))}
          </tr>

          {/* ২. এডিটর রেটিং */}
          <tr>
            <td className="p-5 font-bold bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
              Editor Score
            </td>
            {products.map((product) => (
              <td key={product.id} className="p-5">
                <StarRating rating={product.rating} />
              </td>
            ))}
          </tr>

          {/* ৩. কাদের জন্য সেরা (Best For) */}
          <tr>
            <td className="p-5 font-bold bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
              Ideal User
            </td>
            {products.map((product) => (
              <td key={product.id} className="p-5 text-slate-600 dark:text-slate-300">
                {product.buyIf[0] || product.tagline}
              </td>
            ))}
          </tr>

          {/* ৪. প্রধান পজিটিভ দিক (Top Pro) */}
          <tr>
            <td className="p-5 font-bold bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
              Biggest Strength
            </td>
            {products.map((product) => (
              <td key={product.id} className="p-5">
                <div className="flex items-start gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{product.pros[0]}</span>
                </div>
              </td>
            ))}
          </tr>

          {/* ৫. প্রধান সীমাবদ্ধতা (Main Drawback) */}
          <tr>
            <td className="p-5 font-bold bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
              Main Limitation
            </td>
            {products.map((product) => (
              <td key={product.id} className="p-5">
                <div className="flex items-start gap-2 text-rose-600 dark:text-rose-400 font-medium">
                  <X className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{product.cons[0]}</span>
                </div>
              </td>
            ))}
          </tr>

          {/* ৬. মূল টেকনিক্যাল স্পেক্স */}
          <tr>
            <td className="p-5 font-bold bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
              Key Spec Highlight
            </td>
            {products.map((product) => (
              <td key={product.id} className="p-5 text-slate-700 dark:text-slate-300">
                {product.specs[0] ? (
                  <div>
                    <strong className="block text-slate-900 dark:text-slate-100">
                      {product.specs[0].label}:
                    </strong>
                    <span>{product.specs[0].value}</span>
                  </div>
                ) : (
                  'Standard Spec'
                )}
              </td>
            ))}
          </tr>

          {/* ৭. অ্যামাজন লিংক এবং ফুল রিভিউ বাটন */}
          <tr>
            <td className="p-5 font-bold bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
              Verdict & Action
            </td>
            {products.map((product) => {
              const affiliateLink = getAffiliateUrl(product.affiliateUrl);
              return (
                <td key={product.id} className="p-5 space-y-2.5">
                  <a
                    href={affiliateLink}
                    target="_blank"
                    rel="nofollow noopener noreferrer sponsored"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/15 transition"
                  >
                    Check on Amazon <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 text-xs font-bold flex items-center justify-center gap-1 transition"
                  >
                    Read Full Review <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}