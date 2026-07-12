import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const SPECIALITIES = [
  'All', 'General Physician', 'Gynecologist', 'Dermatologist',
  'Pediatricians', 'Neurologist', 'Gastroenterologist'
]

// Color-coded like tabs on a physical patient-record filing folder
const SPECIALITY_TABS = {
  'General Physician': '#7A8B99',
  'Gynecologist': '#B36B7A',
  'Dermatologist': '#C99B4E',
  'Pediatricians': '#6B9080',
  'Neurologist': '#7C6B9B',
  'Gastroenterologist': '#A17C4E',
}
const tabColor = (spec) => SPECIALITY_TABS[spec] || '#8A8478'

const AllDoctors = () => {
  const { speciality } = useParams()
  const { doctorList, userToken, backend_url } = useContext(AppContext)

  const [activeFilter, setActiveFilter] = useState(speciality || 'All')
  const [filteredDoc, setFilteredDoc] = useState([])
  const [contactModal, setContactModal] = useState(null)
  const [statusMsg, setStatusMsg] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setActiveFilter(speciality || 'All')
  }, [speciality])

  useEffect(() => {
    if (!doctorList) return
    setFilteredDoc(
      activeFilter === 'All'
        ? doctorList
        : doctorList.filter(d => d.speciality.toLowerCase() === activeFilter.toLowerCase())
    )
  }, [activeFilter, doctorList])

  const showStatus = (msg) => {
    setStatusMsg(msg)
    setTimeout(() => setStatusMsg(''), 3000)
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = {
      doctorId: contactModal._id,
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message'),
    }

    setSending(true)
    try {
      const { data } = await axios.post(`${backend_url}/api/user/contact-doctor`, payload, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      showStatus(data.success ? 'Message sent successfully.' : 'Failed to send message.')
      if (data.success) setContactModal(null)
    } catch {
      showStatus('Error sending message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#F6F3EC] py-14 px-4 selection:bg-[#B33F32]/20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
        .font-chart-serif { font-family: 'Source Serif 4', Georgia, serif; }
        .font-chart-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-chart-mono { font-family: 'JetBrains Mono', monospace; }
        .paper-grain {
          background-image: radial-gradient(#1B2430 0.5px, transparent 0.5px);
          background-size: 14px 14px;
        }
      `}</style>

      <div className="max-w-6xl mx-auto font-chart-sans">

        {/* Masthead */}
        <header className="mb-10 border-b-2 border-[#1B2430] pb-5">
          <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#B33F32] uppercase mb-2">
            Patient Directory &middot; Vol. 01
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <h1 className="font-chart-serif text-4xl md:text-[2.75rem] font-semibold text-[#1B2430] tracking-tight">
              Find Your Doctor
            </h1>
            <p className="font-chart-mono text-xs text-[#6B6458] pb-1">
              {filteredDoc.length} record{filteredDoc.length === 1 ? '' : 's'} on file
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-[200px_1fr] gap-8">

          {/* Filing tabs */}
          <aside className="lg:sticky lg:top-8 h-fit">
            <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#8A8478] uppercase mb-2 px-1">
              Filed under
            </p>
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {SPECIALITIES.map(f => {
                const active = activeFilter === f
                const color = f === 'All' ? '#1B2430' : tabColor(f)
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`group relative whitespace-nowrap lg:whitespace-normal text-left px-3.5 py-2.5 pl-4 text-sm font-medium
                      border-y border-r rounded-r-md transition-all flex-shrink-0
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B33F32]
                      ${active
                        ? 'bg-white border-[#1B2430]/15 text-[#1B2430] shadow-[2px_2px_0_0_rgba(27,36,48,0.08)] lg:translate-x-1'
                        : 'bg-transparent border-transparent text-[#6B6458] hover:bg-white/60 hover:text-[#1B2430]'}`}
                    style={{ borderLeft: `3px solid ${color}` }}
                  >
                    {f}
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Records grid */}
          <div>
            {filteredDoc.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-sm border border-[#1B2430]/10 shadow-sm">
                <p className="font-chart-mono text-[11px] tracking-[0.2em] text-[#B33F32] uppercase mb-2">No match</p>
                <h2 className="font-chart-serif text-2xl text-[#1B2430] mb-4">No records under this filing.</h2>
                <button
                  onClick={() => setActiveFilter('All')}
                  className="px-5 py-2 border border-[#1B2430] text-[#1B2430] font-medium text-sm rounded-sm hover:bg-[#1B2430] hover:text-white transition-colors"
                >
                  Clear filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-7">
                {filteredDoc.map(doc => {
                  const color = tabColor(doc.speciality)
                  const chartId = (doc._id || '').slice(-6).toUpperCase()
                  return (
                    <div
                      key={doc._id}
                      className="relative bg-white rounded-sm border border-[#1B2430]/10 shadow-[0_1px_2px_rgba(27,36,48,0.06)]
                        hover:shadow-[0_6px_16px_rgba(27,36,48,0.10)] hover:-translate-y-0.5 transition-all duration-200
                        pl-6 pr-5 pt-6 pb-5 flex flex-col"
                    >
                      {/* Folded specialty tab */}
                      <div
                        className="absolute -top-2 right-4 px-2.5 py-1 rounded-t-sm font-chart-mono text-[9px] tracking-[0.12em] uppercase text-white"
                        style={{ backgroundColor: color }}
                      >
                        {doc.speciality}
                      </div>

                      {/* Punch-hole binding edge */}
                      <div className="absolute left-2 top-0 bottom-0 border-l border-dashed border-[#1B2430]/15" />
                      <div className="absolute left-2 top-5 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F6F3EC] border border-[#1B2430]/20" />
                      <div className="absolute left-2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F6F3EC] border border-[#1B2430]/20" />
                      <div className="absolute left-2 bottom-5 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F6F3EC] border border-[#1B2430]/20" />

                      <div className="flex gap-4 mb-3">
                        <img
                          src={doc.image}
                          alt={`Dr. ${doc.name}`}
                          className="w-16 h-20 object-cover rounded-sm border border-[#1B2430]/10 flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="font-chart-mono text-[10px] tracking-[0.1em] text-[#8A8478]">#{chartId}</p>
                          <h3 className="font-chart-serif text-lg font-semibold text-[#1B2430] leading-tight truncate">
                            Dr. {doc.name}
                          </h3>
                          <p className="text-xs text-[#6B6458] italic mt-0.5 truncate">{doc.degree}</p>
                        </div>
                      </div>

                      <p className="text-sm text-[#4A4438] leading-relaxed line-clamp-2 flex-1 mb-4">
                        {doc.about || 'Experienced specialist providing comprehensive care.'}
                      </p>

                      <div className="flex items-center gap-4 mb-3 text-xs">
                        {doc.whatsappNo && (
                          <a
                            href={`https://wa.me/${doc.whatsappNo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-[#5C7A5E] hover:underline"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.83 14.03c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.4.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .9 2.14.07.15.12.32.02.51-.09.2-.14.32-.28.5-.14.17-.29.38-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.17-.2.71-.83.9-1.11.19-.28.38-.23.63-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36Z"/></svg>
                            WhatsApp
                          </a>
                        )}
                        <button
                          onClick={() => setContactModal(doc)}
                          className="inline-flex items-center gap-1 font-medium text-[#1B2430] hover:text-[#B33F32] transition-colors"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v12H7l-3 3V4Z"/></svg>
                          Message
                        </button>
                      </div>

                      <Link
                        to={`/appointment/${doc._id}`}
                        className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#1B2430] rounded-sm
                          hover:bg-[#B33F32] transition-colors duration-200"
                      >
                        Book appointment
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact modal — styled as a referral slip */}
      {contactModal && (
        <div className="fixed inset-0 bg-[#1B2430]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FBF9F4] rounded-sm p-6 max-w-md w-full shadow-2xl border-t-4 relative font-chart-sans"
               style={{ borderTopColor: tabColor(contactModal.speciality) }}>
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#8A8478] uppercase mb-1">Referral slip</p>
                <h3 className="font-chart-serif text-xl font-semibold text-[#1B2430]">Dr. {contactModal.name}</h3>
              </div>
              <button
                onClick={() => setContactModal(null)}
                aria-label="Close"
                className="text-[#8A8478] hover:text-[#1B2430] text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B33F32] rounded"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div>
                <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#8A8478] uppercase block mb-1">Name</label>
                <input name="name" required placeholder="Your full name"
                  className="w-full p-2.5 bg-white border border-[#1B2430]/15 rounded-sm text-sm focus:ring-2 focus:ring-[#B33F32]/30 focus:border-[#B33F32] outline-none" />
              </div>
              <div>
                <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#8A8478] uppercase block mb-1">Email</label>
                <input name="email" type="email" required placeholder="you@example.com"
                  className="w-full p-2.5 bg-white border border-[#1B2430]/15 rounded-sm text-sm focus:ring-2 focus:ring-[#B33F32]/30 focus:border-[#B33F32] outline-none" />
              </div>
              <div>
                <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#8A8478] uppercase block mb-1">Message</label>
                <textarea name="message" rows="4" required placeholder="What would you like to ask?"
                  className="w-full p-2.5 bg-white border border-[#1B2430]/15 rounded-sm text-sm focus:ring-2 focus:ring-[#B33F32]/30 focus:border-[#B33F32] outline-none resize-none" />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 py-2.5 bg-[#1B2430] text-white font-semibold text-sm rounded-sm hover:bg-[#B33F32] transition-colors disabled:opacity-50"
                >
                  {sending ? 'Sending…' : 'Send message'}
                </button>
                <button
                  type="button"
                  onClick={() => setContactModal(null)}
                  className="px-5 py-2.5 border border-[#1B2430]/20 text-[#1B2430] font-medium text-sm rounded-sm hover:bg-[#1B2430]/5"
                >
                  Cancel
                </button>
              </div>

              {statusMsg && (
                <p className={`font-chart-mono text-xs text-center py-2 rounded-sm ${
                  statusMsg.includes('success') ? 'bg-[#5C7A5E]/10 text-[#5C7A5E]' : 'bg-[#B33F32]/10 text-[#B33F32]'
                }`}>
                  {statusMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default AllDoctors