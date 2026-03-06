import React from 'react'
import { assets } from '../assets/assets'
import MeetOurTeam from '../components/MeetOurTeam'
import Testimonials from '../components/Testimonials'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 px-4 md:px-8 lg:px-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center mb-24">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-8">
          About Us
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
          Over 25+ years of combined experience delivering exceptional medical care with compassion and expertise.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Image Section */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-200/40 to-teal-200/40 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
          <img 
            src={assets.about_image} 
            alt="Our experienced medical team" 
            className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover group-hover:scale-105 transition-all duration-700 border-4 border-white shadow-emerald-100/50"
          />
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-emerald-100 flex items-center space-x-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="text-sm font-semibold text-emerald-700">25+ Years Experience</span>
          </div>
        </div>

        {/* Mission Section */}
        <div className="space-y-8 pr-8 lg:pr-0">
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Our Commitment
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            With decades of clinical experience, we provide personalized, evidence-based medical care tailored to your unique health needs. 
            Our practice combines cutting-edge diagnostics with compassionate patient care to help you achieve optimal health.
          </p>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-50 hover:border-emerald-200">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-xl shadow-md mt-1 flex-shrink-0">
                <img src={assets.stethoscope} alt="" className='w-10' />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 text-lg mb-1">Comprehensive Care</h5>
                <p className="text-sm text-gray-600">Primary & specialist care</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-50 hover:border-emerald-200">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-md mt-1 flex-shrink-0">
                <img src={assets.people} alt="" className='w-10' />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 text-lg mb-1">Personalized Treatment</h5>
                <p className="text-sm text-gray-600">Tailored to your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Why Patients Trust Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full shadow-sm"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Reason 1 */}
          <div className="group relative p-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-3 transition-all duration-500 border border-emerald-50 hover:border-emerald-200">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-all duration-400 border-4 border-white">
              <img src={assets.books} alt="" className='w-10'/>
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 mt-12 group-hover:text-emerald-700 transition-colors">
              Extensive Experience
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Over 25 years serving patients with board certifications in Internal Medicine, Cardiology, and Family Practice.
            </p>
          </div>

          {/* Reason 2 */}
          <div className="group relative p-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-3 transition-all duration-500 border border-emerald-50 hover:border-emerald-200">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-all duration-400 border-4 border-white">
              <img src={assets.microscope} alt="" className='w-10' />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 mt-12 group-hover:text-green-700 transition-colors">
              Advanced Diagnostics
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Utilizing latest medical technology including in-house labs, digital X-rays, and comprehensive health screenings.
            </p>
          </div>

          {/* Reason 3 */}
          <div className="group relative p-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-3 transition-all duration-500 border border-emerald-50 hover:border-emerald-200">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-all duration-400 border-4 border-white">
              <img src={assets.heart} alt="" className='w-10' />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 mt-12 group-hover:text-teal-700 transition-colors">
              Patient Relationships
            </h4>
            <p className="text-gray-600 leading-relaxed">
              We treat every patient as family, building long-term relationships through trust, clear communication, and genuine care.
            </p>
          </div>
        </div>
      </section>
      <MeetOurTeam />

      <Testimonials />
    <div className="text-center mt-16">
  <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-8 py-4 rounded-3xl backdrop-blur-xl mb-8 border border-emerald-200/50 shadow-2xl max-w-md mx-auto">
    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
    <span className="text-lg font-bold text-emerald-700 uppercase tracking-wide">Quick Access</span>
  </div>
  
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent mb-8 drop-shadow-2xl leading-tight max-w-2xl mx-auto">
    Book Appointments for You
  </h1>
  
  <button
    className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 overflow-hidden border-2 border-white/20 backdrop-blur-sm max-w-sm mx-auto"
    onClick={() => {
      window.location.href = "/";
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -skew-x-12 -translate-x-4 group-hover:translate-x-4 transition-transform duration-700"></div>
    <span className="relative z-10 flex items-center justify-center gap-3">
      Book Now
     <img src={assets.arrow_icon} alt="" />
    </span>
  </button>
</div>

 




    </div>
  )
}

export default About
