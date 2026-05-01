import { Link } from 'react-router-dom';
import { useSiteData } from '@/hooks/useSiteData';
import type { MediaItem } from '@/hooks/useSiteData';

function getMediaUrl(media: MediaItem[], section: string, slot: string): string | null {
  const item = media.find((m) => m.section === section && m.slot === slot && m.is_active);
  return item?.url || null;
}

const LOGO_FALLBACK = 'https://readdy.ai/api/search-image?query=Professional%20automotive%20auto%20body%20shop%20logo%20with%20a%20sleek%20car%20silhouette%20and%20paint%20spray%20elements%2C%20dark%20charcoal%20background%20with%20bright%20green%20accents%2C%20modern%20minimalist%20design%2C%20clean%20bold%20typography%20reading%20Angels%20Paint%20and%20Autobody%2C%20vector%20style%20illustration%2C%20high%20contrast%2C%20corporate%20branding&width=240&height=80&seq=101&orientation=landscape';

export default function Footer() {
  const { settings, services: dbServices, media } = useSiteData();
  const serviceList = dbServices.length > 0
    ? dbServices.filter((s) => s.is_active).map((s) => s.title)
    : [
        'Collision Repair', 'Dent Removal', 'Bumper Repair', 'Full Paint Job',
        'Spot Paint Repair', 'Headlight Restoration', 'Rim Painting', 'Full Vehicle Restoration',
      ];

  const logoUrl = getMediaUrl(media, 'brand', 'logo') || LOGO_FALLBACK;

  return (
    <footer className="bg-[#0d0d0d] text-white border-t border-[#2db84b]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img
              alt="Angel's Paint & Autobody"
              className="h-16 w-auto object-contain mb-4 rounded-lg"
              src={logoUrl}
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              {settings.company_tagline || "Professional auto body & paint services in Zebulon, North Carolina. Quality craftsmanship for over 20 years."}
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/angelspaintauto"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#2db84b] transition-colors cursor-pointer"
              >
                <i className="ri-instagram-line text-base"></i>
              </a>
              <a
                href="https://www.facebook.com/angelspaintauto"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#2db84b] transition-colors cursor-pointer"
              >
                <i className="ri-facebook-fill text-base"></i>
              </a>
              <a
                href="tel:+19195324509"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#2db84b] transition-colors cursor-pointer"
              >
                <i className="ri-phone-line text-base"></i>
              </a>
            </div>
            <div className="mt-6 rounded-xl overflow-hidden border border-white/10">
              <iframe
                title="Angel's Paint & Autobody - 1704 N Arendell Ave, Zebulon, NC 27597"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.5!2d-78.3121!3d35.8232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5b3e3e3e3e3e%3A0x1!2s1704+N+Arendell+Ave%2C+Zebulon%2C+NC+27597!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height={160}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div>
            <h4 className="text-[#2db84b] font-semibold uppercase text-xs tracking-widest mb-5">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Services', path: '/services' },
                { label: 'About Us', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-[#2db84b] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#2db84b] font-semibold uppercase text-xs tracking-widest mb-5">Services</h4>
            <ul className="flex flex-col gap-3">
              {serviceList.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-gray-400 text-sm hover:text-[#2db84b] transition-colors cursor-pointer"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#2db84b] font-semibold uppercase text-xs tracking-widest mb-5">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-map-pin-line text-[#2db84b]"></i>
                </div>
                <span className="text-gray-400 text-sm">{settings.contact_address || '1704 N Arendell Ave, Zebulon, NC 27597'}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-phone-line text-[#2db84b]"></i>
                </div>
                <div className="flex flex-col gap-1">
                  <a href={`tel:+1${settings.contact_phone_1?.replace(/\D/g, '') || '19195324509'}`} className="text-gray-400 text-sm hover:text-[#2db84b] transition-colors cursor-pointer block">
                    {settings.contact_phone_1 || '(919) 532-4509'}
                  </a>
                  <a href={`tel:+1${settings.contact_phone_2?.replace(/\D/g, '') || '19193754899'}`} className="text-gray-400 text-sm hover:text-[#2db84b] transition-colors cursor-pointer block">
                    {settings.contact_phone_2 || '(919) 375-4899'}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-mail-line text-[#2db84b]"></i>
                </div>
                <a href={`mailto:${settings.contact_email || 'rivera8405@gmail.com'}`} className="text-gray-400 text-sm hover:text-[#2db84b] transition-colors cursor-pointer block">
                  {settings.contact_email || 'rivera8405@gmail.com'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-instagram-line text-[#2db84b]"></i>
                </div>
                <a
                  href="https://www.instagram.com/angelspaintauto"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-[#2db84b] transition-colors cursor-pointer"
                >
                  {settings.contact_instagram || '@angelspaintauto'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-time-line text-[#2db84b]"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mon – Fri: {settings.contact_hours_weekdays || '9:00 AM – 6:00 PM'}</p>
                  <p className="text-gray-400 text-sm">Saturday – Sunday: {settings.contact_hours_saturday || 'Closed'}</p>
                  <p className="text-[#2db84b] text-xs mt-1">{settings.contact_bilingual_note || 'Spanish & English spoken'}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs font-medium">© 2026 Angel&apos;s Paint &amp; Autobody. All rights reserved.</p>
          <p className="text-white/50 text-xs font-medium">Zebulon, North Carolina — Serving the area for 20+ years</p>
        </div>
      </div>
    </footer>
  );
}
