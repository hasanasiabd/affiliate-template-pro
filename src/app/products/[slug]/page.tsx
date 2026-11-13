/**
 * ============================================================================
 * ফাইল: src/app/products/[slug]/page.tsx
 * কাজ (Purpose): প্রতিটি প্রোডাক্টের বিস্তারিত রিভিউ, স্পেক্স, তুলনা এবং SEO স্কিমা রেন্ডার করা।
 * কেন গুরুত্বপূর্ণ: এটি সাইটের প্রধান মানি-পেজ (Money Page), যেখানে গুগল সার্চ থেকে ভিজিটর এসে
 *               প্রোডাক্টের রিভিউ পড়ে এবং অ্যামাজন অ্যাফিলিয়েট লিংকে ক্লিক করে।
 * ============================================================================
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import siteConfigData from '@/data/siteConfig.json';

import { Product } from '@/types/product.types';

import { generateProductSchema } from '@/lib/schema/productSchema';
import { generateFaqSchema } from '@/lib/schema/faqSchema';
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumbSchema';

import ReviewHeader from '@/components/product/ReviewHeader';
import ProductMediaGallery from '@/components/product/ProductMediaGallery';
import QuickVerdictBox from '@/components/product/QuickVerdictBox';
import BuyOrSkipBox from '@/components/product/BuyOrSkipBox';
import ProsAndConsCard from '@/components/product/ProsAndConsCard';
import SpecsTable from '@/components/product/SpecsTable';
import AlternativesTable from '@/components/product/AlternativesTable';
import AffiliateCtaButton from '@/components/product/AffiliateCtaButton';
import ProductFaqSection from '@/components/product/ProductFaqSection';
import StickyMobileBar from '@/components/product/StickyMobileBar';

const allProducts = productsData.products as Product[];

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * ১. বিল্ড টাইমে সব প্রোডাক্ট স্লাগের স্ট্যাটিক রাউট তৈরি করা (SSG)
 */
export async function generateStaticParams() {
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

/**
 * ২. প্রতিটি প্রোডাক্টের জন্য ডাইনামিক SEO Title এবং OpenGraph Metadata জেনারেট করা
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} Review (2026) — Hands-On Verdict & Pros/Cons`,
    description: product.quickVerdict,
    alternates: {
      canonical: `${siteConfigData.siteUrl}/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} Review — Worth Buying in 2026?`,
      description: product.tagline,
      url: `${siteConfigData.siteUrl}/products/${product.slug}`,
      images: [{ url: product.mainImage, alt: product.title }],
      type: 'article',
    },
  };
}

/**
 * ৩. মূল প্রোডাক্ট রিভিউ পেজ কম্পোনেন্ট
 */
export default async function ProductReviewPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // গুগল রিচ স্নিপেটের জন্য ৩টি JSON-LD স্কিমা জেনারেট করা
  const productSchema = generateProductSchema(product);
  const faqSchema = product.faqs ? generateFaqSchema(product.faqs) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: product.category, url: '/#all-reviews' },
    { name: product.title, url: `/products/${product.slug}` },
  ]);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 pb-24 md:pb-16">
      {/* JSON-LD Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ১. ব্রেডক্রাম্ব, শিরোনাম, রেটিং এবং লেখকের পরিচয় */}
      <ReviewHeader product={product} />

      {/* ২. প্রোডাক্টের ছবি ও ডেমো ভিডিও গ্যালারি */}
      <ProductMediaGallery
        title={product.title}
        mainImage={product.mainImage}
        galleryImages={product.galleryImages}
        demoVideoUrl={product.demoVideoUrl}
      />

      {/* ৩. শুরুতেই সরাসরি সিদ্ধান্ত (BLUF Quick Verdict) */}
      <QuickVerdictBox
        quickVerdict={product.quickVerdict}
        testingSummary={product.testingSummary}
        rating={product.rating}
      />

      {/* ৪. প্রথম অ্যামাজন কল-টু-অ্যাকশন বাটন বক্স */}
      <AffiliateCtaButton product={product} />

      {/* ৫. কাদের কেনা উচিত এবং কাদের এড়িয়ে চলা উচিত */}
      <BuyOrSkipBox buyIf={product.buyIf} skipIf={product.skipIf} />

      {/* ৬. ভালো দিক (Pros) এবং সীমাবদ্ধতা (Cons) */}
      <ProsAndConsCard pros={product.pros} cons={product.cons} />

      {/* ৭. বিস্তারিত ইন-ডেপথ হ্যান্ডস-অন রিভিউ আর্টিকেল */}
      <section className="my-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
          In-Depth Hands-On Performance Review
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
          {product.fullReviewContent}
        </div>
      </section>

      {/* ৮. টেকনিক্যাল স্পেক্স এবং বাস্তব জীবনের সুবিধা */}
      <SpecsTable specs={product.specs} />

      {/* ৯. বিকল্প প্রোডাক্টের তুলনা টেবিল (Alternatives) */}
      <AlternativesTable
        mainProductTitle={product.title}
        alternatives={product.alternatives}
      />

      {/* ১০. প্রোডাক্ট সম্পর্কিত সাধারণ প্রশ্নোত্তর (FAQs) */}
      <ProductFaqSection faqs={product.faqs} />

      {/* ১১. পেজের শেষের চূড়ান্ত অ্যামাজন প্রাইস চেক বক্স */}
      <AffiliateCtaButton product={product} />

      {/* ১২. মোবাইল ইউজারদের জন্য ফিক্সড বটম বার */}
      <StickyMobileBar product={product} />
    </article>
  );
}