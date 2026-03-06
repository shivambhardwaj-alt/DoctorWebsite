import React from 'react'
import { assets } from '../assets/assets'

const ContactBanner = () => {
  return (
    <div className="max-w-5xl w-full mx-auto p-8 text-gray-800 mt-32 flex flex-col items-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-2xl">
      <span className="px-4 py-2 text-xs bg-white border border-emerald-200 rounded-full mt-2 font-medium text-emerald-700">Reach Out To Us</span>
      <h1 className="text-4xl md:text-5xl font-black mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        We'd love to Hear From You.
      </h1>
      <p className="text-lg text-gray-600 mt-8 text-center max-w-2xl leading-relaxed">
        Or just reach out manually to{' '}
        <a href="mailto:contact@careConnect.com" className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200">
          contact@careConnect.com
        </a>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full px-4">
        {/* Email Support */}
        <div className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <img src={assets.email} alt="Email" className="w-8" />
          </div>
          <p className="text-xl font-bold text-gray-900 mb-2">Email Support</p>
          <p className="text-gray-600 mb-4 leading-relaxed">Our team can respond in real time.</p>
          <a 
            href="mailto:contact@careConnect.com" 
            className="text-emerald-600 font-semibold text-lg hover:text-emerald-700 transition-colors"
          >
            contact@careConnect.com
          </a>
        </div>

        {/* Visit Office */}
        <div className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <img src={assets.people} alt="Office" className="w-8" />
          </div>
          <p className="text-xl font-bold text-gray-900 mb-2">Visit Our Office</p>
          <p className="text-gray-600 mb-4 leading-relaxed">Visit our location in real life.</p>
          <span className="text-emerald-600 font-semibold text-lg">
            123 Tech Valley Drive<br/>
            <span className="text-sm">Silicon Valley, CA 94043</span>
          </span>
        </div>

        {/* Phone Support */}
        <div className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <img src={assets.phone} alt="Phone" className="w-8" />
          </div>
          <p className="text-xl font-bold text-gray-900 mb-2">Call Us Directly</p>
          <p className="text-gray-600 mb-4 leading-relaxed">Available during working hours.</p>
          <a href="tel:+12344567879" className="text-emerald-600 font-semibold text-lg hover:text-emerald-700 transition-colors">
            (+1) 234-456-789
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactBanner
