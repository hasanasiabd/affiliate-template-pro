/**
 * ============================================================================
 * ফাইল: src/components/home/CategoryPills.tsx
 * কাজ (Purpose): ক্যাটাগরি অনুযায়ী প্রোডাক্ট ফিল্টার করার হরিজন্টাল বাটন লিস্ট।
 * কোথায় ব্যবহৃত হবে: src/components/home/SearchAndFilterBar.tsx এবং হোমপেজে।
 * ============================================================================
 */

'use client';

import { Category } from '@/types/product.types';
import { cn } from '@/lib/utils/cn';
import { Sparkles, Mouse, Keyboard, Monitor, Headphones } from 'lucide-react';

interface CategoryPillsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryPillsProps) {
  // আইকনের নাম অনুযায়ী ডাইনামিক Lucide আইকন রেন্ডার করা
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mouse':
        return <Mouse className="w-4 h-4" />;
      case 'Keyboard':
        return <Keyboard className="w-4 h-4" />;
      case 'Monitor':
        return <Monitor className="w-4 h-4" />;
      case 'Headphones':
        return <Headphones className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border',
              isActive
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
            )}
          >
            {getIcon(cat.iconName)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}