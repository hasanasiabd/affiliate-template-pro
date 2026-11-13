/**
 * ============================================================================
 * ফাইল: src/app/admin/products/page.tsx
 * কাজ (Purpose): ড্যাশবোর্ড থেকে নতুন প্রোডাক্ট যোগ করা এবং বিদ্যমান প্রোডাক্ট তালিকা পরিচালনা করা।
 * ============================================================================
 */

import { readDataFile } from '@/lib/admin/fileStorage';
import { Product } from '@/types/product.types';
import ProductEditorForm from '@/components/admin/ProductEditorForm';
import ProductListTable from '@/components/admin/ProductListTable';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const productsData = await readDataFile<{ products: Product[] }>('products.json');
  const products = productsData.products || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Product Catalog Manager
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Add new hardware reviews or remove outdated listings directly from your JSON catalog.
        </p>
      </div>

      {/* ১. নতুন প্রোডাক্ট যোগ করার ফরম */}
      <ProductEditorForm existingProducts={products} />

      {/* ২. প্রকাশিত সব প্রোডাক্টের তালিকা ও ডিলিট টেবিল */}
      <ProductListTable products={products} />
    </div>
  );
}