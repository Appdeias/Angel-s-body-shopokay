const steps = [
  {
    icon: 'ri-customer-service-2-line',
    title: 'Free Estimate',
    desc: 'Bring your vehicle in or call us. We assess the damage, listen to your needs, and provide a detailed, no-obligation estimate.',
  },
  {
    icon: 'ri-file-list-3-line',
    title: 'Insurance Coordination',
    desc: 'We work directly with your insurance company to handle the paperwork and approvals, making the process stress-free for you.',
  },
  {
    icon: 'ri-tools-line',
    title: 'Expert Repair & Paint',
    desc: 'Our skilled technicians restore your vehicle with precision — structural repair, bodywork, and a flawless paint finish.',
  },
  {
    icon: 'ri-checkbox-circle-line',
    title: 'Final Inspection',
    desc: 'Before delivery, we do a thorough quality check to ensure every detail is perfect. Your vehicle leaves looking like new.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#2db84b] border border-[#2db84b]/40 rounded-full px-4 py-1 mb-4">
          How It Works
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-14">
          Your Vehicle Restoration Journey in Four Simple Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative bg-[#1a1a1a] border border-white/5 hover:border-[#2db84b]/30 rounded-2xl px-6 py-8 text-center flex flex-col items-center cursor-pointer transition-all duration-300"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 mt-2 bg-[#2db84b]/15 group-hover:bg-[#2db84b]/25 transition-colors">
                <i className={`${step.icon} text-[#2db84b] text-2xl`}></i>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2db84b] text-white text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="font-bold text-base mb-2 text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
