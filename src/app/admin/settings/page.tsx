/**
 * ============================================================================
 * ফাইল: src/app/admin/settings/page.tsx
 * কাজ (Purpose): গ্লোবাল অ্যামাজন অ্যাসোসিয়েট ট্যাগ, সাইটের নাম ও লেখকের প্রোফাইল নিয়ন্ত্রণ করা।
 * ============================================================================
 */

import { readDataFile } from '@/lib/admin/fileStorage';
import { SiteConfig } from '@/types/config.types';
import AffiliateConfigForm from '@/components/admin/AffiliateConfigForm';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const siteConfig = await readDataFile<SiteConfig>('siteConfig.json');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Global Affiliate Tag & Brand Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Change your Amazon Associate Tracking ID once here to automatically update every product CTA button across the entire website.
        </p>
      </div>

      <AffiliateConfigForm initialData={siteConfig} />
    </div>
  );
}