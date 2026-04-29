import { Link } from 'react-router-dom';

const features = [
  { icon: 'ri-shield-check-line', label: 'Licensed & Insured' },
  { icon: 'ri-translate-2', label: 'Bilingual Team (English / Spanish)' },
  { icon: 'ri-price-tag-3-line', label: 'Honest Estimates' },
  { icon: 'ri-car-line', label: 'All Makes & Models' },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-14">
          <div className="w-full lg:w-[48%] flex justify-center">
            <div className="relative w-full max-w-[520px]">
              <img
                alt="Angel's Paint & Autobody collision repair Zebulon NC"
                className="w-full h-auto object-contain object-top"
                style={{ maxHeight: '600px' }}
                src="https://public.readdy.ai/ai/img_res/a5b2de65-7e82-420d-927e-ad1c7feca951.png"
              />
              <div className="absolute bottom-6 left-6 bg-[#0d0d0d] border border-[#2db84b]/40 text-white px-5 py-4 rounded-xl">
                <p className="text-3xl font-extrabold text-[#2db84b]">20+</p>
                <p className="text-xs text-white/70 mt-0.5">Years of Excellence</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[52%]">
            <span className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 leading-tight">
              Zebulon&apos;s Trusted Auto Body &amp; Paint Specialists
            </h2>
            <p className="text-gray-400 mt-5 text-base leading-relaxed">
              Angel&apos;s Paint &amp; Autobody is a family-owned auto body shop with over 20 years of experience restoring vehicles to their pre-accident condition. Located in Zebulon, North Carolina, we specialize in collision repair, dent removal, bumper repair, professional paint jobs, and headlight restoration.
            </p>
            <p className="text-gray-400 mt-3 text-base leading-relaxed">
              Our bilingual team (English &amp; Spanish) is committed to delivering exceptional results with honest pricing and attention to every detail. We work with most insurance companies and guide you through the entire process — from your estimate to the final delivery.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#2db84b]/15 rounded-lg shrink-0">
                    <i className={`${f.icon} text-[#2db84b] text-base`}></i>
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{f.label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="whitespace-nowrap inline-flex items-center gap-2 bg-[#2db84b] hover:bg-[#25a040] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors cursor-pointer mt-8"
            >
              Learn More About Us <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
