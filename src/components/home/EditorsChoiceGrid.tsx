/**
 * ============================================================================
 * ফাইল: src/components/home/EditorsChoiceGrid.tsx
 * কাজ (Purpose): হোমপেজের শুরুতে সেরা ৩টি বাছাইকৃত প্রোডাক্ট (Editor's Choice) হাইলাইট করা।
 * কেন গুরুত্বপূর্ণ: ভিজিটররা পুরো সাইট না ঘুরেও সেরা রেকমেন্ডেড প্রোডাক্টগুলো এক নজরে দেখতে পায়,
 *               যা অ্যাফিলিয়েট কনভার্সন রেট (CTR) উল্লেখযোগ্যভাবে বাড়িয়ে দেয়।
 * কোথায় ব্যবহৃত হবে: src/app/page.tsx (হোমপেজ)
 * ============================================================================
 */

import { Product } from '@/types/product.types';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from './ProductCard';

interface EditorsChoiceGridProps {
  products: Product[];
}

export default function EditorsChoiceGrid({ products }: EditorsChoiceGridProps) {
  // শুধুমাত্র isEditorsChoice === true থাকা প্রোডাক্টগুলো আলাদা করা
  const topPicks = products.filter((item) => item.isEditorsChoice).slice(0, 3);

  if (topPicks.length === 0) return null;

  return (
    <section id="top-picks" className="py-12 scroll-mt-20">
      <SectionHeading
        title="Editor's Top Picks"
        subtitle="Our highest-rated hardware upgrades after weeks of daily coding and productivity testing."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPicks.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}