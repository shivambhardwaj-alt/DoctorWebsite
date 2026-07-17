import React from 'react'
import { assets } from '../assets/assets.js'

const Footer = () => {
  return (
    <footer className="bg-[#14213D] text-white font-chart-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
        .font-chart-serif { font-family: 'Source Serif 4', Georgia, serif; }
        .font-chart-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-chart-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

   
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

       
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <img
              src={assets.careconnect}
              alt="CareConnect logo"
              className="w-10 h-10 rounded-sm bg-white p-1"
            />
            <span className="font-chart-serif text-xl font-semibold">CareConnect</span>
          </div>

          <p className="text-white/60 leading-relaxed text-sm">
            Your trusted healthcare partner, connecting you with verified doctors for seamless appointments anytime, anywhere.
          </p>

          <div className="flex gap-2">
            <a href="#" aria-label="WhatsApp" className="w-9 h-9 rounded-sm border border-white/15 bg-white/90 flex items-center justify-center hover:border-[#3B8A6E] hover:bg-white transition-colors">
              <img src={assets.whatsapp} alt="" className="w-4" />
            </a>
            <a href="#" aria-label="Phone" className="w-9 h-9 rounded-sm border border-white/15 bg-white/90 flex items-center justify-center hover:border-[#3B8A6E] hover:bg-white transition-colors">
              <img src={assets.phone} alt="" className="w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#5DCAA5] uppercase mb-4">Company</p>
          <ul className="space-y-2.5 text-sm text-white/70">
            {['Home', 'About us', 'Contact', 'Privacy policy'].map(item => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

   
        <div>
          <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#5DCAA5] uppercase mb-4">Services</p>
          <ul className="space-y-2.5 text-sm text-white/70">
            {['Book appointment', 'Video consult', 'Medicine delivery', 'Lab tests'].map(item => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>


        <div>
          <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#5DCAA5] uppercase mb-4">Get in touch</p>
          <div className="space-y-3 text-sm">
            <div className="px-4 py-3 rounded-sm border border-white/10">
              <p className="font-chart-mono text-[9px] tracking-[0.1em] text-white/50 uppercase mb-1">Call us</p>
              <p className="font-medium">+21 232 2332 341</p>
            </div>
            <div className="px-4 py-3 rounded-sm border border-white/10">
              <p className="font-chart-mono text-[9px] tracking-[0.1em] text-white/50 uppercase mb-1">Email</p>
              <p className="font-medium">hello@careconnect.com</p>
            </div>
          </div>
        </div>
      </div>


      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-3 font-chart-mono text-[11px] tracking-[0.05em] text-white/50">
          <p>&copy; 2025 CareConnect. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer