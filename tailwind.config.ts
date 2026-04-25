import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    end: 20,
    suffix: '+',
    label: 'Years of Experience',
    desc: 'Over 20 years of trusted auto body & paint expertise in North Carolina',
    decimals: 0,
  },
  {
    end: 1000,
    suffix: '+',
    label: 'Cars Restored',
    desc: 'Vehicles returned to factory condition — all makes & models',
    decimals: 0,
  },
  {
    end: 100,
    suffix: '%',
    label: 'Satisfaction Guaranteed',
    desc: "We don't stop until your vehicle looks like new",
    decimals: 0,
  },
  {
    end: 4.9,
    suffix: '',
    label: 'Star Rating',
    desc: 'Based on verified customer reviews across platforms',
    decimals: 1,
  },
];

function useCountUp(end: number, decimals: number, duration = 2000, triggered: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, end, decimals, duration]);

  return count;
}

function StatItem({ end, suffix, label, desc, decimals }: typeof stats[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const count = useCountUp(end, decimals, 2000, triggered);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex-1 flex flex-col items-center justify-center text-center px-6 py-8">
      <div className="flex items-end gap-0.5">
        <span className="text-4xl md:text-5xl font-extrabold text-white">
          {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
        </span>
        {suffix && (
          <span className="text-2xl font-extrabold text-[#2db84b] mb-1">{suffix}</span>
        )}
      </div>
      <p className="text-[#2db84b] font-semibold text-sm mt-1">{label}</p>
      <p className="text-white/50 text-xs mt-1 leading-snug max-w-[160px]">{desc}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="w-full bg-[#1a1a1a] border-t-4 border-[#2db84b]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {stats.map((stat, i) => (
          <StatItem key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}
