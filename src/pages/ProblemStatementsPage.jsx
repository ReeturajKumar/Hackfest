import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { problemStatementsAPI } from '../api/auth';
import { 
  CodeBracketIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  TagIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Hardcoded fallback problem statements data
const HARDCODED_PROBLEM_STATEMENTS = [
  {
    _id: '1',
    id: '1',
    title: 'AI-Powered Medical Diagnosis System',
    description: 'Develop an AI system that can analyze medical images and patient data to assist doctors in making accurate diagnoses. The system should support multiple imaging modalities and provide confidence scores.',
    category: 'AI/ML',
    difficulty: 'Advanced',
    status: 'active',
    tags: ['AI', 'Healthcare', 'Computer Vision', 'Deep Learning'],
    requirements: ['Python', 'TensorFlow', 'Medical Imaging APIs', 'Data Analysis'],
    expectedOutcome: 'A working prototype that can analyze medical images and provide diagnostic suggestions with accuracy metrics.',
    resources: ['Medical imaging datasets', 'TensorFlow documentation', 'Healthcare API references'],
    associatedEvents: []
  },
  {
    _id: '2',
    id: '2',
    title: 'Decentralized Voting Platform',
    description: 'Create a blockchain-based voting system that ensures transparency, immutability, and prevents fraud. The platform should allow users to create polls and vote securely.',
    category: 'Web3',
    difficulty: 'Intermediate',
    status: 'active',
    tags: ['Blockchain', 'Web3', 'Voting', 'Smart Contracts'],
    requirements: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
    expectedOutcome: 'A fully functional decentralized voting platform with smart contract integration and a user-friendly interface.',
    resources: ['Ethereum documentation', 'Solidity tutorials', 'Web3.js guides'],
    associatedEvents: []
  },
  {
    _id: '3',
    id: '3',
    title: 'No-Code AI Model Builder',
    description: 'Build a platform where users can create and train AI models using a drag-and-drop interface without writing code. Support common ML tasks like classification and regression.',
    category: 'No-Code AI',
    difficulty: 'Intermediate',
    status: 'active',
    tags: ['No-Code', 'AI', 'ML', 'Automation'],
    requirements: ['React', 'Python Backend', 'ML Libraries', 'Drag-and-Drop UI'],
    expectedOutcome: 'A working no-code platform that allows users to build and deploy AI models through a visual interface.',
    resources: ['Scikit-learn documentation', 'React DnD library', 'ML model APIs'],
    associatedEvents: []
  },
  {
    _id: '4',
    id: '4',
    title: 'Mobile App for Mental Health Tracking',
    description: 'Develop a mobile application that helps users track their mental health, mood, and provides resources for mental wellness. Include features like mood journals and meditation guides.',
    category: 'Mobile',
    difficulty: 'Beginner',
    status: 'active',
    tags: ['Mobile', 'Health', 'Wellness', 'React Native'],
    requirements: ['React Native', 'Firebase', 'UI/UX Design', 'Health APIs'],
    expectedOutcome: 'A polished mobile app with mood tracking, journaling, and wellness resources.',
    resources: ['React Native docs', 'Firebase setup guides', 'Mental health APIs'],
    associatedEvents: []
  },
  {
    _id: '5',
    id: '5',
    title: 'Real-Time Collaboration Code Editor',
    description: 'Create a web-based code editor that allows multiple users to collaborate in real-time, similar to Google Docs but for code. Include syntax highlighting and live cursors.',
    category: 'Web Dev',
    difficulty: 'Advanced',
    status: 'active',
    tags: ['Web Dev', 'Real-time', 'Collaboration', 'WebSockets'],
    requirements: ['React', 'Node.js', 'WebSockets', 'Code Editor Libraries'],
    expectedOutcome: 'A fully functional collaborative code editor with real-time synchronization and user presence indicators.',
    resources: ['Socket.io documentation', 'Monaco Editor', 'Operational Transform guides'],
    associatedEvents: []
  },
  {
    _id: '6',
    id: '6',
    title: 'AI-Powered Content Moderation System',
    description: 'Build an AI system that can automatically moderate user-generated content, detecting inappropriate text, images, and videos. Provide moderation scores and explanations.',
    category: 'AI/ML',
    difficulty: 'Intermediate',
    status: 'active',
    tags: ['AI', 'Moderation', 'NLP', 'Content Safety'],
    requirements: ['Python', 'NLP Libraries', 'Image Processing', 'API Development'],
    expectedOutcome: 'An AI moderation system that can analyze and flag inappropriate content across multiple media types.',
    resources: ['Hugging Face models', 'OpenCV documentation', 'Content moderation APIs'],
    associatedEvents: []
  }
];

const ProblemStatementsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const [problemStatements, setProblemStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    status: 'all',
    search: ''
  });

  // Fetch problem statements
  const fetchProblemStatements = useCallback(async () => {
    try {
      setLoading(true);
      setUsingFallback(false);
      const response = await problemStatementsAPI.getAll(filters);
      if (response.success && response.data && response.data.length > 0) {
        setProblemStatements(response.data);
        setUsingFallback(false);
      } else {
        // Backend returned empty or no data, use fallback
        setProblemStatements(HARDCODED_PROBLEM_STATEMENTS);
        setUsingFallback(true);
      }
    } catch (error) {
      console.error('Error fetching problem statements:', error);
      // Use hardcoded data when backend fails
      setProblemStatements(HARDCODED_PROBLEM_STATEMENTS);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProblemStatements();
  }, [fetchProblemStatements]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this problem statement?')) return;
    try {
      await problemStatementsAPI.delete(id);
      fetchProblemStatements();
    } catch (error) {
      alert(error.message || 'Failed to delete problem statement');
    }
  };

  const categories = ['all', 'AI/ML', 'Web3', 'Web Dev', 'Mobile', 'No-Code AI'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const statuses = ['all', 'draft', 'active', 'archived'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a0a0f] to-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                Problem Statements
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-none mb-4">
                Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Challenges</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                Browse curated problem statements{isAdmin ? ' and manage them' : ''}. Choose a challenge that excites you!
              </p>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 flex items-center gap-2 rounded-xl"
                >
                  <PlusIcon className="w-5 h-5" />
                  Create Problem
                </button>
              )}
              <button
                onClick={fetchProblemStatements}
                disabled={loading}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300 flex items-center gap-2 rounded-xl disabled:opacity-50"
              >
                <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search problem statements..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
              />
            </div>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              className="px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff === 'all' ? 'All Difficulties' : diff}</option>
              ))}
            </select>
            {isAdmin && (
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status === 'all' ? 'All Statuses' : status}</option>
                ))}
              </select>
            )}
          </div>
        </motion.div>

        {/* Fallback Data Notice */}
        {usingFallback && !loading && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <p className="text-yellow-400 text-sm">
              <span className="font-bold">Using demo data:</span> Backend connection unavailable. Displaying sample problem statements.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
            <p className="text-gray-400">Loading problem statements...</p>
          </div>
        ) : (
          <>
            {/* Problem Statements Grid */}
            {problemStatements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {problemStatements.map((problem, idx) => (
                  <motion.div
                    key={problem._id || problem.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2 p-6"
                  >
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex gap-2 z-10">
                        <button
                          onClick={() => setEditingProblem(problem)}
                          className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors"
                          title="Edit"
                        >
                          <PencilSquareIcon className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(problem._id || problem.id)}
                          className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <CodeBracketIcon className="w-6 h-6 text-pink-500" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase ${
                          problem.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          problem.difficulty === 'Intermediate' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {problem.difficulty}
                        </span>
                        {isAdmin && problem.status && (
                          <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase ${
                            problem.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            problem.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                            {problem.status}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white uppercase mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-orange-500 transition-all">
                      {problem.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                      {problem.description}
                    </p>

                    <div className="mb-4 flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-mono text-purple-400 uppercase">{problem.category}</span>
                    </div>

                    {problem.tags && problem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {problem.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-400"
                          >
                            #{tag}
                          </span>
                        ))}
                        {problem.tags.length > 3 && (
                          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-400">
                            +{problem.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {problem.associatedEvents && problem.associatedEvents.length > 0 && (
                      <div className="mb-4 text-xs text-gray-500">
                        Used in {problem.associatedEvents.length} event{problem.associatedEvents.length !== 1 ? 's' : ''}
                      </div>
                    )}

                    <Link
                      to="/events"
                      className="block w-full py-3 bg-transparent border border-pink-500/30 text-white font-bold uppercase tracking-widest text-xs hover:bg-pink-500 hover:border-pink-500 hover:text-black transition-all duration-300 text-center rounded-lg"
                    >
                      Participate in Event
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <CodeBracketIcon className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-white uppercase mb-2">No Problem Statements</h3>
                <p className="text-gray-400 mb-6">
                  {isAdmin ? 'Create your first problem statement to get started!' : 'No problem statements available at the moment.'}
                </p>
                {isAdmin && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 rounded-xl flex items-center gap-2 mx-auto"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Create First Problem Statement
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Create/Edit Modal */}
        {(showCreateModal || editingProblem) && (
          <ProblemStatementModal
            problem={editingProblem}
            onClose={() => {
              setShowCreateModal(false);
              setEditingProblem(null);
            }}
            onSuccess={() => {
              setShowCreateModal(false);
              setEditingProblem(null);
              fetchProblemStatements();
            }}
          />
        )}
      </div>
    </div>
  );
};

// Problem Statement Modal Component
const ProblemStatementModal = ({ problem, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: problem?.title || '',
    description: problem?.description || '',
    category: problem?.category || 'AI/ML',
    difficulty: problem?.difficulty || 'Intermediate',
    tags: problem?.tags ? problem.tags.join(', ') : '',
    requirements: problem?.requirements ? problem.requirements.join(', ') : '',
    expectedOutcome: problem?.expectedOutcome || '',
    resources: problem?.resources ? problem.resources.join(', ') : '',
    status: problem?.status || 'active'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['AI/ML', 'Web3', 'Web Dev', 'Mobile', 'No-Code AI'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const statuses = ['draft', 'active', 'archived'];

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
        requirements: formData.requirements ? formData.requirements.split(',').map(r => r.trim()).filter(r => r) : [],
        expectedOutcome: formData.expectedOutcome,
        resources: formData.resources ? formData.resources.split(',').map(r => r.trim()).filter(r => r) : [],
        status: formData.status
      };

      let response;
      if (problem) {
        response = await problemStatementsAPI.update(problem._id || problem.id, problemData);
      } else {
        response = await problemStatementsAPI.create(problemData);
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
        setErrors({ submit: error.message || `Failed to ${problem ? 'update' : 'create'} problem statement` });
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
        className="bg-gradient-to-br from-[#0a0a0a] to-[#0f111a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-white uppercase">
            {problem ? 'Edit Problem Statement' : 'Create Problem Statement'}
          </h2>
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
                errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-pink-500'
              }`}
              placeholder="Problem Statement Title"
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
                errors.description ? 'border-red-500/50' : 'border-white/10 focus:border-pink-500'
              }`}
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

          <div>
            <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Requirements (comma-separated)</label>
            <input
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Expected Outcome</label>
            <textarea
              name="expectedOutcome"
              value={formData.expectedOutcome}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
              placeholder="What should participants deliver?"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Resources (comma-separated)</label>
            <input
              type="text"
              name="resources"
              value={formData.resources}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
              placeholder="API docs, Tutorial links"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
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
                  {problem ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-4 h-4" />
                  {problem ? 'Update Problem' : 'Create Problem'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProblemStatementsPage;
