import React from 'react'
import { assets } from '../assets/assets.js'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-emerald-900 via-green-900 to-emerald-800 text-white overflow-hidden mt-30">

      {/* Soft background overlay */}
      <div className=" absolute inset-0 bg-emerald-900/40"></div>

      {/* Main Content */}
      <div className=" relative max-w-7xl mx-auto px-6 lg:px-20 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={assets.careconnect}
              alt="CareConnect Logo"
              className="w-14 h-14 rounded-xl bg-white p-1"
            />
            <span className="text-xl font-extrabold text-emerald-300">
              CareConnect
            </span>
          </div>

          <p className="text-emerald-100 leading-relaxed text-sm">
            Your trusted healthcare partner connecting you with verified doctors
            for seamless appointments anytime, anywhere.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4" >
           <img src={assets.whatsapp} alt="" className='w-10 bg-white rounded-xl px-2 py-2 cursor-pointer' />
           <img src={assets.phone} alt="" className='w-10 bg-white rounded-xl px-2 py-2 cursor-pointer' />
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-200 mb-5">
            Company
          </h4>
          <ul className="space-y-3 text-sm">
            {['Home', 'About Us', 'Contact', 'Privacy Policy'].map(item => (
              <li key={item}>
                <a href="#" className="hover:text-emerald-300 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-200 mb-5">
            Services
          </h4>
          <ul className="space-y-3 text-sm">
            {['Book Appointment', 'Video Consult', 'Medicine Delivery', 'Lab Tests'].map(item => (
              <li key={item}>
                <a href="#" className="hover:text-emerald-300 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-200 mb-5">
            Get In Touch
          </h4>

          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-white/10">
              <p className="text-emerald-200 text-xs">Call Us</p>
              <p className="font-semibold text-lg">+21 232 2332 341</p>
            </div>

            <div className="p-4 rounded-xl bg-white/10">
              <p className="text-emerald-200 text-xs">Email</p>
              <p className="font-semibold">hello@careconnect.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-emerald-200">
          <p>© 2025 CareConnect. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-emerald-300">Terms</a>
            <a href="#" className="hover:text-emerald-300">Privacy</a>
            <a href="#" className="hover:text-emerald-300">Cookies</a>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
