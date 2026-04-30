import { useState, useRef } from 'react';
import Navbar from '@/pages/home/components/Navbar';
import Footer from '@/pages/home/components/Footer';
import { useSiteData } from '@/hooks/useSiteData';
import type { MediaItem } from '@/hooks/useSiteData';

function getMediaUrl(media: MediaItem[], section: string, slot: string): string | null {
  const item = media.find((m) => m.section === section && m.slot === slot && m.is_active);
  return item?.url || null;
}

const LOGO_FALLBACK = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/9609bc3b-0aa0-443e-8520-8dfcf0ad1b8d_WhatsApp-Image-2026-04-18-at-11.57.37-AM-1.png?v=f52a13492fc7a7aafc58abb343ad34f6';
const FORM_URL = 'https://readdy.ai/api/form/d7klsf767esg4j665a80';
const HERO_VIDEO_FALLBACK = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/ccdfcd3f-40de-42b6-8a3d-d9462bac3f0c_freepik_camera-orbits-around-and-_2820339219.mp4?v=02f62e0c92a16b015201b27e502a266b';

export default function ContactPage() {
  const { settings, media } = useSiteData();
  const logoUrl = getMediaUrl(media, 'brand', 'logo') || LOGO_FALLBACK;
  const heroVideo = getMediaUrl(media, 'contact', 'hero_video') || HERO_VIDEO_FALLBACK;
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();
    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    if (charCount > 500) {
      setError('Message cannot exceed 500 characters.');
      return;
    }
    setSubmitting(true);
    try {
      const data = new URLSearchParams();
      const elements = form.elements;
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        if (el.name) data.append(el.name, el.value);
      }
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setSubmitted(true);
        formRef.current?.reset();
        setCharCount(0);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-[80px]">
        {/* Hero Banner */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-label="Contact Angel's Paint & Autobody Zebulon North Carolina"
              className="w-full h-full object-cover object-center"
              src={heroVideo}
            />
            <div className="absolute inset-0 bg-[#111111]/75"></div>
          </div>
          <div className="relative z-10 py-16 text-center">
            <div className="inline-block bg-[#0d0d0d] border border-[#2db84b]/40 px-16 py-6 rounded-lg border-b-4 border-[#2db84b]">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase">Contact Us</h1>
            </div>
          </div>
        </section>

        {/* Contact Info Bar */}
        <section className="w-full bg-[#1a1a1a] border-t-4 border-[#2db84b]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
            <a href={`tel:+1${settings.contact_phone_1?.replace(/\D/g, '') || '19195324509'}`} className="group flex items-center gap-5 px-8 py-7 cursor-pointer hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full shrink-0 group-hover:bg-[#e8b84b] transition-all duration-300">
                <i className="ri-phone-fill text-white group-hover:text-[#111111] text-xl transition-colors duration-300"></i>
              </div>
              <div>
                <p className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest">Call Us Directly</p>
                <p className="text-white font-bold text-base mt-0.5">{settings.contact_phone_1 || '(919) 532-4509'}</p>
                <p className="text-white font-bold text-sm mt-0.5">{settings.contact_phone_2 || '(919) 375-4899'}</p>
                <p className="text-white/70 text-xs mt-0.5">{settings.contact_bilingual_note || 'English & Spanish spoken'}</p>
              </div>
            </a>
            <a href={`mailto:${settings.contact_email || 'rivera8405@gmail.com'}`} className="group flex items-center gap-5 px-8 py-7 cursor-pointer hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full shrink-0 group-hover:bg-[#e8b84b] transition-all duration-300">
                <i className="ri-mail-line text-white group-hover:text-[#111111] text-xl transition-colors duration-300"></i>
              </div>
              <div>
                <p className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest">Email Us</p>
                <p className="text-white font-bold text-sm mt-0.5">{settings.contact_email || 'rivera8405@gmail.com'}</p>
              </div>
            </a>
            <a href="https://www.instagram.com/angelspaintauto" target="_blank" rel="nofollow noopener noreferrer" className="group flex items-center gap-5 px-8 py-7 cursor-pointer hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full shrink-0 group-hover:bg-[#e8b84b] transition-all duration-300">
                <i className="ri-instagram-line text-white group-hover:text-[#111111] text-xl transition-colors duration-300"></i>
              </div>
              <div>
                <p className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest">Follow Us</p>
                <p className="text-white font-bold text-sm mt-0.5">{settings.contact_instagram || '@angelspaintauto'}</p>
              </div>
            </a>
            <div className="group flex items-center gap-5 px-8 py-7">
              <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full shrink-0">
                <i className="ri-map-pin-fill text-white text-xl"></i>
              </div>
              <div>
                <p className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest">Our Location</p>
                <p className="text-white font-bold text-sm mt-0.5">{settings.contact_address || '1704 N Arendell Ave, Zebulon, NC 27597'}</p>
                <p className="text-white/70 text-xs">Zebulon, NC 27597</p>
              </div>
            </div>
          </div>
        </section>

        {/* Form + Info */}
        <section className="bg-[#0d0d0d] py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-stretch gap-8">
              {/* Left Info Card */}
              <div className="w-full lg:w-[38%]">
                <div className="h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#111111] to-[#1a0a00] p-10 text-center min-h-[420px] border border-[#c0392b]/30">
                  <img
                    alt="Angel's Paint & Autobody Logo"
                    className="w-36 h-auto object-contain mb-6 rounded-xl"
                    src={logoUrl}
                  />
                  <h2 className="text-white text-xl font-extrabold leading-snug">
                    Angel&apos;s Paint &amp;<br /><span className="text-[#e8b84b]">Autobody</span>
                  </h2>
                  <p className="text-white/60 text-sm mt-3 leading-relaxed max-w-xs">
                    Professional auto body &amp; paint services in Zebulon, North Carolina. Serving the area for over 20 years.
                  </p>
                  <div className="mt-6 w-full bg-white/5 rounded-xl px-5 py-4 text-left">
                    <p className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest mb-2">Business Hours</p>
                    <div className="flex justify-between text-white text-xs mb-1">
                      <span>Monday – Friday</span>
                      <span className="font-semibold">{settings.contact_hours_weekdays || '9:00 AM – 6:00 PM'}</span>
                    </div>
                    <div className="flex justify-between text-white/50 text-xs mb-1">
                      <span>Saturday</span>
                      <span>{settings.contact_hours_saturday || 'Closed'}</span>
                    </div>
                    <div className="flex justify-between text-white/50 text-xs">
                      <span>Sunday</span>
                      <span>{settings.contact_hours_sunday || 'Closed'}</span>
                    </div>
                    <p className="text-[#2db84b] text-xs mt-3 flex items-center gap-1.5">
                      <i className="ri-translate-2"></i>{settings.contact_bilingual_note || 'English & Spanish spoken'}
                    </p>
                  </div>
                  <div className="mt-5 w-full bg-white/5 rounded-xl px-5 py-4 text-left">
                    <p className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest mb-3">Service Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {['Zebulon', 'Wendell', 'Knightdale', 'Wake Forest', 'Raleigh', 'Clayton', 'Garner'].map((area) => (
                        <span key={area} className="text-white/70 text-xs bg-white/10 px-2 py-1 rounded-full">{area}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="w-full lg:w-[62%]">
                <div className="bg-white rounded-2xl p-8 md:p-10 h-full">
                  <span className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest">Send Us a Message</span>
                  <h2 className="text-2xl font-extrabold text-[#111111] mt-2 mb-1 leading-snug">
                    Let&apos;s Discuss Your Vehicle Repair
                  </h2>
                  <div className="w-12 h-1 bg-[#2db84b] rounded-full mb-7 mt-3"></div>

                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-[#e8b84b]/20 rounded-full mb-4">
                        <i className="ri-check-line text-[#c0392b] text-3xl"></i>
                      </div>
                      <h3 className="text-xl font-extrabold text-[#111111] mb-2">Message Sent!</h3>
                      <p className="text-gray-500 text-sm">Thank you for reaching out. We&apos;ll get back to you within 24–48 hours.</p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-8 py-3 rounded-full text-sm transition-all cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form
                      ref={formRef}
                      id="contact-page-form"
                      data-readdy-form={true}
                      className="flex flex-col gap-5"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                            Your Name <span className="text-[#c0392b]">*</span>
                          </label>
                          <input
                            name="name"
                            placeholder="Enter Your Full Name"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c0392b] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-semibold mb-1.5">Phone</label>
                          <input
                            name="phone"
                            type="tel"
                            placeholder="Enter Your Phone Number"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c0392b] transition-colors"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                            Email <span className="text-[#c0392b]">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            placeholder="Enter Your Email Address"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c0392b] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-semibold mb-1.5">Service Needed</label>
                          <select
                            name="serviceNeeded"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#c0392b] transition-colors cursor-pointer"
                            defaultValue=""
                          >
                            <option value="" disabled>Select a Service</option>
                            <option value="Collision Repair">Collision Repair</option>
                            <option value="Dent Removal">Dent Removal</option>
                            <option value="Bumper Repair">Bumper Repair</option>
                            <option value="Full Paint Job">Full Paint Job</option>
                            <option value="Spot Paint Repair">Spot Paint Repair</option>
                            <option value="Headlight Restoration">Headlight Restoration</option>
                            <option value="Rim Painting">Rim Painting</option>
                            <option value="Full Vehicle Restoration">Full Vehicle Restoration</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1.5">
                          Vehicle Info &amp; Message <span className="text-[#c0392b]">*</span>
                          <span className="text-gray-400 font-normal ml-1 text-xs">({charCount}/500)</span>
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          maxLength={500}
                          placeholder="Describe your vehicle (make, model, year), the damage, and any specific details about the repair you need..."
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c0392b] transition-colors resize-none"
                          onChange={(e) => setCharCount(e.target.value.length)}
                        ></textarea>
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting || charCount > 500}
                        className="whitespace-nowrap w-full bg-[#2db84b] hover:bg-[#25a040] disabled:opacity-60 text-white font-bold py-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <i className="ri-send-plane-line"></i>
                        {submitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Map */}
        <section className="w-full h-[420px] mt-10">
          <iframe
            title="Angel's Paint & Autobody - 1704 N Arendell Ave, Zebulon, NC 27597"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.5!2d-78.3121!3d35.8232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5b3e3e3e3e3e%3A0x1!2s1704+N+Arendell+Ave%2C+Zebulon%2C+NC+27597!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </section>
      </main>
      <Footer />
    </div>
  );
}
