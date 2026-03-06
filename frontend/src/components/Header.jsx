import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <header className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 py-20 lg:py-32 xl:py-40 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.12),transparent),radial-gradient(circle_at_70%_80%,rgba(190,242,100,0.1),transparent),radial-gradient(circle_at_10%_90%,rgba(20,184,166,0.08),transparent)]" />
        
        {/* Floating Geometric Elements */}
        <div className="absolute top-24 left-12 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-emerald-400/20 to-lime-400/20 rounded-2xl rotate-12 animate-float-slow"></div>
        <div className="absolute top-1/2 left-8 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-lime-500/20 to-teal-500/20 rounded-xl -rotate-6 animate-float-medium delay-300"></div>
        <div className="absolute bottom-32 right-16 w-28 h-28 lg:w-32 lg:h-32 bg-gradient-to-tr from-teal-400/15 to-emerald-400/15 rounded-3xl animate-float-fast delay-600"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-emerald-300/25 to-lime-300/25 rounded-lg rotate-45 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-32 items-center min-h-[80vh]">
          
          {/* Left: Vertical Content Stack */}
          <div className="space-y-12 lg:space-y-16 order-2 lg:order-1 animate-slide-in-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-lime-100/60 max-w-max ring-2 ring-lime-50/50 hover:ring-lime-200/50 transition-all duration-500">
              <div className="w-3 h-12 bg-gradient-to-b from-emerald-500 to-lime-500 rounded-full shadow-lg"></div>
              <div>
                <p className="text-lg lg:text-xl font-bold text-emerald-800 tracking-tight">
                  Trusted Care Network
                </p>
                <p className="text-sm text-lime-700 font-semibold">150+ Verified Specialists</p>
              </div>
            </div>

            {/* Hero Headline - Split Layout */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5rem] font-black bg-gradient-to-r from-emerald-800 via-lime-800 to-teal-800 bg-clip-text text-transparent leading-[0.88] drop-shadow-2xl">
                  Find & Book
                </h1>
                
                <h1 className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5rem] font-black bg-gradient-to-r from-emerald-700 via-lime-600 to-teal-700 bg-clip-text text-transparent leading-[0.88] drop-shadow-xl">
                  Top Doctors Instantly
                </h1>
              </div>

              <p className="text-xl lg:text-2xl xl:text-3xl font-light text-emerald-800/90 max-w-lg leading-relaxed backdrop-blur-sm tracking-wide">
                Connect with <span className="font-bold text-lime-700 bg-lime-100/50 px-2 py-1 rounded-xl">150+</span> verified specialists. 
                Secure payments, instant confirmation, 24/7 support.
              </p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-lime-100/50 hover:shadow-2xl hover:-translate-y-2 hover:border-lime-200/60 transition-all duration-500 overflow-hidden">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-emerald-800 mb-2 group-hover:text-lime-700">Verified Doctors</h4>
                <p className="text-sm text-emerald-700 leading-relaxed">All specialists rigorously verified</p>
              </div>
              <div className="group p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-lime-100/50 hover:shadow-2xl hover:-translate-y-2 hover:border-lime-200/60 transition-all duration-500 overflow-hidden">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-lime-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-emerald-800 mb-2 group-hover:text-lime-700">Secure Booking</h4>
                <p className="text-sm text-emerald-700 leading-relaxed">End-to-end encryption</p>
              </div>
              <div className="group p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-lime-100/50 hover:shadow-2xl hover:-translate-y-2 hover:border-lime-200/60 transition-all duration-500 overflow-hidden">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-emerald-800 mb-2 group-hover:text-lime-700">24/7 Support</h4>
                <p className="text-sm text-emerald-700 leading-relaxed">Instant assistance available</p>
              </div>
            </div>

           
            <div className="flex flex-col lg:flex-row gap-4 pt-8">
              <div className='bg-emerald-600 rounded-xl px-2 py-3 flex items-center justify-center text-white font-medium cursor-pointer hover:translate transform transition-all duration-300'>
                <button className='px-3 py-1'>Book Appointments</button>
              </div>
              <div className='bg-emerald-600 rounded-xl px-2 py-3 flex items-center justify-center text-white font-medium cursor-pointer hover:translate transform transition-all duration-300 animate-bounce'>
                <button className='px-3 py-1'>
                See How it works ?
                </button>
              </div>
              
             
            </div>
          </div>

          {/* Right: Elevated Image Section */}
          <div className="order-1 lg:order-2 animate-slide-in-right relative">
            <div className="relative group max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0">
              {/* Elevated Image Container */}
              <div className="relative z-20 p-8 lg:p-12 bg-gradient-to-br from-white/95 via-lime-50/80 to-emerald-50/50 backdrop-blur-2xl rounded-4xl shadow-2xl border border-lime-100/60 hover:border-emerald-200/70 transition-all duration-700 hover:shadow-emerald-500/20">
                <img 
                  src={assets.headerImage} 
                  alt="Medical consultation" 
                  className="w-full h-80 lg:h-96 xl:h-[28rem] object-contain mx-auto group-hover:scale-105 group-hover:rotate-1 transition-all duration-1000 origin-center drop-shadow-xl"
                />
              </div>

              {/* Floating Status Indicators */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-lime-500 text-white px-6 py-2 rounded-3xl text-sm font-bold shadow-2xl ring-2 ring-white/50 z-10 animate-bounce-slow">
                Available Now
              </div>
              
              <div className="absolute top-12 right-8 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-lime-400/40 to-emerald-400/40 rounded-3xl blur-xl animate-pulse"></div>
              <div className="absolute bottom-12 left-8 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-tr from-teal-400/30 to-lime-400/30 rounded-2xl blur-lg animate-float-glow delay-400"></div>
              <div className="absolute -bottom-6 right-12 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-emerald-300/50 to-lime-300/50 rounded-xl shadow-lg ring-2 ring-white/30 z-10"></div>
            </div>

            {/* Bottom Trust Bar */}
            <div className="mt-12 lg:mt-16 p-4 lg:p-6 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-lime-100/50 flex items-center justify-center gap-1 text-sm font-semibold text-emerald-700 overflow-hidden">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-lime-500 rounded-full animate-ping"></div>
                Free Cancellation
              </div>
              <div className="w-px h-6 bg-emerald-200 mx-1 lg:mx-2"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-lime-500 rounded-full animate-ping" style={{animationDelay: '100ms'}}></div>
                Instant Confirmation
              </div>
              <div className="w-px h-6 bg-emerald-200 mx-1 lg:mx-2"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-lime-500 rounded-full animate-ping" style={{animationDelay: '200ms'}}></div>
                Secure Payments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-1deg); }
        }
        @keyframes float-glow {
          0%, 100% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.1) translateY(-4px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 9s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
        .animate-float-glow { animation: float-glow 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards; opacity: 0; }
      `}</style>
    </header>
  )
}

export default Header
