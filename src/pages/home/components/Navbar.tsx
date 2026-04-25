import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LOGO = 'https://storage.readdy-site.link/project_files/ff9960ac-0204-486f-8a01-cc3ae9bf753b/9609bc3b-0aa0-443e-8520-8dfcf0ad1b8d_WhatsApp-Image-2026-04-18-at-11.57.37-AM-1.png?v=f52a13492fc7a7aafc58abb343ad34f6';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d0d0d] shadow-lg' : 'bg-[#0d0d0d]'}`}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-28">
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              alt="Angel's Paint & Autobody"
              className="h-20 w-auto object-contain rounded-lg"
              src={LOGO}
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

          <a
            href="tel:+19195321509"
            className="hidden md:flex items-center gap-2 whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white text-lg font-bold px-7 py-3.5 rounded-full transition-colors duration-200 cursor-pointer"
          >
            <i className="ri-phone-line"></i> (919) 532-1509
          </a>

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
            href="tel:+19195321509"
            className="whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors duration-200 cursor-pointer text-center flex items-center justify-center gap-2"
          >
            <i className="ri-phone-line"></i> (919) 532-1509
          </a>
        </div>
      )}
    </header>
  );
}
