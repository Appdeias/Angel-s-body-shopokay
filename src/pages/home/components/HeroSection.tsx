import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '@/hooks/useSiteData';

const heroVideos = [
  'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/68362ed4-620c-4087-9f36-29db22ec9c9f_4234324.mp4?v=51689215013bc6086565cb1f9c159b96',
];

const heroImages = [
  'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/5fc89146-88d8-4b2a-92b9-69ef9ad5d823_freepik_me-encanta-esta-foto-pero_2845512436-1-1.png?v=2e3caf3efaa0b3fcdd9c91627abb8789',
  'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/b85bb5f2-8fb2-4e0f-b5e6-f3784c5f8c64_118211229_173432190905582_8198741353319176477_n.jpg?v=13f5e322e0000dbf776343767629b8a2',
  'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/43b6bcbb-95e9-486f-a402-9339ffe94cc8_118159696_173432227572245_3778595294164800613_n.jpg?v=21d87e1c792f9d33e20abae9bced6785',
];

const FORM_URL = 'https://readdy.ai/api/form/d7klsf767esg4j665a7g';

export default function HeroSection() {
  const { settings } = useSiteData();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [useVideo, setUseVideo] = useState(true);
  const [imgCurrent, setImgCurrent] = useState(0);

  useEffect(() => {
    if (!useVideo) {
      const timer = setInterval(() => {
        setImgCurrent((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [useVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setUseVideo(false));
    }
  }, []);

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
            src={heroVideos[0]}
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
        heroImages.map((img, i) => (
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
            onClick={() => setImgCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <button
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#2db84b]/60 border border-white/20 rounded-full text-white transition-all duration-200 cursor-pointer"
            aria-label="Next slide"
            onClick={() => setImgCurrent((prev) => (prev + 1) % heroImages.length)}
          >
            <i className="ri-arrow-right-s-line text-xl"></i>
          </button>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {heroImages.map((_, i) => (
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
                  {settings.hero_form_title || 'Get Your'} <span className="text-[#2db84b]">Estimate</span> Today <span className="text-yellow-400">👇</span>
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
