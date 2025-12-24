import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import { XMarkIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();


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

  // Handle logout
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
  };

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
    { name: 'Events', href: '/events', type: 'route' },
    { name: 'Problem Statements', href: '/problem-statements', type: 'route' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Mentors', href: '#mentors' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-[#030712]/90 backdrop-blur-md border-white/10 shadow-lg shadow-pink-500/5' 
            : 'bg-transparent border-transparent'
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-purple-300 to-purple-400" style={{ textShadow: '0 0 8px rgba(249, 115, 22, 0.8), 0 0 16px rgba(249, 115, 22, 0.5), 0 0 24px rgba(249, 115, 22, 0.3)' }}>
                    by CloudBlitz
                  </span>
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
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                // User is logged in - show profile dropdown
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{user.mode || 'User'}</p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      
                      {/* Menu */}
                      <div className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-lg shadow-black/20 overflow-hidden z-40">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                        
                        <div className="py-2">
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              navigate('/dashboard');
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                          </button>
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              navigate('/profile/edit');
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Edit Profile
                          </button>
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              navigate('/feedback');
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Give Feedback
                          </button>
                        </div>
                        
                        <div className="border-t border-white/10 py-2">
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                // User not logged in - show register button
                <button 
                  onClick={() => navigate('/register')}
                  className="relative px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 transition-all duration-300 group-hover:scale-105"></span>
                  <span className="relative flex items-center gap-2">
                    Register
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 sm:top-20 right-0 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full sm:w-80 bg-[#030712] border-l border-white/10 z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          
          {/* Mobile Navigation Links */}
          <div className="space-y-1 mb-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
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
              </a>
            ))}
          </div>

          {/* Mobile CTA/Profile Section */}
          <div className="mt-auto pt-6 border-t border-white/10">
            {user ? (
              // User logged in - show profile
              <>
                <div className="flex items-center gap-3 p-4 mb-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    <p className="text-xs text-pink-400 capitalize mt-0.5">{user.mode || 'User'}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/profile/edit');
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/feedback');
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Give Feedback
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // User not logged in - show register button
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/register');
                }}
                className="w-full relative px-6 py-3 rounded-xl text-base font-bold text-white overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 transition-all duration-300 group-hover:scale-105"></span>
                <span className="relative flex items-center justify-center gap-2">
                  Register Now
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            )}

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