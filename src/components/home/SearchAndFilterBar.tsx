/**
 * ============================================================================
 * ফাইল: src/components/home/SearchAndFilterBar.tsx
 * কাজ (Purpose): পেজ রিলোড ছাড়াই নাম, ক্যাটাগরি এবং বাজেট অনুযায়ী প্রোডাক্ট ইনস্ট্যান্ট ফিল্টার করা।
 * কোথায় ব্যবহৃত হবে: src/app/page.tsx (হোমপেজ)
 * ============================================================================
 */

'use client';

import { useState, useMemo } from 'react';
import { Product, Category } from '@/types/product.types';
import CategoryPills from './CategoryPills';
import ProductCard from './ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchAndFilterBarProps {
  products: Product[];
  categories: Category[];
}

export default function SearchAndFilterBar({
  products,
  categories,
}: SearchAndFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<string>('all');

  // সার্চ, ক্যাটাগরি ও বাজেট অনুযায়ী প্রোডাক্ট ফিল্টার করার লজিক
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // ১. ক্যাটাগরি চেক
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // ২. সার্চ টেক্সট চেক (টাইটেল, ব্র্যান্ড বা ট্যাগলাইনে খুঁজবে)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query);

      // ৩. বাজেট ফিল্টার চেক
      const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
      let matchesBudget = true;
      if (maxPriceFilter === 'under-100') matchesBudget = numericPrice < 100;
      if (maxPriceFilter === '100-plus') matchesBudget = numericPrice >= 100;

      return matchesCategory && matchesSearch && matchesBudget;
    });
  }, [products, selectedCategory, searchQuery, maxPriceFilter]);

  return (
    <section id="all-reviews" className="py-12 scroll-mt-20 border-t border-slate-200 dark:border-slate-800/80">
      <SectionHeading
        title="Browse All Tested Gear"
        subtitle="Filter by category, search specific models, or sort by your target budget."
      />

      {/* সার্চ ইনপুট এবং বাজেট ড্রপডাউন বার */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        {/* সার্চ বক্স */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mice, Keychron, Logitech, ergonomic..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* বাজেট সিলেক্টর */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Budget:</span>
          <select
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value)}
            className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all" className="dark:bg-slate-900">All Prices</option>
            <option value="under-100" className="dark:bg-slate-900">Under $100</option>
            <option value="100-plus" className="dark:bg-slate-900">$100 & Above</option>
          </select>
        </div>
      </div>

      {/* ক্যাটাগরি ফিল্টার বাটনসমূহ */}
      <div className="mb-8">
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* ফিল্টার করা প্রোডাক্ট গ্রিড */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-100/60 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
          <p className="text-base font-bold text-slate-700 dark:text-slate-300 mb-2">
            No matching gear found
          </p>
          <p className="text-xs text-slate-500 mb-4">
            Try clearing your search query or switching the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setMaxPriceFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
}