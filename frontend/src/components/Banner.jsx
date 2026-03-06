import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Banner = () => {

    const navigate = useNavigate();

    const {userToken,userData} = useContext(AppContext);
  return (

    <section className="min-h-[70vh] bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-between px-8 lg:px-20 py-16 lg:py-24 overflow-hidden relative">

      {/* Background Decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.12),transparent),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.12),transparent)]" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12 lg:gap-24">

        {/* Left Side - Content */}
        <div className="flex-1 lg:max-w-xl text-center lg:text-left space-y-8 animate-fade-in-left">
          <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
            
            {/* Headline */}
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black leading-tight text-gray-900">
              Book Appointment
            </h1>

            {/* Subheadline visible */}
            <span className="block mt-2 text-3xl lg:text-5xl xl:text-6xl font-bold text-emerald-700">
              With 100+ Trusted Doctors
            </span>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
              Get personalized care from verified specialists available 24/7
            </p>
          </div>

          {/* Buttons */}


          { !userToken ?
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button onClick={() => {navigate('/login'); scrollTo(0,0)}} className="group flex items-center cursor-pointer justify-center gap-4 px-10 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 transform hover:scale-[1.05] w-full sm:w-auto">
              Create Account
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          :<div className='flex flex-col justify-center lg:justify-start pt-4 '>


            <button className='bg-emerald-700 px-4 py-2 rounded-xl cursor-pointer text-white text-lg ' onClick={() => {navigate('/doctors');scrollTo(0,0)}}>Browse Doctors</button>
          </div>
          
        }

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-6">
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                {/* Optional icon */}
              </div>
              
            </div>
          </div>
        </div>

        {/* Right Side - Hero Image */}
        <div className="flex-1 flex justify-center lg:justify-end max-w-lg xl:max-w-xl animate-fade-in-right">
          <div className="relative">
            <img 
              src={assets.banner} 
              alt="Medical consultation banner"
              className="w-full h-auto max-w-md lg:max-w-full drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-700 hover:rotate-3 hover:scale-105 origin-bottom-right rounded-3xl"
            />

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-3xl blur-xl animate-bounce" />
            <div className="absolute -bottom-12 left-4 w-20 h-20 bg-gradient-to-br from-emerald-300/30 to-teal-300/30 rounded-2xl blur-lg animate-pulse" />
            <div className="absolute top-1/2 -left-12 w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl blur-md animate-ping" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Banner
