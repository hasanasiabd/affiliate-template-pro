<div align="center">

# 🚀 DevGear Pro — Next.js Affiliate Marketing & AI Concierge Template
### **The Ultimate Zero-Database, High-Performance Affiliate Website Powered by Next.js App Router, Tailwind CSS & Google Gemini AI**

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0+-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

*Launch a blazing-fast, SEO-optimized Amazon affiliate review site in minutes—with zero database management required.*

</div>

---

## 🌟 Overview

**DevGear Pro** is a production-ready, modern affiliate marketing web application built specifically for creators, niche reviewers, and digital entrepreneurs. Say goodbye to complex PostgreSQL/MySQL setups, slow WordPress hosting, and expensive plugin renewals. 

Everything is managed via clean **JSON files** stored directly in your repository, with automated syncing to GitHub right from your custom password-protected **Admin Studio**.

---

## ✨ Key Features

- **⚡ Zero-Database Architecture:** All products, categories, blogs, and settings live in lightweight root `/data` JSON files. Perfect for read-only serverless hosting (Vercel, Netlify).
- **🤖 Floating Gemini AI Shopping Concierge:** Grounded strictly in your product catalog, the built-in AI assistant answers visitor queries, recommends gear, and drops direct review links.
- **📊 Interactive Side-by-Side Comparison:** Let visitors select up to 3 products to compare baseline prices, ratings, key specs, and pros/cons side-by-side.
- **🎨 Custom Admin Studio Dashboard:** Secure password-protected dashboard (`/admin`) to monitor outbound Amazon clicks, add/delete product reviews, toggle tracking pixels, and configure AI behavior.
- **🔒 Automated GitHub Sync:** Changes made in the live Vercel admin panel automatically commit back to your GitHub repository via the GitHub REST API.
- **📈 Built-in Tracking & Pixels:** Drop-in support for **Meta (Facebook) Pixel**, **Google Analytics 4 (GA4)**, and **Microsoft Clarity** heatmaps.
- **🔍 Advanced SEO & Rich Snippets:** Automated JSON-LD Structured Data for `Product`, `FAQPage`, `BreadcrumbList`, `Article`, and `WebSite` to dominate Google Search results.
- **🌙 Dark & Light Mode:** Powered by `next-themes` with zero hydration flicker.
- **⚖️ FTC & Amazon Associates Compliant:** Built-in disclosure bars, privacy policy, terms, and affiliate compliance notices.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Server & Client Components, SSG/ISR)
- **Styling:** Tailwind CSS (Modern, responsive, mobile-first design)
- **Language:** TypeScript (Strict type safety across catalog and config)
- **AI Integration:** `@google/genai` (Google Gemini API)
- **Icons:** Lucide React

---

## 📂 Project Structure

```text
├── data/
│   ├── products.json        # Product reviews catalog & specs
│   ├── categories.json      # Product categories & icons
│   ├── blogPosts.json       # In-depth buying guides & tutorials
│   ├── siteConfig.json      # Global brand info, author, & Amazon Associate tag
│   ├── trackingConfig.json  # Meta Pixel, GA4 & Clarity IDs
│   ├── aiConfig.json        # Gemini AI agent settings & prompt rules
│   └── clickStats.json      # Outbound affiliate click counter
├── src/
│   ├── app/                 # App Router pages, dynamic routes ([slug]), & API endpoints
│   ├── components/          # Modular UI components (Home, Product, Compare, Chat, Admin, Layout)
│   ├── lib/                 # Core utilities (Schema generators, AI client, File storage, Auth)
│   └── types/               # Strict TypeScript definitions
└── tsconfig.json            # Path alias configuration (@/data/* and @/*)
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/devgear-affiliate-pro.git
cd devgear-affiliate-pro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=super_secret_password_2026
ADMIN_SESSION_SECRET=your_random_secure_session_secret_key

# Google Gemini AI API Key (Get yours from Google AI Studio)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: GitHub API Token for Vercel/Serverless Admin Panel Commits
GITHUB_TOKEN=ghp_your_github_personal_access_token
GITHUB_REPO=your-username/devgear-affiliate-pro
GITHUB_BRANCH=main
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the live website, and visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the management studio.

---

## ⚙️ How to Customize Your Affiliate Site

1. **Update Your Amazon Tag:** 
   Go to `/admin/settings` or edit `data/siteConfig.json` directly to replace `amazonAssociateTag` with your personal Amazon Associates ID (e.g., `yourtag-20`). All affiliate buttons will instantly update across the site.
2. **Add/Edit Products:**
   Use the **Product Catalog Manager** in the Admin Dashboard to add new reviews, change prices, or toggle *Editor's Choice* badges.
3. **Configure AI Assistant:**
   Customize the AI agent's name, greeting message, and quick-prompt chips in `data/aiConfig.json`.

---

## 🚢 Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/).
3. Add your environment variables (`GEMINI_API_KEY`, `ADMIN_PASSWORD`, etc.) in the Vercel Project Settings.
4. Click **Deploy**. Your zero-database affiliate site is now live!

---

## 📄 License

This project is open-source and available under the [Apache License 2.0](LICENSE).

---
<div align="center">
  <p>Built with ❤️ for Creators and Affiliate Marketers.</p>
</div>