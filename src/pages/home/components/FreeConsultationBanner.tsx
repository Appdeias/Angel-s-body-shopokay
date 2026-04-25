import { Link } from 'react-router-dom';

export default function FreeConsultationBanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          alt="Free auto body estimate Angel's Paint & Autobody Zebulon NC"
          className="w-full h-full object-cover object-center"
          src="https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/43b6bcbb-95e9-486f-a402-9339ffe94cc8_118159696_173432227572245_3778595294164800613_n.jpg?v=21d87e1c792f9d33e20abae9bced6785"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center">
        <span className="inline-block text-[#2db84b] text-xs font-semibold uppercase tracking-widest border border-[#2db84b]/40 rounded-full px-4 py-1 mb-4">Free Estimate</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 leading-tight">
          Request A Free Auto Body Estimate
        </h2>
        <p className="text-white/60 mt-5 text-base leading-relaxed max-w-xl mx-auto">
          Get personalized advice from our auto body specialists with no obligation. Let&apos;s discuss your vehicle repair or restoration today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            to="/contact"
            className="whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-10 py-4 rounded-full text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <i className="ri-message-3-line"></i>Talk To Our Team
          </Link>
          <a
            href="tel:+19195321509"
            className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-[#2db84b]/70 text-white font-bold px-8 py-4 rounded-full text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <i className="ri-phone-line text-[#2db84b]"></i>(919) 532-1509
          </a>
        </div>
      </div>
    </section>
  );
}
