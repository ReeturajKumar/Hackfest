import React from 'react';
import { TrendingUp, Target, ChevronDown } from 'lucide-react';

const Step4SkillLevels = ({ formData, handleChange, setFormData, errors }) => {
  const skillLevels = [
    'Beginner / Non-Coder',
    'Basic Coding Knowledge',
    'Intermediate',
    'Advanced'
  ];

  const interests = [
    'AI / ML',
    'No-Code Tools',
    'Web / App Development',
    'Automation',
    'Blockchain',
    'Just Exploring',
    'DevOps'
  ];

  const referralSources = [
    'Instagram',
    'WhatsApp',
    'College / Friend',
    'Campus Ambassador',
    'Poster / Banner',
    'Other'
  ];

  const handleInterestChange = (interest) => {
    const currentInterests = formData.interests || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    setFormData(prev => ({ ...prev, interests: updatedInterests }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Skill Levels and Interests</h2>
        <p className="text-gray-500 text-sm mb-6">Help us understand your background and interests</p>
      </div>

      <div>
        <label htmlFor="skillLevel" className="block text-sm font-semibold text-gray-700 mb-2.5">
          Your Current Skill Level <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <TrendingUp className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <select
            id="skillLevel"
            name="skillLevel"
            value={formData.skillLevel || ''}
            onChange={handleChange}
            className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 text-sm appearance-none cursor-pointer"
          >
            <option value="">Select your skill level</option>
            {skillLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {errors.skillLevel && <p className="mt-1 text-xs text-red-500">{errors.skillLevel}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Primary Area of Interest <span className="text-gray-400 font-normal text-xs">(Multiple selections allowed)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {interests.map(interest => (
            <label
              key={interest}
              className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={(formData.interests || []).includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="w-4 h-4 text-pink-600 focus:ring-pink-500 rounded"
              />
              <span className="ml-3 text-sm text-gray-900">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="referralSource" className="block text-sm font-semibold text-gray-700 mb-2.5">
          How did you hear about this hackathon? <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Target className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <select
            id="referralSource"
            name="referralSource"
            value={formData.referralSource || ''}
            onChange={handleChange}
            className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 text-sm appearance-none cursor-pointer"
          >
            <option value="">Select referral source</option>
            {referralSources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
          <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {errors.referralSource && <p className="mt-1 text-xs text-red-500">{errors.referralSource}</p>}
      </div>
    </div>
  );
};

export default Step4SkillLevels;

