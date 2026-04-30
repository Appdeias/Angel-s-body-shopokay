import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/pages/home/components/Navbar';
import Footer from '@/pages/home/components/Footer';
import { useSiteData } from '@/hooks/useSiteData';
import type { MediaItem } from '@/hooks/useSiteData';

function getMediaUrl(media: MediaItem[], section: string, slot: string): string | null {
  const item = media.find((m) => m.section === section && m.slot === slot && m.is_active);
  return item?.url || null;
}

const ABOUT_HERO_FALLBACK = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/d8b81372-fec2-4d73-88f7-09bcc0f15ee6_freepik_camera-orbits-around-and-_2820339083.mp4?v=6aa85fd325eed65d0bee4fd98b5444df';
const STORY_VIDEO_FALLBACK = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/e2caf9a1-26a5-4761-b082-84d1cd945e77_Video-Project-145.mp4?v=c7f57c5ba59c75f818102b15fd3f2750';
const ESTIMATE_FALLBACK = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/43b6bcbb-95e9-486f-a402-9339ffe94cc8_118159696_173432227572245_3778595294164800613_n.jpg?v=21d87e1c792f9d33e20abae9bced6785';
const FAQ_IMAGE_FALLBACK = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/479a4b2f-56ed-48bf-88e9-4606d10552fb_471793784_1108256547423137_2076007239816172139_n.jpg?v=1c3bf58f09b7d34e6aef28d7dff99966';
const VALUES_IMAGE_FALLBACK = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/b502f7e5-c110-4d8c-b45e-e5c884114ed5_306008280_943527826567514_1764423820803857818_n.jpg?v=375cc226bd3191296429f0751e52e345';

export default function AboutPage() {
  const { settings, faqs, companyValues, media } = useSiteData();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aboutHeroVideo = getMediaUrl(media, 'about_page', 'hero_video') || ABOUT_HERO_FALLBACK;
  const storyVideo = getMediaUrl(media, 'about_page', 'story_video') || STORY_VIDEO_FALLBACK;
  const estimateBanner = getMediaUrl(media, 'about_page', 'estimate_banner') || ESTIMATE_FALLBACK;
  const faqImage = getMediaUrl(media, 'about_page', 'faq_image') || FAQ_IMAGE_FALLBACK;
  const valuesImage = getMediaUrl(media, 'about_page', 'values_image') || VALUES_IMAGE_FALLBACK;

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative pt-36 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-label="About Angel's Paint & Autobody auto body shop Zebulon NC"
              className="w-full h-full object-cover object-center"
              src={aboutHeroVideo}
            />
            <div className="absolute inset-0 bg-[#111111]/75"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 flex justify-center">
            <div className="bg-[#0d0d0d] border border-[#2db84b]/40 rounded-2xl px-16 py-7 inline-block text-center border-b-4 border-[#2db84b]">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase">About Us</h1>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1">
                <span className="text-[#2db84b] text-xs font-bold uppercase tracking-widest">OUR STORY</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 leading-tight">
                  {settings.about_section_title || "Zebulon's Trusted Auto Body & Paint Specialists for 20+ Years"}
                </h2>
                <p className="text-gray-400 mt-5 text-sm leading-relaxed">
                  {settings.about_body_1 || "Angel's Paint & Autobody was founded with a clear mission: to restore vehicles to their factory condition with honesty, precision, and care. What started as a family-driven operation has grown into a trusted auto body shop serving Zebulon and surrounding areas of North Carolina for over two decades."}
                </p>
                <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                  {settings.about_body_2 || "We take the time to understand what each customer truly needs, offering tailored repair solutions that fit both their vehicle and their budget. From collision repairs and structural restoration to professional paint jobs and headlight restoration, every vehicle is handled with the same level of dedication. Our bilingual team (English & Spanish) ensures clear communication with every client."}
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <div>
                    <p className="text-xl italic text-white font-semibold">Angel&apos;s Paint &amp; Autobody</p>
                    <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-widest">Family-Owned Business</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-10">
                  {[
                    { icon: 'ri-calendar-check-line', value: settings.stat_years_value || '20+', label: settings.stat_years_label || 'Years in Business' },
                    { icon: 'ri-car-line', value: settings.stat_cars_value || '1000+', label: settings.stat_cars_label || 'Cars Restored' },
                    { icon: 'ri-medal-line', value: settings.stat_satisfaction_value || '100%', label: settings.stat_satisfaction_label || 'Satisfaction' },
                  ].map((s) => (
                    <div className="flex flex-col items-center justify-center gap-2 bg-[#111111] rounded-2xl px-4 py-6 text-center cursor-default hover:bg-[#c0392b] transition-colors">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#e8b84b]/20 rounded-full mb-1">
                        <i className={`${s.icon} text-[#2db84b] text-xl`}></i>
                      </div>
                      <p className="text-3xl font-extrabold text-white leading-none">{s.value}</p>
                      <p className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-full h-full bg-[#2db84b]/10 rounded-2xl"></div>
                  <div className="relative w-[380px] h-[480px] rounded-2xl overflow-hidden">
                    <video
                      ref={videoRef}
                      muted={false}
                      playsInline
                      preload="metadata"
                      aria-label="Angel's Paint & Autobody shop video"
                      className="w-full h-full object-cover object-center"
                      src={storyVideo}
                    />
                    {!isPlaying && (
                      <button
                        onClick={handlePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group"
                        aria-label="Play video"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2db84b] rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                          <i className="ri-play-fill text-white text-3xl md:text-4xl"></i>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-[#2db84b] text-white rounded-xl px-5 py-3 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/80">Est.</p>
                    <p className="text-2xl font-extrabold">2004</p>
                    <p className="text-xs text-white/80">Zebulon, NC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free Estimate Banner */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              alt="Auto body estimate Angel's Paint & Autobody"
              className="w-full h-full object-cover object-center"
              src={estimateBanner}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/60 to-black/65"></div>
          </div>
          <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Get Your Auto Body Estimate Today
            </h2>
            <p className="text-gray-300 mt-4 text-base max-w-xl mx-auto">
              Get personalized advice from our auto body specialists with no obligation. Let&apos;s discuss your vehicle repair today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-10 py-4 rounded-full transition-all cursor-pointer hover:scale-105"
              >
                Talk To Our Team <i className="ri-arrow-right-line"></i>
              </Link>
              <a
                href="tel:+19195324509"
                className="inline-flex items-center gap-2 whitespace-nowrap bg-white/10 hover:bg-white/20 border border-[#cc2200]/50 text-white font-bold px-10 py-4 rounded-full transition-all cursor-pointer hover:scale-105"
              >
                <i className="ri-phone-line"></i>(919) 532-4509
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 items-stretch">
            <div className="flex-1">
              <span className="text-[#2db84b] text-xs font-bold uppercase tracking-widest">FAQ</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-3 leading-snug">
                Common Questions About Angel&apos;s Paint &amp; Autobody
              </h2>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                We know that getting your vehicle repaired comes with a lot of questions. Here are some of the most common ones our customers ask before getting started.
              </p>
              <div className="mt-8 space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={faq.id}
                    className="rounded-xl overflow-hidden border border-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <button
                      className={`w-full text-left flex items-center justify-between px-5 py-4 cursor-pointer transition-colors group ${openFaq === i ? 'bg-[#2db84b]' : 'bg-[#1a1a1a] hover:bg-[#222]'}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className={`font-semibold text-sm transition-colors duration-200 ${openFaq === i ? 'text-white' : 'text-white'}`}>
                        {faq.question}
                      </span>
                      <span className="w-6 h-6 flex items-center justify-center ml-3 flex-shrink-0">
                        <i className={`text-lg transition-transform duration-300 ${openFaq === i ? 'ri-subtract-line text-white' : 'ri-add-line text-[#2db84b]'}`}></i>
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 py-4 bg-[#1a1a1a] border-t border-white/5">
                        <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-[420px] w-full flex-shrink-0">
              <div className="w-full h-full min-h-[480px] rounded-2xl overflow-hidden">
                <img
                  alt="Angel's Paint & Autobody auto body repair results"
                  className="w-full h-full object-cover object-top"
                  src={faqImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 items-stretch">
            <div className="lg:w-[460px] w-full flex-shrink-0">
              <div className="w-full h-full min-h-[460px] rounded-2xl overflow-hidden relative">
                <img
                  alt="Angel's Paint & Autobody real auto body project Zebulon NC"
                  className="w-full h-full object-cover object-center"
                  src={valuesImage}
                />
                <div className="absolute bottom-5 left-5 bg-[#111111]/90 text-white rounded-xl px-5 py-3 backdrop-blur-sm">
                  <p className="text-xs text-[#2db84b] font-bold uppercase tracking-widest">Real Project</p>
                  <p className="text-sm font-bold mt-0.5">Zebulon, North Carolina</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <span className="text-[#2db84b] text-xs font-bold uppercase tracking-widest">OUR VALUES</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-3 leading-snug">
                What Sets Angel&apos;s Paint &amp; Autobody Apart
              </h2>
              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                Every auto body shop can promise great results, but what truly defines us is how we work. At Angel&apos;s Paint &amp; Autobody, our foundation is built on a set of core values that guide every decision, every interaction, and every vehicle we restore.
              </p>
              <ul className="mt-7 space-y-2">
                {companyValues.map((v) => (
                  <li key={v.id} className="cursor-default">
                    <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#e8b84b]/10 transition-colors">
                      <div className="w-9 h-9 flex items-center justify-center bg-[#e8b84b]/20 rounded-lg flex-shrink-0">
                        <i className={`${v.icon} text-[#2db84b] text-base`}></i>
                      </div>
                      <span className="font-semibold text-sm text-gray-200">{v.label}</span>
                      <div className="ml-auto">
                        <i className="ri-arrow-right-line text-[#2db84b]"></i>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4 flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-7 py-3 rounded-full transition-all cursor-pointer hover:scale-105"
                >
                  Get Your Estimate Today <i className="ri-arrow-right-line"></i>
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 whitespace-nowrap border-2 border-white/20 text-white hover:border-[#2db84b] hover:text-[#2db84b] font-bold px-7 py-3 rounded-full transition-all cursor-pointer"
                >
                  View Our Work <i className="ri-eye-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}
