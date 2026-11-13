/**
 * ============================================================================
 * ফাইল: src/app/admin/pixels/page.tsx
 * কাজ (Purpose): Meta Pixel, GA4, Clarity এবং Search Console ট্যাগ কনফিগার করার পেজ।
 * ============================================================================
 */

import { readDataFile } from '@/lib/admin/fileStorage';
import { TrackingConfig } from '@/types/config.types';
import PixelSettingsForm from '@/components/admin/PixelSettingsForm';

export const dynamic = 'force-dynamic';

export default async function AdminPixelsPage() {
  const trackingConfig = await readDataFile<TrackingConfig>('trackingConfig.json');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Tracking Pixels & SEO Verification
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Paste your Meta Pixel ID, Google Analytics 4 ID, or Search Console verification string below. No code editing required.
        </p>
      </div>

      <PixelSettingsForm initialData={trackingConfig} />
    </div>
  );
}