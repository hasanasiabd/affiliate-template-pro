/**
 * ============================================================================
 * ফাইল: src/lib/admin/githubSync.ts
 * কাজ (Purpose): লাইভ সাইটে (Vercel) অ্যাডমিন প্যানেল থেকে ডেটা পরিবর্তন করলে তা সরাসরি
 *               GitHub রিপোজিটরির JSON ফাইলে অটো-কমিট করা।
 * কেন গুরুত্বপূর্ণ: সার্ভারলেস হোস্টিংয়ে ডাটাবেস ছাড়া ডেটা স্থায়ীভাবে সেভ রাখার আধুনিক কৌশল।
 * কোথায় ব্যবহৃত হবে: src/app/api/admin/save-config এবং save-product রুটে।
 * ============================================================================
 */

/**
 * GitHub REST API-এর মাধ্যমে সরাসরি রিপোজিটরির JSON ফাইল আপডেট করার ফাংশন
 * @param fileName - data/ ফোল্ডারের ফাইলের নাম (যেমন: "products.json")
 * @param content - নতুন ডেটা অবজেক্ট
 * @param commitMessage - গিট কমিট মেসেজ
 */
export async function syncFileWithGithub<T>(
  fileName: string,
  content: T,
  commitMessage: string = `Update ${fileName} from Admin Panel`
): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // যেমন: "hasanasiabd/affiliate-template-pro"
  const branch = process.env.GITHUB_BRANCH || 'main';

  // যদি লোকাল পিসিতে থাকে বা টোকেন সেট করা না থাকে, তবে গিটহাব সিঙ্ক দরকার নেই
  if (!token || !repo) {
    return false;
  }

  const filePath = `data/${fileName}`;
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  try {
    // ধাপ ১: বর্তমান ফাইলের SHA হ্যাশ সংগ্রহ করা (ফাইল আপডেট করার জন্য GitHub-এ এটি বাধ্যতামূলক)
    const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    let sha: string | undefined;
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // ধাপ ২: নতুন JSON ডেটাকে Base64 ফরম্যাটে এনকোড করে গিটহাবে PUT রিকোয়েস্ট পাঠানো
    const jsonString = JSON.stringify(content, null, 2);
    const base64Content = Buffer.from(jsonString, 'utf8').toString('base64');

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: base64Content,
        sha,
        branch,
      }),
    });

    return putRes.ok;
  } catch (error) {
    console.error('GitHub Sync Error:', error);
    return false;
  }
}