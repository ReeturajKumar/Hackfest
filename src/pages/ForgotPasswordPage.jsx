import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  EnvelopeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import authAPI from '../api/auth';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token');
  
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(tokenFromUrl ? 'reset' : 'email'); // email, reset
  const [resetToken, setResetToken] = useState(tokenFromUrl || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (tokenFromUrl) {
      setStep('reset');
      setResetToken(tokenFromUrl);
    }
  }, [tokenFromUrl]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await authAPI.forgotPassword(email);
      setSuccessMessage('Password reset token sent! Check your email or console for the reset link.');
      
      // In development, the backend returns resetToken in response
      if (response.data?.resetToken) {
        setResetToken(response.data.resetToken);
        setTimeout(() => {
          setStep('reset');
        }, 2000);
      } else {
        // In production, user would check email
        console.log('Reset token would be sent via email in production');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return;
    }

    if (!resetToken) {
      setErrorMessage('Reset token is missing. Please request a new one.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await authAPI.resetPassword(resetToken, newPassword);
      setSuccessMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Password reset failed. The token may have expired. Please request a new one.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/login"
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Login
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            Password Recovery
          </div>

          <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter leading-none mb-8">
            Reset <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Password</span>
          </h1>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-green-400 text-sm">{successMessage}</p>
              </div>
            )}

            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <EnvelopeIcon className="w-6 h-6 text-pink-500" />
                  <h2 className="text-xl font-black text-white uppercase">Enter Your Email</h2>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  We'll send you a password reset link to your email address.
                </p>
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Email Address</label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  <h2 className="text-xl font-black text-white uppercase">Set New Password</h2>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Enter your new password. It must be at least 8 characters with uppercase, lowercase, and a number.
                </p>
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="Enter new password"
                    required
                    minLength="8"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full px-4 py-3 bg-[#0f111a] border border-white/10 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="Confirm new password"
                    required
                    minLength="8"
                  />
                </div>
                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    Passwords do not match
                  </p>
                )}
                {!resetToken && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-400 text-sm">
                      No reset token found. Please request a new password reset link.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="mt-2 text-yellow-400 hover:text-yellow-300 text-sm underline"
                    >
                      Request New Link
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading || newPassword !== confirmPassword || !resetToken || newPassword.length < 8}
                  className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

