import { useEffect, useRef, useState } from 'react';

import { useSiteData } from '@/hooks/useSiteData';

function useStatsFromSettings() {
  const { settings } = useSiteData();
  const stats = [
    {
      end: parseFloat(settings.stat_years_value) || 20,
      suffix: String(settings.stat_years_value || '20+').replace(/[0-9.]/g, '').trim() || '+',
      label: settings.stat_years_label || 'Years of Experience',
      desc: settings.stat_years_desc || 'Over 20 years of trusted auto body & paint expertise in North Carolina',
      decimals: (settings.stat_years_value || '').includes('.') ? 1 : 0,
    },
    {
      end: parseFloat(settings.stat_cars_value) || 1000,
      suffix: String(settings.stat_cars_value || '1000+').replace(/[0-9.]/g, '').trim() || '+',
      label: settings.stat_cars_label || 'Cars Restored',
      desc: settings.stat_cars_desc || 'Vehicles returned to factory condition — all makes & models',
      decimals: (settings.stat_cars_value || '').includes('.') ? 1 : 0,
    },
    {
      end: parseFloat(settings.stat_satisfaction_value) || 100,
      suffix: String(settings.stat_satisfaction_value || '100%').replace(/[0-9.]/g, '').trim() || '%',
      label: settings.stat_satisfaction_label || 'Satisfaction Guaranteed',
      desc: settings.stat_satisfaction_desc || 'We do not stop until your vehicle looks like new',
      decimals: (settings.stat_satisfaction_value || '').includes('.') ? 1 : 0,
    },
    {
      end: parseFloat(settings.stat_rating_value) || 4.9,
      suffix: String(settings.stat_rating_value || '4.9').replace(/[0-9.]/g, '').trim(),
      label: settings.stat_rating_label || 'Star Rating',
      desc: settings.stat_rating_desc || 'Based on verified customer reviews across platforms',
      decimals: (settings.stat_rating_value || '').includes('.') ? 1 : 0,
    },
  ];
  return stats;
}

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

interface Stat {
  end: number;
  suffix: string;
  label: string;
  desc: string;
  decimals: number;
}

function StatItem({ end, suffix, label, desc, decimals }: Stat) {
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
  const stats = useStatsFromSettings();
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
