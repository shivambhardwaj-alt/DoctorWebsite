import React, { useState, useContext  } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Admin'); // 'Admin' | 'Doctor'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setToken, backend_url } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const navigate = useNavigate();

    const endpoint = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
    const storageKey = state === 'Admin' ? 'adminToken' : 'doctorToken';

    try {
      const { data } = await axios.post(
        `${backend_url}${endpoint}`,
        { email: email.trim(), password },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );

      if (data.success) {
        setToken(data.token);
        localStorage.setItem(storageKey, data.token);
        navigate('/admin-dashboard');
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Check that the server is running.');
      } else if (err.response?.status === 404) {
        setError('Login endpoint not found. Check the server configuration.');
      } else if (err.response?.status === 401 || err.response?.status === 400) {
        setError(err.response?.data?.message || 'Invalid email or password.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again shortly.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 font-chart-sans relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
        .font-chart-serif { font-family: 'Source Serif 4', Georgia, serif; }
        .font-chart-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-chart-mono { font-family: 'JetBrains Mono', monospace; }

        .chart-grid {
          background-image:
            linear-gradient(to right, #0F6E5608 1px, transparent 1px),
            linear-gradient(to bottom, #0F6E5608 1px, transparent 1px);
          background-size: 28px 28px;
        }

        @keyframes drawPulse {
          to { stroke-dashoffset: 0; }
        }
        .pulse-path {
          stroke-dasharray: 620;
          stroke-dashoffset: 620;
          animation: drawPulse 1.6s ease-out 0.2s forwards;
        }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rise-in { animation: riseIn 0.5s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .pulse-path { animation: none; stroke-dashoffset: 0; }
          .rise-in { animation: none; }
        }
      `}</style>


      <div className="absolute inset-0 chart-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#FAFAF7] pointer-events-none" />

      <div className="max-w-sm w-full relative rise-in">
        <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-3 text-center">
          Staff Access
        </p>

       
        <div className="relative bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.04),0_16px_40px_-12px_rgba(20,33,61,0.14)] pt-8 pb-8 px-8">

   
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-white rounded-b-full border-x border-b border-[#14213D]/10" />

       
          <svg viewBox="0 0 300 40" className="w-full h-8 mb-5" preserveAspectRatio="none">
            <path
              className="pulse-path"
              d="M0,20 L70,20 L84,20 L92,6 L102,34 L112,12 L120,20 L300,20"
              fill="none"
              stroke="#0F6E56"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Role toggle, styled like filing tabs */}
          <div className="flex border-b border-[#14213D]/10 mb-6">
            {['Admin', 'Doctor'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  setState(role);
                  setEmail('');
                  setPassword('');
                  setError('');
                }}
                disabled={loading}
                className={`flex-1 pb-3 text-sm font-medium tracking-wide transition-colors border-b-2 -mb-px
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6E56] disabled:opacity-50
                  ${state === role
                    ? 'text-[#14213D] border-[#0F6E56]'
                    : 'text-[#9A968C] border-transparent hover:text-[#14213D]'}`}
              >
                {role}
              </button>
            ))}
          </div>

          <h2 className="font-chart-serif text-2xl font-semibold text-[#14213D] text-center mb-1">
            {state} Sign-in
          </h2>
          <p className="font-chart-mono text-[11px] text-[#9A968C] text-center mb-7">
            Credentials required for record access
          </p>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <label htmlFor="email" className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-3.5 py-2.5 bg-white border border-[#14213D]/15 rounded-sm text-sm text-[#14213D]
                  placeholder-[#9A968C]/70 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/25 focus:border-[#0F6E56]
                  transition-colors disabled:opacity-50"
                placeholder={state === 'Admin' ? 'admin@hospital.com' : 'doctor@hospital.com'}
              />
            </div>

            <div>
              <label htmlFor="password" className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-3.5 py-2.5 bg-white border border-[#14213D]/15 rounded-sm text-sm text-[#14213D]
                  placeholder-[#9A968C]/70 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/25 focus:border-[#0F6E56]
                  transition-colors disabled:opacity-50"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="font-chart-mono text-xs text-[#C1493A] bg-[#C1493A]/8 border border-[#C1493A]/15 rounded-sm px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#14213D] text-white text-sm font-semibold
                rounded-sm hover:bg-[#0F6E56] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                `Sign in as ${state}`
              )}
            </button>
          </form>
        </div>

        <p className="font-chart-mono text-[10px] tracking-[0.1em] text-[#9A968C]/80 text-center mt-4">
          Access is logged and restricted to authorized staff.
        </p>
      </div>
    </div>
  );
};

export default Login;