/**
 * ============================================================================
 * ফাইল: src/app/api/admin/save-product/route.ts
 * কাজ (Purpose): অ্যাডমিন প্যানেল থেকে নতুন প্রোডাক্ট যোগ বা ডিলিট করে products.json আপডেট করা।
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeDataFile } from '@/lib/admin/fileStorage';
import { syncFileWithGithub } from '@/lib/admin/githubSync';

export async function POST(req: NextRequest) {
  try {
    const { products } = await req.json();

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { success: false, message: 'Invalid products array.' },
        { status: 400 }
      );
    }

    const payload = { products };

    const localSaved = await writeDataFile('products.json', payload);
    const githubSynced = await syncFileWithGithub(
      'products.json',
      payload,
      'chore(catalog): update products.json from Admin Studio'
    );

    return NextResponse.json({
      success: true,
      message: githubSynced
        ? 'Catalog updated & pushed to GitHub!'
        : localSaved
        ? 'Product catalog saved locally!'
        : 'Could not write to disk.',
    });
  } catch (error) {
    console.error('Save Product Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error saving product.' },
      { status: 500 }
    );
  }
}