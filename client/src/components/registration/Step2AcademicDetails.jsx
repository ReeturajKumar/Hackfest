import React from 'react';
import { Building2, MapPin } from 'lucide-react';

const Step2AcademicDetails = ({ formData, handleChange, errors }) => {
  const courses = ['BE', 'BTech', 'BCA', 'BCS', 'BSc (CS)', 'MCA', 'Other'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Passout'];
  const states = [
    'Maharashtra', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Academic Details</h2>
        <p className="text-gray-500 text-sm mb-6">Tell us about your educational background</p>
      </div>

      <div>
        <label htmlFor="college" className="block text-sm font-semibold text-gray-700 mb-2.5">
          College / Institute Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Building2 className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="college"
            name="college"
            placeholder="Enter your college/institute name"
            value={formData.college || ''}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
          />
        </div>
        {errors.college && <p className="mt-1 text-xs text-red-500">{errors.college}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2.5">
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter your city"
              value={formData.city || ''}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
            />
          </div>
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2.5">
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            name="state"
            value={formData.state || 'Maharashtra'}
            onChange={handleChange}
            className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 text-sm appearance-none cursor-pointer"
          >
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2.5">
            Course <span className="text-red-500">*</span>
          </label>
          <select
            id="course"
            name="course"
            value={formData.course || ''}
            onChange={handleChange}
            className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 text-sm appearance-none cursor-pointer"
          >
            <option value="">Select course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          {errors.course && <p className="mt-1 text-xs text-red-500">{errors.course}</p>}
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2.5">
            Year of Study <span className="text-red-500">*</span>
          </label>
          <select
            id="year"
            name="year"
            value={formData.year || ''}
            onChange={handleChange}
            className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 text-sm appearance-none cursor-pointer"
          >
            <option value="">Select year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.year && <p className="mt-1 text-xs text-red-500">{errors.year}</p>}
        </div>
      </div>
    </div>
  );
};

export default Step2AcademicDetails;

