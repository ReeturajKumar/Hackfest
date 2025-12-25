/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/purity */
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan || 'solo';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mode: plan,
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const fieldsCompleted = [
    formData.name.length > 0,
    formData.email.includes('@') && formData.email.includes('.'),
    formData.password.length >= 6,
  ].filter(Boolean).length;
  
  const animationSpeed = Math.max(8, 20 - (fieldsCompleted * 4));
  const primaryHex = '#c084fc';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (status === 'error') {
      setStatus('assembling');
      setErrorMessage('');
      setValidationErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (fieldsCompleted < 3) {
      setStatus('error');
      setErrorMessage('All parameters required for transmission.');
      return;
    }

    setStatus('verifying');
    setErrorMessage('');
    setValidationErrors([]);

    // Simulate registration process
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#050014] text-white relative overflow-hidden flex items-center justify-center font-mono py-10">
      
      <style>{`
        .grid-container {
          perspective: 1200px;
          width: 400px;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .octahedron-core {
          position: relative;
          width: 300px;
          height: 300px;
          transform-style: preserve-3d;
          animation: rotate-octahedron ${animationSpeed}s linear infinite;
        }

        .octahedron-face {
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.1);
          box-shadow: 0 0 30px ${primaryHex}15;
          opacity: 0.7;
        }

        .octa-1 { transform: rotateX(45deg) rotateY(45deg); }
        .octa-2 { transform: rotateX(45deg) rotateY(-45deg); }
        .octa-3 { transform: rotateX(-45deg) rotateY(45deg); }
        .octa-4 { transform: rotateX(-45deg) rotateY(-45deg); }

        .stream-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, ${primaryHex}, transparent);
          box-shadow: 0 0 10px ${primaryHex};
          animation: data-flow 10s linear infinite;
          opacity: 0;
        }

        .data-node {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${primaryHex};
          box-shadow: 0 0 15px ${primaryHex};
        }

        .input-field {
          width: 100%;
          background: #0a0515;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          color: white;
          outline: none;
          transition: all 0.3s;
          font-size: 0.875rem;
        }

        .input-field::placeholder {
          color: #4b5563;
        }

        .input-field:focus {
          border-color: ${primaryHex};
          box-shadow: 0 0 15px ${primaryHex}50;
        }

        .input-name {
          text-transform: uppercase;
        }

        @keyframes rotate-octahedron {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        @keyframes data-flow {
          0% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(300px); opacity: 0; }
          100% { transform: translateY(600px); opacity: 0; }
        }
      `}</style>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10 bg-black/80 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        
        <div className="flex flex-col justify-center px-8 lg:px-14 py-12 border-r border-white/10">
          
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              Initialize{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Transmitter</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-3">
              Securely injecting parameters into the data field.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 block">
                / Parameter 01: OPERATIVE ID
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
                <input
                  type="text"
                  name="name"
                  placeholder="OPERATIVE IDENTIFIER"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field input-name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 block">
                / Parameter 02: UPLINK ADDRESS
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
                <input
                  type="email"
                  name="email"
                  placeholder="uplink@grid.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 block">
                / Parameter 03: SECURITY KEY
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500 text-red-300 text-xs p-3 rounded mb-6 animate-pulse">
                <span className="font-bold">ERROR:</span> {errorMessage}
              </div>
            )}

            

            <button
              type="submit"
              disabled={status === 'verifying' || status === 'success' || fieldsCompleted < 3}
              className={`w-full py-4 text-sm font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${
                status === 'success' 
                  ? 'bg-green-500 text-black' 
                  : fieldsCompleted < 3
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-gray-200 cursor-pointer'
              }`}
            >
              {status === 'verifying' ? (
                <>Verifying Data <Loader2 className="w-4 h-4 animate-spin"/></>
              ) : status === 'success' ? (
                <>Signature Transmitted <CheckCircle className="w-4 h-4"/></>
              ) : (
                <>Transmit Signature <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-500">
            <span>Already have an account?</span>
            <Link to="/login" className="ml-2 text-pink-500 hover:text-pink-400 font-bold underline">
              Access Login Terminal
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex flex-col relative h-full min-h-[600px] bg-[#0a0515] items-center justify-center overflow-hidden">
          
          <div className="absolute inset-0" style={{ 
            background: 'radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.08) 0%, transparent 60%)'
          }}></div>

          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="stream-line" 
                style={{ 
                  animationDelay: `${i * 0.4}s`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5
                }}
              />
            ))}
          </div>

          <div className="grid-container relative z-20">
            <div className="octahedron-core">
              <div className="octahedron-face octa-1"></div>
              <div className="octahedron-face octa-2"></div>
              <div className="octahedron-face octa-3"></div>
              <div className="octahedron-face octa-4"></div>
              
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full animate-pulse" 
                style={{ 
                  backgroundColor: primaryHex, 
                  boxShadow: `0 0 40px ${primaryHex}` 
                }}
              />
              
              {fieldsCompleted >= 1 && (
                <div className="data-node" style={{top: '5%', left: '5%'}} />
              )}
              {fieldsCompleted >= 2 && (
                <div className="data-node" style={{top: '5%', right: '5%'}} />
              )}
              {fieldsCompleted >= 3 && (
                <div className="data-node" style={{bottom: '5%', left: '5%'}} />
              )}
            </div>
          </div>

          <div className="absolute bottom-10 text-center z-20">
            <div className="text-xl font-bold uppercase tracking-widest text-white">
              PHASE: <span style={{ color: primaryHex }}>{status.toUpperCase()}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ALIGNMENT: {Math.round((fieldsCompleted / 3) * 100)}% COMPLETE
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;