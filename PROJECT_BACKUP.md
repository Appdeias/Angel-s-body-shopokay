# Angel's Paint & Autobody - Full Project Backup

> Generated: 2026-04-30
> This document contains everything needed to reconstruct the entire website if needed.

---

## 1. Project Overview

- **Name**: Angel's Paint & Autobody Website
- **Type**: React 19 + TypeScript + TailwindCSS + Vite SPA
- **Backend**: Supabase (PostgreSQL DB + Edge Functions + Storage)
- **Hosting**: Vercel (deployed from Readdy)
- **Domain**: Purchased separately via Vercel

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.1.2 |
| Language | TypeScript | ~5.8.3 |
| Styling | TailwindCSS | 3.4.17 |
| Build Tool | Vite | 8.0.1 |
| Router | react-router-dom | 7.6.3 |
| i18n | react-i18next + i18next | 15.6.0 / 25.3.2 |
| Backend | Supabase Client | 2.57.4 |
| Icons | Remix Icon + FontAwesome | 4.5.0 / 6.4.0 |
| Font | Inter (Google Fonts) | - |

---

## 3. Environment Variables (.env)

```
VITE_PUBLIC_SUPABASE_URL=https://xyonfkdrlvydtkrvxofc.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_4iQdbsgmrcyOK9wFt2BgUw_Xag54Xp2
```

> These are public-facing keys by design (anon key). The actual security is enforced via Row Level Security (RLS) in Supabase.

---

## 4. Database Schema (Supabase)

### Tables:

| Table | Purpose |
|-------|---------|
| `site_settings` | Key-value text storage (hero text, contact info, stats, etc.) |
| `services` | 12 auto body services with titles, descriptions, icons, video URLs |
| `faqs` | Frequently asked questions for About page |
| `how_it_works` | 4-step process cards for homepage |
| `company_values` | Core values displayed on About page |
| `performance_bars` | Animated stat bars (satisfaction %, etc.) |
| `reviews` | Customer reviews with ratings, text, service type |
| `site_media` | Media asset registry (section/slot/url mapping) |

### Storage Buckets:
- `site-media` — Stores uploaded images/videos via Edge Functions

### Edge Functions:
1. `upload-media` — Uploads base64 files to storage + registers in site_media table
2. `delete-media` — Removes files from storage + deletes DB records
3. `download-media` — Proxies file downloads for owner panel

---

## 5. Complete File Tree

```
├── .env
├── index.html                    (SEO meta tags, Schema.org, Open Graph, favicon)
├── package.json                  (Dependencies & scripts)
├── postcss.config.ts
├── tailwind.config.ts            (Tailwind content paths)
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vite.config.ts                (Vite + React + AutoImport + alias @/)
├── vercel.json                   (Vercel routing config)
│
├── public/
│   ├── googlebd05e45c976c9661.html  (Google Search Console)
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── main.tsx                  (App entry point, StrictMode)
│   ├── App.tsx                   (BrowserRouter, I18nextProvider, ScrollToTop)
│   ├── index.css                 (Tailwind directives + Inter font)
│   │
│   ├── router/
│   │   ├── index.ts              (AppRoutes, global navigate)
│   │   └── config.tsx            (Route definitions: /, /about, /services, /contact, /owner, *)
│   │
│   ├── lib/
│   │   └── supabase.ts           (Singleton Supabase client)
│   │
│   ├── hooks/
│   │   └── useSiteData.ts        (Central data hook: fetches ALL tables, returns + refresh)
│   │
│   ├── i18n/
│   │   ├── index.ts              (i18next init with LanguageDetector)
│   │   └── local/
│   │       └── index.ts          (Auto-imports all language namespaces)
│   │
│   ├── mocks/
│   │   ├── siteData.ts           (Mock data for all tables when Supabase is offline)
│   │   └── reviews.ts            (Mock customer reviews)
│   │
│   ├── pages/
│   │   ├── NotFound.tsx          (404 page)
│   │   │
│   │   ├── home/
│   │   │   ├── page.tsx          (Homepage assembly: all sections)
│   │   │   ├── components/
│   │   │   │   ├── Navbar.tsx           (Sticky nav, mobile menu, owner login modal)
│   │   │   │   ├── HeroSection.tsx      (Video bg + image fallback slider + estimate form)
│   │   │   │   ├── StatsBar.tsx         (Animated count-up statistics)
│   │   │   │   ├── AboutSection.tsx     (Image + text, editable via CMS)
│   │   │   │   ├── FreeConsultationBanner.tsx  (Image banner with CTA)
│   │   │   │   ├── ServicesSection.tsx  (3 service cards + sidebar banner)
│   │   │   │   ├── PerformanceSection.tsx (Video left + animated bars right)
│   │   │   │   ├── HowItWorksSection.tsx (4-step process cards)
│   │   │   │   ├── ReviewsSection.tsx   (Google reviews grid + pagination)
│   │   │   │   ├── CTASection.tsx       (Final call-to-action banner)
│   │   │   │   └── Footer.tsx           (4-column footer with map embed)
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx          (About Us: hero video, story, stats, FAQ accordion, values)
│   │   │
│   │   ├── services/
│   │   │   └── page.tsx          (Services grid: 12 video cards, mid + bottom banners)
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx          (Contact: hero video, info bar, form with readdy form, Google Map)
│   │   │
│   │   └── owner/
│   │       ├── page.tsx          (Owner panel layout with sidebar tabs + login)
│   │       └── components/
│   │           ├── SettingsEditor.tsx     (Text settings editor by category)
│   │           ├── ServicesManager.tsx    (CRUD for services table)
│   │           ├── FaqsManager.tsx          (CRUD for FAQs)
│   │           ├── HowItWorksManager.tsx    (CRUD for process steps)
│   │           ├── ValuesManager.tsx        (CRUD for company values)
│   │           ├── PerformanceManager.tsx   (CRUD for stat bars)
│   │           ├── ReviewsManager.tsx       (CRUD for customer reviews)
│   │           ├── MediaManager.tsx         (Media upload/download/delete per section)
│   │           └── ServiceVideosManager.tsx (Per-service video management)
│   │
│   └── components/             (Base/Feature folders - currently empty)
│       ├── base/
│       └── feature/
│
└── supabase/
    └── functions/
        ├── upload-media/
        │   └── index.ts          (Receives base64, uploads to storage, upserts site_media)
        ├── delete-media/
        │   └── index.ts          (Deletes from storage + site_media table)
        └── download-media/
            └── index.ts          (Fetches file from URL, returns as downloadable response)
```

---

## 6. Key Configuration Details

### Vite Config (vite.config.ts)
- Base path: `process.env.BASE_PATH || "/"`
- Alias: `@/` → `./src/`
- Auto-imports React hooks + react-router + react-i18next
- Build output: `dist/`

### Routing (src/router/config.tsx)
| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About Us |
| `/services` | Services |
| `/contact` | Contact |
| `/owner` | Owner Panel (CMS) |

---

## 7. Form Endpoints (Readdy Forms)

1. **Hero Estimate Form**: `https://readdy.ai/api/form/d7klsf767esg4j665a7g`
2. **Contact Page Form**: `https://readdy.ai/api/form/d7klsf767esg4j665a80`

---

## 8. Google Assets

- **Search Console**: Verified (`googlebd05e45c976c9661.html`)
- **Maps Embed**: 1704 N Arendell Ave, Zebulon, NC 27597
- **Business Schema**: `AutoRepair` type with opening hours, geo coords, sameAs links

---

## 9. How to Rebuild This Project Locally

### Step 1: Prerequisites
- Node.js 18+
- npm or pnpm

### Step 2: Create project
```bash
npm create vite@latest angels-paint -- --template react-ts
cd angels-paint
npm install
```

### Step 3: Install dependencies
```bash
npm install react-router-dom i18next react-i18next i18next-browser-languagedetector @supabase/supabase-js lucide-react recharts firebase @stripe/react-stripe-js
npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react typescript-eslint unplugin-auto-import
npx tailwindcss init -p
```

### Step 4: Copy all source files
Copy everything from `src/` and `supabase/functions/` into the new project.

### Step 5: Configure environment
Create `.env`:
```
VITE_PUBLIC_SUPABASE_URL=https://xyonfkdrlvydtkrvxofc.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_4iQdbsgmrcyOK9wFt2BgUw_Xag54Xp2
```

### Step 6: Build
```bash
npm run build
```
Output will be in `dist/` — deploy this to any static host (Vercel, Netlify, etc.)

---

## 10. What You Own vs. What Depends on Platforms

| Asset | Owner | Notes |
|-------|-------|-------|
| Source Code | ✅ You | Full React source in this project |
| Domain | ✅ You | Purchased via Vercel (~$11/yr) |
| Vercel Deploy | ✅ You | Connected to your account |
| Supabase DB | ✅ You | Your project: `xyonfkdrlvydtkrvxofc` |
| Supabase Storage | ✅ You | `site-media` bucket with your files |
| Edge Functions | ✅ You | 3 functions deployed in your Supabase project |
| Readdy Editor Access | ⚠️ Readdy | Needed only for AI edits; site stays live without it |
| Media Files URLs | ⚠️ Mixed | Some stored on `storage.readdy-site.link` (Readdy CDN) — consider migrating to Supabase Storage for full ownership |

---

## 11. Recommended Backup Actions

1. **Download this file tree** from the Readdy editor periodically
2. **Export your Supabase data** via Supabase Dashboard → Database → Backup
3. **Save your media files** — download originals from the Owner Panel Media Manager
4. **Keep your Vercel + domain login** safe — this is your hosting lifeline

---

## 12. Owner Panel Login

Two methods available:
1. **Supabase Auth** — Email/password (configured in Supabase)
2. **Legacy** — Username: `owner` / Password: `angel2024`

---

*This backup document ensures that even in a worst-case scenario, any developer can reconstruct your entire website from scratch using the information above.*