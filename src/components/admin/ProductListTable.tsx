/**
 * ============================================================================
 * ফাইল: src/components/admin/ProductListTable.tsx
 * কাজ (Purpose): অ্যাডমিন প্যানেলে সমস্ত প্রোডাক্টের তালিকা দেখানো এবং রিমুভ করার টেবিল।
 * কোথায় ব্যবহৃত হবে: src/app/admin/products/page.tsx
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product.types';
import { Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ProductListTableProps {
  products: Product[];
}

export default function ProductListTable({ products }: ProductListTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product review?')) return;
    setDeletingId(productId);

    const updatedList = products.filter((p) => p.id !== productId);

    try {
      const res = await fetch('/api/admin/save-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedList }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch {
      alert('Failed to delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden mt-8">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
          Published Reviews ({products.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <th className="py-3 px-5 font-bold">Product Title</th>
              <th className="py-3 px-5 font-bold">Category</th>
              <th className="py-3 px-5 font-bold">Price</th>
              <th className="py-3 px-5 font-bold">Rating</th>
              <th className="py-3 px-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-slate-100">
                  {product.title}
                </td>
                <td className="py-3.5 px-5 uppercase text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {product.category}
                </td>
                <td className="py-3.5 px-5 font-bold text-slate-700 dark:text-slate-300">
                  {product.price}
                </td>
                <td className="py-3.5 px-5 text-amber-500 font-bold">
                  ★ {product.rating}
                </td>
                <td className="py-3.5 px-5 text-right space-x-3">
                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-emerald-500 font-semibold"
                  >
                    View <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-700 font-semibold cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}