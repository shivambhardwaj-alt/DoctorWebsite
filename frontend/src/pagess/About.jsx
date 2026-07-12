import React from 'react'
import { assets } from '../assets/assets'
import MeetOurTeam from '../components/MeetOurTeam'
import Testimonials from '../components/Testimonials'

const features = [
  {
    icon: assets.stethoscope,
    title: 'Comprehensive Care',
    text: 'Primary & specialist care',
    bg: 'from-emerald-500 to-green-600',
  },
  {
    icon: assets.people,
    title: 'Personalized Treatment',
    text: 'Tailored to your needs',
    bg: 'from-teal-500 to-emerald-600',
  },
]

const reasons = [
  {
    icon: assets.books,
    title: 'Extensive Experience',
    text: 'Over 25 years serving patients with board certifications in Internal Medicine, Cardiology, and Family Practice.',
    bg: 'from-emerald-500 to-green-600',
  },
  {
    icon: assets.microscope,
    title: 'Advanced Diagnostics',
    text: 'Using modern medical technology including labs, digital X-rays, and health screenings.',
    bg: 'from-green-500 to-emerald-600',
  },
  {
    icon: assets.heart,
    title: 'Patient Relationships',
    text: 'We build long-term trust through clear communication and genuine care.',
    bg: 'from-teal-500 to-emerald-600',
  },
]

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 px-4 md:px-8 lg:px-16">
      <section className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Over 25+ years of combined experience delivering exceptional medical care with compassion and expertise.
        </p>
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-200/40 to-teal-200/40 rounded-2xl blur"></div>
          <img
            src={assets.about_image}
            alt="Our experienced medical team"
            className="relative rounded-2xl shadow-xl w-full h-[420px] object-cover border-4 border-white"
          />
          <div className="absolute bottom-5 left-5 bg-white/95 px-4 py-2 rounded-xl shadow-md border border-emerald-100">
            <span className="text-sm font-semibold text-emerald-700">25+ Years Experience</span>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Our Commitment
          </h3>
          <p className="text-gray-700 leading-relaxed">
            With decades of clinical experience, we provide personalized, evidence-based medical care tailored to your unique health needs.
            Our practice combines modern diagnostics with compassionate patient care.
          </p>

          <div className="space-y-4">
            {features.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 p-5 bg-white/80 rounded-xl shadow-md border border-emerald-50"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <img src={item.icon} alt="" className="w-8" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">{item.title}</h5>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Why Patients Trust Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="relative p-8 pt-14 bg-white/90 rounded-2xl shadow-lg border border-emerald-50 text-center"
            >
              <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center border-4 border-white shadow-lg`}>
                <img src={item.icon} alt="" className="w-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <MeetOurTeam />
      <Testimonials />

      <section className="text-center mt-16">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-6 py-3 rounded-3xl border border-emerald-200/50 mb-6">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
          <span className="text-emerald-700 font-bold uppercase tracking-wide">Quick Access</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
          Book Appointments for You
        </h2>

        <button
          onClick={() => (window.location.href = '/')}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all"
        >
          Book Now
        </button>
      </section>
    </div>
  )
}

export default About