import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

const Step1BasicDetails = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Basic Details</h2>
        <p className="text-gray-500 text-sm mb-6">Please provide your personal information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2.5">
            Email Address (Username) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2.5">
            Mobile Number (WhatsApp Enabled) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile || ''}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
            />
          </div>
          {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2.5">
            Gender
          </label>
          <div className="relative">
            <select
              id="gender"
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 text-sm appearance-none cursor-pointer"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1BasicDetails;

