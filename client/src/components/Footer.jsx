import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const socialLinks = [
    { name: 'X', href: '#', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { name: 'LinkedIn', href: '#', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: 'Instagram', href: '#', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { name: 'YouTube', href: '#', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Why Participate', href: '#about' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Problem Statements', href: '#problems' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Partners', href: '#partners' },
    { name: 'Admin Dashboard', href: '/admin/dashboard', isRoute: true }
  ];

  const resources = [
    { name: 'Registration Guide', href: '/' },
    { name: 'Problem Statements', href: '/' },
    { name: 'Judging Criteria', href: '/' },
    { name: 'FAQ', href: '/' }
  ];

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
  };

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  return (
    <footer className="relative bg-[#030712] pt-24 pb-12 border-t border-white/10 overflow-hidden w-full z-10">

      {/* --- INJECTED STYLES --- */}
      <style>{`
        .scan-line {
          position: absolute; width: 100%; height: 2px; background: rgba(236, 72, 153, 0.2);
          animation: scan 4s linear infinite; opacity: 0.5;
        }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
      `}</style>

      {/* --- BACKGROUND FX --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/10 via-[#030712] to-[#030712] pointer-events-none"></div>
      <div className="scan-line"></div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-16">

          {/* 1. BRAND AREA */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="CloudBlitz AI HackFest Logo"
                  className="w-full h-full object-contain object-center"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-black tracking-tight leading-tight mb-1">
                  <span className="text-white" style={{
                    textShadow: '0 0 10px rgba(255, 45, 149, 0.5), 0 0 20px rgba(112, 48, 160, 0.3)'
                  }}>
                    AI Hackfest
                  </span>
                </div>
                <div className="text-sm font-medium tracking-wide leading-tight">
                  <a href="https://cloudblitz.in/" target="_blank" rel="noopener noreferrer" className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 hover:opacity-80 transition-opacity" style={{
                    textShadow: '0 0 8px rgba(249, 115, 22, 0.6), 0 0 16px rgba(236, 72, 153, 0.4)'
                  }}>
                    by CloudBlitz
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              A 24-hour online AI hackathon empowering students to build real-world solutions. Win ₹2.2L+ prizes, earn IIT-BHU co-branded certificates, and accelerate your career with industry-driven projects.
            </p>
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <CalendarIcon className="w-4 h-4 text-[#FF2D95]" />
                <span>Feb 28 - Mar 1, 2026 | Online 24H</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <MapPinIcon className="w-4 h-4 text-[#FF2D95]" />
                <span>Maharashtra Level Hackathon</span>
              </div>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group relative w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#FF2D95] transition-all bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-gray-400 group-hover:fill-[#FF2D95] transition-colors" viewBox="0 0 24 24"><path d={social.path} /></svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* 2. QUICK LINKS */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-[#FF2D95] pl-3">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#FF2D95] transition-colors text-sm flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#FF2D95] transition-colors"></span>
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#FF2D95] transition-colors"></span>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. RESOURCES */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-[#7030A0] pl-3">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    to={resource.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#7030A0] transition-colors"></span>
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. CONTACT & PARTNERS */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-[#FF2D95] pl-3">Contact & Support</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="w-5 h-5 text-[#FF2D95] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-xs mb-1">Email Support</p>
                  <a href="mailto:support@cloudblitz.in" className="text-white text-sm hover:text-[#FF2D95] transition-colors">
                    support@cloudblitz.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-[#FF2D95] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-xs mb-1">Registration Help</p>
                  <a href="tel:+919876543210" className="text-white text-sm hover:text-[#FF2D95] transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h5 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider">Organized By</h5>
              <div className="flex items-center gap-3 mb-4">
                <a href="https://cloudblitz.in/" target="_blank" rel="noopener noreferrer">
                  <img src="/cloudblitz_logo.png" alt="CloudBlitz" className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                </a>
                <a href="https://cloudblitz.in/" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-xs hover:text-white transition-colors">
                  CloudBlitz - EdTech & Cloud & AI Training
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a href="https://greamio.com/" target="_blank" rel="noopener noreferrer">
                  <img src="/greamio.png" alt="Greamio Technologies" className="h-6 object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                </a>
                <a href="https://greamio.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-xs hover:text-white transition-colors">
                  Powered by Greamio Technologies
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <motion.div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-gray-500">
            <p>© {currentYear} CloudBlitz AI HackFest. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <p>In partnership with <span className="text-white">IIT-BHU</span> & <span className="text-white">Greamio Technologies</span></p>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <Link to="/" className="text-gray-500 hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-500 hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-500 hover:text-white transition-colors cursor-pointer">
              Code of Conduct
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;