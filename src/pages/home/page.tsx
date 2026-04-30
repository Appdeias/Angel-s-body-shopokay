import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import FreeConsultationBanner from './components/FreeConsultationBanner';
import ServicesSection from './components/ServicesSection';
import PerformanceSection from './components/PerformanceSection';
import HowItWorksSection from './components/HowItWorksSection';
import ReviewsSection from './components/ReviewsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <AboutSection />
        <FreeConsultationBanner />
        <ServicesSection />
        <PerformanceSection />
        <HowItWorksSection />
        <ReviewsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
