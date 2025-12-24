import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const socialLinks = [
    { name: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { name: 'GitHub', path: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z' },
    { name: 'Discord', path: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z' },
    { name: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
  ];

  const navigationLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '/events', type: 'route' },
    { name: 'Problem Statements', href: '/problem-statements', type: 'route' },
    { name: 'Mentors', href: '#mentors' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Pricing', href: '#pricing' }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* 1. BRAND AREA */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="AI Hackfest Logo" 
                  className="w-full h-full object-contain object-center"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-black tracking-tight leading-tight mb-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.2)' }}>
                    AI Hackfest
                  </span>
                </div>
                <div className="text-sm font-medium tracking-wide leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-purple-300 to-purple-400" style={{ textShadow: '0 0 10px rgba(249, 115, 22, 0.9), 0 0 20px rgba(249, 115, 22, 0.6), 0 0 30px rgba(249, 115, 22, 0.4)' }}>
                    by CloudBlitz
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
              CloudBlitz AI HackFest - 2026 | 31st January 2026 | Maharashtra Level | 24-Hour Continuous Online Hackathon. Build AI solutions, win ₹2.2L+ prizes, and launch your career.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  aria-label={social.name}
                  className="group relative w-10 h-10 flex items-center justify-center border border-white/10 hover:border-pink-500 transition-colors bg-white/5"
                >
                  <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d={social.path} /></svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* 2. NAVIGATION LINKS */}
          <motion.div className="lg:col-span-2 lg:pl-8" variants={itemVariants}>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-pink-500 pl-3">Explore</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  {link.type === 'route' ? (
                    <Link 
                      to={link.href}
                      className="text-gray-500 hover:text-white transition-colors text-sm font-mono flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="w-1 h-1 bg-gray-700 group-hover:bg-pink-500 transition-colors"></span>
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-gray-500 hover:text-white transition-colors text-sm font-mono flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="w-1 h-1 bg-gray-700 group-hover:bg-pink-500 transition-colors"></span>
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. LEGAL LINKS */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-orange-500 pl-3">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Code of Conduct'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-500 hover:text-white transition-colors text-sm font-mono group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-gray-700 group-hover:bg-orange-500 transition-colors"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. NEWSLETTER */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Stay Updated</h4>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                // Handle newsletter signup
                const email = e.target.email.value;
                console.log('Newsletter signup:', email);
                // Add your newsletter logic here
              }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-orange-500 opacity-30 group-hover:opacity-100 transition duration-500 blur-sm"></div>
              <div className="relative flex bg-[#0a0a0a]">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter email address" 
                  required
                  className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-gray-600 text-sm font-mono"
                />
                <button 
                  type="submit"
                  className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-wider hover:bg-gray-200 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-gray-500 font-mono uppercase">System Status: Operational</span>
            </div>
          </motion.div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <motion.div 
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <p className="text-gray-600 text-xs font-mono">
            © {currentYear} Hackathon. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-mono">
            <Link to="/privacy-policy" className="text-gray-600 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="text-gray-600 hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/support" className="text-gray-600 hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;