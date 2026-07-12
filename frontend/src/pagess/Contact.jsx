import React from 'react'
import { assets } from '../assets/assets'
import FormFooter from '../components/FormFooter'
import ContactBanner from '../components/ContactBanner'

const contactInfo = [
  {
    icon: assets.location,
    title: 'Our Location',
    lines: ['123 Tech Valley Drive', 'Silicon Valley, CA 94043', 'United States'],
  },
  {
    icon: assets.phone,
    title: 'Phone Support',
    lines: ['+1 (555) 123-4567', 'Mon - Fri 9AM - 6PM'],
    link: 'tel:+15551234567',
  },
  {
    icon: assets.email,
    title: 'Email Us',
    lines: ['hello@careconnect.com'],
    link: 'mailto:hello@careconnect.com',
  },
]

const reasons = [
  {
    title: '🚀 Explore Careers',
    text: 'Join our growing healthcare team and make a difference.',
    button: 'View Open Positions',
  },
  {
    title: '⭐ Patient Reviews',
    text: '4.9/5 from 1500+ verified patients',
    stars: true,
  },
]

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent mb-5">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Ready to start your healthcare journey? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-xl border border-white/60 text-center"
            >
              <div className="w-18 h-18 mx-auto mb-5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center">
                <img src={item.icon} alt={item.title} className="w-10" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-3">{item.title}</h3>

              {item.link ? (
                <a href={item.link} className="text-lg font-semibold text-gray-700 hover:text-emerald-600">
                  {item.lines[0]}
                </a>
              ) : (
                <div className="text-lg text-gray-600 leading-relaxed">
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              )}

              {item.title === 'Phone Support' && (
                <p className="text-sm text-emerald-600 font-medium mt-4">Mon - Fri 9AM - 6PM</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60 order-2 lg:order-1">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-black text-emerald-800 mb-3">Send Message</h3>
              <p className="text-gray-600">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                required
              />
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-3xl hover:opacity-95 transition">
                Send Message
              </button>
            </form>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-6 rounded-3xl shadow-xl border border-emerald-200/50">
              <img
                src={assets.contact_image}
                alt="Contact team"
                className="w-full h-80 lg:h-[480px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-8 rounded-3xl border border-emerald-200/50 text-center">
            <h3 className="text-2xl font-black text-emerald-800 mb-3">Explore Careers</h3>
            <p className="text-gray-700 mb-6">{reasons[0].text}</p>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 px-8 rounded-2xl">
              {reasons[0].button}
            </button>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-8 rounded-3xl border border-emerald-200/50 text-center">
            <h3 className="text-2xl font-black text-emerald-800 mb-3">Patient Reviews</h3>
            <p className="text-gray-700 mb-6">{reasons[1].text}</p>
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <img key={i} src={assets.filledStar} alt="" className="w-7" />
              ))}
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