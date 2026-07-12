import React from 'react'
import { assets } from '../assets/assets'

const features = [
  {
    title: 'Verified doctors',
    text: 'All specialists rigorously verified',
    color: '#0F6E56',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Secure booking',
    text: 'End-to-end encrypted payments',
    color: '#7A8B99',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: '24/7 support',
    text: 'Instant assistance, any time',
    color: '#B36B7A',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
]

const Header = () => {
  return (
    <header className="bg-white py-14 sm:py-20 lg:py-24 px-4 relative overflow-hidden">
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
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: drawPulse 1.8s ease-out 0.3s forwards;
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rise-in { animation: riseIn 0.6s ease-out both; }
        .rise-in-delay { animation: riseIn 0.6s ease-out 0.15s both; }
        @media (prefers-reduced-motion: reduce) {
          .pulse-path { animation: none; stroke-dashoffset: 0; }
          .rise-in, .rise-in-delay { animation: none; }
        }
      `}</style>

      <div className="absolute inset-0 chart-grid pointer-events-none" />

      <div className="max-w-7xl mx-auto relative font-chart-sans">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left content */}
          <div className="order-2 lg:order-1 rise-in">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
              <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase">
                150+ verified specialists
              </p>
            </div>

            <h1 className="font-chart-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#14213D] tracking-tight leading-[1.05] mb-6">
              Find and book top doctors, instantly
            </h1>

            <p className="text-base sm:text-lg text-[#4A4438] max-w-lg leading-relaxed mb-9">
              Connect with verified specialists across every speciality. Secure payments, instant confirmation, support around the clock.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-9">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="p-4 bg-white rounded-sm border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.04)]"
                  style={{ borderLeft: `3px solid ${item.color}` }}
                >
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${item.color}14`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-[#14213D] mb-1">{item.title}</h4>
                  <p className="text-xs text-[#6B6458] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-7 py-3 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200">
                Book appointment
              </button>
              <button className="px-7 py-3 border border-[#14213D]/20 text-[#14213D] font-medium text-sm rounded-sm hover:bg-[#FAFAF7] transition-colors duration-200">
                See how it works
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="order-1 lg:order-2 rise-in-delay">
            <div className="relative max-w-md lg:max-w-lg mx-auto lg:mx-0">
              <div className="bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05),0_20px_48px_-20px_rgba(20,33,61,0.20)] p-6 sm:p-8">
                <svg viewBox="0 0 300 32" className="w-full h-6 mb-2" preserveAspectRatio="none">
                  <path
                    className="pulse-path"
                    d="M0,16 L70,16 L84,16 L92,4 L102,28 L112,8 L120,16 L300,16"
                    fill="none"
                    stroke="#0F6E56"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <img
                  src={assets.headerImage}
                  alt="Medical consultation"
                  className="w-full h-72 sm:h-80 lg:h-96 object-contain mx-auto"
                />
              </div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0F6E56] text-white px-4 py-1.5 rounded-sm text-xs font-semibold tracking-wide">
                Available now
              </div>
            </div>

            {/* Trust bar */}
            <div className="mt-8 p-4 bg-white rounded-sm border border-[#14213D]/10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-chart-mono text-[11px] tracking-[0.05em] uppercase text-[#6B6458]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
                Free cancellation
              </span>
              <span className="w-px h-3.5 bg-[#14213D]/10" />
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
                Instant confirmation
              </span>
              <span className="w-px h-3.5 bg-[#14213D]/10" />
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
                Secure payments
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header