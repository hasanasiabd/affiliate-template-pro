/**
 * ============================================================================
 * ফাইল: src/app/blog/[slug]/page.tsx
 * কাজ (Purpose): একক বায়িং গাইড পড়া এবং গাইডের নিচে সংশ্লিষ্ট প্রোডাক্ট কার্ড দেখানো।
 * কেন গুরুত্বপূর্ণ: তথ্যমূলক আর্টিকেল থেকে সরাসরি প্রোডাক্ট রিভিউ ও অ্যামাজন লিংকে ট্রাফিক পাঠায়।
 * ============================================================================
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import blogPostsData from '@/data/blogPosts.json';
import productsData from '@/data/products.json';
import siteConfigData from '@/data/siteConfig.json';
import { formatDate } from '@/lib/utils/formatters';
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumbSchema';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/home/ProductCard';
import { Calendar, Clock, UserCheck, ChevronRight } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsData.posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsData.posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${siteConfigData.siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfigData.siteUrl}/blog/${post.slug}`,
      images: [{ url: post.coverImage, alt: post.title }],
      type: 'article',
    },
  };
}

export default async function SingleBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPostsData.posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // আর্টিকেলের সাথে সম্পর্কিত প্রোডাক্টগুলো খুঁজে বের করা
  const relatedProducts = productsData.products.filter((prod) =>
    post.relatedProductSlugs?.includes(prod.slug)
  );

  // গুগল সার্চের জন্য Article এবং Breadcrumb স্কিমা
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Buying Guides', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: siteConfigData.author.name,
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ১. ব্রেডক্রাম্ব */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-emerald-500">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/blog" className="hover:text-emerald-500">Buying Guides</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">
          {post.title}
        </span>
      </nav>

      {/* ২. ক্যাটাগরি ও শিরোনাম */}
      <Badge variant="emerald" className="mb-3">{post.category}</Badge>
      <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight mb-4">
        {post.title}
      </h1>

      {/* ৩. লেখক ও তারিখ */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <span className="flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-emerald-500" />
          By <strong className="text-slate-800 dark:text-slate-200">{siteConfigData.author.name}</strong>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-emerald-500" />
          {formatDate(post.publishedAt)}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-500" />
          {post.readTime}
        </span>
      </div>

      {/* ৪. কভার ইমেজ */}
      <div className="relative w-full h-64 sm:h-96 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-8 border border-slate-200 dark:border-slate-800">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      {/* ৫. মূল গাইড আর্টিকেল বডি */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mb-12">
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
          {post.content}
        </div>
      </div>

      {/* ৬. গাইডে উল্লেখিত রেকমেন্ডেড প্রোডাক্ট কার্ডসমূহ */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
            Featured Gear Mentioned in This Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Compare live prices or read our full hands-on testing verdicts below:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}