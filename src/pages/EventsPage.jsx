import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { eventsAPI } from '../api/auth';
import { 
  CodeBracketIcon, 
  UserIcon, 
  UsersIcon, 
  CalendarIcon,
  TrophyIcon,
  ArrowRightIcon,
  FireIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// Hardcoded fallback events data
const HARDCODED_EVENTS = [
  {
    _id: '1',
    id: '1',
    title: 'AI-Powered Healthcare Solutions',
    description: 'Build innovative AI solutions for healthcare challenges including patient diagnosis, drug discovery, or telemedicine platforms.',
    category: 'AI/ML',
    mode: 'team',
    status: 'open',
    prize: '₹50,000',
    participants: 12,
    maxParticipants: 50,
    startDate: '2026-02-15',
    tags: ['AI', 'Healthcare', 'Machine Learning', 'Innovation'],
    enrolledUsers: []
  },
  {
    _id: '2',
    id: '2',
    title: 'Web3 Decentralized Marketplace',
    description: 'Create a decentralized marketplace using blockchain technology for secure, transparent transactions without intermediaries.',
    category: 'Web3',
    mode: 'team',
    status: 'open',
    prize: '₹75,000',
    participants: 8,
    maxParticipants: 30,
    startDate: '2026-02-20',
    tags: ['Web3', 'Blockchain', 'NFT', 'DeFi'],
    enrolledUsers: []
  },
  {
    _id: '3',
    id: '3',
    title: 'No-Code AI Chatbot Builder',
    description: 'Develop a platform that allows users to create AI chatbots without writing code, using drag-and-drop interfaces.',
    category: 'No-Code AI',
    mode: 'solo',
    status: 'open',
    prize: '₹30,000',
    participants: 5,
    maxParticipants: 25,
    startDate: '2026-02-18',
    tags: ['No-Code', 'AI', 'Chatbot', 'Automation'],
    enrolledUsers: []
  },
  {
    _id: '4',
    id: '4',
    title: 'Mobile-First E-Learning Platform',
    description: 'Build a mobile-first e-learning platform with offline capabilities, interactive content, and progress tracking.',
    category: 'Mobile',
    mode: 'team',
    status: 'ongoing',
    prize: '₹60,000',
    participants: 20,
    maxParticipants: 40,
    startDate: '2026-02-10',
    tags: ['Mobile', 'Education', 'React Native', 'Flutter'],
    enrolledUsers: []
  },
  {
    _id: '5',
    id: '5',
    title: 'Full-Stack Social Media Analytics',
    description: 'Create a comprehensive social media analytics dashboard with real-time data visualization and insights.',
    category: 'Web Dev',
    mode: 'team',
    status: 'open',
    prize: '₹45,000',
    participants: 15,
    maxParticipants: 35,
    startDate: '2026-02-25',
    tags: ['Web Dev', 'Analytics', 'Dashboard', 'API'],
    enrolledUsers: []
  },
  {
    _id: '6',
    id: '6',
    title: 'AI Content Generator',
    description: 'Develop an AI-powered content generation tool that creates articles, social media posts, and marketing copy.',
    category: 'AI/ML',
    mode: 'solo',
    status: 'open',
    prize: '₹40,000',
    participants: 10,
    maxParticipants: 30,
    startDate: '2026-03-01',
    tags: ['AI', 'NLP', 'Content', 'GPT'],
    enrolledUsers: []
  },
  {
    _id: '7',
    id: '7',
    title: 'Blockchain Supply Chain Tracker',
    description: 'Create a transparent supply chain tracking system using blockchain to ensure authenticity and traceability of products.',
    category: 'Web3',
    mode: 'team',
    status: 'open',
    prize: '₹80,000',
    participants: 18,
    maxParticipants: 40,
    startDate: '2026-02-22',
    tags: ['Blockchain', 'Supply Chain', 'Transparency', 'IoT'],
    enrolledUsers: []
  },
  {
    _id: '8',
    id: '8',
    title: 'Smart Home Automation System',
    description: 'Build an intelligent home automation platform that controls lights, temperature, security, and appliances using AI and IoT.',
    category: 'AI/ML',
    mode: 'team',
    status: 'open',
    prize: '₹55,000',
    participants: 14,
    maxParticipants: 35,
    startDate: '2026-02-28',
    tags: ['IoT', 'Smart Home', 'Automation', 'AI'],
    enrolledUsers: []
  },
  {
    _id: '9',
    id: '9',
    title: 'Fitness Tracking Mobile App',
    description: 'Develop a comprehensive fitness tracking mobile app with workout plans, nutrition tracking, and progress analytics.',
    category: 'Mobile',
    mode: 'solo',
    status: 'open',
    prize: '₹35,000',
    participants: 7,
    maxParticipants: 30,
    startDate: '2026-03-05',
    tags: ['Mobile', 'Fitness', 'Health', 'Tracking'],
    enrolledUsers: []
  },
  {
    _id: '10',
    id: '10',
    title: 'E-Commerce Platform with AI Recommendations',
    description: 'Create a full-stack e-commerce platform with AI-powered product recommendations and personalized shopping experience.',
    category: 'Web Dev',
    mode: 'team',
    status: 'open',
    prize: '₹70,000',
    participants: 22,
    maxParticipants: 45,
    startDate: '2026-03-10',
    tags: ['E-Commerce', 'AI', 'Recommendations', 'Full-Stack'],
    enrolledUsers: []
  },
  {
    _id: '11',
    id: '11',
    title: 'No-Code Data Visualization Tool',
    description: 'Build a platform that allows users to create beautiful data visualizations and dashboards without coding.',
    category: 'No-Code AI',
    mode: 'team',
    status: 'open',
    prize: '₹50,000',
    participants: 11,
    maxParticipants: 35,
    startDate: '2026-03-08',
    tags: ['No-Code', 'Data Viz', 'Analytics', 'Dashboard'],
    enrolledUsers: []
  },
  {
    _id: '12',
    id: '12',
    title: 'Cryptocurrency Portfolio Tracker',
    description: 'Develop a real-time cryptocurrency portfolio tracker with price alerts, profit/loss analysis, and market insights.',
    category: 'Web3',
    mode: 'solo',
    status: 'open',
    prize: '₹45,000',
    participants: 9,
    maxParticipants: 25,
    startDate: '2026-03-12',
    tags: ['Crypto', 'Portfolio', 'Trading', 'Web3'],
    enrolledUsers: []
  }
];

const EventsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState(HARDCODED_EVENTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState({});

  // Fetch events on mount and when filters change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventsAPI.getAll({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          mode: selectedMode !== 'all' ? selectedMode : undefined,
          search: searchQuery || undefined,
          status: 'all' // Show all statuses, filter in UI if needed
        });
        
        if (response.success && response.data && response.data.length > 0) {
          setEvents(response.data);
        }
        // If backend returns empty or fails, keep existing hardcoded data
      } catch (err) {
        console.error('Fetch events error:', err);
        setError(err.message || 'Failed to load events');
        // Ensure hardcoded data is set if events array is empty
        setEvents(prevEvents => prevEvents.length > 0 ? prevEvents : HARDCODED_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory, selectedMode, searchQuery]);

  // Check if user is enrolled - use useCallback for better performance
  const isEnrolled = React.useCallback((event) => {
    if (!user || !event?.enrolledUsers || !Array.isArray(event.enrolledUsers)) return false;
    const userId = user._id || user.id;
    if (!userId) return false;
    return event.enrolledUsers.some(u => {
      const enrolledUserId = typeof u === 'object' ? (u._id || u.id) : u;
      return enrolledUserId === userId;
    });
  }, [user]);

  // Handle enrollment with optimistic update
  const handleEnroll = React.useCallback(async (eventId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'user') {
      alert('Only students can enroll in events');
      return;
    }

    // Check if already enrolled - prevent enrollment
    const event = events.find(e => (e._id || e.id) === eventId);
    if (event && isEnrolled(event)) {
      alert('You are already enrolled in this event');
      return;
    }

    const userId = user._id || user.id;
    if (!userId) {
      alert('User information not available');
      return;
    }

    try {
      setEnrolling(prev => ({ ...prev, [eventId]: true }));
      
      // Optimistically update UI immediately
      setEvents(prevEvents => prevEvents.map(e => {
        if ((e._id || e.id) === eventId) {
          const updatedEnrolledUsers = Array.isArray(e.enrolledUsers) 
            ? [...e.enrolledUsers, { _id: userId, id: userId }]
            : [{ _id: userId, id: userId }];
          return {
            ...e,
            enrolledUsers: updatedEnrolledUsers,
            participants: (e.participants || 0) + 1
          };
        }
        return e;
      }));

      const response = await eventsAPI.enroll(eventId);
      
      if (response.success) {
        // Refresh events list to get accurate data from server
        const eventsResponse = await eventsAPI.getAll({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          mode: selectedMode !== 'all' ? selectedMode : undefined,
          search: searchQuery || undefined,
          status: 'all'
        });
        
        if (eventsResponse.success && eventsResponse.data) {
          setEvents(eventsResponse.data);
        }
      } else {
        // Revert optimistic update on failure
        setEvents(prevEvents => prevEvents.map(e => {
          if ((e._id || e.id) === eventId) {
            const updatedEnrolledUsers = Array.isArray(e.enrolledUsers) 
              ? e.enrolledUsers.filter(u => {
                  const enrolledUserId = typeof u === 'object' ? (u._id || u.id) : u;
                  return enrolledUserId !== userId;
                })
              : [];
            return {
              ...e,
              enrolledUsers: updatedEnrolledUsers,
              participants: Math.max(0, (e.participants || 0) - 1)
            };
          }
          return e;
        }));
        alert(response.message || 'Failed to enroll in event');
      }
    } catch (err) {
      // Revert optimistic update on error
      setEvents(prevEvents => prevEvents.map(e => {
        if ((e._id || e.id) === eventId) {
          const updatedEnrolledUsers = Array.isArray(e.enrolledUsers) 
            ? e.enrolledUsers.filter(u => {
                const enrolledUserId = typeof u === 'object' ? (u._id || u.id) : u;
                return enrolledUserId !== (user._id || user.id);
              })
            : [];
          return {
            ...e,
            enrolledUsers: updatedEnrolledUsers,
            participants: Math.max(0, (e.participants || 0) - 1)
          };
        }
        return e;
      }));
      alert(err.message || 'Failed to enroll in event');
    } finally {
      setEnrolling(prev => ({ ...prev, [eventId]: false }));
    }
  }, [isAuthenticated, user, navigate, isEnrolled, events, selectedCategory, selectedMode, searchQuery]);

  // Handle unenrollment with optimistic update
  const handleUnenroll = React.useCallback(async (eventId) => {
    const userId = user?._id || user?.id;
    if (!userId) {
      alert('User information not available');
      return;
    }

    try {
      setEnrolling(prev => ({ ...prev, [eventId]: true }));
      
      // Optimistically update UI immediately
      setEvents(prevEvents => prevEvents.map(e => {
        if ((e._id || e.id) === eventId) {
          const updatedEnrolledUsers = Array.isArray(e.enrolledUsers) 
            ? e.enrolledUsers.filter(u => {
                const enrolledUserId = typeof u === 'object' ? (u._id || u.id) : u;
                return enrolledUserId !== userId;
              })
            : [];
          return {
            ...e,
            enrolledUsers: updatedEnrolledUsers,
            participants: Math.max(0, (e.participants || 0) - 1)
          };
        }
        return e;
      }));

      const response = await eventsAPI.unenroll(eventId);
      
      if (response.success) {
        // Refresh events list to get accurate data from server
        const eventsResponse = await eventsAPI.getAll({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          mode: selectedMode !== 'all' ? selectedMode : undefined,
          search: searchQuery || undefined,
          status: 'all'
        });
        
        if (eventsResponse.success && eventsResponse.data) {
          setEvents(eventsResponse.data);
        }
      } else {
        // Revert optimistic update on failure
        setEvents(prevEvents => prevEvents.map(e => {
          if ((e._id || e.id) === eventId) {
            const updatedEnrolledUsers = Array.isArray(e.enrolledUsers) 
              ? [...e.enrolledUsers, { _id: userId, id: userId }]
              : [{ _id: userId, id: userId }];
            return {
              ...e,
              enrolledUsers: updatedEnrolledUsers,
              participants: (e.participants || 0) + 1
            };
          }
          return e;
        }));
        alert(response.message || 'Failed to unenroll from event');
      }
    } catch (err) {
      // Revert optimistic update on error
      setEvents(prevEvents => prevEvents.map(e => {
        if ((e._id || e.id) === eventId) {
          const updatedEnrolledUsers = Array.isArray(e.enrolledUsers) 
            ? [...e.enrolledUsers, { _id: userId, id: userId }]
            : [{ _id: userId, id: userId }];
          return {
            ...e,
            enrolledUsers: updatedEnrolledUsers,
            participants: (e.participants || 0) + 1
          };
        }
        return e;
      }));
      alert(err.message || 'Failed to unenroll from event');
    } finally {
      setEnrolling(prev => ({ ...prev, [eventId]: false }));
    }
  }, [user, selectedCategory, selectedMode, searchQuery]);

  const categories = ['all', 'AI/ML', 'Web3', 'Web Dev', 'Mobile', 'No-Code AI'];
  const modes = ['all', 'solo', 'team'];

  // Filter events based on category, mode, and search
  const filteredEvents = events.filter(event => {
    // Category filter
    if (selectedCategory !== 'all' && event.category !== selectedCategory) {
      return false;
    }
    
    // Mode filter
    if (selectedMode !== 'all' && event.mode !== selectedMode) {
      return false;
    }
    
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return event.title.toLowerCase().includes(searchLower) ||
             event.description.toLowerCase().includes(searchLower) ||
             (event.tags && event.tags.some(tag => tag.toLowerCase().includes(searchLower)));
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            Event Database
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-none mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Events</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Browse available hackathon events and problem statements. Join solo or form a team of 2-4 members.
          </p>
          {user?.role === 'admin' && (
            <Link
              to="/events/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 rounded-xl mt-4"
            >
              <PlusIcon className="w-5 h-5" />
              Create Event
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-mono uppercase">Category:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-pink-500 text-white border border-pink-500'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-pink-500/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-mono uppercase">Mode:</span>
            <div className="flex gap-2">
              {modes.map(mode => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    selectedMode === mode
                      ? 'bg-orange-500 text-white border border-orange-500'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-orange-500/50'
                  }`}
                >
                  {mode === 'solo' && <UserIcon className="w-4 h-4" />}
                  {mode === 'team' && <UsersIcon className="w-4 h-4" />}
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State - Only show if we have no events */}
        {loading && events.length === 0 && (
          <div className="text-center py-20">
            <div
              className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin"
            />
            <p className="text-gray-400">Loading events...</p>
          </div>
        )}

        {/* Events Grid */}
        {filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const enrolled = isEnrolled(event);
              const canEnroll = isAuthenticated && user?.role === 'user' && !enrolled && (event.status === 'open' || event.status === 'ongoing');
              const isFull = event.participants >= event.maxParticipants;
              
              return (
            <div
              key={event._id || event.id}
              className="group relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-b from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              
              <div className="relative bg-[#0f111a] p-6 h-full flex flex-col">
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase ${
                    event.status === 'open' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    event.status === 'ongoing' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {event.status}
                  </span>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <span className="text-xs font-mono text-pink-400 uppercase tracking-wider">
                    {event.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-white uppercase mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-orange-500 transition-all">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">
                  {event.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-mono mb-1">
                      <TrophyIcon className="w-4 h-4" />
                      Prize
                    </div>
                    <div className="text-lg font-black text-white">{event.prize}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-mono mb-1">
                      <UsersIcon className="w-4 h-4" />
                      Joined
                    </div>
                    <div className="text-lg font-black text-white">
                      {event.participants || 0}/{event.maxParticipants}
                    </div>
                  </div>
                </div>

                {/* Mode & Date */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {event.mode === 'solo' ? (
                      <UserIcon className="w-5 h-5 text-orange-400" />
                    ) : event.mode === 'team' ? (
                      <UsersIcon className="w-5 h-5 text-pink-400" />
                    ) : (
                      <div className="flex gap-1">
                        <UserIcon className="w-4 h-4 text-orange-400" />
                        <UsersIcon className="w-4 h-4 text-pink-400" />
                      </div>
                    )}
                    <span className="text-xs font-mono text-gray-400 uppercase">
                      {event.mode === 'both' ? 'Solo/Team' : event.mode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                    <CalendarIcon className="w-4 h-4" />
                    {event.startDate ? new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/events/${event._id || event.id}`}
                    className="flex-1 py-3 bg-transparent border border-pink-500/30 text-white font-bold uppercase tracking-widest text-xs hover:bg-pink-500 hover:border-pink-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    View Details
                    <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  
                  {isAuthenticated && user?.role === 'user' && (event.status === 'open' || event.status === 'ongoing') && !isFull && !enrolled && (
                    <button
                      onClick={() => handleEnroll(event._id || event.id)}
                      disabled={enrolling[event._id || event.id]}
                      className="px-4 py-3 bg-green-500/20 border border-green-500/30 text-green-400 font-bold uppercase tracking-widest text-xs hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {enrolling[event._id || event.id] ? (
                        <>
                          <div
                            className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"
                          />
                          Enrolling...
                        </>
                      ) : (
                        <>
                          <CheckCircleIcon className="w-4 h-4" />
                          Enroll
                        </>
                      )}
                    </button>
                  )}
                  
                  {enrolled && (
                    <div className="px-4 py-3 bg-green-500/20 border border-green-500/30 text-green-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                      <CheckCircleIcon className="w-4 h-4" />
                      Enrolled
                    </div>
                  )}
                  
                  {isFull && !enrolled && (
                    <div className="px-4 py-3 bg-gray-500/20 border border-gray-500/30 text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center">
                      Full
                    </div>
                  )}
                </div>
              </div>
            </div>
            );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <FireIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white uppercase mb-2">No Events Found</h3>
            <p className="text-gray-400">Try adjusting your filters to see more events.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;

