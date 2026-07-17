import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const SLOT_INTERVAL_MIN = 30
const DAY_END_HOUR = 21
const DAY_START_HOUR = 10

const formatTime = (date) => {
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
}

const Appointment = () => {

  const { id } = useParams()
  const { doctorList, userToken, backend_url } = useContext(AppContext)
  const navigate = useNavigate()
  const currency_symbol = import.meta.env.VITE_CURRENCY;

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [dayIndex, setDayIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [bookedSlots, setBookedSlots] = useState(new Set())

  useEffect(() => {
    if (doctorList?.length > 0) {
      setDocInfo(doctorList.find(doc => doc._id === id) || null)
    }
  }, [doctorList, id])

  const fetchBooked = useCallback(async () => {
    if (!docInfo) return
    try {
      const { data } = await axios.get(`${backend_url}/api/user/booked-slots/${docInfo._id}`)
      if (data.success) setBookedSlots(new Set(data.bookedSlots))
    } catch (error) {
      console.log("Error happened at fetchBooked")
    }
  }, [docInfo, backend_url])

  useEffect(() => {
    if (!docInfo) return
    fetchBooked()
    const interval = setInterval(fetchBooked, 30000)
    return () => clearInterval(interval)
  }, [docInfo, fetchBooked])

  const buildSlotKey = (date, time) =>
    `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}_${time}`

  useEffect(() => {
    if (!docInfo) return

    const now = new Date()
    const days = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(now)
      date.setDate(now.getDate() + i)

      const endTime = new Date(date)
      endTime.setHours(DAY_END_HOUR, 0, 0, 0)

      const startTime = new Date(date)
      if (i === 0) {
        const minsSinceStartOfDay = now.getHours() * 60 + now.getMinutes()
        const nextSlotMins = Math.ceil(minsSinceStartOfDay / SLOT_INTERVAL_MIN) * SLOT_INTERVAL_MIN
        const flooredStart = Math.max(nextSlotMins, DAY_START_HOUR * 60)
        startTime.setHours(0, flooredStart, 0, 0)
      } else {
        startTime.setHours(DAY_START_HOUR, 0, 0, 0)
      }

      const slots = []
      const cursor = new Date(startTime)
      while (cursor < endTime) {
        const timeLabel = formatTime(cursor)
        const key = buildSlotKey(cursor, timeLabel)
        slots.push({
          datetime: new Date(cursor),
          time: timeLabel,
          isBooked: bookedSlots.has(key),
        })
        cursor.setMinutes(cursor.getMinutes() + SLOT_INTERVAL_MIN)
      }

      if (slots.length > 0) days.push(slots)
    }

    setDocSlots(days)
    setDayIndex(0)
    setSlotTime('')
  }, [docInfo, bookedSlots])

  const bookAppointment = async () => {
    if (!userToken) {
      toast.warn('Login to book an appointment')
      return navigate('/login')
    }
    if (!slotTime) {
      toast.error('Please select a time slot first')
      return
    }

    const selectedSlot = docSlots[dayIndex]?.find(s => s.time === slotTime)
    if (!selectedSlot) {
      toast.error('That slot is no longer available')
      return
    }

    const date = selectedSlot.datetime
    const slot_date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const key = buildSlotKey(date, slotTime)

    try {
      setIsBooking(true)
      const { data } = await axios.post(
        `${backend_url}/api/user/book-appointment`,
        {
          slot_date,
          slotTime,
          doc_id: docInfo._id,
          amount: docInfo.fees,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      if (data.success) {
        toast.success('Appointment booked successfully!')
        setShowConfirmModal(false)
        setSlotTime('')
        setBookedSlots(prev => new Set(prev).add(key))
        await fetchBooked()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed')
    } finally {
      setIsBooking(false)
    }
  }

  const handleBookNow = () => {
    if (!slotTime) {
      toast.error('Please select a date and time first')
      return
    }
    setShowConfirmModal(true)
  }

  const fontStyles = `
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
  `

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-chart-sans">
        <style>{fontStyles}</style>
        <div className="text-center">
          <div className="animate-spin rounded-full h-9 w-9 border-2 border-[#14213D]/15 border-t-[#0F6E56] mx-auto mb-3"></div>
          <p className="font-chart-mono text-[11px] tracking-[0.2em] text-[#9A968C] uppercase">Loading record…</p>
        </div>
      </div>
    )
  }

  const fee = docInfo.fees ?? '—'
  const selectedDay = docSlots[dayIndex]

  return (
    <div className="min-h-screen bg-white py-10 sm:py-14 px-4 font-chart-sans relative overflow-hidden">
      <style>{fontStyles}</style>
      <div className="absolute inset-0 chart-grid pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">

        <div className="bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05)] p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            <div className="flex flex-col items-center lg:order-2">
              <div className="relative">
                <img
                  src={docInfo.image}
                  alt={docInfo.name}
                  className="w-28 h-28 lg:w-36 lg:h-36 object-cover rounded-md border border-[#14213D]/10"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#0F6E56] p-1.5 rounded-sm border-2 border-white">
                  <img src={assets.verified} className="w-4 h-4" alt="Verified" />
                </div>
              </div>
              <p className="mt-3 font-chart-mono text-[10px] tracking-[0.1em] uppercase text-[#9A968C]">{docInfo.experience} experience</p>
            </div>

            <div className="lg:col-span-2 lg:order-1 space-y-4">
              <div>
                <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#0F6E56] uppercase mb-1">Doctor record</p>
                <h1 className="font-chart-serif text-2xl sm:text-3xl font-semibold text-[#14213D]">{docInfo.name}</h1>
                <p className="text-sm text-[#6B6458] mt-1">{docInfo.degree} &middot; {docInfo.speciality}</p>
              </div>

              <div>
                <p className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase mb-1.5">About</p>
                <p className="text-sm text-[#4A4438] leading-relaxed">{docInfo.about}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-[#FAFAF7] border border-[#14213D]/8 rounded-sm">
                <div>
                  <p className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase mb-1">Consultation fee</p>
                  <p className="font-chart-serif text-2xl font-semibold text-[#14213D]">{currency_symbol}{fee}</p>
                </div>
                <button
                  onClick={handleBookNow}
                  disabled={!slotTime}
                  className={`px-8 py-3 rounded-sm font-semibold text-sm text-white transition-colors duration-200 ${slotTime ? 'bg-[#14213D] hover:bg-[#0F6E56] cursor-pointer' : 'bg-[#9A968C]/50 cursor-not-allowed'
                    }`}
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05)] p-6">
          <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#9A968C] uppercase mb-1">Schedule</p>
          <h2 className="font-chart-serif text-xl font-semibold text-[#14213D] mb-5">Choose a day and time</h2>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
            {docSlots.map((slots, i) => {
              const date = slots[0].datetime
              const active = dayIndex === i
              const openCount = slots.filter(s => !s.isBooked).length
              return (
                <button
                  key={i}
                  onClick={() => { setDayIndex(i); setSlotTime('') }}
                  className={`flex-shrink-0 w-16 py-3 rounded-sm border text-center transition-colors duration-150
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6E56]
                    ${active
                      ? 'bg-[#14213D] border-[#14213D] text-white'
                      : 'bg-white border-[#14213D]/12 text-[#14213D] hover:border-[#0F6E56]/40'}`}
                >
                  <p className={`font-chart-mono text-[9px] tracking-[0.1em] uppercase mb-1 ${active ? 'text-white/70' : 'text-[#9A968C]'}`}>
                    {daysOfWeek[date.getDay()]}
                  </p>
                  <p className="font-chart-serif text-lg font-semibold leading-none">{date.getDate()}</p>
                  <p className={`font-chart-mono text-[9px] mt-1 ${active ? 'text-white/70' : openCount > 0 ? 'text-[#0F6E56]' : 'text-[#9A968C]'}`}>
                    {openCount > 0 ? `${openCount} open` : 'full'}
                  </p>
                </button>
              )
            })}
          </div>

          {selectedDay && (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {selectedDay.map((slot, idx) => {
                const active = slotTime === slot.time
                return (
                  <button
                    key={idx}
                    disabled={slot.isBooked}
                    onClick={() => setSlotTime(slot.time)}
                    className={`py-2.5 rounded-sm border text-xs font-medium transition-colors duration-150
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6E56]
            ${slot.isBooked
                        ? 'bg-black border-black text-white line-through cursor-not-allowed'
                        : active
                          ? 'bg-[#0F6E56] border-[#0F6E56] text-white'
                          : 'bg-white border-black text-black hover:border-[#0F6E56]/50'}`}
                  >
                    {slot.time}
                  </button>
                )
              })}
            </div>
          )}

          {slotTime && selectedDay && (
            <div className="mt-5 flex items-center gap-3 bg-[#0F6E56]/6 border border-[#0F6E56]/15 rounded-sm px-4 py-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56] flex-shrink-0" />
              <p className="text-sm text-[#14213D]">
                <span className="font-semibold">{daysOfWeek[selectedDay[0].datetime.getDay()]} &middot; {slotTime}</span>
                <span className="text-[#6B6458]"> with Dr. {docInfo.name}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {showConfirmModal && selectedDay && (
        <div className="fixed inset-0 bg-[#14213D]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-sm w-full shadow-2xl border-t-4 font-chart-sans" style={{ borderTopColor: '#0F6E56' }}>
            <div className="p-6">
              <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#0F6E56] uppercase mb-1">Confirm booking</p>
              <h2 className="font-chart-serif text-xl font-semibold text-[#14213D] mb-4">Confirm your appointment</h2>

              <div className="bg-[#FAFAF7] border border-[#14213D]/8 rounded-sm px-4 py-3 mb-3">
                <p className="font-semibold text-sm text-[#14213D]"> {docInfo.name}</p>
                <p className="text-xs text-[#6B6458] mt-0.5">
                  {daysOfWeek[selectedDay[0].datetime.getDay()]} &middot; {slotTime}
                </p>
              </div>

              <div className="flex items-baseline justify-between px-1 mb-6">
                <span className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase">Fee</span>
                <span className="font-chart-serif text-2xl font-semibold text-[#14213D]">{fee}{currency_symbol}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 border border-[#14213D]/20 text-[#14213D] font-medium text-sm rounded-sm hover:bg-[#14213D]/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={bookAppointment}
                  disabled={isBooking}
                  className="flex-1 py-2.5 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isBooking ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Booking…
                    </>
                  ) : 'Confirm & pay'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointment