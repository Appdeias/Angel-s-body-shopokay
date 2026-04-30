import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  mockSiteSettings,
  mockServices,
  mockFaqs,
  mockHowItWorks,
  mockCompanyValues,
  mockPerformanceBars,
  mockMedia,
} from '@/mocks/siteData';
import { mockReviews } from '@/mocks/reviews';
import type { Review } from '@/mocks/reviews';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  video_url: string;
  image_url: string;
  price: string;
  display_order: number;
  is_active: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
}

export interface CompanyValue {
  id: string;
  label: string;
  icon: string;
  display_order: number;
}

export interface PerformanceBar {
  id: string;
  label: string;
  value: number;
  display: string;
  display_order: number;
}

export interface MediaItem {
  id: string;
  section: string;
  slot: string;
  url: string;
  type: string;
  label: string;
  is_active: boolean;
}

export interface SiteSettings {
  [key: string]: string;
}

interface SiteData {
  settings: SiteSettings;
  services: Service[];
  faqs: Faq[];
  howItWorks: HowItWorksStep[];
  companyValues: CompanyValue[];
  performanceBars: PerformanceBar[];
  reviews: Review[];
  media: MediaItem[];
  loading: boolean;
  error: string | null;
}

export function useSiteData(): SiteData & { refresh: () => void } {
  const [data, setData] = useState<SiteData>({
    settings: mockSiteSettings,
    services: mockServices,
    faqs: mockFaqs,
    howItWorks: mockHowItWorks,
    companyValues: mockCompanyValues,
    performanceBars: mockPerformanceBars,
    reviews: mockReviews,
    media: mockMedia,
    loading: true,
    error: null,
  });

  const fetchAll = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [
        settingsRes,
        servicesRes,
        faqsRes,
        howItWorksRes,
        valuesRes,
        performanceRes,
        reviewsRes,
        mediaRes,
      ] = await Promise.all([
        supabase.from('site_settings').select('*').order('key'),
        supabase.from('services').select('*').order('display_order', { ascending: true }),
        supabase.from('faqs').select('*').order('display_order', { ascending: true }),
        supabase.from('how_it_works').select('*').order('display_order', { ascending: true }),
        supabase.from('company_values').select('*').order('display_order', { ascending: true }),
        supabase.from('performance_bars').select('*').order('display_order', { ascending: true }),
        supabase.from('reviews').select('*').order('display_order', { ascending: true }),
        supabase.from('site_media').select('*').order('display_order', { ascending: true }),
      ]);

      const settings: SiteSettings = { ...mockSiteSettings };
      if (settingsRes.data && !settingsRes.error) {
        settingsRes.data.forEach((row: { key: string; value: string }) => {
          settings[row.key] = row.value;
        });
      }

      setData({
        settings,
        services: (servicesRes.data && !servicesRes.error && (servicesRes.data as unknown[]).length > 0) ? servicesRes.data : mockServices,
        faqs: (faqsRes.data && !faqsRes.error && (faqsRes.data as unknown[]).length > 0) ? faqsRes.data : mockFaqs,
        howItWorks: (howItWorksRes.data && !howItWorksRes.error && (howItWorksRes.data as unknown[]).length > 0) ? howItWorksRes.data : mockHowItWorks,
        companyValues: (valuesRes.data && !valuesRes.error && (valuesRes.data as unknown[]).length > 0) ? valuesRes.data : mockCompanyValues,
        performanceBars: (performanceRes.data && !performanceRes.error && (performanceRes.data as unknown[]).length > 0) ? performanceRes.data : mockPerformanceBars,
        reviews: (reviewsRes.data && !reviewsRes.error && (reviewsRes.data as unknown[]).length > 0) ? (reviewsRes.data as Review[]) : mockReviews,
        media: (mediaRes.data && !mediaRes.error && (mediaRes.data as unknown[]).length > 0) ? (mediaRes.data as MediaItem[]) : mockMedia,
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((prev) => ({ ...prev, loading: false, error: 'Failed to load site data' }));
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { ...data, refresh: fetchAll };
}