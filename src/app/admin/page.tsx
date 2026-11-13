/**
 * ============================================================================
 * ফাইল: src/app/admin/page.tsx
 * কাজ (Purpose): অ্যাডমিন প্যানেলের মূল ওভারভিউ এবং অ্যামাজন আউটবাউন্ড ক্লিক রিপোর্ট দেখানো।
 * ============================================================================
 */

import { readDataFile } from '@/lib/admin/fileStorage';
import { ClickStatsData } from '@/types/admin.types';
import { Product } from '@/types/product.types';
import { BlogPost } from '@/types/blog.types';
import { AiAgentConfig } from '@/types/chat.types';
import OverviewStatsGrid from '@/components/admin/OverviewStatsGrid';

// সবসময় লেটেস্ট ক্লিক ডেটা দেখানোর জন্য ডাইনামিক রেন্ডারিং
export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const productsFile = await readDataFile<{ products: Product[] }>('products.json');
  const blogsFile = await readDataFile<{ posts: BlogPost[] }>('blogPosts.json');
  const aiConfig = await readDataFile<AiAgentConfig>('aiConfig.json');
  const clickStats = await readDataFile<ClickStatsData>('clickStats.json');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Dashboard Overview & Click Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor your outbound Amazon affiliate link clicks and catalog status in real time.
        </p>
      </div>

      <OverviewStatsGrid
        totalProducts={productsFile.products?.length || 0}
        totalBlogs={blogsFile.posts?.length || 0}
        aiEnabled={aiConfig.enableAiAgent}
        clickStats={clickStats}
      />
    </div>
  );
}