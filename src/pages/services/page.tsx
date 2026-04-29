import { Link } from 'react-router-dom';
import Navbar from '@/pages/home/components/Navbar';
import Footer from '@/pages/home/components/Footer';

const servicesTop = [
  {
    title: 'Collision Repair',
    icon: 'ri-car-line',
    description: 'Complete collision and accident repair — structural restoration, panel replacement, chassis alignment, and full vehicle reconstruction back to pre-accident condition.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/7cdab340-3876-4225-9a64-2193c2721fc9_freepik_camera-orbits-around-and-_2820358579.mp4?v=bc541642eb95bb92648aa233a32faf68',
  },
  {
    title: 'Dent Removal',
    icon: 'ri-hammer-line',
    description: 'Expert dent and abolladura removal for all types of damage — from minor dings to major dents. We restore your vehicle\'s body to its original smooth finish.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/45855254-0e5a-4675-9593-11d17a86bf94_freepik_camera-orbits-around-and-_2820358703.mp4?v=7cde472ed4a6156f4e7a4925fcd72296',
  },
  {
    title: 'Bumper Repair',
    icon: 'ri-shield-line',
    description: 'Professional bumper repair and replacement for front and rear bumpers. We restore cracked, dented, or scratched bumpers to factory condition.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/ccdfcd3f-40de-42b6-8a3d-d9462bac3f0c_freepik_camera-orbits-around-and-_2820339219.mp4?v=02f62e0c92a16b015201b27e502a266b',
  },
  {
    title: 'Full Paint Job',
    icon: 'ri-paint-brush-line',
    description: 'Complete vehicle paint jobs with perfect color matching, flawless clear coat application, and a professional finish that lasts for years.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/d8b81372-fec2-4d73-88f7-09bcc0f15ee6_freepik_camera-orbits-around-and-_2820339083.mp4?v=6aa85fd325eed65d0bee4fd98b5444df',
  },
  {
    title: 'Spot Paint Repair',
    icon: 'ri-focus-3-line',
    description: 'Precise spot paint repair for scratches, chips, and small damaged areas. We match your vehicle\'s exact color for a seamless, invisible repair.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/7edd9e06-3034-46b0-8ad1-f0c3c875a534_freepik_camera-orbits-around-and-_2820338995.mp4?v=19cb6a3ecd2c106b8ea5e4c3df5853f7',
  },
  {
    title: 'Headlight Restoration',
    icon: 'ri-flashlight-line',
    description: 'Professional headlight restoration to remove yellowing, cloudiness, and oxidation — restoring clarity and improving your vehicle\'s safety and appearance.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/3c7580fd-3313-4d31-bff9-82974a2e929f_freepik_camera-orbits-around-and-_2820309600.mp4?v=8d0f6593a92419462d3deff790155eab',
  },
];

const servicesBottom = [
  {
    title: 'Rim Painting',
    icon: 'ri-circle-line',
    description: 'Custom rim painting and refinishing to give your wheels a fresh, professional look. Available in any color to match or complement your vehicle.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/efb48df9-67ba-47be-a24f-9e5d1be8e66c_freepik_camera-orbits-around-and-_2820300955.mp4?v=1296e5f3d445374c6a6576ef79fbaad8',
  },
  {
    title: 'Clear Coat Application',
    icon: 'ri-drop-line',
    description: 'Professional clear coat application for maximum paint protection, UV resistance, and a deep, glossy finish that protects your vehicle\'s paint for years.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/c201e19a-8b63-491f-ba0e-55465d168274_freepik_camera-orbits-around-and-_2820389341.mp4?v=9e06c4fd164c233e2271c4f3f6ea53b3',
  },
  {
    title: 'Structural Repair',
    icon: 'ri-building-line',
    description: 'Expert auto body framework and structural repair after major accidents. We restore your vehicle\'s structural integrity to ensure safety and proper alignment.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/98f39d57-b68c-4614-b85a-fb3d0d2be466_freepik_camera-orbits-around-and-_2820389304.mp4?v=c03c3fc07a938ced0c37709d1597a13c',
  },
  {
    title: 'Panel Replacement',
    icon: 'ri-layout-2-line',
    description: 'Professional panel replacement for severely damaged body panels. We source quality parts and ensure a perfect fit and finish for every replacement.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/4760845e-097a-4aec-ba4f-8cdd57ecc8f5_freepik_camera-orbits-around-and-_2820368723-1.mp4?v=cd296f9ce143e03fef65daf56df95f9b',
  },
  {
    title: 'Color Matching',
    icon: 'ri-palette-line',
    description: 'Advanced color matching technology to perfectly replicate your vehicle\'s original paint color — ensuring a seamless, factory-quality finish every time.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/39308d08-3b9f-43e6-8a58-84ade72d0d18_freepik_camera-orbits-around-and-_2820379161.mp4?v=e38dcbc6d5d92e12994a8eda9ace80c3',
  },
  {
    title: 'Full Vehicle Restoration',
    icon: 'ri-car-washing-line',
    description: 'Complete vehicle restoration from accident damage back to pre-accident condition. We handle everything — structure, body, paint, and final detailing.',
    video: 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/384621d5-0ace-42bb-8f97-6c3dc88ac265_freepik_camera-orbits-around-and-_2820389396.mp4?v=041934cbc9cd6761e33ea7c012882ed5',
  },
];

function ServiceCard({ title, icon, description, video }: { title: string; icon: string; description: string; video: string }) {
  return (
    <div className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#2db84b]/50 transition-all duration-300">
      <div className="w-full h-52 overflow-hidden relative">
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-[#2db84b] rounded-xl">
          <i className={`${icon} text-white text-base`}></i>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to="/contact"
            className="whitespace-nowrap bg-[#2db84b] text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5"
          >
            <i className="ri-arrow-right-circle-line"></i> Get a Quote
          </Link>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-extrabold text-white text-base mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="h-0.5 bg-[#c0392b] mx-5 mb-4 rounded-full"></div>
    </div>
  );
}

export default function ServicesPage() {
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
              aria-label="Angel's Paint & Autobody auto body services Zebulon NC"
              className="w-full h-full object-cover object-center"
              src="https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/7cdab340-3876-4225-9a64-2193c2721fc9_freepik_camera-orbits-around-and-_2820358579.mp4?v=bc541642eb95bb92648aa233a32faf68"
            />
            <div className="absolute inset-0 bg-[#111111]/75"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex justify-center">
            <div className="bg-[#0d0d0d] border border-[#2db84b]/40 rounded-2xl px-16 py-7 inline-block text-center border-b-4 border-[#2db84b]">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase">Our Services</h1>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-[#111111] py-10 text-center">
          <p className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest mb-2">What We Offer</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Complete Auto Body &amp; Paint Services for Every Vehicle
          </h2>
          <div className="w-14 h-1 bg-[#2db84b] rounded-full mx-auto mt-4"></div>
        </section>

        {/* Top 6 Services */}
        <section className="pt-16 pb-10 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesTop.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* Mid CTA Banner */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              alt="Request an auto body estimate Angel's Paint & Autobody"
              className="w-full h-full object-cover object-top"
              src="https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/b502f7e5-c110-4d8c-b45e-e5c884114ed5_306008280_943527826567514_1764423820803857818_n.jpg?v=375cc226bd3191296429f0751e52e345"
            />
            <div className="absolute inset-0 bg-[#111111]/80"></div>
          </div>
          <div className="relative z-10 max-w-xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug">
              Get Your Auto Body Estimate Today
            </h2>
            <p className="text-gray-300 mt-4 text-sm leading-relaxed">
              Get personalized advice from our auto body specialists with no obligation. Let&apos;s discuss your vehicle repair today.
            </p>
            <Link
              to="/contact"
              className="whitespace-nowrap inline-flex items-center gap-2 bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-8 py-3.5 rounded-full mt-7 transition-all cursor-pointer text-sm"
            >
              Talk To Our Team <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </section>

        {/* Bottom 6 Services */}
        <section className="pt-10 pb-16 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesBottom.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative py-28 overflow-hidden flex items-center justify-center mb-16">
          <div className="absolute inset-0">
            <img
              alt="Ready to restore your vehicle with Angel's Paint & Autobody"
              className="w-full h-full object-cover object-top"
              src="https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/479a4b2f-56ed-48bf-88e9-4606d10552fb_471793784_1108256547423137_2076007239816172139_n.jpg?v=1c3bf58f09b7d34e6aef28d7dff99966"
            />
            <div className="absolute inset-0 bg-[#111111]/75"></div>
          </div>
          <div className="relative z-10 flex justify-center w-full px-4 md:px-6">
            <div className="bg-[#111111] border border-[#c0392b]/40 rounded-2xl px-10 py-10 max-w-lg w-full text-center">
              <p className="text-[#2db84b] text-xs font-semibold uppercase tracking-widest mb-3">Zebulon, North Carolina</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
                Ready to Restore Your Vehicle?<br /><span className="text-[#2db84b]">Let&apos;s Get Started.</span>
              </h2>
              <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                Your vehicle deserves to look like new. Whether you need a dent removed, a bumper repaired, or a full collision restoration — our team is ready. Get your estimate today.
              </p>
              <Link
                to="/contact"
                className="whitespace-nowrap inline-flex items-center gap-2 bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-8 py-3.5 rounded-full mt-7 transition-all cursor-pointer text-sm"
              >
                Get Your Estimate Today <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
