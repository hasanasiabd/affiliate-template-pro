/**
 * ============================================================================
 * ফাইল: src/app/compare/page.tsx
 * কাজ (Purpose): ভিজিটরকে যেকোনো ২-৩টি প্রোডাক্ট সিলেক্ট করে পাশাপাশি তুলনা করার সুবিধা দেওয়া।
 * কেন গুরুত্বপূর্ণ: যারা দুটি মডেলের মধ্যে কোনটি কিনবে তা নিয়ে দ্বিধায় থাকে, এই পেজ তাদের
 *               দ্রুত সিদ্ধান্ত নিতে সাহায্য করে।
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import productsData from '@/data/products.json';
import SectionHeading from '@/components/ui/SectionHeading';
import SideBySideTable from '@/components/compare/SideBySideTable';
import FloatingCompareTray from '@/components/compare/FloatingCompareTray';
import { cn } from '@/lib/utils/cn';
import { Check, Plus, Scale } from 'lucide-react';

export default function ComparePage() {
  const allProducts = productsData.products;

  // ডিফল্টভাবে প্রথম ২টি প্রোডাক্ট সিলেক্টেড অবস্থায় থাকবে যাতে পেজটি খালি না দেখায়
  const [selectedIds, setSelectedIds] = useState<string[]>(
    allProducts.slice(0, 2).map((p) => p.id)
  );

  // প্রোডাক্ট সিলেক্ট বা আনসিলেক্ট করার ফাংশন (সর্বোচ্চ ৩টি)
  const toggleProductSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 3) {
        alert('You can compare up to 3 products side-by-side at once.');
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedProducts = allProducts.filter((p) =>
    selectedIds.includes(p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pb-28">
      <SectionHeading
        title="Compare Developer Gear Side-by-Side"
        subtitle="Select up to 3 products from our tested catalog below to compare specs, pricing, and real-world pros & cons."
      />

      {/* ১. প্রোডাক্ট সিলেকশন বাটন গ্রিড */}
      <div className="mb-10">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
          <Scale className="w-4 h-4 text-emerald-500" />
          Select Products to Compare ({selectedIds.length}/3 selected):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allProducts.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <button
                key={product.id}
                onClick={() => toggleProductSelection(product.id)}
                className={cn(
                  'flex items-center justify-between p-3.5 rounded-2xl border text-left transition cursor-pointer',
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-500/40'
                )}
              >
                <div className="min-w-0 pr-3">
                  <p className="text-xs sm:text-sm font-extrabold truncate">
                    {product.title}
                  </p>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    {product.price} • ★ {product.rating}
                  </span>
                </div>

                <div
                  className={cn(
                    'w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition',
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  )}
                >
                  {isSelected ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ২. সাইড-বাই-সাইড তুলনা টেবিল */}
      <SideBySideTable products={selectedProducts} />

      {/* ৩. নিচে ভাসমান কম্পেয়ার ট্রে */}
      <FloatingCompareTray
        selectedProducts={selectedProducts}
        onRemoveProduct={(id) =>
          setSelectedIds(selectedIds.filter((item) => item !== id))
        }
        onClearAll={() => setSelectedIds([])}
      />
    </div>
  );
}