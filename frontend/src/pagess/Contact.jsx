import React from 'react'
import { assets } from '../assets/assets';
import FormFooter from '../components/FormFooter';
import ContactBanner from '../components/ContactBanner';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent mb-6 drop-shadow-2xl leading-tight">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Ready to start your healthcare journey? We'd love to hear from you. 
            Get in touch with our medical experts today.
          </p>
        </div>

        {/* Row 1: Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Location */}
          <div className="group bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60 hover:shadow-emerald-500/25 hover:-translate-y-2 transition-all duration-500 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
              <img src={assets.location} alt="Location" className="w-10" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">Our Location</h3>
            <p className="text-4xl font-black text-gray-900 mb-4"></p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              123 Tech Valley Drive<br/>
              Silicon Valley, CA 94043<br/>
              United States
            </p>
          </div>

          {/* Phone */}
          <div className="group bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60 hover:shadow-emerald-500/25 hover:-translate-y-2 transition-all duration-500 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
              <img src={assets.phone} alt="Phone" className="w-10" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">Phone Support</h3>
            <p className="text-4xl font-black text-gray-900 mb-4"></p>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              <a href="tel:+15551234567" className="hover:text-emerald-600 font-bold transition-colors block">
                +1 (555) 123-4567
              </a>
            </p>
            <p className="text-sm text-emerald-600 font-medium">Mon - Fri 9AM - 6PM</p>
          </div>

          {/* Email */}
          <div className="group bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60 hover:shadow-emerald-500/25 hover:-translate-y-2 transition-all duration-500 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
              <img src={assets.email} alt="Email" className="w-10" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">Email Us</h3>
            <p className="text-4xl font-black text-gray-900 mb-4"></p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <a href="mailto:hello@careconnect.com" className="hover:text-emerald-600 font-bold transition-colors block">
                hello@careconnect.com
              </a>
            </p>
          </div>
        </div>

        {/* Row 2: Contact Form + Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Contact Form */}
          <div className="bg-white/95 backdrop-blur-xl p-10 rounded-4xl shadow-2xl border border-white/60 order-2 lg:order-1">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black text-emerald-800 mb-4 flex items-center justify-center gap-3 mx-auto">
                <div className="w-3 h-12 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                Send Message
              </h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
            </div>
            
            <form className="space-y-6">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-3 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg"
                  required 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-3 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg"
                  required 
                />
              </div>
              <div>
                <textarea 
                  rows="5"
                  placeholder="Your Message" 
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-3 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg resize-vertical"
                  required 
                />
              </div>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-5 px-8 rounded-3xl text-xl shadow-xl hover:shadow-emerald-500 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                Send Message
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl p-8 rounded-4xl shadow-2xl border border-emerald-200/50">
              <img 
                src={assets.contact_image} 
                alt="Contact Us - Friendly medical team ready to help"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* CTA Row */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl p-10 rounded-4xl border border-emerald-200/50 text-center">
            <h3 className="text-3xl font-black text-emerald-800 mb-4">🚀 Explore Careers</h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-md mx-auto">
              Join our growing healthcare team and make a difference.
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-10 rounded-3xl text-lg shadow-xl hover:shadow-emerald-500 hover:scale-105 transition-all duration-300">
              View Open Positions
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl p-10 rounded-4xl border border-emerald-200/50 text-center">
            <h3 className="text-3xl font-black text-emerald-800 mb-4">⭐ Patient Reviews</h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-md mx-auto">
              4.9/5 from 1500+ verified patients
            </p>
            <div className="flex justify-center items-center gap-1 text-2xl mx-auto w-fit">
              <img src={assets.filledStar} alt="" className="w-8" />
              <img src={assets.filledStar} alt="" className="w-8" />
              <img src={assets.filledStar} alt="" className="w-8" />
              <img src={assets.filledStar} alt="" className="w-8" />
              <img src={assets.filledStar} alt="" className="w-8" />
            </div>
          </div>
        </div>
      </div>

      <ContactBanner />
      <FormFooter />
    </div>
  )
}

export default Contact
