/**
 * ============================================================================
 * ফাইল: src/components/admin/ProductEditorForm.tsx
 * কাজ (Purpose): নতুন প্রোডাক্ট যোগ করা বা বিদ্যমান প্রোডাক্ট এডিট করার ফরম।
 * কেন গুরুত্বপূর্ণ: কোডে হাত না দিয়ে সরাসরি ড্যাশবোর্ড থেকে ক্যাটালগ আপডেট করতে দেয়।
 * কোথায় ব্যবহৃত হবে: src/app/admin/products/page.tsx
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product.types';
import Button from '@/components/ui/Button';
import { Save, CheckCircle2, PackagePlus } from 'lucide-react';

interface ProductEditorFormProps {
  existingProducts: Product[];
}

export default function ProductEditorForm({
  existingProducts,
}: ProductEditorFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // নতুন প্রোডাক্টের ইনিশিয়াল স্টেট
  const [formState, setFormState] = useState({
    title: '',
    slug: '',
    brand: '',
    category: 'mouse',
    tagline: '',
    price: '$99.99',
    priceUpdatedDate: 'Nov 2026',
    affiliateUrl: '',
    rating: 4.8,
    isEditorsChoice: false,
    badgeText: '',
    mainImage: '',
    quickVerdict: '',
    buyIfText: '',
    skipIfText: '',
    testingSummary: '',
    prosText: '',
    consText: '',
    fullReviewContent: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: formState.slug || formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: formState.title,
      brand: formState.brand,
      category: formState.category,
      tagline: formState.tagline,
      price: formState.price,
      priceUpdatedDate: formState.priceUpdatedDate,
      affiliateUrl: formState.affiliateUrl,
      rating: Number(formState.rating),
      isEditorsChoice: formState.isEditorsChoice,
      badgeText: formState.badgeText || undefined,
      mainImage: formState.mainImage || 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop',
      quickVerdict: formState.quickVerdict,
      buyIf: formState.buyIfText.split('\n').map((s) => s.trim()).filter(Boolean),
      skipIf: formState.skipIfText.split('\n').map((s) => s.trim()).filter(Boolean),
      testingSummary: formState.testingSummary || 'Tested across daily developer workflows.',
      pros: formState.prosText.split('\n').map((s) => s.trim()).filter(Boolean),
      cons: formState.consText.split('\n').map((s) => s.trim()).filter(Boolean),
      fullReviewContent: formState.fullReviewContent,
      specs: [
        { label: 'Build Quality', value: 'Premium Materials', realWorldBenefit: 'Designed for long-term durability.' },
      ],
      publishedAt: new Date().toISOString().split('T')[0],
    };

    const updatedProductsList = [newProduct, ...existingProducts];

    try {
      const res = await fetch('/api/admin/save-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProductsList }),
      });

      const result = await res.json();
      if (res.ok) {
        setStatusMsg('New product review added successfully!');
        router.refresh();
        // ফরম রিসেট করা
        setFormState({
          title: '',
          slug: '',
          brand: '',
          category: 'mouse',
          tagline: '',
          price: '$99.99',
          priceUpdatedDate: 'Nov 2026',
          affiliateUrl: '',
          rating: 4.8,
          isEditorsChoice: false,
          badgeText: '',
          mainImage: '',
          quickVerdict: '',
          buyIfText: '',
          skipIfText: '',
          testingSummary: '',
          prosText: '',
          consText: '',
          fullReviewContent: '',
        });
      } else {
        setStatusMsg(result.message || 'Failed to save product.');
      }
    } catch {
      setStatusMsg('Network error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6"
    >
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
        <PackagePlus className="w-5 h-5 text-emerald-500" />
        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
          Add New Product Review
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Product Title
          </label>
          <input
            type="text"
            required
            value={formState.title}
            onChange={(e) => setFormState({ ...formState, title: e.target.value })}
            placeholder="e.g. Logitech MX Master 3S"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>

        <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Brand Name
          </label>
          <input
            type="text"
            required
            value={formState.brand}
            onChange={(e) => setFormState({ ...formState, brand: e.target.value })}
            placeholder="e.g. Logitech"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Category Slug
          </label>
          <select
            value={formState.category}
            onChange={(e) => setFormState({ ...formState, category: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          >
            <option value="mouse">Ergonomic Mouse</option>
            <option value="keyboard">Keyboard</option>
            <option value="monitor">Monitor</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Amazon Affiliate Link
          </label>
          <input
            type="url"
            required
            value={formState.affiliateUrl}
            onChange={(e) => setFormState({ ...formState, affiliateUrl: e.target.value })}
            placeholder="https://www.amazon.com/dp/..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Price
          </label>
          <input
            type="text"
            required
            value={formState.price}
            onChange={(e) => setFormState({ ...formState, price: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Rating (1.0 - 5.0)
          </label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            value={formState.rating}
            onChange={(e) => setFormState({ ...formState, rating: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          Tagline / Short Summary
        </label>
        <input
          type="text"
          value={formState.tagline}
          onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          Quick Verdict (BLUF Summary)
        </label>
        <textarea
          rows={3}
          value={formState.quickVerdict}
          onChange={(e) => setFormState({ ...formState, quickVerdict: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-emerald-600 mb-1">
            Pros (One per line)
          </label>
          <textarea
            rows={3}
            value={formState.prosText}
            onChange={(e) => setFormState({ ...formState, prosText: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-rose-500 mb-1">
            Cons (One per line)
          </label>
          <textarea
            rows={3}
            value={formState.consText}
            onChange={(e) => setFormState({ ...formState, consText: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
          <input
            type="checkbox"
            checked={formState.isEditorsChoice}
            onChange={(e) => setFormState({ ...formState, isEditorsChoice: e.target.checked })}
            className="w-4 h-4 accent-emerald-600 rounded"
          />
          Highlight as Editor&apos;s Choice (Top Pick)
        </label>
      </div>

      {statusMsg && (
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      <Button type="submit" disabled={isSaving}>
        <Save className="w-4 h-4" />
        {isSaving ? 'Publishing Review...' : 'Publish Product Review'}
      </Button>
    </form>
  );
}