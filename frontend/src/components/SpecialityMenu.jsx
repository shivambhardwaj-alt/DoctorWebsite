import React from 'react'
import { assets, specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'


const SPECIALITY_TABS = {
  'General Physician': '#7A8B99',
  'Gynecologist': '#B36B7A',
  'Dermatologist': '#C99B4E',
  'Pediatricians': '#3B8A6E',
  'Neurologist': '#7C6B9B',
  'Gastroenterologist': '#A17C4E',
}
const tabColor = (spec) => SPECIALITY_TABS[spec] || '#9A968C'

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="py-16 sm:py-20 lg:py-24 bg-white px-4 relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto text-center relative font-chart-sans">

      
        <div className="mb-12 sm:mb-16">
          <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-3">
            Filed by speciality
          </p>
          <h2 className="font-chart-serif text-3xl sm:text-4xl font-semibold text-[#14213D] mb-3">
            Find doctors by speciality
          </h2>
          <p className="text-sm sm:text-base text-[#6B6458] max-w-xl mx-auto leading-relaxed">
            Discover top specialists in your area, and book with confidence.
          </p>
        </div>

      
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {specialityData.map((item, index) => {
            const color = tabColor(item.speciality)
            return (
              <Link
                onClick={() => scrollTo(0, 0)}
                key={index}
                to={`doctors/${item.speciality}`}
                className="group relative flex flex-col items-center bg-white rounded-md border border-[#14213D]/10
                  shadow-[0_1px_2px_rgba(20,33,61,0.05)] hover:shadow-[0_10px_24px_-10px_rgba(20,33,61,0.16)]
                  hover:-translate-y-0.5 transition-all duration-200 py-6 px-3"
              >
                {/* Folded speciality tab */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                />

                <div
                  className="w-14 h-14 rounded-sm flex items-center justify-center mb-3 border border-[#14213D]/8"
                  style={{ backgroundColor: `${color}14` }}
                >
                  <img
                    src={item.image}
                    alt={item.speciality}
                    className="w-8 h-8 object-contain"
                  />
                </div>

                <p className="text-xs sm:text-sm font-medium text-[#14213D] leading-tight text-center group-hover:text-[#0F6E56] transition-colors duration-150">
                  {item.speciality}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SpecialityMenu