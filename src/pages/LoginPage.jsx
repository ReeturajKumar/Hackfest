/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  FingerPrintIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle, analyzing, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  // Helper to get field-specific error
  const getFieldError = (fieldName) => {
    const error = validationErrors.find((err) => err.field === fieldName);
    return error ? error.message : null;
  };

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
      setValidationErrors([]);
    }
    
    if (status !== "analyzing" && status !== "loading") {
      setStatus("analyzing");
    }
    
    // Debounce back to idle
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      if (status !== 'success' && status !== 'loading') {
        setStatus("idle");
      }
    }, 800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setValidationErrors([]);

    // Basic validation
    if (!formData.email || !formData.password) {
      setStatus("error");
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Simulate login process
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 1000);
  };

  // Helper to determine theme color based on status
  const getColor = () => {
    if (status === 'error') return 'text-red-500 border-red-500';
    if (status === 'success') return 'text-green-500 border-green-500';
    if (status === 'analyzing' || status === 'loading') return 'text-orange-500 border-orange-500';
    return 'text-cyan-500 border-cyan-500';
  };

  const getBgGlow = () => {
    if (status === 'error') return 'from-red-500/20';
    if (status === 'success') return 'from-green-500/20';
    if (status === 'analyzing') return 'from-orange-500/20';
    return 'from-cyan-500/20';
  };

  const isSubmitting = status === "loading" || status === "success";

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white relative overflow-hidden flex items-center justify-center p-4 font-mono py-20">
      
      {/* --- CSS FX --- */}
      <style>{`
        .hex-floor {
          position: absolute; width: 200%; height: 200%;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(60deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(120deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 60px 104px;
          transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px);
          animation: moveHex 20s linear infinite;
          opacity: 0.2;
        }

        .scanner-bar {
          position: absolute; left: 0; width: 100%; height: 8px;
          background: currentColor;
          box-shadow: 0 0 20px currentColor;
          opacity: 0.8;
          animation: scan 3s ease-in-out infinite;
        }

        .glitch-text { position: relative; }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        }
        .glitch-text::before { left: 2px; text-shadow: -1px 0 #ff00c1; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim-1 5s infinite linear alternate-reverse; }
        .glitch-text::after { left: -2px; text-shadow: -1px 0 #00fff9; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim-2 5s infinite linear alternate-reverse; }

        @keyframes moveHex { 0% { transform: perspective(500px) rotateX(60deg) translateY(0) translateZ(-200px); } 100% { transform: perspective(500px) rotateX(60deg) translateY(104px) translateZ(-200px); } }
        @keyframes scan { 0%, 100% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes glitch-anim-1 { 0% { clip: rect(10px, 9999px, 30px, 0); } 100% { clip: rect(80px, 9999px, 100px, 0); } }
        @keyframes glitch-anim-2 { 0% { clip: rect(90px, 9999px, 100px, 0); } 100% { clip: rect(10px, 9999px, 30px, 0); } }
      `}</style>

      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="hex-floor pointer-events-none"></div>
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${getBgGlow()} via-transparent to-transparent pointer-events-none transition-colors duration-700`}></div>

      {/* --- MAIN INTERFACE (7XL) --- */}
      <div className="max-w-7xl w-full h-[580px] relative z-10 grid grid-cols-1 lg:grid-cols-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl overflow-hidden">
        
        {/* --- LEFT: BIOMETRIC SCANNER --- */}
        <div className="hidden lg:flex flex-col relative border-r border-white/10 bg-black/40">
          
          {/* Decorative Top Bar */}
          <div className="h-12 border-b border-white/10 flex justify-between items-center px-6">
            <div className="text-[10px] text-gray-500">SECURE_CHANNEL_v9.0</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={`signal-${i}`} className={`w-1 h-3 ${i < 3 ? 'bg-cyan-500' : 'bg-gray-800'}`}></div>
              ))}
            </div>
          </div>

          {/* Main Scan Area */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden group">
            
            {/* The Scanner Beam */}
            <div className={`scanner-bar ${getColor()} transition-colors duration-500`}></div>
            
            {/* The Fingerprint/ID Visual */}
            <div className={`relative transition-all duration-500 ${status === 'analyzing' ? 'scale-110' : 'scale-100'}`}>
              <FingerPrintIcon className={`w-64 h-64 opacity-20 ${getColor()} transition-colors duration-500`} />
              
              {/* Overlay Glitch Icons */}
              <div className="absolute inset-0 flex items-center justify-center">
                {status === 'loading' && <ArrowPathIcon className="w-20 h-20 text-white animate-spin" />}
                {status === 'success' && <ShieldCheckIcon className="w-24 h-24 text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />}
                {status === 'error' && <ExclamationTriangleIcon className="w-24 h-24 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />}
              </div>
            </div>

            {/* Scanning Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
          </div>

          {/* Bottom Diagnostics Panel */}
          <div className="h-32 border-t border-white/10 p-6 flex justify-between items-end bg-black/60">
            <div>
              <div className="text-[10px] text-gray-500 uppercase mb-1">Target_Identity</div>
              <div className="text-xl text-white truncate max-w-[200px]">
                {formData.email || "UNIDENTIFIED"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-500 uppercase mb-1">Clearance</div>
              <div className={`text-2xl font-bold transition-colors duration-500 ${getColor()}`}>
                {status === 'success' ? 'GRANTED' : status === 'error' ? 'DENIED' : 'PENDING'}
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: ACCESS TERMINAL (FORM) --- */}
        <div className="flex flex-col justify-center px-8 lg:px-20 relative">
          
          {/* Corner Bolts */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/20 rounded-full"></div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <QrCodeIcon className={`w-8 h-8 ${getColor()} transition-colors duration-500`} />
              <span className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase">System_Login</span>
            </div>
            <h1 className="text-5xl font-black text-white uppercase glitch-text mb-2" data-text="Terminal">
              Terminal
            </h1>
            <p className="text-gray-400 text-xs uppercase tracking-widest border-l-2 border-white/20 pl-4">
              Enter credentials to initialize uplink.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            
            {/* Email Field */}
            <div className="group relative">
              <div className={`absolute -left-3 top-0 bottom-0 w-1 transition-colors duration-300 ${
                getFieldError("email") ? 'bg-red-500' : 'bg-white/10 group-focus-within:bg-cyan-500'
              }`}></div>
              <label htmlFor="email" className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 block">
                / User_ID
              </label>
              <div className={`flex items-center border-b transition-colors pb-2 ${
                getFieldError("email") 
                  ? 'border-red-500' 
                  : 'border-white/10 group-focus-within:border-cyan-500'
              }`}>
                <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-3 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="w-full bg-transparent text-white placeholder-gray-700 outline-none font-mono text-sm disabled:opacity-50"
                />
              </div>
              {getFieldError("email") && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <ExclamationTriangleIcon className="w-3 h-3" />
                  {getFieldError("email")}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="group relative">
              <div className={`absolute -left-3 top-0 bottom-0 w-1 transition-colors duration-300 ${
                getFieldError("password") ? 'bg-red-500' : 'bg-white/10 group-focus-within:bg-cyan-500'
              }`}></div>
              <div className="flex justify-between mb-1">
                <label htmlFor="password" className="text-[10px] text-gray-500 uppercase tracking-widest">
                  / Pass_Key
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-[10px] text-cyan-500 hover:text-white transition-colors uppercase font-bold"
                  tabIndex={isSubmitting ? -1 : 0}
                >
                  Reset_Key
                </Link>
              </div>
              <div className={`flex items-center border-b transition-colors pb-2 ${
                getFieldError("password") 
                  ? 'border-red-500' 
                  : 'border-white/10 group-focus-within:border-cyan-500'
              }`}>
                <LockClosedIcon className="w-5 h-5 text-gray-500 mr-3 pointer-events-none" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="w-full bg-transparent text-white placeholder-gray-700 outline-none font-mono text-sm disabled:opacity-50"
                />
              </div>
              {getFieldError("password") && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <ExclamationTriangleIcon className="w-3 h-3" />
                  {getFieldError("password")}
                </p>
              )}
            </div>

            {/* Error Display */}
            <AnimatePresence>
              {status === "error" && errorMessage && !validationErrors.length && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/5 border-l-2 border-red-500 p-3 text-red-400 text-xs font-bold"
                >
                  ERROR: {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button - Military Style */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 uppercase font-black tracking-[0.2em] text-sm transition-all duration-300 relative overflow-hidden group border border-white/10 ${
                status === 'success' 
                  ? 'bg-green-600 border-green-600 text-black' 
                  : 'bg-white/5 hover:bg-white/10 hover:border-cyan-500 hover:text-cyan-400'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {/* Button Glitch Effect on Hover */}
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
              
              <span className="relative flex items-center justify-center gap-3">
                {status === "loading" ? (
                  <>
                    Initializing...
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  </>
                ) : status === "success" ? (
                  <>
                    Access Granted
                    <ShieldCheckIcon className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Authenticate
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </span>
            </button>

          </form>

          {/* Footer - Create Account Link */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">New Entry Detected?</p>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 px-6 py-2 border border-white/20 rounded-sm text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all hover:scale-105"
            >
              Register_New_User <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;