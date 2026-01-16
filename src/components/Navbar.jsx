import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { XMarkIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Smart navigation function
  const handleNavClick = (e, targetId) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 border-b bg-[#030712]/90 ${scrolled
            ? 'bg-[#030712]/90 backdrop-blur-md border-white/10 shadow-lg shadow-pink-500/5'
            : 'bg-[#030712]/90 border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center gap-1 cursor-pointer"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="AI Hackfest Logo"
                  className="w-full h-full object-contain object-center"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col group">
                <div className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.2)' }}>
                    AI Hackfest
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-medium tracking-wide leading-tight -mt-0.5">
                  <a href="https://cloudblitz.in/" target="_blank" rel="noopener noreferrer" className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-purple-300 to-purple-400 hover:opacity-80 transition-opacity" style={{ textShadow: '0 0 8px rgba(249, 115, 22, 0.8), 0 0 16px rgba(249, 115, 22, 0.5), 0 0 24px rgba(249, 115, 22, 0.3)' }}>
                    by CloudBlitz
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-8 items-center">
              {navLinks.map((link) => (
                link.type === 'route' ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF2D95] to-[#7030A0] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF2D95] to-[#7030A0] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => navigate('/register')}
                className="relative px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden group cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF2D95] to-[#7030A0] transition-all duration-300 group-hover:scale-105"></span>
                <span className="relative flex items-center gap-2">
                  Register
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 sm:top-20 right-0 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full sm:w-80 bg-[#030712] border-l border-white/10 z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">

          {/* Mobile Navigation Links */}
          <div className="space-y-1 mb-8">
            {navLinks.map((link, index) => (
              link.type === 'route' ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-base font-medium">{link.name}</span>
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-pink-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-base font-medium">{link.name}</span>
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-pink-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )
            ))}
          </div>

          {/* Mobile CTA/Profile Section */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/register');
              }}
              className="w-full relative px-6 py-3 rounded-xl text-base font-bold text-white overflow-hidden group cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF2D95] to-[#7030A0] transition-all duration-300 group-hover:scale-105"></span>
              <span className="relative flex items-center justify-center gap-2">
                Register Now
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            {/* Mobile Menu Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Hackathon 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;