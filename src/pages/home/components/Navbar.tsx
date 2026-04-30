import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSiteData } from '@/hooks/useSiteData';
import type { MediaItem } from '@/hooks/useSiteData';

function getMediaUrl(media: MediaItem[], section: string, slot: string): string | null {
  const item = media.find((m) => m.section === section && m.slot === slot && m.is_active);
  return item?.url || null;
}

const LOGO_FALLBACK = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/9609bc3b-0aa0-443e-8520-8dfcf0ad1b8d_WhatsApp-Image-2026-04-18-at-11.57.37-AM-1.png?v=f52a13492fc7a7aafc58abb343ad34f6';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, media } = useSiteData();

  const logoUrl = getMediaUrl(media, 'brand', 'logo') || LOGO_FALLBACK;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'SERVICES', path: '/services' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser === 'owner' && loginPass === 'angel2024') {
      localStorage.setItem('angel_owner_logged_in', 'true');
      setLoginOpen(false);
      setLoginError('');
      setLoginUser('');
      setLoginPass('');
      navigate('/owner');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d0d0d] shadow-lg' : 'bg-[#0d0d0d]'}`}>
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-28">
            <Link to="/" className="flex items-center cursor-pointer">
              <img
                alt="Angel's Paint & Autobody"
                className="h-20 w-auto object-contain rounded-lg"
                src={logoUrl}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-bold tracking-wider whitespace-nowrap transition-colors duration-200 ${
                    location.pathname === link.path ? 'text-[#2db84b]' : 'text-white hover:text-[#2db84b]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a
                href={`tel:+1${settings.contact_phone_1?.replace(/\D/g, '') || '19195324509'}`}
                className="flex items-center gap-2 whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white text-lg font-bold px-7 py-3.5 rounded-full transition-colors duration-200 cursor-pointer"
              >
                <i className="ri-phone-line"></i> {settings.contact_phone_1 || '(919) 532-4509'}
              </a>
              <button
                onClick={() => {
                  setLoginOpen(true);
                  setLoginError('');
                  setLoginUser('');
                  setLoginPass('');
                }}
                className="w-11 h-11 flex items-center justify-center bg-[#1a1a1a] hover:bg-[#2db84b] border border-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Owner login"
              >
                <i className="ri-user-line text-white text-lg"></i>
              </button>
            </div>

            <button
              className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer text-white"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={`text-2xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0d0d0d] border-t border-white/10 px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-bold tracking-wider whitespace-nowrap transition-colors duration-200 ${
                  location.pathname === link.path ? 'text-[#2db84b]' : 'text-white hover:text-[#2db84b]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:+1${settings.contact_phone_1?.replace(/\D/g, '') || '19195324509'}`}
              className="whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <i className="ri-phone-line"></i> {settings.contact_phone_1 || '(919) 532-4509'}
            </a>
            <button
              onClick={() => {
                setLoginOpen(true);
                setMenuOpen(false);
                setLoginError('');
                setLoginUser('');
                setLoginPass('');
              }}
              className="whitespace-nowrap bg-[#1a1a1a] hover:bg-[#2db84b] border border-white/10 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <i className="ri-user-line"></i> Owner Access
            </button>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {loginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 w-full max-w-sm relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close login"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
            <div className="flex justify-center mb-6">
              <img
                alt="Angel's Paint & Autobody"
                className="h-16 w-auto object-contain"
                src={logoUrl}
              />
            </div>
            <h3 className="text-xl font-extrabold text-white text-center mb-1">Owner Portal</h3>
            <p className="text-gray-400 text-sm text-center mb-6">Sign in to request website updates</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="owner-user" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Username</label>
                <input
                  id="owner-user"
                  type="text"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2db84b] transition-colors"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label htmlFor="owner-pass" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
                <input
                  id="owner-pass"
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2db84b] transition-colors"
                  placeholder="Enter password"
                />
              </div>
              {loginError && (
                <p className="text-red-400 text-sm">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-[#2db84b] hover:bg-[#25a040] text-white font-bold py-3 rounded-full transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </form>
            <p className="text-gray-500 text-xs text-center mt-4">Credentials provided by your developer</p>
          </div>
        </div>
      )}
    </>
  );
}