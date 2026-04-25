import { Link } from 'react-router-dom';

const LOGO = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/9609bc3b-0aa0-443e-8520-8dfcf0ad1b8d_WhatsApp-Image-2026-04-18-at-11.57.37-AM-1.png?v=f52a13492fc7a7aafc58abb343ad34f6';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-white border-t border-[#2db84b]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img
              alt="Angel's Paint & Autobody"
              className="h-16 w-auto object-contain mb-4 rounded-lg"
              src={LOGO}
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional auto body &amp; paint services in Zebulon, North Carolina. Quality craftsmanship for over 20 years.
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
                href="tel:+19195321509"
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
                { label: 'Projects', path: '/projects' },
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
              {[
                'Collision Repair',
                'Dent Removal',
                'Bumper Repair',
                'Full Paint Job',
                'Spot Paint Repair',
                'Headlight Restoration',
                'Rim Painting',
                'Full Vehicle Restoration',
              ].map((s) => (
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
                <span className="text-gray-400 text-sm">1704 N Arendell Ave, Zebulon, NC 27597</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-phone-line text-[#2db84b]"></i>
                </div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+19195321509" className="text-gray-400 text-sm hover:text-[#2db84b] transition-colors cursor-pointer block">
                    (919) 532-1509
                  </a>
                  <a href="tel:+19193754899" className="text-gray-400 text-sm hover:text-[#2db84b] transition-colors cursor-pointer block">
                    (919) 375-4899
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-mail-line text-[#2db84b]"></i>
                </div>
                <a href="mailto:rivera8405@gmail.com" className="text-gray-400 text-sm hover:text-[#2db84b] transition-colors cursor-pointer block">
                  rivera8405@gmail.com
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
                  @angelspaintauto
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-time-line text-[#2db84b]"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mon – Fri: 8:00 AM – 6:00 PM</p>
                  <p className="text-gray-400 text-sm">Sat: 9:00 AM – 2:00 PM</p>
                  <p className="text-[#2db84b] text-xs mt-1">Spanish &amp; English spoken</p>
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
