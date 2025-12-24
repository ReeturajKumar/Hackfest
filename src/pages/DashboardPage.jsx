import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { dashboardAPI, eventsAPI, adminAPI, problemStatementsAPI } from '../api/auth';
import {
  UserIcon,
  CalendarIcon,
  TrophyIcon,
  CodeBracketIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PencilIcon,
  UsersIcon,
  SparklesIcon,
  FireIcon,
  StarIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PlusIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user: authUser, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  
  // Get user from auth context or sessionStorage
  const user = dashboardData?.user || authUser || JSON.parse(sessionStorage.getItem('user') || 'null') || {
    name: 'User',
    email: 'user@example.com',
    mode: 'solo',
    category: 'AI/ML',
    role: 'user'
  };

  // Fetch dashboard data - only for user dashboard, admin has separate fetch
  useEffect(() => {
    if (user?.role === 'admin') {
      setLoading(false);
      return;
    }
    
    let isMounted = true;
    
    const fetchDashboardData = async () => {
      try {
        setError(null);
        const response = await dashboardAPI.getStats();
        
        if (!isMounted) return;
        
        if (response.success && response.data) {
          setDashboardData(response.data);
          
          if (response.data.user) {
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
          }
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Dashboard fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();
    
    return () => {
      isMounted = false;
    };
  }, [user?.role]); // Only fetch when role changes, not on tab change

  // Get stats with fallback
  const userStats = dashboardData?.stats || {
    eventsParticipated: 0,
    eventsWon: 0,
    totalPoints: 0,
    rank: 0,
    completionRate: 0,
    streak: 0
  };

  // Get upcoming events with fallback
  const upcomingEvents = dashboardData?.upcomingEvents || [];

  // Get recent activity with fallback and icon mapping
  const getActivityIcon = (iconName) => {
    const iconMap = {
      'CheckCircleIcon': CheckCircleIcon,
      'CreditCardIcon': CreditCardIcon,
      'UserIcon': UserIcon,
      'CalendarIcon': CalendarIcon
    };
    return iconMap[iconName] || CheckCircleIcon;
  };

  const recentActivity = (dashboardData?.recentActivity || []).map(activity => ({
    ...activity,
    icon: typeof activity.icon === 'string' ? getActivityIcon(activity.icon) : activity.icon || CheckCircleIcon
  }));

  // Get achievements with icon mapping
  const getAchievementIcon = (iconName) => {
    const iconMap = {
      'StarIcon': StarIcon,
      'ShieldCheckIcon': ShieldCheckIcon,
      'FireIcon': FireIcon,
      'TrophyIcon': TrophyIcon
    };
    return iconMap[iconName] || StarIcon;
  };

  const achievements = (dashboardData?.achievements || []).map(achievement => ({
    ...achievement,
    icon: typeof achievement.icon === 'string' ? getAchievementIcon(achievement.icon) : achievement.icon || StarIcon
  }));

  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'users', label: 'User Management', icon: UsersIcon },
    { id: 'events', label: 'Event Management', icon: CalendarIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon }
  ];

  const userTabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'events', label: 'My Events', icon: CalendarIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon }
  ];

  const tabs = user?.role === 'admin' ? adminTabs : userTabs;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  // Admin Dashboard Component
  const AdminDashboard = () => {
    const [adminStats, setAdminStats] = useState({
      totalUsers: 0,
      totalEvents: 0,
      totalParticipants: 0,
      activeEvents: 0,
      totalAdmins: 0,
      recentRegistrations: 0
    });
    const [allEvents, setAllEvents] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showProblemModal, setShowProblemModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // Optimized fetch function with useCallback to prevent unnecessary re-renders
    const fetchAdminData = React.useCallback(async () => {
      try {
        setLoadingStats(true);
        
        // Fetch admin stats and events in parallel
        const [statsResponse, eventsResponse] = await Promise.all([
          adminAPI.getStats(),
          eventsAPI.getAll({ status: 'all' })
        ]);
        
        if (statsResponse.success && statsResponse.data) {
          setAdminStats({
            totalUsers: statsResponse.data.totalUsers || 0,
            totalEvents: statsResponse.data.totalEvents || 0,
            totalParticipants: statsResponse.data.totalParticipants || 0,
            activeEvents: statsResponse.data.activeEvents || 0,
            totalAdmins: statsResponse.data.totalAdmins || 0,
            recentRegistrations: statsResponse.data.recentRegistrations || 0
          });
        }
        
        if (eventsResponse.success && eventsResponse.data) {
          setAllEvents(eventsResponse.data);
        }
      } catch (err) {
        console.error('Admin data fetch error:', err);
        // Fallback: try to fetch events only
        try {
          const eventsResponse = await eventsAPI.getAll({ status: 'all' });
          if (eventsResponse.success && eventsResponse.data) {
            setAllEvents(eventsResponse.data);
            // Calculate basic stats from events
            const totalParticipants = eventsResponse.data.reduce((sum, event) => {
              return sum + (event.participants || 0);
            }, 0);
            const activeEvents = eventsResponse.data.filter(e => 
              e.status === 'open' || e.status === 'ongoing'
            ).length;
            setAdminStats(prev => ({
              ...prev,
              totalEvents: eventsResponse.data.length,
              totalParticipants,
              activeEvents
            }));
          }
        } catch (fallbackErr) {
          console.error('Fallback fetch error:', fallbackErr);
        }
      } finally {
        setLoadingStats(false);
      }
    }, []);

    // Fetch admin data only once on mount and when refreshKey changes
    useEffect(() => {
      fetchAdminData();
    }, [fetchAdminData, refreshKey]);

    // Refresh function to manually update data
    const refreshData = React.useCallback(() => {
      setRefreshKey(prev => prev + 1);
    }, []);

    return (
      <>
        {/* Admin Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0f111a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 mb-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-start gap-6 flex-1">
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                    <ShieldCheckIcon className="w-10 h-10 md:w-12 md:h-12 text-purple-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    Admin Dashboard
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tighter leading-none mb-2">
                    Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">{user?.name?.split(' ')[0] || 'Admin'}</span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="w-4 h-4 text-purple-400" />
                      <span className="uppercase font-semibold text-purple-400">Administrator</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowEventModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create Event
                </button>
                <button
                  onClick={refreshData}
                  disabled={loadingStats}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl disabled:opacity-50"
                >
                  <ArrowPathIcon className={`w-4 h-4 ${loadingStats ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Admin Tabs */}
          <div className="flex gap-2 border-b border-white/10 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-t-xl p-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 rounded-lg relative ${
                    activeTab === tab.id
                      ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Admin Overview Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="admin-overview"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Admin Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  variants={itemVariants} 
                  className="group bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                        <UsersIcon className="w-6 h-6 text-purple-500" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 uppercase">Total Users</span>
                    </div>
                    <div className="text-4xl font-black text-white mb-1">
                      {loadingStats ? '...' : adminStats.totalUsers}
                    </div>
                    <div className="text-sm text-gray-400">Registered Users</div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants} 
                  className="group bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                        <CalendarIcon className="w-6 h-6 text-pink-500" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 uppercase">Total Events</span>
                    </div>
                    <div className="text-4xl font-black text-white mb-1">
                      {loadingStats ? '...' : adminStats.totalEvents}
                    </div>
                    <div className="text-sm text-gray-400">{adminStats.activeEvents} Active</div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants} 
                  className="group bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        <UsersIcon className="w-6 h-6 text-orange-500" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 uppercase">Participants</span>
                    </div>
                    <div className="text-4xl font-black text-white mb-1">
                      {loadingStats ? '...' : adminStats.totalParticipants}
                    </div>
                    <div className="text-sm text-gray-400">Total Enrollments</div>
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <button
                  onClick={() => setShowEventModal(true)}
                  className="group p-6 bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 text-left"
                >
                  <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 w-fit mb-4">
                    <PlusIcon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Create Event</h3>
                  <p className="text-gray-400 text-sm">Add a new hackathon event</p>
                </button>

                <button
                  onClick={() => setShowProblemModal(true)}
                  className="group p-6 bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-xl hover:border-pink-500/50 transition-all duration-300 text-left"
                >
                  <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20 w-fit mb-4">
                    <CodeBracketIcon className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Create Problem</h3>
                  <p className="text-gray-400 text-sm">Add a new problem statement</p>
                </button>

                <Link
                  to="/events"
                  className="group p-6 bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-xl hover:border-pink-500/50 transition-all duration-300"
                >
                  <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20 w-fit mb-4">
                    <CalendarIcon className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Manage Events</h3>
                  <p className="text-gray-400 text-sm">View and edit all events</p>
                </Link>

                <div className="group p-6 bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer">
                  <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 w-fit mb-4">
                    <UsersIcon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-white font-bold mb-2">User Management</h3>
                  <p className="text-gray-400 text-sm">Manage user accounts</p>
                </div>

                <div className="group p-6 bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-xl hover:border-green-500/50 transition-all duration-300">
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 w-fit mb-4">
                    <DocumentArrowDownIcon className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Export Data</h3>
                  <p className="text-gray-400 text-sm mb-3">Download CSV reports</p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        adminAPI.exportUsersCSV().catch(err => {
                          alert(err.message || 'Failed to export users');
                        });
                      }}
                      className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 font-bold uppercase tracking-widest text-xs hover:bg-green-500/30 transition-colors rounded-lg text-left"
                    >
                      Export Users
                    </button>
                    <button
                      onClick={() => {
                        adminAPI.exportEventsCSV().catch(err => {
                          alert(err.message || 'Failed to export events');
                        });
                      }}
                      className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 font-bold uppercase tracking-widest text-xs hover:bg-green-500/30 transition-colors rounded-lg text-left"
                    >
                      Export Events
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Events */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                      <CalendarIcon className="w-5 h-5 text-pink-500" />
                    </div>
                    <h2 className="text-xl font-black text-white uppercase">Recent Events</h2>
                  </div>
                  <Link to="/events" className="text-xs font-mono text-pink-400 hover:text-pink-500 transition-colors flex items-center gap-1">
                    View All <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>
                {loadingStats ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
                    <p className="text-gray-400">Loading events...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allEvents.slice(0, 5).map(event => (
                      <div
                        key={event._id || event.id}
                        className="group p-5 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-pink-500/30 transition-all duration-300"
                      >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-white font-bold text-lg flex-1">{event.title}</h3>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                          event.status === 'open' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : event.status === 'ongoing'
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4 text-pink-400" />
                          <span>{event.participants || 0}/{event.maxParticipants} participants</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <SparklesIcon className="w-4 h-4 text-purple-400" />
                          <span>{event.category}</span>
                        </div>
                        <Link
                          to={`/events/${event._id || event.id}`}
                          className="ml-auto text-pink-400 hover:text-pink-500 transition-colors flex items-center gap-1"
                        >
                          View <ArrowRightIcon className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                    ))}
                    {allEvents.length === 0 && (
                      <div className="text-center py-12">
                        <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">No events created yet</p>
                        <button
                          onClick={() => setShowEventModal(true)}
                          className="inline-block mt-4 text-pink-400 hover:text-pink-500 text-sm font-bold"
                        >
                          Create First Event →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Users Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'users' && (
            <UserManagementTab 
              currentUser={user}
              refreshData={refreshData}
              onExportCSV={() => {
                adminAPI.exportUsersCSV().catch(err => {
                  alert(err.message || 'Failed to export users');
                });
              }}
            />
          )}
        </AnimatePresence>

        {/* Admin Events Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'events' && (
            <motion.div
              key="admin-events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <CalendarIcon className="w-6 h-6 text-pink-500" />
                      </div>
                      <h2 className="text-2xl font-black text-white uppercase">Event Management</h2>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          adminAPI.exportEventsCSV().catch(err => {
                            alert(err.message || 'Failed to export events');
                          });
                        }}
                        className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 font-bold uppercase tracking-widest text-xs hover:bg-green-500/30 transition-colors rounded-xl flex items-center gap-2"
                      >
                        <DocumentArrowDownIcon className="w-4 h-4" />
                        Export CSV
                      </button>
                      <button
                        onClick={() => setShowEventModal(true)}
                        className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 flex items-center gap-2 rounded-xl"
                      >
                        <PlusIcon className="w-4 h-4" />
                        Create Event
                      </button>
                    </div>
                  </div>
                {loadingStats ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
                    <p className="text-gray-400">Loading events...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allEvents.map((event) => (
                    <div
                      key={event._id || event.id}
                      className="p-5 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-pink-500/30 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                              <UsersIcon className="w-4 h-4 text-pink-400" />
                              <span>{event.participants || 0}/{event.maxParticipants}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <SparklesIcon className="w-4 h-4 text-purple-400" />
                              <span>{event.category}</span>
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              event.status === 'open' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : event.status === 'ongoing'
                                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              adminAPI.exportEventParticipantsCSV(event._id || event.id).catch(err => {
                                alert(err.message || 'Failed to export participants');
                              });
                            }}
                            className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-green-500/50 transition-colors"
                            title="Export Participants CSV"
                          >
                            <DocumentArrowDownIcon className="w-4 h-4 text-gray-400" />
                          </button>
                          <Link
                            to={`/events/${event._id || event.id}`}
                            className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-blue-500/50 transition-colors"
                            title="View Event"
                          >
                            <EyeIcon className="w-4 h-4 text-gray-400" />
                          </Link>
                          <Link
                            to={`/events/create?edit=${event._id || event.id}`}
                            className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-yellow-500/50 transition-colors"
                            title="Edit Event"
                          >
                            <PencilSquareIcon className="w-4 h-4 text-gray-400" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                    {allEvents.length === 0 && (
                      <div className="text-center py-12">
                        <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-black text-white uppercase mb-2">No Events</h3>
                        <p className="text-gray-400 mb-6">Create your first event to get started</p>
                        <button
                          onClick={() => setShowEventModal(true)}
                          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 rounded-xl"
                        >
                          <PlusIcon className="w-4 h-4" />
                          Create Event
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Analytics Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'analytics' && (
            <AnalyticsDashboard allEvents={allEvents} adminStats={adminStats} loadingStats={loadingStats} />
          )}
        </AnimatePresence>

        {/* Admin Settings Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'settings' && (
            <motion.div
              key="admin-settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl"
            >
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Cog6ToothIcon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase">Admin Settings</h2>
                </div>
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-purple-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <UsersIcon className="w-5 h-5 text-purple-400" />
                          </div>
                          <h3 className="text-white font-bold text-lg">Add Admin</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 ml-12">Grant admin privileges to users</p>
                      </div>
                      <button className="text-xs font-mono text-purple-400 hover:text-purple-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Manage <ArrowRightIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-purple-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                            <DocumentArrowDownIcon className="w-5 h-5 text-green-400" />
                          </div>
                          <h3 className="text-white font-bold text-lg">Export Data</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 ml-12">Export user and event data as CSV</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => {
                            adminAPI.exportUsersCSV().catch(err => {
                              alert(err.message || 'Failed to export users');
                            });
                          }}
                          className="text-xs font-mono text-purple-400 hover:text-purple-500 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                        >
                          Users CSV <ArrowRightIcon className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => {
                            adminAPI.exportEventsCSV().catch(err => {
                              alert(err.message || 'Failed to export events');
                            });
                          }}
                          className="text-xs font-mono text-purple-400 hover:text-purple-500 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                        >
                          Events CSV <ArrowRightIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-purple-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                            <ShieldCheckIcon className="w-5 h-5 text-red-400" />
                          </div>
                          <h3 className="text-white font-bold text-lg">Security Settings</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 ml-12">Manage admin security and access controls</p>
                      </div>
                      <Link to="/forgot-password" className="text-xs font-mono text-purple-400 hover:text-purple-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Configure <ArrowRightIcon className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Event Modal */}
        {showEventModal && (
          <EventCreateModal
            onClose={() => setShowEventModal(false)}
            onSuccess={() => {
              setShowEventModal(false);
              refreshData();
            }}
          />
        )}

        {/* Create Problem Statement Modal */}
        {showProblemModal && (
          <ProblemCreateModal
            onClose={() => setShowProblemModal(false)}
            onSuccess={() => {
              setShowProblemModal(false);
              refreshData();
            }}
          />
        )}
      </>
    );
  };

  // Event Create Modal Component
  const EventCreateModal = ({ onClose, onSuccess }) => {
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
      problemStatements: []
    });
    const [availableProblemStatements, setAvailableProblemStatements] = useState([]);
    const [loadingProblems, setLoadingProblems] = useState(true);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch available problem statements
    useEffect(() => {
      const fetchProblemStatements = async () => {
        try {
          setLoadingProblems(true);
          const response = await problemStatementsAPI.getAll({ status: 'active' });
          if (response.success && response.data) {
            setAvailableProblemStatements(response.data);
          }
        } catch (error) {
          console.error('Error fetching problem statements:', error);
        } finally {
          setLoadingProblems(false);
        }
      };
      fetchProblemStatements();
    }, []);

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

    const handleProblemStatementToggle = (problemId) => {
      setFormData(prev => {
        const current = prev.problemStatements || [];
        const isSelected = current.includes(problemId);
        return {
          ...prev,
          problemStatements: isSelected
            ? current.filter(id => id !== problemId)
            : [...current, problemId]
        };
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({});

      try {
        const eventData = {
          ...formData,
          tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
          problemStatements: formData.problemStatements || [],
          maxParticipants: parseInt(formData.maxParticipants)
        };

        const response = await eventsAPI.create(eventData);
        
        // Associate problem statements with event
        if (formData.problemStatements && formData.problemStatements.length > 0) {
          await Promise.all(
            formData.problemStatements.map(problemId =>
              problemStatementsAPI.associateWithEvent(problemId, response.data._id || response.data.id)
            )
          );
        }
        
        if (response.success) {
          onSuccess();
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

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white uppercase">Create Event</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                  errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500'
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
                rows={3}
                className={`w-full px-4 py-3 bg-[#0f111a] border rounded-xl text-white focus:outline-none transition-all ${
                  errors.description ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500'
                }`}
                placeholder="Event Description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
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
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                >
                  {modes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Start Date *</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">End Date *</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Prize</label>
                <input
                  type="text"
                  name="prize"
                  value={formData.prize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., $10,000"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Max Participants</label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                placeholder="AI, Machine Learning, Hackathon"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">
                Problem Statements
                <span className="text-gray-500 ml-2">({formData.problemStatements?.length || 0} selected)</span>
              </label>
              {loadingProblems ? (
                <div className="p-4 bg-[#0f111a] border border-white/10 rounded-xl text-center">
                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-2 animate-spin"></div>
                  <p className="text-gray-400 text-xs">Loading problem statements...</p>
                </div>
              ) : availableProblemStatements.length > 0 ? (
                <div className="max-h-48 overflow-y-auto p-4 bg-[#0f111a] border border-white/10 rounded-xl space-y-2">
                  {availableProblemStatements.map((problem) => {
                    const isSelected = formData.problemStatements?.includes(problem._id || problem.id);
                    return (
                      <label
                        key={problem._id || problem.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-purple-500/10 border-purple-500/30'
                            : 'bg-white/5 border-white/10 hover:border-purple-500/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleProblemStatementToggle(problem._id || problem.id)}
                          className="mt-1 w-4 h-4 rounded border-white/20 bg-transparent text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-sm mb-1">{problem.title}</div>
                          <div className="text-gray-400 text-xs line-clamp-2">{problem.description}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-purple-400">{problem.category}</span>
                            <span className="text-gray-500">•</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              problem.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                              problem.difficulty === 'Intermediate' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {problem.difficulty}
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 bg-[#0f111a] border border-white/10 rounded-xl text-center">
                  <p className="text-gray-400 text-sm mb-2">No problem statements available</p>
                  <Link
                    to="/problem-statements"
                    className="text-purple-400 hover:text-purple-500 text-xs font-bold"
                  >
                    Create Problem Statements →
                  </Link>
                </div>
              )}
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {errors.submit}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4" />
                    Create Event
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  // Analytics Dashboard Component
  const AnalyticsDashboard = ({ allEvents, adminStats, loadingStats }) => {
    // Calculate analytics data
    const eventsByCategory = React.useMemo(() => {
      const categoryCount = {};
      allEvents.forEach(event => {
        const cat = event.category || 'Other';
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
      return categoryCount;
    }, [allEvents]);

    const eventsByStatus = React.useMemo(() => {
      const statusCount = {};
      allEvents.forEach(event => {
        const status = event.status || 'unknown';
        statusCount[status] = (statusCount[status] || 0) + 1;
      });
      return statusCount;
    }, [allEvents]);

    const topEvents = React.useMemo(() => {
      return [...allEvents]
        .sort((a, b) => (b.participants || 0) - (a.participants || 0))
        .slice(0, 5);
    }, [allEvents]);

    const maxCategoryValue = Math.max(...Object.values(eventsByCategory), 1);
    const maxStatusValue = Math.max(...Object.values(eventsByStatus), 1);

    const BarChart = ({ data, maxValue, color }) => {
      return (
        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 capitalize">{key}</span>
                <span className="text-white font-bold">{value}</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-500`}
                  style={{ width: `${(value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <motion.div
        key="admin-analytics"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <ChartBarIcon className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase">Analytics & Reports</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  adminAPI.exportUsersCSV().catch(err => {
                    alert(err.message || 'Failed to export users');
                  });
                }}
                className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 font-bold uppercase tracking-widest text-xs hover:bg-green-500/30 transition-colors rounded-xl flex items-center gap-2"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                Export Users CSV
              </button>
              <button
                onClick={() => {
                  adminAPI.exportEventsCSV().catch(err => {
                    alert(err.message || 'Failed to export events');
                  });
                }}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold uppercase tracking-widest text-xs hover:bg-blue-500/30 transition-colors rounded-xl flex items-center gap-2"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                Export Events CSV
              </button>
            </div>
          </div>
        </div>

        {loadingStats ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
            <p className="text-gray-400">Loading analytics...</p>
          </div>
        ) : (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <UsersIcon className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white mb-1">{adminStats.totalUsers}</div>
                <div className="text-sm text-gray-400">Total Users</div>
                <div className="text-xs text-green-400 mt-2">+{adminStats.recentRegistrations} this week</div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                    <CalendarIcon className="w-6 h-6 text-pink-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white mb-1">{adminStats.totalEvents}</div>
                <div className="text-sm text-gray-400">Total Events</div>
                <div className="text-xs text-orange-400 mt-2">{adminStats.activeEvents} active</div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                    <UsersIcon className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white mb-1">{adminStats.totalParticipants}</div>
                <div className="text-sm text-gray-400">Total Participants</div>
                <div className="text-xs text-blue-400 mt-2">Across all events</div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <ChartBarIcon className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white mb-1">{adminStats.activeEvents}</div>
                <div className="text-sm text-gray-400">Active Events</div>
                <div className="text-xs text-green-400 mt-2">Currently running</div>
              </motion.div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Events by Category */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <SparklesIcon className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase">Events by Category</h3>
                </div>
                {Object.keys(eventsByCategory).length > 0 ? (
                  <BarChart
                    data={eventsByCategory}
                    maxValue={maxCategoryValue}
                    color="bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                ) : (
                  <div className="text-center py-8 text-gray-400">No category data available</div>
                )}
              </motion.div>

              {/* Events by Status */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <ChartBarIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase">Events by Status</h3>
                </div>
                {Object.keys(eventsByStatus).length > 0 ? (
                  <BarChart
                    data={eventsByStatus}
                    maxValue={maxStatusValue}
                    color="bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                ) : (
                  <div className="text-center py-8 text-gray-400">No status data available</div>
                )}
              </motion.div>
            </div>

            {/* Top Events */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <TrophyIcon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-xl font-black text-white uppercase">Top Events by Participants</h3>
              </div>
              {topEvents.length > 0 ? (
                <div className="space-y-4">
                  {topEvents.map((event, index) => (
                    <div
                      key={event._id || event.id}
                      className="p-4 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-orange-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                            index === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            index === 1 ? 'bg-gray-400/20 text-gray-400 border border-gray-400/30' :
                            index === 2 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                            'bg-white/5 text-gray-400 border border-white/10'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold">{event.title}</h4>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                              <span>{event.category}</span>
                              <span>•</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                event.status === 'open' 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                  : event.status === 'ongoing'
                                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                              }`}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-white">{event.participants || 0}</div>
                          <div className="text-xs text-gray-400">participants</div>
                        </div>
                      </div>
                      <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${((event.participants || 0) / (topEvents[0]?.participants || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">No events data available</div>
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    );
  };

  // User Management Tab Component
  const UserManagementTab = ({ onExportCSV, currentUser, refreshData }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
      role: '',
      mode: '',
      category: '',
      search: ''
    });

    const fetchUsers = React.useCallback(async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getUsers({
          page,
          limit: 20,
          ...filters
        });
        if (response.success && response.data) {
          setUsers(response.data.users || []);
          setTotalPages(response.data.pagination?.pages || 1);
        }
      } catch (err) {
        console.error('Fetch users error:', err);
      } finally {
        setLoading(false);
      }
    }, [page, filters]);

    useEffect(() => {
      fetchUsers();
    }, [fetchUsers]);

    const handlePromote = async (userId) => {
      if (!confirm('Are you sure you want to promote this user to admin?')) return;
      try {
        await adminAPI.promoteToAdmin(userId);
        fetchUsers();
        refreshData();
      } catch (err) {
        alert(err.message || 'Failed to promote user');
      }
    };

    const handleDelete = async (userId) => {
      if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
      try {
        await adminAPI.deleteUser(userId);
        fetchUsers();
        refreshData();
      } catch (err) {
        alert(err.message || 'Failed to delete user');
      }
    };

    return (
      <motion.div
        key="admin-users"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <UsersIcon className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase">User Management</h2>
            </div>
            <button 
              onClick={onExportCSV}
              className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 font-bold uppercase tracking-widest text-xs hover:bg-purple-500/30 transition-colors rounded-xl flex items-center gap-2"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search users..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="px-4 py-2 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="px-4 py-2 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={filters.mode}
              onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
              className="px-4 py-2 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">All Modes</option>
              <option value="solo">Solo</option>
              <option value="team">Team</option>
            </select>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-2 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">All Categories</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Web3">Web3</option>
              <option value="Web Dev">Web Dev</option>
              <option value="Mobile">Mobile</option>
              <option value="No-Code AI">No-Code AI</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
              <p className="text-gray-400">Loading users...</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user._id || user.id}
                    className="p-4 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-bold">{user.name}</h3>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            user.role === 'admin' 
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {user.role}
                          </span>
                          {user.mode && (
                            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                              {user.mode}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                          <span>{user.email}</span>
                          {user.category && <span>• {user.category}</span>}
                          {user.enrolledEventsCount !== undefined && (
                            <span>• {user.enrolledEventsCount} events</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {(user._id || user.id) !== (currentUser?._id || currentUser?.id) && (
                          <>
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => handlePromote(user._id || user.id)}
                                className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-400 font-bold uppercase tracking-widest text-xs hover:bg-purple-500/30 transition-colors rounded-lg"
                              >
                                Promote
                              </button>
                            )}
                            {user.role === 'admin' && (
                              <button
                                onClick={async () => {
                                  if (!confirm('Are you sure you want to demote this admin to user?')) return;
                                  try {
                                    await adminAPI.demoteAdmin(user._id || user.id);
                                    fetchUsers();
                                    refreshData();
                                  } catch (err) {
                                    alert(err.message || 'Failed to demote admin');
                                  }
                                }}
                                className="px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold uppercase tracking-widest text-xs hover:bg-orange-500/30 transition-colors rounded-lg"
                              >
                                Demote
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(user._id || user.id)}
                              className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 font-bold uppercase tracking-widest text-xs hover:bg-red-500/30 transition-colors rounded-lg"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {users.length === 0 && (
                <div className="text-center py-12">
                  <UsersIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white uppercase mb-2">No Users Found</h3>
                  <p className="text-gray-400">Try adjusting your filters</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-gray-400 text-sm">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    );
  };

  // Problem Statement Create Modal Component
  const ProblemCreateModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: 'AI/ML',
      difficulty: 'Beginner',
      tags: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ['AI/ML', 'Web3', 'Web Dev', 'Mobile', 'No-Code AI'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

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
        const problemData = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          difficulty: formData.difficulty,
          tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
          status: 'active'
        };

        const response = await problemStatementsAPI.create(problemData);
        
        if (response.success) {
          onSuccess();
        }
      } catch (error) {
        if (error.errors) {
          const validationErrors = {};
          error.errors.forEach(err => {
            validationErrors[err.field] = err.message;
          });
          setErrors(validationErrors);
        } else {
          setErrors({ submit: error.message || 'Failed to create problem statement' });
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white uppercase">Create Problem Statement</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                placeholder="Problem Statement Title"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                placeholder="Describe the problem statement..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
                placeholder="AI, NLP, Chatbot"
              />
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {errors.submit}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4" />
                    Create Problem
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <XCircleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Error Loading Dashboard</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-pink-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-pink-600 transition-colors rounded-xl"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard if user is admin
  if (user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AdminDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Profile Header Card */}
          <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0f111a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 mb-6 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-start gap-6 flex-1">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500/30 flex items-center justify-center backdrop-blur-sm">
                    <UserIcon className="w-10 h-10 md:w-12 md:h-12 text-pink-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                    {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tighter leading-none mb-2">
                    Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">{user?.name?.split(' ')[0] || 'User'}</span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user?.mode === 'solo' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
                      <span className="uppercase font-semibold">{user?.mode === 'solo' ? 'Solo Operator' : 'Team Member'}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </div>
                    {user?.category && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-2">
                          <SparklesIcon className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400">{user.category}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/profile/edit"
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit Profile
                </Link>
                <Link
                  to="/events"
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl"
                >
                  Explore Events
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-white/10 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-t-xl p-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 rounded-lg relative ${
                    activeTab === tab.id
                      ? 'text-white bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Overview Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div 
                  variants={itemVariants} 
                  className="group bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                        <CalendarIcon className="w-6 h-6 text-pink-500" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 uppercase">Events</span>
                    </div>
                    <div className="text-4xl font-black text-white mb-1">{userStats.eventsParticipated}</div>
                    <div className="text-sm text-gray-400">Participated</div>
                    <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants} 
                  className="group bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        <TrophyIcon className="w-6 h-6 text-orange-500" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 uppercase">Wins</span>
                    </div>
                    <div className="text-4xl font-black text-white mb-1">{userStats.eventsWon}</div>
                    <div className="text-sm text-gray-400">Championships</div>
                    <div className="mt-4 flex items-center gap-2">
                      <FireIcon className="w-4 h-4 text-orange-400" />
                      <span className="text-xs text-orange-400">{userStats.streak} day streak</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants} 
                  className="group bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                        <ChartBarIcon className="w-6 h-6 text-purple-500" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 uppercase">Points</span>
                    </div>
                    <div className="text-4xl font-black text-white mb-1">{userStats.totalPoints}</div>
                    <div className="text-sm text-gray-400">Total Score</div>
                    <div className="mt-4 flex items-center gap-2">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-yellow-400">+50 this week</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants} 
                  className="group bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                        <TrophyIcon className="w-6 h-6 text-green-500" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 uppercase">Rank</span>
                    </div>
                    <div className="text-4xl font-black text-white mb-1">#{userStats.rank}</div>
                    <div className="text-sm text-gray-400">Leaderboard</div>
                    <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${userStats.completionRate}%` }}></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Upcoming Events & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Upcoming Events */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <CalendarIcon className="w-5 h-5 text-pink-500" />
                      </div>
                      <h2 className="text-xl font-black text-white uppercase">Upcoming Events</h2>
                    </div>
                    <Link to="/events" className="text-xs font-mono text-pink-400 hover:text-pink-500 transition-colors flex items-center gap-1">
                      View All <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <motion.div
                        key={event.id}
                        whileHover={{ scale: 1.02 }}
                        className="group p-5 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-pink-500/30 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-white font-bold text-lg flex-1">{event.title}</h3>
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                              event.status === 'registered' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4 text-pink-400" />
                              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {event.mode === 'solo' ? <UserIcon className="w-4 h-4 text-blue-400" /> : <UsersIcon className="w-4 h-4 text-green-400" />}
                              <span className="uppercase">{event.mode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <SparklesIcon className="w-4 h-4 text-purple-400" />
                              <span className="text-purple-400">{event.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ClockIcon className="w-4 h-4 text-orange-400" />
                              <span>{event.daysLeft} days left</span>
                            </div>
                          </div>
                          {event.progress > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs mb-2">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-pink-400 font-bold">{event.progress}%</span>
                              </div>
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${event.progress}%` }}
                                  transition={{ duration: 1 }}
                                ></motion.div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {upcomingEvents.length === 0 && (
                      <div className="text-center py-12">
                        <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">No upcoming events</p>
                        <Link to="/events" className="inline-block mt-4 text-pink-400 hover:text-pink-500 text-sm font-bold">
                          Browse Events →
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <ClockIcon className="w-5 h-5 text-purple-500" />
                    </div>
                    <h2 className="text-xl font-black text-white uppercase">Recent Activity</h2>
                  </div>
                  <div className="space-y-3">
                    {recentActivity.map((activity, idx) => {
                      const Icon = activity.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-[#0f111a] border border-white/5 rounded-xl hover:border-purple-500/30 transition-all group"
                        >
                          <div className={`p-2 rounded-lg ${
                            activity.status === 'success' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-medium text-sm mb-1 truncate">
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </div>
                            <div className="text-xs text-gray-400 font-mono">{activity.time}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Achievements Section */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <TrophyIcon className="w-5 h-5 text-yellow-500" />
                    </div>
                    <h2 className="text-xl font-black text-white uppercase">Achievements</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-xl border transition-all ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                            : 'bg-[#0f111a] border-white/5 opacity-50'
                        }`}
                      >
                        <div className={`p-3 rounded-lg mb-3 inline-block ${
                          achievement.unlocked ? 'bg-yellow-500/20' : 'bg-gray-500/20'
                        }`}>
                          <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'}`} />
                        </div>
                        <div className={`text-sm font-bold mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {achievement.title}
                        </div>
                        {achievement.unlocked && achievement.date && (
                          <div className="text-xs text-gray-400 font-mono">
                            {new Date(achievement.date).toLocaleDateString()}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                      <CalendarIcon className="w-6 h-6 text-pink-500" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase">My Enrolled Events</h2>
                  </div>
                  <Link
                    to="/events"
                    className="text-xs font-mono text-pink-400 hover:text-pink-500 transition-colors flex items-center gap-1"
                  >
                    Browse More <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>

                {upcomingEvents && upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => {
                      const eventDate = new Date(event.date);
                      const now = new Date();
                      const daysLeft = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
                      const isOngoing = now >= eventDate && now <= new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);
                      
                      return (
                        <Link
                          key={event.id}
                          to={`/events/${event.id}`}
                          className="block p-5 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-pink-500/30 transition-all group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-white font-bold text-lg flex-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 transition-all">
                              {event.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                              event.status === 'registered' || event.status === 'ongoing'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            }`}>
                              {event.status === 'ongoing' ? 'Live' : 'Enrolled'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4 text-pink-400" />
                              <span>{eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {event.mode === 'solo' ? <UserIcon className="w-4 h-4 text-blue-400" /> : <UsersIcon className="w-4 h-4 text-green-400" />}
                              <span className="uppercase">{event.mode === 'both' ? 'Solo/Team' : event.mode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <SparklesIcon className="w-4 h-4 text-purple-400" />
                              <span className="text-purple-400">{event.category}</span>
                            </div>
                            {isOngoing ? (
                              <div className="flex items-center gap-2 text-orange-400">
                                <FireIcon className="w-4 h-4" />
                                <span>Ongoing</span>
                              </div>
                            ) : daysLeft > 0 ? (
                              <div className="flex items-center gap-2 text-blue-400">
                                <ClockIcon className="w-4 h-4" />
                                <span>{daysLeft} {daysLeft === 1 ? 'day' : 'days'} left</span>
                              </div>
                            ) : null}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-white uppercase mb-2">No Enrolled Events</h3>
                    <p className="text-gray-400 mb-6">You haven't enrolled in any events yet</p>
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 rounded-xl"
                    >
                      Browse Events
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-500/30 flex items-center justify-center backdrop-blur-sm">
                          <UserIcon className="w-12 h-12 text-pink-400" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-white mb-1">{user?.name || 'User'}</h3>
                      <p className="text-sm text-gray-400 mb-4">{user?.email}</p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        user?.mode === 'solo' 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {user?.mode === 'solo' ? <UserIcon className="w-3 h-3" /> : <UsersIcon className="w-3 h-3" />}
                        {user?.mode || 'Not Set'}
                      </div>
                    </div>
                    <Link
                      to="/profile/edit"
                      className="w-full px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl"
                    >
                      <PencilIcon className="w-4 h-4" />
                      Edit Profile
                    </Link>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                    <h2 className="text-2xl font-black text-white uppercase mb-6 flex items-center gap-3">
                      <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <UserIcon className="w-6 h-6 text-pink-500" />
                      </div>
                      Profile Information
                    </h2>
                    <div className="space-y-6">
                      <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                        <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                          <UserIcon className="w-4 h-4" />
                          Full Name
                        </label>
                        <div className="text-white font-semibold text-lg">{user?.name || 'Not set'}</div>
                      </div>
                      <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                        <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                          <EnvelopeIcon className="w-4 h-4" />
                          Email Address
                        </label>
                        <div className="text-white font-semibold">{user?.email || 'Not set'}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                          <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                            <SparklesIcon className="w-4 h-4" />
                            Category
                          </label>
                          <div className="text-white font-semibold uppercase">{user?.category || 'Not Selected'}</div>
                        </div>
                        <div className="p-4 bg-[#0f111a] border border-white/5 rounded-xl">
                          <label className="text-xs font-mono text-gray-400 uppercase mb-2 block flex items-center gap-2">
                            <ShieldCheckIcon className="w-4 h-4" />
                            Role
                          </label>
                          <div className="text-white font-semibold uppercase">{user?.role || 'Participant'}</div>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-mono text-gray-400 uppercase mb-1">Account Status</div>
                            <div className="text-green-400 font-bold flex items-center gap-2">
                              <CheckCircleIcon className="w-5 h-5" />
                              Verified & Active
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-mono text-gray-400 uppercase mb-1">Member Since</div>
                            <div className="text-white font-semibold">
                              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrolled Events Section */}
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <CalendarIcon className="w-6 h-6 text-purple-500" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase">My Enrolled Events</h2>
                  </div>
                  <Link
                    to="/events"
                    className="text-xs font-mono text-pink-400 hover:text-pink-500 transition-colors flex items-center gap-1"
                  >
                    Browse More <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>

                {upcomingEvents && upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingEvents.map((event) => {
                      const eventDate = new Date(event.date);
                      const now = new Date();
                      const daysLeft = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
                      const isOngoing = now >= eventDate && now <= new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);
                      
                      return (
                        <Link
                          key={event.id}
                          to={`/events/${event.id}`}
                          className="block p-5 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-purple-500/30 transition-all group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-white font-bold text-lg flex-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                              {event.title}
                            </h3>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              event.status === 'registered' || event.status === 'ongoing'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            }`}>
                              {event.status === 'ongoing' ? 'Live' : 'Enrolled'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3 text-pink-400" />
                              <span>{eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <SparklesIcon className="w-3 h-3 text-purple-400" />
                              <span>{event.category}</span>
                            </div>
                          </div>
                          {isOngoing ? (
                            <div className="flex items-center gap-2 text-orange-400 text-xs">
                              <FireIcon className="w-3 h-3" />
                              <span>Event is currently ongoing</span>
                            </div>
                          ) : daysLeft > 0 ? (
                            <div className="flex items-center gap-2 text-blue-400 text-xs">
                              <ClockIcon className="w-3 h-3" />
                              <span>{daysLeft} {daysLeft === 1 ? 'day' : 'days'} until start</span>
                            </div>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-white uppercase mb-2">No Enrolled Events</h3>
                    <p className="text-gray-400 mb-6">You haven't enrolled in any events yet. Start participating!</p>
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 rounded-xl"
                    >
                      Browse Events
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl"
            >
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Cog6ToothIcon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase">Settings</h2>
                </div>
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-pink-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <ClockIcon className="w-5 h-5 text-blue-400" />
                          </div>
                          <h3 className="text-white font-bold text-lg">Notifications</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 ml-12">Manage your notification preferences and email alerts</p>
                      </div>
                      <button className="text-xs font-mono text-pink-400 hover:text-pink-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Configure <ArrowRightIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-pink-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                            <CreditCardIcon className="w-5 h-5 text-green-400" />
                          </div>
                          <h3 className="text-white font-bold text-lg">Payment Methods</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 ml-12">Add or update payment information for event registrations</p>
                      </div>
                      <Link to="/payment" className="text-xs font-mono text-pink-400 hover:text-pink-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Manage <ArrowRightIcon className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-br from-[#0f111a] to-[#0a0a0a] border border-white/5 rounded-xl hover:border-pink-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                            <ShieldCheckIcon className="w-5 h-5 text-red-400" />
                          </div>
                          <h3 className="text-white font-bold text-lg">Security</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 ml-12">Change password and manage security settings</p>
                      </div>
                      <Link to="/forgot-password" className="text-xs font-mono text-pink-400 hover:text-pink-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Update <ArrowRightIcon className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardPage;

