import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '@/hooks/useSiteData';
import type { MediaItem } from '@/hooks/useSiteData';

const FORM_URL = 'https://readdy.ai/api/form/d7klsf767esg4j665a7g';

function getMediaUrl(media: MediaItem[], section: string, slot: string): string | null {
  const item = media.find((m) => m.section === section && m.slot === slot && m.is_active);
  return item?.url || null;
}

export default function HeroSection() {
  const { settings, media } = useSiteData();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [imgCurrent, setImgCurrent] = useState(0);

  // Build media arrays from database
  const heroVideo = getMediaUrl(media, 'hero', 'video');
  const heroImages = [
    getMediaUrl(media, 'hero', 'image_1'),
    getMediaUrl(media, 'hero', 'image_2'),
    getMediaUrl(media, 'hero', 'image_3'),
  ].filter(Boolean) as string[];

  // Fallbacks if no media in database
  const videoSrc = heroVideo || '';
  const imageSources = heroImages.length > 0 ? heroImages : [
    'https://readdy.ai/api/search-image?query=Professional%20auto%20body%20repair%20workshop%20interior%20with%20modern%20equipment%2C%20clean%20organized%20workspace%2C%20spray%20painting%20booth%20with%20bright%20lighting%2C%20cars%20being%20restored%20in%20a%20premium%20garage%20environment%2C%20cinematic%20wide%20shot%2C%20dark%20moody%20atmosphere%20with%20dramatic%20lighting%2C%20high%20end%20automotive%20shop%2C%20sharp%20details&width=1920&height=1080&seq=102&orientation=landscape',
    'https://readdy.ai/api/search-image?query=Luxury%20car%20with%20flawless%20glossy%20paint%20finish%20after%20professional%20collision%20repair%2C%20parked%20inside%20a%20modern%20auto%20body%20shop%2C%20bright%20LED%20lights%20reflecting%20on%20perfect%20paint%20surface%2C%20dark%20charcoal%20and%20green%20color%20palette%2C%20wide%20angle%20cinematic%20composition%2C%20premium%20automotive%20photography&width=1920&height=1080&seq=103&orientation=landscape',
    'https://readdy.ai/api/search-image?query=Auto%20body%20technician%20spray%20painting%20a%20car%20panel%20in%20a%20professional%20paint%20booth%2C%20wearing%20protective%20gear%2C%20dramatic%20backlighting%20with%20green%20and%20dark%20tones%2C%20professional%20automotive%20workshop%20atmosphere%2C%20sharp%20focus%20on%20painting%20process%2C%20cinematic%20photography%20style&width=1920&height=1080&seq=104&orientation=landscape',
  ];

  useEffect(() => {
    if (!useVideo) {
      const timer = setInterval(() => {
        setImgCurrent((prev) => (prev + 1) % imageSources.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [useVideo, imageSources.length]);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => setUseVideo(false));
    } else if (!videoSrc) {
      setUseVideo(false);
    }
  }, [videoSrc]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('loading');
    const form = e.currentTarget;
    const data = new URLSearchParams(new FormData(form) as unknown as URLSearchParams);
    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <section className="relative w-full min-h-[100vh] flex items-center overflow-hidden">
      {useVideo ? (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: '50% 0%' }}
            onError={() => setUseVideo(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/75 to-[#0d0d0d]/40"></div>
        </div>
      ) : (
        imageSources.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === imgCurrent ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img} alt="Angel's Paint & Autobody auto body repair Zebulon NC" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/75 to-[#0d0d0d]/40"></div>
          </div>
        ))
      )}

      {!useVideo && (
        <>
          <button
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#2db84b]/60 border border-white/20 rounded-full text-white transition-all duration-200 cursor-pointer"
            aria-label="Previous slide"
            onClick={() => setImgCurrent((prev) => (prev - 1 + imageSources.length) % imageSources.length)}
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <button
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#2db84b]/60 border border-white/20 rounded-full text-white transition-all duration-200 cursor-pointer"
            aria-label="Next slide"
            onClick={() => setImgCurrent((prev) => (prev + 1) % imageSources.length)}
          >
            <i className="ri-arrow-right-s-line text-xl"></i>
          </button>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {imageSources.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === imgCurrent ? 'w-6 h-2 bg-[#2db84b]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 w-full">
            <span className="inline-flex items-center gap-2 bg-[#2db84b]/15 border border-[#2db84b]/40 text-[#2db84b] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <i className="ri-map-pin-line"></i> {settings.hero_location_badge || 'Zebulon, North Carolina'}
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              {settings.hero_title || "Auto Body & Paint Experts."}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              {settings.hero_subtitle || 'Over 20 years restoring vehicles to factory condition. Collision repair, dent removal, bumper repair, headlight restoration & professional paint — all makes & models.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/contact"
                className="whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 cursor-pointer text-center"
              >
                {settings.hero_cta_primary || 'Get Your Estimate Today'}
              </Link>
              <Link
                to="/services"
                className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 cursor-pointer text-center"
              >
                {settings.hero_cta_secondary || 'View Our Work'}
              </Link>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { value: '20+', label: 'Years Experience' },
                { value: '1000+', label: 'Cars Restored' },
                { value: '100%', label: 'Satisfaction' },
                { value: '4.9', label: 'Star Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-extrabold text-[#2db84b]">{stat.value}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-[#0d0d0d]/90 backdrop-blur-sm border border-[#2db84b]/30 rounded-2xl p-8">
              <div className="mb-6 pb-5 border-b border-white/10">
                <h2 className="text-white text-2xl font-extrabold leading-snug">
                  {settings.hero_form_title || 'Get Your Estimate Today'} <span className="text-yellow-400">👇</span>
                </h2>
                <p className="text-gray-400 text-sm mt-1">{settings.hero_form_subtitle || "No obligation — we'll call you back fast"}</p>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#2db84b]/20 rounded-full mx-auto mb-4">
                    <i className="ri-checkbox-circle-line text-[#2db84b] text-3xl"></i>
                  </div>
                  <p className="text-white font-bold text-lg">Thank you!</p>
                  <p className="text-gray-400 text-sm mt-2">We&apos;ll contact you shortly to schedule your estimate.</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-6 text-[#2db84b] text-sm underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form
                  data-readdy-form="true"
                  id="hero-estimate-form"
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-white text-sm font-semibold mb-1.5">Full Name</label>
                    <input
                      placeholder="Enter Your Full Name"
                      className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:border-[#2db84b] focus:bg-white/10 transition-all"
                      name="fullName"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-1.5">Phone Number</label>
                    <input
                      placeholder="Enter Your Phone Number"
                      className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:border-[#2db84b] focus:bg-white/10 transition-all"
                      type="tel"
                      name="phone"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-1.5">Email</label>
                    <input
                      placeholder="Enter Your Email Address"
                      className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm rounded-lg px-4 py-3 outline-none focus:border-[#2db84b] focus:bg-white/10 transition-all"
                      type="email"
                      name="email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-1.5">Service Needed</label>
                    <select
                      name="serviceNeeded"
                      className="w-full bg-[#1a1a1a] border border-white/20 text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-[#2db84b] transition-all cursor-pointer"
                      required
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
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="whitespace-nowrap w-full bg-[#2db84b] hover:bg-[#25a040] disabled:opacity-60 text-white font-bold py-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer mt-1"
                  >
                    <i className="ri-send-plane-line text-base"></i>
                    {submitStatus === 'loading' ? 'Sending...' : 'Request Your Estimate'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-50">
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <i className="ri-arrow-down-line text-white text-lg animate-bounce"></i>
      </div>
    </section>
  );
}