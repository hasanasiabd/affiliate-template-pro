/**
 * ============================================================================
 * ফাইল: src/components/product/SpecsTable.tsx
 * কাজ (Purpose): প্রোডাক্টের টেকনিক্যাল স্পেসিফিকেশন এবং সেটির বাস্তব সুবিধা টেবিল আকারে দেখানো।
 * কেন গুরুত্বপূর্ণ: সাধারণ ইউজাররা জটিল টেকনিক্যাল সংখ্যার চেয়ে বাস্তব সুবিধা বুঝতে বেশি পছন্দ করে।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx
 * ============================================================================
 */

import { ProductSpec } from '@/types/product.types';
import { Cpu } from 'lucide-react';

interface SpecsTableProps {
  specs: ProductSpec[];
}

export default function SpecsTable({ specs }: SpecsTableProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <section className="my-10">
      <div className="flex items-center gap-2.5 mb-4">
        <Cpu className="w-5 h-5 text-emerald-500" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          Technical Specs & Real-World Impact
        </h2>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
              <th className="py-3.5 px-5 font-bold w-1/4">Feature</th>
              <th className="py-3.5 px-5 font-bold w-1/3">Specification</th>
              <th className="py-3.5 px-5 font-bold text-emerald-600 dark:text-emerald-400">
                Why It Matters (Real Benefit)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
            {specs.map((spec, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition"
              >
                <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-slate-100">
                  {spec.label}
                </td>
                <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300 font-medium">
                  {spec.value}
                </td>
                <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400">
                  {spec.realWorldBenefit || 'Standard performance for daily workflows.'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}