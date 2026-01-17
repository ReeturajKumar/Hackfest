import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  UserIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CpuChipIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const RegistrationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/registrations/${id}`);
        const data = await response.json();
        if (data.success) {
          setRegistration(data.data);
        } else {
          setError(data.message || 'Failed to fetch registration');
        }
      } catch (err) {
        console.error('Error fetching registration:', err);
        setError('Connection error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, [id, API_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold animate-pulse text-sm tracking-widest uppercase">Fetching Data...</p>
        </div>
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 text-center shadow-xl border border-red-50">
          <XCircleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-black text-black mb-2">Not Found</h2>
          <p className="text-gray-500 mb-6 text-sm">{error || "Could not find registration."}</p>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const Section = ({ title, icon: Icon, children, colorClass, gridCols = "md:grid-cols-2 lg:grid-cols-4" }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
        <div className={`p-2 rounded-xl ${colorClass}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-base font-black text-black uppercase tracking-wider">{title}</h3>
      </div>
      <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
        {children}
      </div>
    </motion.div>
  );

  const DetailItem = ({ label, value, icon: Icon }) => (
    <div className="group">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
      </p>
      <p className="text-[15px] font-bold text-slate-800 break-words group-hover:text-pink-600 transition-colors">
        {value || 'N/A'}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Navigation Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="group flex items-center gap-3 text-gray-500 hover:text-black transition-all font-bold uppercase tracking-widest text-xs"
          >
            <div className="p-2 border border-gray-200 rounded-xl group-hover:border-black transition-all bg-white shadow-sm">
              <ArrowLeftIcon className="w-4 h-4" />
            </div>
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 ${registration.paymentStatus === 'completed' ? 'bg-green-50 text-green-700 border border-green-100' :
              registration.paymentStatus === 'pending' ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
              {registration.paymentStatus === 'completed' ? <CheckCircleIcon className="w-4 h-4" /> : <ClockIcon className="w-4 h-4" />}
              {registration.paymentStatus === 'completed' ? 'Paid Status' : registration.paymentStatus}
            </span>
            <span className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest font-mono shadow-lg shadow-slate-200">
              ID: {registration.registrationId}
            </span>
          </div>
        </div>

        {/* Identity Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] p-8 mb-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-indigo-100">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <div className="text-center md:text-left flex-1 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2 justify-center md:justify-start">
              <h1 className="text-3xl font-black text-black tracking-tight">{registration.name}</h1>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${registration.participationType === 'individual' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                {registration.participationType}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                <EnvelopeIcon className="w-4 h-4 text-pink-500" />
                {registration.email}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200 hidden sm:block"></span>
              <span className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                <PhoneIcon className="w-4 h-4 text-purple-500" />
                {registration.mobile}
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 border-l border-gray-100 pl-8">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enrollment Date</p>
            <p className="text-sm font-black text-black">{new Date(registration.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="space-y-6">

          {/* Academic & Personal */}
          <Section title="Academic Profile" icon={AcademicCapIcon} colorClass="bg-blue-600" gridCols="md:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="College / Institute" value={registration.college} icon={BuildingOfficeIcon} />
            <DetailItem label="Course / Stream" value={registration.course} />
            <DetailItem label="Current Year" value={registration.year} icon={CalendarDaysIcon} />
            <DetailItem label="City" value={registration.city} icon={MapPinIcon} />
            <DetailItem label="State" value={registration.state} />
            <DetailItem label="Gender" value={registration.gender} />
          </Section>

          {/* Team Context */}
          {registration.participationType === 'team' && registration.teamMembers?.length > 0 && (
            <Section title="Team Collaboration" icon={UserGroupIcon} colorClass="bg-indigo-600" gridCols="md:grid-cols-3">
              <div className="md:col-span-3 pb-2">
                <DetailItem label="Official Team Name" value={registration.teamName} />
              </div>
              {registration.teamMembers.map((member, idx) => (
                <div key={idx} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                  <p className="text-[10px] font-black text-indigo-600 uppercase mb-4 tracking-widest">Partner #{idx + 1}</p>
                  <div className="space-y-4">
                    <DetailItem label="Full Name" value={member.name} />
                    <DetailItem label="Email Contact" value={member.email} />
                    <DetailItem label="Mobile Number" value={member.mobile} />
                  </div>
                </div>
              ))}
            </Section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Technical Context */}
            <Section title="Technical Expertise" icon={CpuChipIcon} colorClass="bg-[#FF2D95]" gridCols="md:grid-cols-2">
              <DetailItem label="Skill Proficiency" value={registration.skillLevel} />
              <DetailItem label="Acquisition Source" value={registration.referralSource} />
              <div className="md:col-span-2 mt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Area of Interests</p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(registration.interests) && registration.interests.length > 0 ? (
                    registration.interests.map((interest, i) => (
                      <span key={i} className="px-3 py-1.5 bg-pink-50 text-pink-700 text-xs font-black rounded-xl border border-pink-100 uppercase tracking-tight">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm font-medium italic">General Participation</span>
                  )}
                </div>
              </div>
            </Section>

            {/* Compliance Audit */}
            <Section title="Security & Compliance" icon={ShieldCheckIcon} colorClass="bg-emerald-600" gridCols="md:grid-cols-2">
              <DetailItem label="Comm. Opt-in" value={registration.communicationConsent ? 'Authorized' : 'Deactivated'} />
              <DetailItem label="Data Declaration" value={registration.declaration ? 'Verified Signature' : 'Pending'} />
              <DetailItem label="Registration ID" value={registration.registrationId} icon={FingerprintIcon} />
              {registration.easebuzzId && (
                <DetailItem label="Easebuzz Official ID" value={registration.easebuzzId} icon={CheckCircleIcon} />
              )}
              <DetailItem label="Created At" value={new Date(registration.createdAt).toLocaleString()} icon={CalendarIcon} />
              <DetailItem label="System Status" value={registration.paymentStatus.toUpperCase()} />
              <DetailItem label="Last Database Refresh" value={new Date(registration.updatedAt).toLocaleString()} />
            </Section>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RegistrationDetailsPage;
