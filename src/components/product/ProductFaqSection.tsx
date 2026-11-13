/**
 * ============================================================================
 * ফাইল: src/components/product/ProductFaqSection.tsx
 * কাজ (Purpose): প্রোডাক্ট সম্পর্কিত সাধারণ প্রশ্ন ও উত্তরগুলো অ্যাকর্ডিয়ন আকারে দেখানো।
 * কেন গুরুত্বপূর্ণ: লং-টেইল কীওয়ার্ড র‍্যাঙ্কিং এবং ভিজিটরের শেষ মুহূর্তের দ্বিধা দূর করতে সাহায্য করে।
 * কোথায় ব্যবহৃত হবে: src/app/products/[slug]/page.tsx এবং হোমপেজে।
 * ============================================================================
 */

import { ProductFaq } from '@/types/product.types';
import { HelpCircle } from 'lucide-react';

interface ProductFaqSectionProps {
  faqs?: ProductFaq[];
  title?: string;
}

export default function ProductFaqSection({
  faqs = [],
  title = 'Frequently Asked Questions',
}: ProductFaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-12">
      <div className="flex items-center gap-2.5 mb-6">
        <HelpCircle className="w-5 h-5 text-emerald-500" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 open:border-emerald-500/50 transition"
          >
            <summary className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between gap-4">
              <span>{faq.question}</span>
              <span className="text-emerald-500 font-black text-lg group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}