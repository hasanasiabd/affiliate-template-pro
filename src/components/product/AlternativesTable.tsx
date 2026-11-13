/**
 * ============================================================================
 * ফাইল: src/components/product/AlternativesTable.tsx
 * কাজ (Purpose): মূল প্রোডাক্টের পাশাপাশি ২-৩টি বিকল্প প্রোডাক্টের (Alternatives) তুলনা দেখানো।
 * কেন গুরুত্বপূর্ণ: ভিজিটর মূল প্রোডাক্টটি না কিনলেও বিকল্প লিংকে ক্লিক করে যেন অ্যামাজনে যায়,
 *               তা নিশ্চিত করে অ্যাফিলিয়েট কমিশন ধরে রাখে।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

import { ProductAlternative } from '@/types/product.types';
import { getAffiliateUrl } from '@/lib/utils/affiliateLink';
import { Scale, ExternalLink } from 'lucide-react';

interface AlternativesTableProps {
  mainProductTitle: string;
  alternatives?: ProductAlternative[];
}

export default function AlternativesTable({
  mainProductTitle,
  alternatives = [],
}: AlternativesTableProps) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <section className="my-10">
      <div className="flex items-center gap-2.5 mb-4">
        <Scale className="w-5 h-5 text-emerald-500" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          Top Alternatives to Consider
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        Not sure if the <strong>{mainProductTitle}</strong> is the exact fit? Here is how its closest competitors stack up:
      </p>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
              <th className="py-3.5 px-5 font-bold">Alternative Model</th>
              <th className="py-3.5 px-5 font-bold">Best For</th>
              <th className="py-3.5 px-5 font-bold">Typical Price</th>
              <th className="py-3.5 px-5 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
            {alternatives.map((alt, idx) => {
              const trackedUrl = getAffiliateUrl(alt.affiliateUrl);
              return (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition"
                >
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-slate-100">
                    {alt.name}
                  </td>
                  <td className="py-3.5 px-5 text-emerald-600 dark:text-emerald-400 font-medium">
                    {alt.bestFor}
                  </td>
                  <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300 font-semibold">
                    {alt.priceRange}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <a
                      href={trackedUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer sponsored"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition"
                    >
                      View on Amazon <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}