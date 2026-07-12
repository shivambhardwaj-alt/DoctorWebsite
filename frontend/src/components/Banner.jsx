import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Banner = () => {

    const navigate = useNavigate();

    const {userToken,userData} = useContext(AppContext);
  return (

    <section className="bg-white flex items-center px-4 py-16 sm:py-20 lg:py-24 relative overflow-hidden font-chart-sans">
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
      `}</style>

      <div className="absolute inset-0 chart-grid pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 items-center gap-12 lg:gap-16">

        <div className="text-center lg:text-left">
          <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-4">
            Book with confidence
          </p>

          <h1 className="font-chart-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#14213D] leading-[1.05] mb-2">
            Book appointment
          </h1>
          <p className="font-chart-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F6E56] leading-tight mb-5">
            with 100+ trusted doctors
          </p>

          <p className="text-base sm:text-lg text-[#4A4438] max-w-md mx-auto lg:mx-0 leading-relaxed mb-8">
            Get personalized care from verified specialists, available 24/7.
          </p>

          {!userToken ? (
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                className="group flex items-center gap-3 px-8 py-3.5 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200"
              >
                Create account
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className="px-8 py-3.5 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200"
              >
                Browse doctors
              </button>
            </div>
          )}
        </div>

        {/* Right: image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative max-w-md w-full">
            <div className="bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05),0_20px_48px_-20px_rgba(20,33,61,0.20)] p-6">
              <img
                src={assets.banner}
                alt="Medical consultation banner"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-3 left-6 bg-[#0F6E56] text-white px-4 py-1.5 rounded-sm text-xs font-semibold tracking-wide">
              100+ trusted doctors
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Banner