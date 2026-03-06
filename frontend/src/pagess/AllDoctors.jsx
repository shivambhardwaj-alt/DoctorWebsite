import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'

const AllDoctors = () => {
  const { speciality } = useParams()
  const [filteredDoc, setFilteredDoc] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const { doctorList, currentUser, userToken, backend_url } = useContext(AppContext)
  const [smsResult, setSmsResult] = useState("")
  const [emailResult, setEmailResult] = useState("")
  const [currentDoctorEmail, setCurrentDoctorEmail] = useState("")
  const navigate = useNavigate()
  const form_key = import.meta.env.WEB3ACCESSKEY
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [smsModals, setSmsModals] = useState({})

  const handleSmsSubmit = useCallback(async (event, doctorId) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    try {
      const { data } = await axios.post(`${backend_url}/api/user/sms`, 
        { name, email, message }, 
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      if (data.success) {
        setSmsResult("SMS sent successfully!")
        setSmsModals(prev => ({ ...prev, [doctorId]: false }))
      } else {
        setSmsResult("Failed to send SMS")
      }
    } catch (error) {
      setSmsResult("Error sending SMS")
    }
    setTimeout(() => setSmsResult(""), 3000)
  }, [backend_url, userToken])

  const handleEmailSubmit = useCallback(async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const doctorEmail = formData.get("doctorEmail")
    
    if (!doctorEmail) {
      setEmailResult("Doctor email is required")
      return
    }

    formData.append("to", doctorEmail)
    const patientName = formData.get("name") || "Patient"
    formData.append("subject", `Appointment Request from ${patientName}`)
    formData.append("access_key", form_key)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        setEmailResult("Email sent successfully!")
        setShowEmailModal(false)
      } else {
        setEmailResult("Failed to send email")
      }
    } catch (error) {
      setEmailResult("Error sending email")
    }
    setTimeout(() => setEmailResult(""), 3000)
  }, [form_key])

  const toggleSmsModal = useCallback((doctorId) => {
    setSmsModals(prev => ({ ...prev, [doctorId]: !prev[doctorId] }))
  }, [])

  const openEmailModal = useCallback((doctorEmail) => {
    setCurrentDoctorEmail(doctorEmail)
    setShowEmailModal(true)
  }, [])

  const closeEmailModal = useCallback(() => {
    setShowEmailModal(false)
    setCurrentDoctorEmail("")
  }, [])

  const specialityFilters = [
    'All', 'General Physician', 'Gynecologist', 'Dermatologist',
    'Pediatricians', 'Neurologist', 'Gastroenterologist'
  ]

  useEffect(() => {
    if (!doctorList) return

    if (activeFilter === 'All') {
      setFilteredDoc(doctorList)
    } else {
      setFilteredDoc(doctorList.filter(doc => 
        doc.speciality.toLowerCase() === activeFilter.toLowerCase()
      ))
    }
  }, [activeFilter, doctorList])

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-teal-300 to-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-3xl shadow-xl mb-6 border border-white/50">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
              <span className="text-sm font-semibold text-emerald-700">24/7 Availability</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent mb-6 drop-shadow-2xl leading-tight">
              Find Your Perfect Doctor
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover 100+ verified specialists across all medical fields. Book instantly with our top-rated doctors.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
              <div className="text-center p-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50">
                <div className="text-3xl font-black text-emerald-600 mb-1">150+</div>
                <p className="text-sm text-gray-600 font-medium">Doctors</p>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50">
                <div className="text-3xl font-black text-teal-600 mb-1 flex flex-row gap-2">
                  <p>4.9</p> <img src={assets.filledStar} className='w-10' alt="" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Avg Rating</p>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50">
                <div className="text-3xl font-black text-emerald-600 mb-1">100%</div>
                <p className="text-sm text-gray-600 font-medium">Verified</p>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50">
                <div className="text-3xl font-black text-indigo-600 mb-1">24/7</div>
                <p className="text-sm text-gray-600 font-medium">Available</p>
              </div>
            </div>
          </div>

          <div className="lg:hidden flex justify-center mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-emerald-500 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {showFilters ? 'Hide Filters' : 'Show Specialties'}
            </button>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,280px)_1fr] xl:grid-cols-[minmax(0,320px)_1fr] gap-8 mb-20">
            <aside className={`
              bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/60 h-fit
              lg:sticky lg:top-24 lg:w-full lg:max-w-sm
              transition-all duration-500
              ${showFilters ? 'block animate-in slide-in-from-left' : 'hidden lg:block'}
            `}>
              <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                Specialties
              </h3>

              <div className="space-y-3">
                {specialityFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter)
                      setShowFilters(false)
                    }}
                    className={`w-full px-4 py-3.5 rounded-2xl cursor-pointer font-semibold text-sm text-left transition-all group overflow-hidden relative
                      ${activeFilter === filter
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg ring-4 ring-emerald-200/50'
                        : 'bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-800 hover:shadow-md hover:ring-2 hover:ring-emerald-200 border border-emerald-100 hover:from-emerald-100 hover:to-teal-100'
                      }`}
                  >
                    <span className="relative z-10">{filter}</span>
                    {activeFilter === filter && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-emerald-100">
                <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Experience</h4>
                <div className="space-y-2 text-xs">
                  <button className="w-full p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-all">All</button>
                  <button className="w-full p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-all">0-5 Yrs</button>
                  <button className="w-full p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-all">5-10 Yrs</button>
                  <button className="w-full p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-all">10+ Yrs</button>
                </div>
              </div>
            </aside>

            <div className="space-y-8 min-h-[600px]">
              {!filteredDoc || filteredDoc.length === 0 ? (
                <div className="py-24 text-center flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 h-full">
                  <div className="w-28 h-28 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mb-8 shadow-2xl p-6">
                    <svg className="w-14 h-14 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">No Doctors Found</h2>
                  <p className="text-xl text-gray-600 mb-8 max-w-md leading-relaxed">
                    Try adjusting your specialty filter or browse all available doctors
                  </p>
                  <button 
                    onClick={() => setActiveFilter('All')}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-emerald-500 hover:scale-105 transition-all"
                  >
                    Show All Doctors
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl">
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-3">
                      Top {filteredDoc.length} Doctors {activeFilter !== 'All' && `in ${activeFilter}`}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      All doctors are verified professionals with excellent patient reviews. 
                      Book securely and get personalized care from the best in their field.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDoc.map((item) => (
                      <div key={item._id} className="group bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 border border-white/60 overflow-hidden transition-all duration-500 max-h-[650px] flex flex-col hover:border-emerald-200">
                        <div className="relative w-full h-60 p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
                          <div className="w-32 h-40 mx-auto rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/50 bg-white">
                            <img
                              src={item.image}
                              alt={`Dr. ${item.name}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500/95 to-teal-500/95 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm ring-1 ring-white/50">
                            Available Now
                          </div>
                          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
                            {item.experience}
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 space-y-3">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-all line-clamp-1">
                            Dr. {item.name}
                          </h3>
                          <p className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl">
                            {item.degree}
                          </p>
                          <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-xs font-bold rounded-xl shadow-sm">
                            {item.speciality}
                          </span>
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
                            {item.about?.substring(0, 80) || "Highly experienced specialist providing comprehensive care with modern treatment approaches."}
                            {item.about && item.about.length > 80 && "..."}
                          </p>

                          <div className="pt-4 border-t border-emerald-50 space-y-3">
                            <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium mb-3">
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                              Contact Dr. {item.name.split(' ')[0]}
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2">
                              <a
                                href={`https://wa.me/${item.whatsappNo || '919876543210'}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/contact flex flex-col items-center p-2.5 bg-gradient-to-br from-green-500/10 to-green-600/10 hover:from-green-500/20 hover:to-green-600/20 rounded-xl border border-green-100/50 hover:border-green-200/70 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md"
                              >
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover/contact:scale-110 transition-transform duration-200 mb-1">
                                  <img src={assets.whatsapp} alt="WhatsApp" />
                                </div>
                                <span className="text-xs font-bold text-emerald-400">WhatsApp</span>
                              </a>

                              <button
                                onClick={() => toggleSmsModal(item._id)}
                                className="group/contact flex flex-col items-center p-2.5 bg-gradient-to-br from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 rounded-xl border border-blue-100/50 hover:border-blue-200/70 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md cursor-pointer"
                              >
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover/contact:scale-110 transition-transform duration-200 mb-1 px-1">
                                  <img src={assets.sms} alt="SMS" />
                                </div>
                                <span className="text-xs font-bold text-emerald-400">SMS</span>
                              </button>

                              <button
                                onClick={() => openEmailModal(item.email || '')}
                                className="group/contact flex flex-col items-center p-2.5 bg-gradient-to-br from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 rounded-xl border border-purple-100/50 hover:border-purple-200/70 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md cursor-pointer"
                              >
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover/contact:scale-110 transition-transform duration-200 mb-1">
                                  <img src={assets.email} alt="Email" />
                                </div>
                                <span className="text-xs font-bold text-emerald-400">Email</span>
                              </button>
                            </div>
                          </div>

                          <Link
                            to={`/appointment/${item._id}`}
                            className="w-full py-3 px-6 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-emerald-500 group-hover:scale-[1.05] transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
                          >
                            Book Appointment
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-24 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 backdrop-blur-xl rounded-4xl p-12 border border-white/30 shadow-2xl">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-4xl font-black text-emerald-800 mb-6">Why Choose Our Platform?</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-white/80 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                    <img src={assets.verified} alt="Verified" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Verified Doctors</h3>
                  <p className="text-gray-600 leading-relaxed">All doctors undergo rigorous verification and have excellent patient reviews.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-white/80 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                    <img src={assets.people} alt="People" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Secure Booking</h3>
                  <p className="text-gray-600 leading-relaxed">End-to-end encrypted payments and HIPAA compliant data protection.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-white/80 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                    <img src={assets.lock} alt="Lock" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Instant Support</h3>
                  <p className="text-gray-600 leading-relaxed">24/7 customer support and instant appointment confirmation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {userToken && Object.keys(smsModals).some(id => smsModals[id]) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          {filteredDoc.map((item) => (
            smsModals[item._id] && (
              <div key={item._id} className="bg-white/95 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/60">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg text-emerald-800 font-bold">Send SMS to Dr. {item.name}</h3>
                  <button
                    onClick={() => toggleSmsModal(item._id)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold p-2 -m-2 rounded-full hover:bg-gray-200 transition-all"
                  >
                    <img src={assets.cross_icon} alt="Close" className="w-7" />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => handleSmsSubmit(e, item._id)}>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder="Your appointment request message..."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-vertical outline-none"
                  />
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500 hover:scale-105 transition-all duration-300"
                    >
                      Send SMS
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSmsModal(item._id)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                  {smsResult && (
                    <p className={`text-sm font-medium text-center py-2 rounded-xl ${
                      smsResult.includes("successfully") 
                        ? "bg-emerald-100 text-emerald-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {smsResult}
                    </p>
                  )}
                </form>
              </div>
            )
          ))}
        </div>
      )}

      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white/95 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/60">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-emerald-800">Send Email</h3>
              <button
                onClick={closeEmailModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold p-2 -m-2 rounded-full hover:bg-gray-200 transition-all"
              >
                <img src={assets.cross_icon} alt="Close" className="w-7" />
              </button>
            </div>
            
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                name="doctorEmail"
                defaultValue={currentDoctorEmail}
                required
                placeholder="Doctor's Email"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <textarea
                name="message"
                rows="4"
                required
                placeholder="Your appointment request message..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-vertical"
              />
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500 hover:scale-105 transition-all duration-300"
                >
                  Send Email
                </button>
                <button
                  type="button"
                  onClick={closeEmailModal}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
              {emailResult && (
                <p className={`text-sm font-medium text-center py-2 rounded-xl ${
                  emailResult.includes("successfully") 
                    ? "bg-emerald-100 text-emerald-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {emailResult}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AllDoctors
