/**
 * ============================================================================
 * ফাইল: src/app/api/track-click/route.ts
 * কাজ (Purpose): অ্যামাজন অ্যাফিলিয়েট লিংকে ক্লিক পড়লে তা লোকাল JSON ফাইলে রেকর্ড করা।
 * কেন গুরুত্বপূর্ণ: অ্যাডমিন ড্যাশবোর্ডে কোন প্রোডাক্টে কত ক্লিক পড়ল তার সঠিক পরিসংখ্যান দেয়।
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { readDataFile, writeDataFile } from '@/lib/admin/fileStorage';
import { ClickStatsData } from '@/types/admin.types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, productSlug, productTitle } = body;

    if (!productId || !productSlug) {
      return NextResponse.json({ success: false, message: 'Missing product info' }, { status: 400 });
    }

    // clickStats.json ফাইল রিড করা
    const statsData = await readDataFile<ClickStatsData>('clickStats.json');

    // মোট ক্লিক ১ বাড়ানো
    statsData.totalOutboundClicks = (statsData.totalOutboundClicks || 0) + 1;

    // নির্দিষ্ট প্রোডাক্টের ক্লিক আপডেট করা
    if (!statsData.productStats) {
      statsData.productStats = {};
    }

    if (!statsData.productStats[productSlug]) {
      statsData.productStats[productSlug] = {
        productId,
        productSlug,
        productTitle: productTitle || productSlug,
        totalClicks: 0,
        lastClickedAt: new Date().toISOString(),
      };
    }

    statsData.productStats[productSlug].totalClicks += 1;
    statsData.productStats[productSlug].lastClickedAt = new Date().toISOString();

    // ফাইলে সেভ করা
    await writeDataFile('clickStats.json', statsData);

    return NextResponse.json({ success: true, totalClicks: statsData.totalOutboundClicks });
  } catch (error) {
    console.error('Track Click Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}