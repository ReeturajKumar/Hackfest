import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import authAPI from '../api/auth';
import { 
  ArrowLeftIcon, 
  UserIcon, 
  EnvelopeIcon, 
  CheckCircleIcon,
  PhoneIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  ShieldCheckIcon,
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { user: authUser, refreshUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mode: 'solo',
    category: '',
    phone: '',
    college: '',
    year: '',
    branch: ''
  });
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user data on mount
  useEffect(() => {
    const user = authUser || JSON.parse(sessionStorage.getItem('user') || 'null');
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mode: user.mode || 'solo',
        category: user.category || '',
        phone: user.phone || '+91',
        college: user.college || '',
        year: user.year || '',
        branch: user.branch || ''
      });
    }
  }, [authUser]);

  const categories = ['AI/ML', 'Web3', 'Web Dev', 'Mobile', 'No-Code AI'];
  const modes = ['solo', 'team'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number
    if (name === 'phone') {
      // Only allow +91 at the start, then exactly 10 digits
      let phoneValue = value;
      
      // Remove all non-digit characters except +
      phoneValue = phoneValue.replace(/[^\d+]/g, '');
      
      // Ensure it starts with +91
      if (!phoneValue.startsWith('+91')) {
        phoneValue = '+91' + phoneValue.replace(/^\+91/, '').replace(/[^\d]/g, '');
      }
      
      // Extract digits after +91
      const digitsAfterPlus91 = phoneValue.replace('+91', '').replace(/[^\d]/g, '');
      
      // Limit to 10 digits after +91
      if (digitsAfterPlus91.length > 10) {
        phoneValue = '+91' + digitsAfterPlus91.substring(0, 10);
      } else {
        phoneValue = '+91' + digitsAfterPlus91;
      }
      
      setFormData(prev => ({ ...prev, [name]: phoneValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setSaved(false);
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    // Email validation removed - email cannot be changed
    
    // Phone validation: Must be +91 followed by exactly 10 digits
    if (formData.phone) {
      const phoneRegex = /^\+91\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        if (!formData.phone.startsWith('+91')) {
          newErrors.phone = 'Phone number must start with +91';
        } else {
          const digitsAfterPlus91 = formData.phone.replace('+91', '').replace(/[^\d]/g, '');
          if (digitsAfterPlus91.length === 0) {
            newErrors.phone = 'Please enter 10 digits after +91';
          } else if (digitsAfterPlus91.length < 10) {
          newErrors.phone = `Please enter ${10 - digitsAfterPlus91.length} more digit(s)`;
          } else {
            newErrors.phone = 'Phone number must be exactly 10 digits after +91';
          }
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Remove email from formData before sending - email cannot be changed
      const { email, ...profileData } = formData;
      const response = await authAPI.updateProfile(profileData);
      
      if (response.success && response.data) {
        // Update user in sessionStorage
        const updatedUser = response.data;
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Update auth context
        if (refreshUser) {
          await refreshUser();
        }
        
        setSaved(true);
        setIsSubmitting(false);
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.errors) {
        // Handle validation errors from backend
        const validationErrors = {};
        error.errors.forEach(err => {
          validationErrors[err.field] = err.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({ submit: error.message || 'Failed to update profile. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                  Profile Management
                </div>
                <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter leading-none mb-2">
                  Edit <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">Profile</span>
                </h1>
                <p className="text-gray-400">Update your personal information and preferences</p>
              </div>
              
              {/* Profile Avatar Preview */}
              <div className="hidden md:block">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500/30 flex items-center justify-center backdrop-blur-sm">
                  <UserIcon className="w-12 h-12 text-pink-400" />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <h2 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-3">
                <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                  <UserIcon className="w-6 h-6 text-pink-500" />
                </div>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                      errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500'
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <XMarkIcon className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                    <EnvelopeIcon className="w-4 h-4" />
                    Email Address
                    <span className="text-xs text-gray-500 normal-case">(Cannot be changed)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 bg-[#0f111a]/50 border border-white/5 rounded-xl text-gray-500 cursor-not-allowed"
                    placeholder="your@email.com"
                    readOnly
                  />
                  <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                    Email address cannot be changed for security reasons
                  </p>
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4" />
                    Phone Number
                    <span className="text-xs text-gray-500 normal-case">(+91 followed by 10 digits)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={13} // +91 (3 chars) + 10 digits = 13 total
                      className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                        errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500'
                      }`}
                      placeholder="+91XXXXXXXXXX"
                    />
                    {formData.phone && formData.phone.startsWith('+91') && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                        {formData.phone.replace('+91', '').replace(/[^\d]/g, '').length}/10
                      </div>
                    )}
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <XMarkIcon className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                  {!errors.phone && formData.phone && (
                    <p className="text-gray-500 text-xs mt-1">
                      Format: +91 followed by exactly 10 digits
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Hackathon Preferences */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <h2 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <SparklesIcon className="w-6 h-6 text-orange-500" />
                </div>
                Hackathon Preferences
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-3 block">Mode of Participation</label>
                  <div className="grid grid-cols-2 gap-4">
                    {modes.map(mode => (
                      <motion.button
                        key={mode}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChange({ target: { name: 'mode', value: mode } })}
                        className={`p-5 border-2 rounded-xl transition-all relative overflow-hidden ${
                          formData.mode === mode
                            ? 'border-pink-500 bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-white shadow-lg shadow-pink-500/20'
                            : 'border-white/10 bg-[#0f111a] text-gray-400 hover:border-pink-500/50'
                        }`}
                      >
                        {formData.mode === mode && (
                          <motion.div
                            layoutId="modeIndicator"
                            className="absolute top-2 right-2 w-3 h-3 bg-pink-500 rounded-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                        <div className="text-lg font-bold uppercase mb-1">{mode}</div>
                        <div className={`text-xs ${formData.mode === mode ? 'text-gray-300' : 'text-gray-500'}`}>
                          {mode === 'solo' ? 'Individual Participation' : 'Team of 2-4 Members'}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:border-pink-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Academic Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <h2 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <AcademicCapIcon className="w-6 h-6 text-blue-500" />
                </div>
                Academic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                    <BuildingOfficeIcon className="w-4 h-4" />
                    College/University
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="Enter college name"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                    <AcademicCapIcon className="w-4 h-4" />
                    Year
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:border-pink-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                    <ShieldCheckIcon className="w-4 h-4" />
                    Branch/Department
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="e.g., Computer Science, Electronics, etc."
                  />
                </div>
              </div>
            </motion.div>

            {/* Error Message */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2"
              >
                <XMarkIcon className="w-5 h-5" />
                {errors.submit}
              </motion.div>
            )}

            {/* Save Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <button
                type="submit"
                disabled={isSubmitting || saved}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {saved ? (
                    <motion.span
                      key="saved"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircleIcon className="w-5 h-5" />
                      Saved Successfully!
                    </motion.span>
                  ) : isSubmitting ? (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Saving...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="save"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Save Changes
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-pink-500 hover:text-pink-500 transition-all duration-300 rounded-xl"
              >
                Cancel
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileEditPage;

