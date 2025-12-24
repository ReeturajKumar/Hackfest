import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { eventsAPI } from '../api/auth';
import { 
  ArrowLeftIcon, 
  PlusIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'AI/ML',
    mode: 'both',
    prize: '',
    maxParticipants: 100,
    startDate: '',
    endDate: '',
    status: 'open',
    tags: '',
    problemStatements: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not admin
  React.useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/events');
    }
  }, [user, navigate]);

  const categories = ['AI/ML', 'Web3', 'Web Dev', 'Mobile', 'No-Code AI'];
  const modes = ['solo', 'team', 'both'];
  const statuses = ['draft', 'open', 'ongoing', 'closed'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Parse tags and problem statements
      const eventData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
        problemStatements: formData.problemStatements ? formData.problemStatements.split(',').map(p => p.trim()).filter(p => p) : [],
        maxParticipants: parseInt(formData.maxParticipants)
      };

      const response = await eventsAPI.create(eventData);
      
      if (response.success) {
        navigate('/events');
      }
    } catch (error) {
      if (error.errors) {
        const validationErrors = {};
        error.errors.forEach(err => {
          validationErrors[err.field] = err.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({ submit: error.message || 'Failed to create event' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate('/events')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            Admin Panel
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter leading-none mb-8">
            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">Event</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <h2 className="text-xl font-black text-white uppercase mb-6">Event Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                      errors.title ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500'
                    }`}
                    placeholder="Event Title"
                  />
                  {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                      errors.description ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500'
                    }`}
                    placeholder="Event Description"
                  />
                  {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:border-pink-500 focus:outline-none transition-colors"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Mode *</label>
                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:border-pink-500 focus:outline-none transition-colors"
                    >
                      {modes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Prize *</label>
                    <input
                      type="text"
                      name="prize"
                      value={formData.prize}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                        errors.prize ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500'
                      }`}
                      placeholder="₹1,00,000"
                    />
                    {errors.prize && <p className="text-red-400 text-xs mt-1">{errors.prize}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Max Participants *</label>
                    <input
                      type="number"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleChange}
                      required
                      min="1"
                      className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                        errors.maxParticipants ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500'
                      }`}
                    />
                    {errors.maxParticipants && <p className="text-red-400 text-xs mt-1">{errors.maxParticipants}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Start Date *</label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                        errors.startDate ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500'
                      }`}
                    />
                    {errors.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">End Date *</label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                        errors.endDate ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-pink-500'
                      }`}
                    />
                    {errors.endDate && <p className="text-red-400 text-xs mt-1">{errors.endDate}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:border-pink-500 focus:outline-none transition-colors"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="AI, ML, Python, No-Code"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Problem Statements (comma-separated)</label>
                  <input
                    type="text"
                    name="problemStatements"
                    value={formData.problemStatements}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="AI Chatbot, Image Recognition, Predictive Analytics"
                  />
                </div>
              </div>
            </motion.div>

            {errors.submit && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
                <XMarkIcon className="w-5 h-5" />
                {errors.submit}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 h-5" />
                    Create Event
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-pink-500 hover:text-pink-500 transition-all duration-300 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEventPage;

