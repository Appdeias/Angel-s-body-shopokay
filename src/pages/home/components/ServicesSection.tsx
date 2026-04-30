import { Link } from 'react-router-dom';
import { useSiteData } from '@/hooks/useSiteData';

const fallbackCards = [
  { img: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/b85bb5f2-8fb2-4e0f-b5e6-f3784c5f8c64_118211229_173432190905582_8198741353319176477_n.jpg?v=13f5e322e0000dbf776343767629b8a2', alt: "Collision Repair Angel's Paint & Autobody", icon: 'ri-car-line', title: 'Collision Repair', desc: 'Complete collision and accident repair — structural restoration, panel replacement, and full vehicle reconstruction back to pre-accident condition.' },
  { img: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/43b6bcbb-95e9-486f-a402-9339ffe94cc8_118159696_173432227572245_3778595294164800613_n.jpg?v=21d87e1c792f9d33e20abae9bced6785', alt: 'Professional Auto Paint Job', icon: 'ri-paint-brush-line', title: 'Professional Paint', desc: 'Perfect color matching, flawless clear coat application, and spot or full vehicle paint jobs that last. Every detail counts for us.' },
  { img: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/479a4b2f-56ed-48bf-88e9-4606d10552fb_471793784_1108256547423137_2076007239816172139_n.jpg?v=1c3bf58f09b7d34e6aef28d7dff99966', alt: 'Dent Removal & Bumper Repair', icon: 'ri-tools-line', title: 'Dent & Bumper Repair', desc: 'Expert dent removal, bumper repair, and minor damage restoration — making your vehicle look like the accident never happened.' },
];

export default function ServicesSection() {
  const { services: dbServices } = useSiteData();
  const allServices = dbServices.length > 0 ? dbServices.filter((s) => s.is_active) : [];
  const serviceCards = allServices.length > 0
    ? allServices.slice(0, 3).map((s) => ({
        img: s.image_url || 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/b85bb5f2-8fb2-4e0f-b5e6-f3784c5f8c64_118211229_173432190905582_8198741353319176477_n.jpg?v=13f5e322e0000dbf776343767629b8a2',
        alt: s.title,
        icon: s.icon,
        title: s.title,
        desc: s.description,
      }))
    : fallbackCards;

  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-center mb-14">
          <div className="flex-1">
            <span className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 leading-tight max-w-md">
              Professional Auto Body &amp; Paint Services You Can Trust
            </h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-sm">
              From minor dents to major collision damage, we restore every vehicle with precision and care. Every job starts with a detailed estimate and ends with a result that speaks for itself.
            </p>
            <div className="inline-flex items-center gap-3 bg-[#1a1a1a] border border-[#2db84b]/30 text-white px-6 py-3.5 rounded-xl mt-7">
              <i className="ri-emotion-happy-line text-[#2db84b] text-xl"></i>
              <div>
                <span className="text-2xl font-extrabold text-[#2db84b]">1000+</span>
                <span className="text-white font-semibold text-sm ml-2">Happy Customers</span>
                <p className="text-white/50 text-xs mt-0.5">Vehicles restored to factory condition</p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
              <img
                alt="Angel's Paint & Autobody professional auto body work"
                className="w-full h-full object-cover object-center"
                src="https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/b502f7e5-c110-4d8c-b45e-e5c884114ed5_306008280_943527826567514_1764423820803857818_n.jpg?v=375cc226bd3191296429f0751e52e345"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-5 right-5 flex flex-col gap-3 w-64">
              <div className="bg-[#111111]/95 backdrop-blur-sm rounded-xl px-4 py-3 flex items-start gap-3 border border-[#2db84b]/20">
                <div className="w-9 h-9 flex items-center justify-center bg-[#2db84b]/15 rounded-lg shrink-0 mt-0.5">
                  <i className="ri-shield-check-line text-[#2db84b] text-base"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs leading-tight">Insurance Accepted</h4>
                  <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">
                    We work with most insurance companies and guide you through the entire claims process.
                  </p>
                </div>
              </div>
              <div className="bg-[#111111]/95 backdrop-blur-sm rounded-xl px-4 py-3 flex items-start gap-3 border border-[#2db84b]/20">
                <div className="w-9 h-9 flex items-center justify-center bg-[#2db84b]/15 rounded-lg shrink-0 mt-0.5">
                  <i className="ri-file-list-3-line text-[#2db84b] text-base"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs leading-tight">Get Your Estimate</h4>
                  <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">
                    Get a detailed, no-obligation quote for your vehicle repair so you can plan with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h3 className="text-xl font-bold text-white">Quality Auto Body Repair Built to Last</h3>
          <p className="text-gray-400 text-sm max-w-md">
            From collision repair to headlight restoration, our services cover every auto body need with quality materials and expert craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceCards.map((card) => (
            <div
              key={card.title}
              className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#2db84b]/40 transition-all duration-700 hover:-translate-y-1"
            >
              <div className="w-full h-52 overflow-hidden">
                <img
                  alt={card.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  src={card.img}
                />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-xl mb-4">
                  <i className={`${card.icon} text-[#2db84b] text-lg`}></i>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="whitespace-nowrap inline-flex items-center gap-2 bg-[#2db84b] hover:bg-[#25a040] text-white font-semibold px-10 py-4 rounded-full text-sm transition-colors cursor-pointer"
          >
            View All Services <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
