/**
 * ============================================================================
 * ফাইল: src/app/api/admin/save-config/route.ts
 * কাজ (Purpose): অ্যাডমিন প্যানেল থেকে siteConfig, trackingConfig ও aiConfig সেভ করা।
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeDataFile } from '@/lib/admin/fileStorage';
import { syncFileWithGithub } from '@/lib/admin/githubSync';

const ALLOWED_FILES = ['siteConfig.json', 'trackingConfig.json', 'aiConfig.json'];

export async function POST(req: NextRequest) {
  try {
    const { fileName, data } = await req.json();

    if (!ALLOWED_FILES.includes(fileName) || !data) {
      return NextResponse.json(
        { success: false, message: 'Invalid configuration file.' },
        { status: 400 }
      );
    }

    // ১. লোকাল ডেভেলপমেন্টে সরাসরি ফাইলে সেভ করা
    const localSaved = await writeDataFile(fileName, data);

    // ২. প্রোডাকশনে (Vercel) থাকলে গিটহাব রিপোজিটরিতে অটো-কমিট করা
    const githubSynced = await syncFileWithGithub(
      fileName,
      data,
      `chore(admin): update ${fileName}`
    );

    if (!localSaved && !githubSynced) {
      return NextResponse.json(
        {
          success: false,
          message: 'Read-only server detected. Configure GITHUB_TOKEN in .env to save on live server.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: githubSynced
        ? 'Saved & synced with GitHub repository!'
        : 'Saved to local JSON file successfully!',
    });
  } catch (error) {
    console.error('Save Config Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save config.' },
      { status: 500 }
    );
  }
}