import React from 'react';
import { Users, User } from 'lucide-react';

const Step3ParticipationDetails = ({ formData, handleChange, errors }) => {
  const isTeam = formData.participationType === 'team';

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Participation Details</h2>
        <p className="text-gray-500 text-sm mb-6">Choose how you want to participate</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          How are you participating? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="participationType"
              value="individual"
              checked={formData.participationType === 'individual'}
              onChange={handleChange}
              className="w-4 h-4 text-pink-600 focus:ring-pink-500"
            />
            <div className="ml-3 flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-900 font-medium">Individual (₹499)</span>
            </div>
          </label>
          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="participationType"
              value="team"
              checked={formData.participationType === 'team'}
              onChange={handleChange}
              className="w-4 h-4 text-pink-600 focus:ring-pink-500"
            />
            <div className="ml-3 flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-900 font-medium">Team (₹999)</span>
            </div>
          </label>
        </div>
        {errors.participationType && <p className="mt-1 text-xs text-red-500">{errors.participationType}</p>}
      </div>

      {isTeam && (
        <div className="space-y-5 pt-4 border-t border-gray-200">
          <div>
            <label htmlFor="teamName" className="block text-sm font-semibold text-gray-700 mb-2.5">
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              placeholder="Enter your team name"
              value={formData.teamName || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
            />
            {errors.teamName && <p className="mt-1 text-xs text-red-500">{errors.teamName}</p>}
          </div>

          {/* Team Member 2 (Required) */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Team Member 2 <span className="text-red-500">*</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                name="member2Name"
                placeholder="Name"
                value={formData.member2Name || ''}
                onChange={handleChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
              />
              <input
                type="email"
                name="member2Email"
                placeholder="Email"
                value={formData.member2Email || ''}
                onChange={handleChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
              />
              <input
                type="tel"
                name="member2Mobile"
                placeholder="Mobile"
                value={formData.member2Mobile || ''}
                onChange={handleChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Team Member 3 (Optional) */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Team Member 3 (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                name="member3Name"
                placeholder="Name"
                value={formData.member3Name || ''}
                onChange={handleChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
              />
              <input
                type="email"
                name="member3Email"
                placeholder="Email"
                value={formData.member3Email || ''}
                onChange={handleChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
              />
              <input
                type="tel"
                name="member3Mobile"
                placeholder="Mobile"
                value={formData.member3Mobile || ''}
                onChange={handleChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Team Member 4 (Optional) */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Team Member 4 (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                name="member4Name"
                placeholder="Name"
                value={formData.member4Name || ''}
                onChange={handleChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
              />
              <input
                type="email"
                name="member4Email"
                placeholder="Email"
                value={formData.member4Email || ''}
                onChange={handleChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
              />
              <input
                type="tel"
                name="member4Mobile"
                placeholder="Mobile"
                value={formData.member4Mobile || ''}
                onChange={handleChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3ParticipationDetails;

