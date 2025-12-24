import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    feedback: '',
    event: '',
    anonymous: false
  });
  const [submitted, setSubmitted] = useState(false);

  const events = [
    'AI/ML Innovation Challenge',
    'Web3 DeFi Protocol',
    'Full Stack Web Application',
    'Mobile App Development',
    'No-Code AI Prototype'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-4xl font-black text-white uppercase mb-4">Thank You!</h2>
          <p className="text-gray-400 mb-8">Your feedback has been submitted successfully. It helps us improve!</p>
          <p className="text-pink-400 font-mono text-sm">Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            Share Feedback
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter leading-none mb-8">
            Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Experience</span>
          </h1>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-pink-500" />
              <h2 className="text-xl font-black text-white uppercase">Feedback Form</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Event Participated</label>
                <select
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select Event</option>
                  {events.map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingClick(rating)}
                      className={`p-2 rounded transition-all ${
                        formData.rating >= rating
                          ? 'bg-yellow-500 text-white'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:border-yellow-500/50'
                      }`}
                    >
                      <StarIcon className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {!formData.anonymous && (
                <>
                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                      required={!formData.anonymous}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      required={!formData.anonymous}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Feedback</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                  rows="6"
                  placeholder="Share your experience, suggestions, or testimonials..."
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/10 bg-[#0f111a] text-pink-500 focus:ring-pink-500"
                />
                <label className="text-sm text-gray-400">Submit anonymously</label>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackPage;

