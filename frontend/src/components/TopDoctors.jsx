import React, { useCallback, useContext } from 'react'
import { doctors } from '../assets/assets'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

// Same color coding used across the doctors directory and speciality menu
const SPECIALITY_TABS = {
  'General Physician': '#7A8B99',
  'Gynecologist': '#B36B7A',
  'Dermatologist': '#C99B4E',
  'Pediatricians': '#3B8A6E',
  'Neurologist': '#7C6B9B',
  'Gastroenterologist': '#A17C4E',
}
const tabColor = (spec) => SPECIALITY_TABS[spec] || '#9A968C'

const TopDoctors = () => {
  const { fetchDoctors, doctorList } = useContext(AppContext);

  let isAvailableDoctors = doctorList.length > 0;

  const navigate = useNavigate();

  return (isAvailableDoctors ? (
    <section className="bg-white py-16 sm:py-20 px-4 relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto relative font-chart-sans">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-3">
            Recently on file
          </p>
          <h2 className="font-chart-serif text-3xl sm:text-4xl font-semibold text-[#14213D] mb-3">
            Top doctors to book
          </h2>
          <p className="text-sm sm:text-base text-[#6B6458] max-w-xl mx-auto leading-relaxed">
            Browse through our list of trusted and verified doctors.
          </p>
        </div>

        {/* Doctors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {doctorList.slice(0, 4).map((item, index) => {
            const color = tabColor(item.speciality)
            return (
              <Link
                key={index}
                to={`/appointment/${item._id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="relative bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05)]
                  hover:shadow-[0_10px_24px_-10px_rgba(20,33,61,0.16)] hover:-translate-y-0.5 transition-all duration-200
                  flex flex-col overflow-hidden"
              >
                {/* Folded speciality tab */}
                <div
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-t-sm font-chart-mono text-[9px] tracking-[0.12em] uppercase text-white z-10"
                  style={{ backgroundColor: color }}
                >
                  {item.speciality}
                </div>

                <div className="w-full h-44 bg-[#FAFAF7] border-b border-[#14213D]/8 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={`${item.name}`}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
                    <span className="font-chart-mono text-[9px] tracking-[0.1em] uppercase text-[#0F6E56]">Available</span>
                  </div>

                  <h3 className="font-chart-serif text-lg font-semibold text-[#14213D] leading-tight">
                     {item.name}
                  </h3>
                  <p className="text-xs text-[#6B6458] mb-4">{item.speciality}</p>

                  <button className="mt-auto w-full py-2.5 text-sm font-semibold text-white bg-[#14213D] rounded-sm hover:bg-[#0F6E56] transition-colors duration-200">
                    Book appointment
                  </button>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Load more */}
        <div className="text-center">
          <button
            onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
            className="px-8 py-3 border border-[#14213D]/20 text-[#14213D] font-semibold text-sm rounded-sm hover:bg-[#14213D] hover:text-white transition-colors duration-200"
          >
            Load more doctors
          </button>
        </div>
      </div>
    </section>
  ) : (
    <div className="flex items-center justify-center px-4 py-16 bg-white">
      <div className="text-center w-full max-w-lg bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05)] p-8">
        <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-3">
          Recently on file
        </p>
        <h2 className="font-chart-serif text-2xl sm:text-3xl font-semibold text-[#14213D] mb-3">
          Top doctors to book
        </h2>
        <p className="text-sm text-[#6B6458] max-w-md mx-auto leading-relaxed mb-4">
          Browse through our list of trusted and verified doctors.
        </p>
        <p className="font-chart-mono text-xs tracking-[0.1em] uppercase text-[#9A968C]">
          No doctors available
        </p>
      </div>
    </div>
  ))
}

export default TopDoctors