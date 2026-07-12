import React from 'react'
import { assets } from '../assets/assets'
import MeetOurTeam from '../components/MeetOurTeam'
import Testimonials from '../components/Testimonials'

const features = [
  {
    icon: assets.stethoscope,
    title: 'Comprehensive Care',
    text: 'Primary & specialist care',
  },
  {
    icon: assets.people,
    title: 'Personalized Treatment',
    text: 'Tailored to your needs',
  },
]

const reasons = [
  {
    icon: assets.books,
    title: 'Extensive Experience',
    text: 'Over 25 years serving patients with board certifications in Internal Medicine, Cardiology, and Family Practice.',
    color: '#7A8B99',
  },
  {
    icon: assets.microscope,
    title: 'Advanced Diagnostics',
    text: 'Using modern medical technology including labs, digital X-rays, and health screenings.',
    color: '#3B8A6E',
  },
  {
    icon: assets.heart,
    title: 'Patient Relationships',
    text: 'We build long-term trust through clear communication and genuine care.',
    color: '#B36B7A',
  },
]

const About = () => {
  return (
    <div className="min-h-screen bg-white py-14 sm:py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
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

      <div className="relative font-chart-sans">

        {/* Masthead */}
        <section className="max-w-6xl mx-auto text-center mb-16 sm:mb-20">
          <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-3">
            Our Practice &middot; Est. Record
          </p>
          <h1 className="font-chart-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-[#14213D] tracking-tight mb-5">
            About us
          </h1>
          <p className="text-base sm:text-lg text-[#4A4438] max-w-2xl mx-auto leading-relaxed">
            Over 25+ years of combined experience delivering exceptional medical care with compassion and expertise.
          </p>
          <div className="w-16 h-0.5 bg-[#0F6E56] mx-auto mt-6" />
        </section>

        {/* Image + commitment */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-16 sm:mb-20">
          <div className="relative">
            <img
              src={assets.about_image}
              alt="Our experienced medical team"
              className="w-full h-[320px] sm:h-[420px] object-cover rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05),0_16px_40px_-16px_rgba(20,33,61,0.20)]"
            />
            <div className="absolute -bottom-4 left-5 bg-white px-4 py-2 rounded-sm border border-[#14213D]/10 shadow-[0_4px_12px_rgba(20,33,61,0.10)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
              <span className="font-chart-mono text-[10px] tracking-[0.1em] uppercase text-[#14213D]">25+ years experience</span>
            </div>
          </div>

          <div>
            <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#9A968C] uppercase mb-2">
              Our commitment
            </p>
            <h3 className="font-chart-serif text-2xl sm:text-3xl font-semibold text-[#14213D] mb-4">
              Care built on your record, not a script
            </h3>
            <p className="text-[#4A4438] leading-relaxed mb-6">
              With decades of clinical experience, we provide personalized, evidence-based medical care tailored to your unique health needs.
              Our practice combines modern diagnostics with compassionate patient care.
            </p>

            <div className="space-y-3">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 p-4 bg-white rounded-sm border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.04)]"
                  style={{ borderLeft: '3px solid #0F6E56' }}
                >
                  <div className="w-11 h-11 rounded-sm bg-[#0F6E56]/8 flex items-center justify-center flex-shrink-0">
                    <img src={item.icon} alt="" className="w-6" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-semibold text-sm text-[#14213D]">{item.title}</h5>
                    <p className="text-xs text-[#6B6458]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why patients trust us */}
        <section className="max-w-6xl mx-auto mb-16 sm:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#9A968C] uppercase mb-2">
              Filed under trust
            </p>
            <h2 className="font-chart-serif text-3xl sm:text-4xl font-semibold text-[#14213D]">
              Why patients trust us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {reasons.map((item, i) => (
              <div
                key={item.title}
                className="relative bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05)]
                  hover:shadow-[0_10px_24px_-8px_rgba(20,33,61,0.14)] hover:-translate-y-0.5 transition-all duration-200
                  pt-8 pb-6 px-6 text-center"
              >
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-t-sm font-chart-mono text-[9px] tracking-[0.12em] uppercase text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-12 h-12 rounded-sm mx-auto mb-4 flex items-center justify-center border border-[#14213D]/10"
                     style={{ backgroundColor: `${item.color}14` }}>
                  <img src={item.icon} alt="" className="w-6" />
                </div>
                <h4 className="font-chart-serif text-lg font-semibold text-[#14213D] mb-2">{item.title}</h4>
                <p className="text-sm text-[#6B6458] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <MeetOurTeam />
        <Testimonials />

        {/* CTA */}
        <section className="text-center mt-16 sm:mt-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#0F6E56]/8 px-4 py-1.5 rounded-sm border border-[#0F6E56]/15 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
            <span className="font-chart-mono text-[10px] tracking-[0.2em] uppercase text-[#0F6E56]">Quick access</span>
          </div>

          <h2 className="font-chart-serif text-3xl sm:text-4xl font-semibold text-[#14213D] mb-6">
            Book an appointment with us
          </h2>

          <button
            onClick={() => (window.location.href = '/')}
            className="px-8 py-3.5 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200"
          >
            Book now
          </button>
        </section>
      </div>
    </div>
  )
}

export default About