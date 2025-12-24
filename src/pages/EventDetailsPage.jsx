import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { eventsAPI } from '../api/auth';
import {
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  UsersIcon,
  TrophyIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TagIcon,
  SparklesIcon,
  FireIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

// Hardcoded fallback events data matching EventsPage
const HARDCODED_EVENTS = {
  '1': {
    _id: '1',
    id: '1',
    title: 'AI-Powered Healthcare Solutions',
    description: 'Build innovative AI solutions for healthcare challenges including patient diagnosis, drug discovery, or telemedicine platforms. This hackathon focuses on leveraging artificial intelligence to solve real-world healthcare problems and improve patient outcomes.',
    category: 'AI/ML',
    mode: 'team',
    status: 'open',
    prize: '₹50,000',
    participants: 12,
    maxParticipants: 50,
    startDate: '2026-02-15T09:00:00',
    endDate: '2026-02-16T21:00:00',
    tags: ['AI', 'Healthcare', 'Machine Learning', 'Innovation'],
    enrolledUsers: [],
    problemStatements: [
      'Develop an AI system for early disease detection using medical imaging',
      'Create a telemedicine platform with AI-powered symptom analysis',
      'Build a drug discovery tool using machine learning algorithms'
    ]
  },
  '2': {
    _id: '2',
    id: '2',
    title: 'Web3 Decentralized Marketplace',
    description: 'Create a decentralized marketplace using blockchain technology for secure, transparent transactions without intermediaries. Build the future of e-commerce with Web3 technologies.',
    category: 'Web3',
    mode: 'team',
    status: 'open',
    prize: '₹75,000',
    participants: 8,
    maxParticipants: 30,
    startDate: '2026-02-20T10:00:00',
    endDate: '2026-02-21T22:00:00',
    tags: ['Web3', 'Blockchain', 'NFT', 'DeFi'],
    enrolledUsers: [],
    problemStatements: [
      'Build a decentralized marketplace with smart contracts',
      'Create an NFT marketplace with royalty distribution',
      'Develop a DeFi lending platform'
    ]
  },
  '3': {
    _id: '3',
    id: '3',
    title: 'No-Code AI Chatbot Builder',
    description: 'Develop a platform that allows users to create AI chatbots without writing code, using drag-and-drop interfaces. Make AI accessible to everyone.',
    category: 'No-Code AI',
    mode: 'solo',
    status: 'open',
    prize: '₹30,000',
    participants: 5,
    maxParticipants: 25,
    startDate: '2026-02-18T09:00:00',
    endDate: '2026-02-19T18:00:00',
    tags: ['No-Code', 'AI', 'Chatbot', 'Automation'],
    enrolledUsers: [],
    problemStatements: [
      'Create a drag-and-drop chatbot builder interface',
      'Integrate multiple AI models for different use cases',
      'Build a chatbot deployment and analytics platform'
    ]
  },
  '4': {
    _id: '4',
    id: '4',
    title: 'Mobile-First E-Learning Platform',
    description: 'Build a mobile-first e-learning platform with offline capabilities, interactive content, and progress tracking. Revolutionize education through technology.',
    category: 'Mobile',
    mode: 'team',
    status: 'ongoing',
    prize: '₹60,000',
    participants: 20,
    maxParticipants: 40,
    startDate: '2026-02-10T08:00:00',
    endDate: '2026-02-11T20:00:00',
    tags: ['Mobile', 'Education', 'React Native', 'Flutter'],
    enrolledUsers: [],
    problemStatements: [
      'Develop offline-first learning content delivery',
      'Create interactive quiz and assessment features',
      'Build a progress tracking and analytics dashboard'
    ]
  },
  '5': {
    _id: '5',
    id: '5',
    title: 'Full-Stack Social Media Analytics',
    description: 'Create a comprehensive social media analytics dashboard with real-time data visualization and insights. Help businesses understand their social media performance.',
    category: 'Web Dev',
    mode: 'team',
    status: 'open',
    prize: '₹45,000',
    participants: 15,
    maxParticipants: 35,
    startDate: '2026-02-25T10:00:00',
    endDate: '2026-02-26T22:00:00',
    tags: ['Web Dev', 'Analytics', 'Dashboard', 'API'],
    enrolledUsers: [],
    problemStatements: [
      'Integrate multiple social media APIs',
      'Create real-time data visualization charts',
      'Build sentiment analysis and reporting features'
    ]
  },
  '6': {
    _id: '6',
    id: '6',
    title: 'AI Content Generator',
    description: 'Develop an AI-powered content generation tool that creates articles, social media posts, and marketing copy. Transform content creation with AI.',
    category: 'AI/ML',
    mode: 'solo',
    status: 'open',
    prize: '₹40,000',
    participants: 10,
    maxParticipants: 30,
    startDate: '2026-03-01T09:00:00',
    endDate: '2026-03-02T21:00:00',
    tags: ['AI', 'NLP', 'Content', 'GPT'],
    enrolledUsers: [],
    problemStatements: [
      'Build a multi-format content generator',
      'Create content optimization and SEO features',
      'Develop a content scheduling and publishing system'
    ]
  },
  '7': {
    _id: '7',
    id: '7',
    title: 'Blockchain Supply Chain Tracker',
    description: 'Create a transparent supply chain tracking system using blockchain to ensure authenticity and traceability of products. Build trust through transparency.',
    category: 'Web3',
    mode: 'team',
    status: 'open',
    prize: '₹80,000',
    participants: 18,
    maxParticipants: 40,
    startDate: '2026-02-22T10:00:00',
    endDate: '2026-02-23T22:00:00',
    tags: ['Blockchain', 'Supply Chain', 'Transparency', 'IoT'],
    enrolledUsers: [],
    problemStatements: [
      'Develop blockchain-based product tracking',
      'Create IoT integration for real-time updates',
      'Build a verification and authentication system'
    ]
  },
  '8': {
    _id: '8',
    id: '8',
    title: 'Smart Home Automation System',
    description: 'Build an intelligent home automation platform that controls lights, temperature, security, and appliances using AI and IoT. Make homes smarter.',
    category: 'AI/ML',
    mode: 'team',
    status: 'open',
    prize: '₹55,000',
    participants: 14,
    maxParticipants: 35,
    startDate: '2026-02-28T09:00:00',
    endDate: '2026-03-01T21:00:00',
    tags: ['IoT', 'Smart Home', 'Automation', 'AI'],
    enrolledUsers: [],
    problemStatements: [
      'Create a unified IoT device control system',
      'Develop AI-powered energy optimization',
      'Build voice and gesture control features'
    ]
  },
  '9': {
    _id: '9',
    id: '9',
    title: 'Fitness Tracking Mobile App',
    description: 'Develop a comprehensive fitness tracking mobile app with workout plans, nutrition tracking, and progress analytics. Help users achieve their fitness goals.',
    category: 'Mobile',
    mode: 'solo',
    status: 'open',
    prize: '₹35,000',
    participants: 7,
    maxParticipants: 30,
    startDate: '2026-03-05T08:00:00',
    endDate: '2026-03-06T20:00:00',
    tags: ['Mobile', 'Fitness', 'Health', 'Tracking'],
    enrolledUsers: [],
    problemStatements: [
      'Build workout plan generator with AI',
      'Create nutrition tracking and meal planning',
      'Develop progress visualization and analytics'
    ]
  },
  '10': {
    _id: '10',
    id: '10',
    title: 'E-Commerce Platform with AI Recommendations',
    description: 'Create a full-stack e-commerce platform with AI-powered product recommendations and personalized shopping experience. Revolutionize online shopping.',
    category: 'Web Dev',
    mode: 'team',
    status: 'open',
    prize: '₹70,000',
    participants: 22,
    maxParticipants: 45,
    startDate: '2026-03-10T10:00:00',
    endDate: '2026-03-11T22:00:00',
    tags: ['E-Commerce', 'AI', 'Recommendations', 'Full-Stack'],
    enrolledUsers: [],
    problemStatements: [
      'Build AI-powered product recommendation engine',
      'Create personalized shopping experience',
      'Develop inventory and order management system'
    ]
  },
  '11': {
    _id: '11',
    id: '11',
    title: 'No-Code Data Visualization Tool',
    description: 'Build a platform that allows users to create beautiful data visualizations and dashboards without coding. Make data analysis accessible to everyone.',
    category: 'No-Code AI',
    mode: 'team',
    status: 'open',
    prize: '₹50,000',
    participants: 11,
    maxParticipants: 35,
    startDate: '2026-03-08T09:00:00',
    endDate: '2026-03-09T21:00:00',
    tags: ['No-Code', 'Data Viz', 'Analytics', 'Dashboard'],
    enrolledUsers: [],
    problemStatements: [
      'Create drag-and-drop visualization builder',
      'Integrate multiple data source connectors',
      'Build sharing and collaboration features'
    ]
  },
  '12': {
    _id: '12',
    id: '12',
    title: 'Cryptocurrency Portfolio Tracker',
    description: 'Develop a real-time cryptocurrency portfolio tracker with price alerts, profit/loss analysis, and market insights. Help crypto investors make informed decisions.',
    category: 'Web3',
    mode: 'solo',
    status: 'open',
    prize: '₹45,000',
    participants: 9,
    maxParticipants: 25,
    startDate: '2026-03-12T10:00:00',
    endDate: '2026-03-13T22:00:00',
    tags: ['Crypto', 'Portfolio', 'Trading', 'Web3'],
    enrolledUsers: [],
    problemStatements: [
      'Build real-time price tracking system',
      'Create profit/loss calculation and analytics',
      'Develop price alerts and notification system'
    ]
  }
};

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      // Set hardcoded data immediately if available
      if (id && HARDCODED_EVENTS[id]) {
        setEvent(HARDCODED_EVENTS[id]);
        setLoading(false);
      }

      try {
        setLoading(true);
        setError(null);
        const response = await eventsAPI.getById(id);
        
        if (response.success && response.data) {
          setEvent(response.data);
        } else if (!HARDCODED_EVENTS[id]) {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Fetch event error:', err);
        setError(err.message || 'Failed to load event details');
        // Use hardcoded data if available when backend fails
        if (id && HARDCODED_EVENTS[id]) {
          setEvent(HARDCODED_EVENTS[id]);
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  // Check if user is enrolled - use useMemo for better performance
  const enrolled = React.useMemo(() => {
    if (!user || !event?.enrolledUsers || !Array.isArray(event.enrolledUsers)) return false;
    const userId = user._id || user.id;
    if (!userId) return false;
    return event.enrolledUsers.some(u => {
      const enrolledUserId = typeof u === 'object' ? (u._id || u.id) : u;
      return enrolledUserId === userId;
    });
  }, [user, event]);

  // Handle enrollment with optimistic update
  const handleEnroll = React.useCallback(async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'user') {
      alert('Only students can enroll in events');
      return;
    }

    // Check if already enrolled - prevent enrollment
    if (enrolled) {
      alert('You are already enrolled in this event');
      return;
    }

    const userId = user._id || user.id;
    if (!userId) {
      alert('User information not available');
      return;
    }

    try {
      setEnrolling(true);
      
      // Optimistically update UI immediately
      setEvent(prevEvent => {
        if (!prevEvent) return prevEvent;
        const updatedEnrolledUsers = Array.isArray(prevEvent.enrolledUsers) 
          ? [...prevEvent.enrolledUsers, { _id: userId, id: userId }]
          : [{ _id: userId, id: userId }];
        return {
          ...prevEvent,
          enrolledUsers: updatedEnrolledUsers,
          participants: (prevEvent.participants || 0) + 1
        };
      });

      const response = await eventsAPI.enroll(id);
      
      if (response.success) {
        // Refresh event data to get accurate data from server
        const updatedResponse = await eventsAPI.getById(id);
        if (updatedResponse.success && updatedResponse.data) {
          setEvent(updatedResponse.data);
        }
      } else {
        // Revert optimistic update on failure
        setEvent(prevEvent => {
          if (!prevEvent) return prevEvent;
          const updatedEnrolledUsers = Array.isArray(prevEvent.enrolledUsers) 
            ? prevEvent.enrolledUsers.filter(u => {
                const enrolledUserId = typeof u === 'object' ? (u._id || u.id) : u;
                return enrolledUserId !== userId;
              })
            : [];
          return {
            ...prevEvent,
            enrolledUsers: updatedEnrolledUsers,
            participants: Math.max(0, (prevEvent.participants || 0) - 1)
          };
        });
        alert(response.message || 'Failed to enroll in event');
      }
    } catch (err) {
      // Revert optimistic update on error
      setEvent(prevEvent => {
        if (!prevEvent) return prevEvent;
        const updatedEnrolledUsers = Array.isArray(prevEvent.enrolledUsers) 
          ? prevEvent.enrolledUsers.filter(u => {
              const enrolledUserId = typeof u === 'object' ? (u._id || u.id) : u;
              return enrolledUserId !== (user._id || user.id);
            })
          : [];
        return {
          ...prevEvent,
          enrolledUsers: updatedEnrolledUsers,
          participants: Math.max(0, (prevEvent.participants || 0) - 1)
        };
      });
      alert(err.message || 'Failed to enroll in event');
    } finally {
      setEnrolling(false);
    }
  }, [isAuthenticated, user, navigate, enrolled, id]);

  // Handle unenrollment
  const handleUnenroll = async () => {
    try {
      setEnrolling(true);
      const response = await eventsAPI.unenroll(id);
      
      if (response.success) {
        // Refresh event data
        const updatedResponse = await eventsAPI.getById(id);
        if (updatedResponse.success && updatedResponse.data) {
          setEvent(updatedResponse.data);
        }
      }
    } catch (err) {
      alert(err.message || 'Failed to unenroll from event');
    } finally {
      setEnrolling(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Error state - only show if no hardcoded data available
  if ((error || !event) && (!id || !HARDCODED_EVENTS[id])) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <XCircleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Error Loading Event</h3>
            <p className="text-gray-400 mb-4">{error || 'Event not found'}</p>
            <button
              onClick={() => navigate('/events')}
              className="px-6 py-3 bg-pink-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-pink-600 transition-colors rounded-xl"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if event is not available
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <XCircleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Event Not Found</h3>
            <p className="text-gray-400 mb-4">The event you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/events')}
              className="px-6 py-3 bg-pink-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-pink-600 transition-colors rounded-xl"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  const canEnroll = isAuthenticated && user?.role === 'user' && !enrolled && (event?.status === 'open' || event?.status === 'ongoing');
  const isFull = event ? (event.participants || 0) >= (event.maxParticipants || 0) : false;
  const isAdmin = user?.role === 'admin';

  // Format dates
  const startDate = event.startDate ? new Date(event.startDate) : new Date();
  const endDate = event.endDate ? new Date(event.endDate) : new Date();
  const now = new Date();
  const daysUntilStart = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
  const isOngoing = now >= startDate && now <= endDate;
  const isUpcoming = now < startDate;
  const isPast = now > endDate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back Button */}
          <button
            onClick={() => navigate('/events')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </button>

          {/* Header Section */}
          <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0f111a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 mb-6 shadow-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            <div className="relative z-10">
              {/* Status and Category Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  event.status === 'open' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  event.status === 'ongoing' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                  event.status === 'closed' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {event.status}
                </span>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-bold uppercase">
                  {event.category}
                </span>
                {isOngoing && (
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase flex items-center gap-1">
                    <FireIcon className="w-3 h-3" />
                    Live Now
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter leading-none mb-4">
                {event.title}
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {event.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase mb-2">
                    <TrophyIcon className="w-4 h-4" />
                    Prize
                  </div>
                  <div className="text-xl font-black text-white">{event.prize}</div>
                </div>
                <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase mb-2">
                    <UsersIcon className="w-4 h-4" />
                    Participants
                  </div>
                  <div className="text-xl font-black text-white">
                    {event.participants || 0}/{event.maxParticipants}
                  </div>
                </div>
                <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase mb-2">
                    {event.mode === 'solo' ? <UserIcon className="w-4 h-4" /> : event.mode === 'team' ? <UsersIcon className="w-4 h-4" /> : <UsersIcon className="w-4 h-4" />}
                    Mode
                  </div>
                  <div className="text-xl font-black text-white uppercase">
                    {event.mode === 'both' ? 'Solo/Team' : event.mode}
                  </div>
                </div>
                <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase mb-2">
                    <CalendarIcon className="w-4 h-4" />
                    Duration
                  </div>
                  <div className="text-xl font-black text-white">
                    {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} Days
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {isAuthenticated && user?.role === 'user' && (event.status === 'open' || event.status === 'ongoing') && !isFull && !enrolled && (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enrolling ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Enrolling...
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-5 h-5" />
                        Enroll Now
                      </>
                    )}
                  </button>
                )}
                
                {enrolled && (
                  <div className="px-8 py-4 bg-green-500/20 border-2 border-green-500/30 text-green-400 font-bold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2">
                    <CheckCircleIcon className="w-5 h-5" />
                    Enrolled
                  </div>
                )}

                {isFull && !enrolled && (
                  <div className="px-8 py-4 bg-gray-500/20 border-2 border-gray-500/30 text-gray-400 font-bold uppercase tracking-widest text-xs rounded-xl">
                    Event Full
                  </div>
                )}

                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl"
                  >
                    Login to Enroll
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date & Time Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-black text-white uppercase mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <CalendarIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  Schedule
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                    <div className="text-xs font-mono text-gray-400 uppercase mb-2">Start Date & Time</div>
                    <div className="text-white font-semibold text-lg">
                      {startDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {startDate.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                    <div className="text-xs font-mono text-gray-400 uppercase mb-2">End Date & Time</div>
                    <div className="text-white font-semibold text-lg">
                      {endDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {endDate.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  {isUpcoming && daysUntilStart > 0 && (
                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-purple-400">
                        <ClockIcon className="w-5 h-5" />
                        <span className="font-bold">
                          {daysUntilStart} {daysUntilStart === 1 ? 'day' : 'days'} until event starts
                        </span>
                      </div>
                    </div>
                  )}
                  {isOngoing && (
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-green-400">
                        <FireIcon className="w-5 h-5" />
                        <span className="font-bold">Event is currently ongoing</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Problem Statements */}
              {event.problemStatements && event.problemStatements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl"
                >
                  <h2 className="text-2xl font-black text-white uppercase mb-6 flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <CodeBracketIcon className="w-6 h-6 text-orange-500" />
                    </div>
                    Problem Statements
                  </h2>
                  <div className="space-y-3">
                    {event.problemStatements.map((statement, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-[#0f111a] border border-white/5 rounded-xl hover:border-orange-500/30 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-400 font-bold text-sm">{idx + 1}</span>
                          </div>
                          <div className="text-white font-medium">{statement}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl"
                >
                  <h2 className="text-2xl font-black text-white uppercase mb-6 flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <TagIcon className="w-6 h-6 text-purple-500" />
                    </div>
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 font-mono text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <h2 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-3">
                  <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                    <SparklesIcon className="w-5 h-5 text-pink-500" />
                  </div>
                  Event Info
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono text-gray-400 uppercase mb-1">Category</div>
                    <div className="text-white font-semibold">{event.category}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-gray-400 uppercase mb-1">Participation Mode</div>
                    <div className="text-white font-semibold uppercase">
                      {event.mode === 'both' ? 'Solo or Team' : event.mode}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-gray-400 uppercase mb-1">Status</div>
                    <div className="text-white font-semibold uppercase">{event.status}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-gray-400 uppercase mb-1">Capacity</div>
                    <div className="text-white font-semibold">
                      {event.participants || 0} / {event.maxParticipants} participants
                    </div>
                    <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${((event.participants || 0) / event.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enrolled Users (Admin Only) */}
              {isAdmin && event.enrolledUsers && event.enrolledUsers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl"
                >
                  <h2 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                      <UsersIcon className="w-5 h-5 text-green-500" />
                    </div>
                    Enrolled Users ({event.enrolledUsers.length})
                  </h2>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {event.enrolledUsers.map((enrolledUser, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#0f111a] border border-white/5 rounded-lg"
                      >
                        <div className="text-white font-medium">
                          {typeof enrolledUser === 'object' ? enrolledUser.name : 'User'}
                        </div>
                        {typeof enrolledUser === 'object' && enrolledUser.email && (
                          <div className="text-gray-400 text-xs mt-1">{enrolledUser.email}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Created By */}
              {event.createdBy && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl"
                >
                  <h2 className="text-xl font-black text-white uppercase mb-4 flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <BuildingOfficeIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    Created By
                  </h2>
                  <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                    <div className="text-white font-semibold">
                      {typeof event.createdBy === 'object' ? event.createdBy.name : 'Admin'}
                    </div>
                    {typeof event.createdBy === 'object' && event.createdBy.email && (
                      <div className="text-gray-400 text-sm mt-1">{event.createdBy.email}</div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;

