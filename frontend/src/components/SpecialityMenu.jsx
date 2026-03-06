import React from 'react'
import { assets, specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="py-24 lg:py-32 bg-gradient-to-b from-emerald-50/50 to-teal-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
        {/* Header */}
        <div className="mb-16 lg:mb-24 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-green-800 to-teal-800 bg-clip-text text-transparent">
            Find Doctors by Speciality
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-md" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover top specialists in your area. Book with confidence.
          </p>
        </div>

        {/* Speciality Grid */}
        <div className="relative">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.08),transparent),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.08),transparent)] -z-10" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 lg:gap-8 max-w-6xl mx-auto px-4 lg:px-0">
            {specialityData.map((item, index) => (
              <Link 
              onClick={() => scrollTo(0,0)}
                key={index}
                to={`doctors/${item.speciality}`}
                className="group relative flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 hover:border-emerald-200 hover:bg-white/90 transition-all duration-500 hover:-translate-y-4 hover:scale-105 cursor-pointer overflow-hidden h-48 flex-shrink-0"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 scale-0 group-hover:scale-100 transition-all duration-500 rounded-3xl" />
                
                {/* Icon Container */}
                <div className="relative z-10 w-20 h-20 lg:w-24 lg:h-24 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 shadow-lg group-hover:shadow-emerald-200 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-500">
                  <img 
                    src={item.image} 
                    alt={item.speciality}
                    className="w-12 h-12 lg:w-14 lg:h-14 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg"
                  />
                </div>
                
                {/* Label */}
                <p className="text-sm lg:text-base font-semibold text-gray-800 leading-tight group-hover:text-emerald-700 transition-colors duration-300 px-2 text-center">
                  {item.speciality}
                </p>
                
              
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-emerald-500/20 rounded-xl backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <svg className="w-4 h-4 text-emerald-600 rotate-45 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-75">
          <div className="w-px h-12 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full animate-pulse" />
          <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Scroll for more</p>
        </div>
      </div>
    </section>
  )
}

export default SpecialityMenu
