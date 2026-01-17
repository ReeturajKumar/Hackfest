import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UsersIcon,
  UserIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, individual, team
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;

  // completed, failed

  const API_BASE_URL = 'http://localhost:8080/api/v1';

  const fetchData = async (pageNumber = page) => {
    setLoading(true);
    setError(null);

    try {
      const [statsRes, regRes] = await Promise.all([
        fetch(`${API_BASE_URL}/stats`),
        fetch(`${API_BASE_URL}/registrations?page=${pageNumber}&limit=${PAGE_SIZE}`)
      ]);

      const statsData = await statsRes.json();
      const regData = await regRes.json();

      if (statsData.success) setStats(statsData.data);

      if (regData.success) {
        setRegistrations(regData.data);

        // FIX: Read totalPages directly from the root of the response
        setTotalPages(regData.totalPages);
      }

    } catch (err) {
      console.error("Error fetching data:", err); // Helpful for debugging
      setError('Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setPage(1);
  }, [searchQuery, filterType, filterStatus]);

  // 2. Fetch data when page OR filters change
  useEffect(() => {
    // Add a debounce for search if possible, otherwise this triggers on every keystroke
    const timer = setTimeout(() => {
      fetchData(page);
    }, 500); // 500ms delay for search debounce

    return () => clearTimeout(timer);
  }, [page, searchQuery, filterType, filterStatus]);

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.registrationId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || reg.participationType === filterType;
    const matchesStatus = filterStatus === 'all' || reg.paymentStatus === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const StatCard = ({ title, value, icon: Icon, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color.bg}`}>
          <Icon className={`w-6 h-6 ${color.text}`} />
        </div>
        <span className="text-caption-sm font-bold text-gray-400 uppercase tracking-widest">Live</span>
      </div>
      <div>
        <h3 className="text-gray-500 text-label-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-display-sm font-black text-black">{value ?? '...'}</p>
      </div>
    </motion.div>
  );

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <ArrowPathIcon className="w-12 h-12 text-pink-500 animate-spin" />
          <p className="text-gray-500 font-medium">Loading Dashboard Data...</p>
        </div>
      </div>
    );
  }

  const handleExport = () => {
    window.open(`${API_BASE_URL}/registrations/export`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-display-md text-black mb-1">Admin Dashboard</h1>
            <p className="text-gray-500 font-medium">Manage registrations and monitor hackathon growth.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors shadow-lg shadow-green-500/20"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              Export to Excel
            </button>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700"
          >
            <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <StatCard
            title="Total Registrations"
            value={stats?.total}
            icon={UsersIcon}
            color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
            delay={0.1}
          />
          <StatCard
            title="Individual"
            value={stats?.individual}
            icon={UserIcon}
            color={{ bg: 'bg-pink-50', text: 'text-pink-600' }}
            delay={0.2}
          />
          <StatCard
            title="Team"
            value={stats?.team}
            icon={UserGroupIcon}
            color={{ bg: 'bg-purple-50', text: 'text-purple-600' }}
            delay={0.3}
          />
          <StatCard
            title="Payments (Paid)"
            value={stats?.paid}
            icon={CheckCircleIcon}
            color={{ bg: 'bg-green-50', text: 'text-green-600' }}
            delay={0.4}
          />
          <StatCard
            title="Pending Payments"
            value={stats?.pending}
            icon={ClockIcon}
            color={{ bg: 'bg-orange-50', text: 'text-orange-600' }}
            delay={0.5}
          />
        </div>

        {/* Table Controls */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-white sticky top-0 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email or ID..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-pink-500/20 transition-all font-medium text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
                  <FunnelIcon className="w-4 h-4 text-gray-500" />
                  <select
                    className="bg-transparent border-none text-xs font-bold text-gray-600 focus:ring-0 cursor-pointer"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="individual">Individual</option>
                    <option value="team">Team</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
                  <select
                    className="bg-transparent border-none text-xs font-bold text-gray-600 focus:ring-0 cursor-pointer"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-caption-sm font-bold text-gray-500 uppercase tracking-widest">Registration ID</th>
                  <th className="px-6 py-4 text-caption-sm font-bold text-gray-500 uppercase tracking-widest">Participant</th>
                  <th className="px-6 py-4 text-caption-sm font-bold text-gray-500 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-caption-sm font-bold text-gray-500 uppercase tracking-widest">Team Name</th>
                  <th className="px-6 py-4 text-caption-sm font-bold text-gray-500 uppercase tracking-widest">Payment</th>
                  <th className="px-6 py-4 text-caption-sm font-bold text-gray-500 uppercase tracking-widest text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode="popLayout">
                  {filteredRegistrations.map((reg, idx) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={reg._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-xs font-black font-mono text-pink-600 bg-pink-50 px-2 py-1 rounded">
                          {reg.registrationId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-black">{reg.name}</span>
                          <span className="text-xs text-gray-500">{reg.email}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{reg.mobile}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${reg.participationType === 'team' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                          {reg.participationType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">
                        {reg.teamName || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {reg.paymentStatus === 'completed' ? (
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          ) : reg.paymentStatus === 'pending' ? (
                            <ClockIcon className="w-4 h-4 text-orange-400" />
                          ) : (
                            <XCircleIcon className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-xs font-bold capitalize ${reg.paymentStatus === 'completed' ? 'text-green-600' :
                            reg.paymentStatus === 'pending' ? 'text-orange-600' : 'text-red-600'
                            }`}>
                            {reg.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs font-medium text-gray-400">
                          {new Date(reg.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredRegistrations.length === 0 && (
              <div className="p-20 text-center">
                <div className="max-w-xs mx-auto">
                  <MagnifyingGlassIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-black font-bold mb-1">No registrations found</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">
              Showing <span className="text-gray-700 font-bold">{filteredRegistrations.length}</span> of <span className="text-gray-700 font-bold">{registrations.length}</span> registrations
            </p>
          </div>
        </div>


        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
          <p className="text-xs font-medium text-gray-500">
            Page <span className="font-bold text-gray-700">{page}</span> of{' '}
            <span className="font-bold text-gray-700">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border bg-green-500 disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border bg-green-500 disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default DashboardPage;
