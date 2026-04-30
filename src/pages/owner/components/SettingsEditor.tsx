import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSiteData } from '@/hooks/useSiteData';

interface Props {
  category: string;
  title: string;
  icon: string;
  keys: string[];
}

const LABELS: Record<string, string> = {
  hero_title: 'Main Headline',
  hero_subtitle: 'Subtitle / Description',
  hero_location_badge: 'Location Badge',
  hero_cta_primary: 'Primary Button Text',
  hero_cta_secondary: 'Secondary Button Text',
  hero_form_title: 'Form Title',
  hero_form_subtitle: 'Form Subtitle',
  stat_years_value: 'Years Value',
  stat_years_label: 'Years Label',
  stat_years_desc: 'Years Description',
  stat_cars_value: 'Cars Value',
  stat_cars_label: 'Cars Label',
  stat_cars_desc: 'Cars Description',
  stat_satisfaction_value: 'Satisfaction Value',
  stat_satisfaction_label: 'Satisfaction Label',
  stat_satisfaction_desc: 'Satisfaction Description',
  stat_rating_value: 'Rating Value',
  stat_rating_label: 'Rating Label',
  stat_rating_desc: 'Rating Description',
  about_section_subtitle: 'Section Subtitle',
  about_section_title: 'Section Title',
  about_body_1: 'Paragraph 1',
  about_body_2: 'Paragraph 2',
  cta_title: 'CTA Title',
  cta_subtitle: 'CTA Subtitle',
  cta_body: 'Body Text',
  cta_button_text: 'Button Text',
  contact_phone_1: 'Phone Number 1',
  contact_phone_2: 'Phone Number 2',
  contact_email: 'Email Address',
  contact_address: 'Business Address',
  contact_instagram: 'Instagram Handle',
  contact_facebook: 'Facebook Handle',
  contact_hours_weekdays: 'Weekday Hours',
  contact_hours_saturday: 'Saturday Hours',
  contact_hours_sunday: 'Sunday Hours',
  contact_bilingual_note: 'Bilingual Note',
};

export default function SettingsEditor({ category, title, icon, keys }: Props) {
  const { settings, refresh } = useSiteData();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const obj: Record<string, string> = {};
    keys.forEach((k) => { obj[k] = settings[k] || ''; });
    setValues(obj);
  }, [settings, keys]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const updates = keys.map((key) => ({
        key,
        value: values[key] || '',
        category,
      }));
      const { error: upsertError } = await supabase.from('site_settings').upsert(updates, { onConflict: 'key' });
      if (upsertError) throw upsertError;
      setSaved(true);
      refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const isLong = (key: string) => key.includes('_body') || key.includes('_desc') || key.includes('_subtitle');

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-xl">
          <i className={`${icon} text-[#2db84b] text-lg`}></i>
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <p className="text-gray-500 text-xs">Edit text fields and click Save Changes</p>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-xl p-6 space-y-5">
        {keys.map((key) => (
          <div key={key}>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              {LABELS[key] || key}
            </label>
            {isLong(key) ? (
              <textarea
                value={values[key] || ''}
                onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                rows={3}
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2db84b] transition-colors resize-none"
              />
            ) : (
              <input
                type="text"
                value={values[key] || ''}
                onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2db84b] transition-colors"
              />
            )}
          </div>
        ))}

        {error && (
          <div className="bg-[#c0392b]/10 border border-[#c0392b]/30 rounded-lg px-4 py-3 flex items-center gap-3">
            <i className="ri-error-warning-line text-[#c0392b]"></i>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#2db84b] hover:bg-[#25a040] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer text-sm flex items-center gap-2"
          >
            {saving ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i> Saving...
              </>
            ) : (
              <>
                <i className="ri-save-line"></i> Save Changes
              </>
            )}
          </button>
          {saved && (
            <span className="text-[#2db84b] text-sm font-semibold flex items-center gap-1">
              <i className="ri-checkbox-circle-line"></i> Saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}