import React from 'react'
import { assets } from '../assets/assets'

const FormFooter = () => {
  return (
    <>
      <section className='relative bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-900 flex flex-col lg:flex-row justify-center px-4 py-24 gap-16 lg:gap-24 mt-24 overflow-hidden'>
        {/* Animated Background */}
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-teal-600/10' />

        <div className='text-center lg:text-left max-w-2xl lg:max-w-lg z-10'>
          <div className="flex items-center justify-center lg:justify-start p-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 w-fit mx-auto lg:mx-0 gap-4 mb-8 shadow-2xl">
            <img src={assets.group_profiles} alt="Team" className='w-20 rounded-2xl shadow-2xl' />
            <div>
              <p className="text-sm font-semibold text-emerald-200 uppercase tracking-wide">Trusted by 10K+ Patients</p>
              <p className="text-xs text-white/80">Join our healthcare family</p>
            </div>
          </div>
          
          <h1 className='font-black text-4xl lg:text-6xl leading-tight bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-8 drop-shadow-2xl'>
            Ready to Transform Your Health Journey?
          </h1>
          
          <div className="space-y-6 text-white/90">
            <p className="text-xl lg:text-2xl font-semibold leading-relaxed max-w-lg">
              Experience healthcare like never before with our cutting-edge platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                 <img src={assets.verified} alt="" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">24/7 Support</h4>
                  <p className="text-sm text-emerald-100">Always here for you</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                  <img src={assets.heart} alt="" className='w-10' />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">150+ Doctors</h4>
                  <p className="text-sm text-emerald-100">Top specialists</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-white/20">
              <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-8 rounded-3xl shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 text-lg border border-white/20 backdrop-blur-sm">
                Book Appointment
              </button>
              <button className="flex-1 bg-white/10 backdrop-blur-xl text-white font-bold py-4 px-8 rounded-3xl hover:bg-white/20 hover:shadow-2xl transition-all duration-300 text-lg border border-white/20">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="lg:w-96 flex flex-col justify-center z-10">
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
              <div className="text-4xl lg:text-5xl font-black text-emerald-400 mb-4">4.9</div>
              <div className="flex items-center gap-2 text-emerald-300 mb-2">
                <img src={assets.filledStar} alt="" className="w-6" />
                <img src={assets.filledStar} alt="" className="w-6" />
                <img src={assets.filledStar} alt="" className="w-6" />
                <img src={assets.filledStar} alt="" className="w-6" />
                <img src={assets.filledStar} alt="" className="w-6" />
              </div>
              <p className="text-white/80 text-sm font-medium">Patient Rating</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20 text-center hover:bg-white/10 transition-all">
                <div className="text-3xl font-black text-white mb-2">150+</div>
                <p className="text-emerald-200 text-sm font-medium">Doctors</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20 text-center hover:bg-white/10 transition-all">
                <div className="text-3xl font-black text-white mb-2">10K+</div>
                <p className="text-emerald-200 text-sm font-medium">Patients</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl text-center">
              <p className="text-white/90 mb-4 font-medium">Join 10,000+ patients who trust us</p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-300"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-600"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FormFooter
