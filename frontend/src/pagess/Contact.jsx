import React from 'react'
import { assets } from '../assets/assets'
import FormFooter from '../components/FormFooter'
import ContactBanner from '../components/ContactBanner'

const contactInfo = [
  {
    icon: assets.location,
    title: 'Our location',
    lines: ['123 Tech Valley Drive', 'Silicon Valley, CA 94043', 'United States'],
    color: '#7A8B99',
  },
  {
    icon: assets.phone,
    title: 'Phone support',
    lines: ['+1 (555) 123-4567', 'Mon – Fri, 9am – 6pm'],
    link: 'tel:+15551234567',
    color: '#3B8A6E',
  },
  {
    icon: assets.email,
    title: 'Email us',
    lines: ['hello@careconnect.com'],
    link: 'mailto:hello@careconnect.com',
    color: '#B36B7A',
  },
]

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-14 sm:py-16 px-4 relative overflow-hidden">
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

        {/* Masthead */}
        <div className="text-center mb-14 sm:mb-16">
          <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-3">
            Get in touch
          </p>
          <h1 className="font-chart-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-[#14213D] tracking-tight mb-5">
            Contact us
          </h1>
          <p className="text-base sm:text-lg text-[#4A4438] max-w-2xl mx-auto leading-relaxed">
            Ready to start your healthcare journey? We'd love to hear from you.
          </p>
          <div className="w-16 h-0.5 bg-[#0F6E56] mx-auto mt-6" />
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-14 sm:mb-16">
          {contactInfo.map((item) => (
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
                Record
              </div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-sm flex items-center justify-center border border-[#14213D]/10"
                   style={{ backgroundColor: `${item.color}14` }}>
                <img src={item.icon} alt="" className="w-6" />
              </div>
              <h3 className="font-chart-serif text-lg font-semibold text-[#14213D] mb-2">{item.title}</h3>

              {item.link ? (
                <a href={item.link} className="text-sm font-medium text-[#0F6E56] hover:underline">
                  {item.lines[0]}
                </a>
              ) : (
                <div className="text-sm text-[#6B6458] leading-relaxed">
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              )}

              {item.title === 'Phone support' && (
                <p className="font-chart-mono text-[10px] tracking-[0.1em] uppercase text-[#9A968C] mt-3">
                  Mon – Fri, 9am – 6pm
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Form + image */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch mb-14 sm:mb-16">

          {/* Referral-slip style form */}
          <div className="bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05),0_16px_40px_-16px_rgba(20,33,61,0.14)]
            p-6 sm:p-8 order-2 lg:order-1 border-t-4"
            style={{ borderTopColor: '#0F6E56' }}>
            <div className="mb-6">
              <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#9A968C] uppercase mb-1">New inquiry</p>
              <h3 className="font-chart-serif text-2xl sm:text-3xl font-semibold text-[#14213D] mb-2">Send a message</h3>
              <p className="text-sm text-[#6B6458]">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full p-2.5 bg-white border border-[#14213D]/15 rounded-sm text-sm text-[#14213D] placeholder-[#9A968C]/70
                    focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/25 focus:border-[#0F6E56] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-2.5 bg-white border border-[#14213D]/15 rounded-sm text-sm text-[#14213D] placeholder-[#9A968C]/70
                    focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/25 focus:border-[#0F6E56] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">Message</label>
                <textarea
                  rows="5"
                  placeholder="What would you like to ask?"
                  className="w-full p-2.5 bg-white border border-[#14213D]/15 rounded-sm text-sm text-[#14213D] placeholder-[#9A968C]/70
                    focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/25 focus:border-[#0F6E56] transition-colors resize-none"
                  required
                />
              </div>
              <button className="w-full py-3 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200">
                Send message
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <img
              src={assets.contact_image}
              alt="Contact team"
              className="w-full h-72 sm:h-80 lg:h-full object-cover rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05),0_16px_40px_-16px_rgba(20,33,61,0.20)]"
            />
            <div className="absolute -bottom-4 left-5 bg-white px-4 py-2 rounded-sm border border-[#14213D]/10 shadow-[0_4px_12px_rgba(20,33,61,0.10)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
              <span className="font-chart-mono text-[10px] tracking-[0.1em] uppercase text-[#14213D]">Here to help</span>
            </div>
          </div>
        </div>

        {/* Careers + reviews */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-4">
          <div className="bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05)] p-7 sm:p-8 text-center"
               style={{ borderLeft: '3px solid #7C6B9B' }}>
            <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#9A968C] uppercase mb-2">Join the team</p>
            <h3 className="font-chart-serif text-xl sm:text-2xl font-semibold text-[#14213D] mb-3">Explore careers</h3>
            <p className="text-sm text-[#6B6458] mb-6">Join our growing healthcare team and make a difference.</p>
            <button className="px-6 py-2.5 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200">
              View open positions
            </button>
          </div>

          <div className="bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05)] p-7 sm:p-8 text-center"
               style={{ borderLeft: '3px solid #C99B4E' }}>
            <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#9A968C] uppercase mb-2">On file</p>
            <h3 className="font-chart-serif text-xl sm:text-2xl font-semibold text-[#14213D] mb-3">Patient reviews</h3>
            <p className="text-sm text-[#6B6458] mb-5">4.9 / 5 from 1,500+ verified patients</p>
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <img key={i} src={assets.filledStar} alt="" className="w-5" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ContactBanner />
      {/* <FormFooter /> */}
    </div>
  )
}

export default Contact