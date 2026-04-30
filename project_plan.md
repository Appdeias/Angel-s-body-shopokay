# Angel's Paint & Autobody - CMS Owner Panel

## 1. Project Description
Owner-managed CMS (Content Management System) that lets the business owner edit website content directly without developer intervention. Supabase powers the data layer, and the frontend reads all editable content from the database in real time.

## 2. Page Structure
- `/` — Home (Hero, Stats, About, CTA, Services, How It Works, Performance)
- `/about` — About Us (Story, FAQ, Values)
- `/services` — Services (12 service cards)
- `/contact` — Contact (Form, Map, Info)
- `/owner` — Owner CMS Panel (edit everything)

## 3. Core Features
- [ ] Owner login with Supabase Auth
- [ ] Dashboard with editable fields for every text, number, and link on the site
- [ ] Service manager — add/edit/delete/reorder services
- [ ] FAQ manager — add/edit/delete/reorder FAQs
- [ ] Hero section editor — title, subtitle, CTA text
- [ ] Contact info editor — phone, email, address, hours, social links
- [ ] Stats editor — years, cars restored, satisfaction, rating
- [ ] Real-time preview — changes save to Supabase immediately
- [ ] All public pages read from Supabase (with mock fallback)

## 4. Data Model

### Table: site_settings
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| key | text | Setting key (e.g., "hero_title") |
| value | text | Setting value |
| category | text | Group: hero, stats, contact, about, cta |
| updated_at | timestamptz | Auto-updated |

### Table: services
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| title | text | Service name |
| description | text | Service description |
| icon | text | Remix icon class |
| video_url | text | Video URL |
| image_url | text | Image URL |
| price | text | Optional price text |
| display_order | int | Sort order |
| is_active | boolean | Show/hide |
| created_at | timestamptz | Auto |

### Table: faqs
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| question | text | FAQ question |
| answer | text | FAQ answer |
| display_order | int | Sort order |
| is_active | boolean | Show/hide |
| created_at | timestamptz | Auto |

### Table: how_it_works
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| title | text | Step title |
| description | text | Step description |
| icon | text | Remix icon class |
| display_order | int | Sort order |

### Table: values (Why Choose Us)
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| label | text | Value label |
| icon | text | Remix icon class |
| display_order | int | Sort order |

### Table: performance_bars
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| label | text | Bar label |
| value | int | Percentage (0-100) |
| display | text | Text display |
| display_order | int | Sort order |

## 5. Backend / Third-party Integration
- **Supabase**: Database + Auth for owner login and data storage
- **No Shopify or Stripe needed**

## 6. Development Phase Plan

### Phase 1: Database & Hook
- Create all Supabase tables
- Populate with current website data as defaults
- Create `useSiteData` hook that reads all data from Supabase
- Create mock data fallback files

### Phase 2: Owner Panel (CMS Dashboard)
- Redesign /owner page as full CMS dashboard
- Sections: General Settings, Hero, Stats, Services, FAQs, How It Works, Values, Performance, Contact Info
- Each section has inline edit fields
- Save button per section with success/error feedback
- Logout with Supabase Auth

### Phase 3: Wire Frontend to Database
- Replace hardcoded text in all components with dynamic data from hook
- Home: HeroSection, StatsBar, AboutSection, ServicesSection, HowItWorks, PerformanceSection, CTASection
- About: Story, FAQ, Values
- Services: Service cards from DB
- Contact: Phone, email, hours, address from DB
- Footer & Navbar: Contact info from DB

### Phase 4: Polish & Build Check
- Ensure all pages work with both real and mock data
- Final build verification