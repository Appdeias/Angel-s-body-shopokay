import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden mb-16">
      <div className="absolute inset-0">
        <img
          alt="Angel's Paint & Autobody auto body repair results Zebulon NC"
          className="w-full h-full object-cover object-center"
          src="https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/479a4b2f-56ed-48bf-88e9-4606d10552fb_471793784_1108256547423137_2076007239816172139_n.jpg?v=1c3bf58f09b7d34e6aef28d7dff99966"
        />
        <div className="absolute inset-0 bg-[#0d0d0d]/85"></div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center">
        <span className="text-[#2db84b] text-sm font-semibold uppercase tracking-widest">Ready to Restore Your Vehicle?</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 leading-tight">
          Let&apos;s Make It Look <span className="text-[#2db84b]">Like New Again</span>
        </h2>
        <p className="text-gray-300 mt-5 text-lg leading-relaxed">
          From a small dent to a full collision repair — we&apos;re here to make it happen. Contact us today and get your estimate.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/contact"
            className="whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-10 py-4 rounded-full text-base transition-colors cursor-pointer"
          >
            Get Your Estimate Today
          </Link>
          <a
            href="tel:+19195321509"
            className="whitespace-nowrap bg-white/10 hover:bg-white/20 border border-[#cc2200]/60 text-white font-bold px-10 py-4 rounded-full text-base transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="ri-phone-line text-[#cc2200]"></i>(919) 532-1509
          </a>
        </div>
      </div>
    </section>
  );
}
