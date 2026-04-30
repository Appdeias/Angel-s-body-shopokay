import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '@/pages/home/components/Footer';
import SettingsEditor from './components/SettingsEditor';
import ServicesManager from './components/ServicesManager';
import FaqsManager from './components/FaqsManager';
import HowItWorksManager from './components/HowItWorksManager';
import ValuesManager from './components/ValuesManager';
import PerformanceManager from './components/PerformanceManager';
import { supabase } from '@/lib/supabase';

const LOGO = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/9609bc3b-0aa0-443e-8520-8dfcf0ad1b8d_WhatsApp-Image-2026-04-18-at-11.57.37-AM-1.png?v=f52a13492fc7a7aafc58abb343ad34f6';

type Tab = 'hero' | 'stats' | 'about' | 'cta' | 'contact' | 'services' | 'faqs' | 'howitworks' | 'values' | 'performance';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'hero', label: 'Hero & Stats', icon: 'ri-home-4-line' },
  { id: 'about', label: 'About Us', icon: 'ri-information-line' },
  { id: 'cta', label: 'CTA Section', icon: 'ri-megaphone-line' },
  { id: 'contact', label: 'Contact Info', icon: 'ri-phone-line' },
  { id: 'services', label: 'Services', icon: 'ri-car-line' },
  { id: 'faqs', label: 'FAQs', icon: 'ri-question-line' },
  { id: 'howitworks', label: 'How It Works', icon: 'ri-task-line' },
  { id: 'values', label: 'Our Values', icon: 'ri-heart-3-line' },
  { id: 'performance', label: 'Performance', icon: 'ri-bar-chart-2-line' },
];

export default function OwnerPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsLoggedIn(true);
        setUserEmail(data.session.user.email || '');
      } else {
        const legacy = localStorage.getItem('angel_owner_logged_in');
        if (legacy === 'true') {
          setIsLoggedIn(true);
        }
      }
    });
  }, []);

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPass,
    });
    if (error) {
      setLoginError(error.message);
    } else {
      setIsLoggedIn(true);
      setShowLogin(false);
      localStorage.setItem('angel_owner_logged_in', 'true');
    }
  };

  const handleLegacyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'owner' && loginPass === 'angel2024') {
      localStorage.setItem('angel_owner_logged_in', 'true');
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('angel_owner_logged_in');
    setIsLoggedIn(false);
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <img alt="Angel's Paint & Autobody" className="h-16 w-auto object-contain" src={LOGO} />
          </div>
          <h3 className="text-xl font-extrabold text-white text-center mb-1">Owner Portal</h3>
          <p className="text-gray-400 text-sm text-center mb-6">Sign in to manage your website content</p>

          {showLogin ? (
            <form onSubmit={handleSupabaseLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2db84b]" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
                <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2db84b]" placeholder="••••••••" />
              </div>
              {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
              <button type="submit" className="w-full bg-[#2db84b] hover:bg-[#25a040] text-white font-bold py-3 rounded-full transition-colors cursor-pointer">
                Sign In with Email
              </button>
              <button type="button" onClick={() => { setShowLogin(false); setLoginError(''); }} className="w-full text-gray-500 text-xs hover:text-gray-300 cursor-pointer">
                ← Back to options
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <button onClick={() => setShowLogin(true)} className="w-full bg-[#2db84b] hover:bg-[#25a040] text-white font-bold py-3 rounded-full transition-colors cursor-pointer">
                Sign In with Email
              </button>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs">or</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>
              <form onSubmit={handleLegacyLogin} className="space-y-3">
                <input type="text" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2db84b]" placeholder="Username" />
                <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2db84b]" placeholder="Password" />
                {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
                <button type="submit" className="w-full border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold py-3 rounded-full transition-colors cursor-pointer text-sm">
                  Sign In with Password
                </button>
              </form>
            </div>
          )}
          <p className="text-gray-600 text-xs text-center mt-4">CMS powered by your database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <header className="bg-[#111111] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img alt="Angel's Paint & Autobody" className="h-10 w-auto object-contain rounded" src={LOGO} />
            <span className="text-white font-bold text-sm hidden sm:block">Website Manager</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-gray-400 text-xs">{userEmail}</span>
            <Link to="/" target="_blank" className="text-gray-400 hover:text-[#2db84b] text-sm cursor-pointer flex items-center gap-1">
              <i className="ri-external-link-line"></i> View Site
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 border border-white/20 hover:border-[#c0392b] hover:text-[#c0392b] text-gray-300 text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer">
              <i className="ri-logout-box-r-line"></i> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-60 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#2db84b]/15 text-[#2db84b] border border-[#2db84b]/30'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <i className={`${tab.icon} text-base`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 bg-[#111111] border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-xs leading-relaxed">
              <i className="ri-lightbulb-line text-[#e8b84b] mr-1"></i>
              Changes you make here are saved instantly to your website. Visitors will see updates in real time.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {activeTab === 'hero' && (
            <SettingsEditor category="hero" title="Hero Section" icon="ri-home-4-line" keys={[
              'hero_title', 'hero_subtitle', 'hero_location_badge', 'hero_cta_primary', 'hero_cta_secondary', 'hero_form_title', 'hero_form_subtitle',
            ]} />
          )}
          {activeTab === 'stats' && (
            <SettingsEditor category="stats" title="Statistics Bar" icon="ri-bar-chart-line" keys={[
              'stat_years_value', 'stat_years_label', 'stat_years_desc',
              'stat_cars_value', 'stat_cars_label', 'stat_cars_desc',
              'stat_satisfaction_value', 'stat_satisfaction_label', 'stat_satisfaction_desc',
              'stat_rating_value', 'stat_rating_label', 'stat_rating_desc',
            ]} />
          )}
          {activeTab === 'about' && (
            <SettingsEditor category="about" title="About Section" icon="ri-information-line" keys={[
              'about_section_subtitle', 'about_section_title', 'about_body_1', 'about_body_2',
            ]} />
          )}
          {activeTab === 'cta' && (
            <SettingsEditor category="cta" title="Call to Action" icon="ri-megaphone-line" keys={[
              'cta_title', 'cta_subtitle', 'cta_body', 'cta_button_text',
            ]} />
          )}
          {activeTab === 'contact' && (
            <SettingsEditor category="contact" title="Contact Information" icon="ri-phone-line" keys={[
              'contact_phone_1', 'contact_phone_2', 'contact_email', 'contact_address',
              'contact_instagram', 'contact_facebook',
              'contact_hours_weekdays', 'contact_hours_saturday', 'contact_hours_sunday',
              'contact_bilingual_note',
            ]} />
          )}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'faqs' && <FaqsManager />}
          {activeTab === 'howitworks' && <HowItWorksManager />}
          {activeTab === 'values' && <ValuesManager />}
          {activeTab === 'performance' && <PerformanceManager />}
        </main>
      </div>

      <Footer />
    </div>
  );
}