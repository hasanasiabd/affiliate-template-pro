/**
 * ============================================================================
 * ফাইল: src/lib/admin/fileStorage.ts
 * কাজ (Purpose): সার্ভার সাইডে লোকাল data/ ফোল্ডারের JSON ফাইলগুলো পড়া এবং আপডেট করা।
 * কেন গুরুত্বপূর্ণ: কোনো এক্সটার্নাল ডাটাবেস ছাড়াই অ্যাডমিন প্যানেল থেকে ডেটা পরিবর্তনের সুবিধা দেয়।
 * কোথায় ব্যবহৃত হবে: /api/admin/ রুটগুলোতে এবং সার্ভার কম্পোনেন্টে ডেটা ফেচ করার সময়।
 * ============================================================================
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * ডেটা ফোল্ডার থেকে নির্দিষ্ট কোনো JSON ফাইল রিড করার ফাংশন
 * @param fileName - ফাইলের নাম (যেমন: "products.json" বা "siteConfig.json")
 */
export async function readDataFile<T>(fileName: string): Promise<T> {
  try {
    const filePath = path.join(process.cwd(), 'data', fileName);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Error reading data file ${fileName}:`, error);
    throw new Error(`Failed to read ${fileName}`);
  }
}

/**
 * ডেটা ফোল্ডারে নির্দিষ্ট JSON ফাইলে নতুন ডেটা রাইট (ওভাররাইট) করার ফাংশন
 * @param fileName - ফাইলের নাম
 * @param data - সেভ করার অবজেক্ট বা ডেটা
 */
export async function writeDataFile<T>(fileName: string, data: T): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), 'data', fileName);
    // সুন্দর ফরম্যাটড (2 spaces indent) JSON হিসেবে ডেটা সেভ করা
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonString, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing data file ${fileName}:`, error);
    return false;
  }
}