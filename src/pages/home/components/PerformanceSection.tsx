import { useEffect, useRef, useState } from 'react';

const CLIENT_VIDEO_URL = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/7d1896c7-1fc8-458b-93d6-aa39402109ba_4324242.mp4?v=a02ffddf69245d7acd59cd30ac1e6927';

const bars = [
  { label: 'Customer Satisfaction Rate', value: 99, display: '99%' },
  { label: 'Paint Quality Standards', value: 100, display: '100%' },
  { label: 'On-Time Delivery Rate', value: 97, display: '97%' },
  { label: 'Client Referral Rate', value: 96, display: '96%' },
];

export default function PerformanceSection() {
  const [animated, setAnimated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="overflow-hidden" ref={sectionRef}>
      <div className="flex flex-col lg:flex-row min-h-[520px]">
        <div
          className="relative w-full lg:w-1/2 min-h-[340px] lg:min-h-[520px] bg-black flex items-center justify-center cursor-pointer group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onClick={handlePlayPause}
        >
          <video
            ref={videoRef}
            src={CLIENT_VIDEO_URL}
            className="w-full h-full object-cover object-center"
            playsInline
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {/* Play/Pause overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              !isPlaying || showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            <button
              className="relative z-10 w-20 h-20 flex items-center justify-center bg-[#2db84b] hover:bg-[#25a040] rounded-full transition-all duration-200 cursor-pointer"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
            >
              <i className={`${isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-white text-4xl ml-${isPlaying ? '0' : '1'}`}></i>
            </button>
          </div>
          {/* Label */}
          {!isPlaying && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
              <span className="bg-black/60 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
                Real Work — Angel&apos;s Paint &amp; Autobody
              </span>
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/2 bg-[#0d0d0d] flex flex-col justify-center px-8 md:px-16 py-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#2db84b] border border-[#2db84b]/40 rounded-full px-4 py-1 mb-5 w-fit">
            Why Choose Us
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-4">
            Auto Body Excellence Backed By<br />Real Performance
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
            Our results speak for themselves. At Angel&apos;s Paint &amp; Autobody, we hold ourselves to the highest standards on every vehicle — from the materials we use to the final inspection before delivery.
          </p>
          <div className="space-y-5">
            {bars.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-300">{bar.label}</span>
                  <span className="text-sm font-extrabold text-[#2db84b]">{bar.display}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#1a7a30] to-[#2db84b] transition-all duration-1000 ease-out"
                    style={{ width: animated ? `${bar.value}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
