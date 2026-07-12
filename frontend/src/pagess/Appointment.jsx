import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const SLOT_INTERVAL_MIN = 30
const DAY_END_HOUR = 21
const DAY_START_HOUR = 10

const Appointment = () => {
  const { id } = useParams()
  const { doctorList, currency_symbol, userToken, backend_url } = useContext(AppContext)
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([]) // array of day -> array of slot objects
  const [dayIndex, setDayIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [bookedSlots, setBookedSlots] = useState(new Set()) // "YYYY-M-D_HH:mm" keys

  useEffect(() => {
    if (doctorList?.length > 0) {
      setDocInfo(doctorList.find(doc => doc._id === id) || null)
    }
  }, [doctorList, id])

  // Poll booked slots every 30s so two patients can't double-book the same slot
  useEffect(() => {
    if (!docInfo) return

    const fetchBooked = async () => {
      try {
        const { data } = await axios.get(`${backend_url}/api/user/booked-slots/${docInfo._id}`)
        if (data.success) setBookedSlots(new Set(data.bookedSlots))
      } catch {
        // silent fail — worst case, stale slot list until next poll or server-side reject on submit
      }
    }

    fetchBooked()
    const interval = setInterval(fetchBooked, 30000)
    return () => clearInterval(interval)
  }, [docInfo, backend_url])

  const buildSlotKey = (date, time) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${time}`

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
        // round UP to the next slot boundary after "now", not down
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
        const timeLabel = cursor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const key = buildSlotKey(cursor, timeLabel)
        slots.push({
          datetime: new Date(cursor),
          time: timeLabel,
          isBooked: bookedSlots.has(key),
        })
        cursor.setMinutes(cursor.getMinutes() + SLOT_INTERVAL_MIN)
      }

      if (slots.length > 0) days.push(slots) // skip days with no valid slots left
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

    try {
      setIsBooking(true)
      const { data } = await axios.post(
        `${backend_url}/api/user/book-appointment`,
        { slot_date, slotTime, doc_id: docInfo._id },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      if (data.success) {
        toast.success('Appointment booked successfully!')
        setShowConfirmModal(false)
        setSlotTime('')
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

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  const fee = docInfo.fees ?? '—'
  const selectedDay = docSlots[dayIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Doctor card */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col items-center lg:order-2">
              <div className="relative">
                <img
                  src={docInfo.image}
                  alt={docInfo.name}
                  className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-2xl shadow-xl ring-2 ring-white/50 bg-indigo-50 p-2"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl shadow-xl border-2 border-white">
                  <img src={assets.verified} className="w-5 h-5" alt="Verified" />
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-700">{docInfo.experience} experience</p>
            </div>

            <div className="lg:col-span-2 lg:order-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{docInfo.name}</h1>
                <p className="text-gray-600 mt-1">{docInfo.degree} • {docInfo.speciality}</p>
              </div>

              <div className="p-4 bg-white/60 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">About</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{docInfo.about}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-emerald-50 rounded-xl">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Fee</h3>
                  <p className="text-3xl font-black text-emerald-600">{fee}{currency_symbol}</p>
                </div>
                <button
                  onClick={handleBookNow}
                  disabled={!slotTime}
                  className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                    slotTime
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-105 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slots */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available slots</h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {docSlots.map((slots, i) => (
              <div
                key={i}
                onClick={() => { setDayIndex(i); setSlotTime('') }}
                className={`p-4 rounded-xl border shadow cursor-pointer transition-all hover:-translate-y-1 ${
                  dayIndex === i
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white border-indigo-400'
                    : 'bg-white border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="text-center mb-3">
                  <h3 className="font-bold">{daysOfWeek[slots[0].datetime.getDay()]}</h3>
                  <p className="text-2xl font-black text-indigo-600">{slots[0].datetime.getDate()}</p>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {slots.map((slot, idx) => (
                    <button
                      key={idx}
                      disabled={slot.isBooked}
                      onClick={(e) => {
                        e.stopPropagation()
                        setDayIndex(i)
                        setSlotTime(slot.time)
                      }}
                      className={`w-full p-2.5 rounded-lg border flex justify-between items-center text-sm transition-all ${
                        slot.isBooked
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                          : dayIndex === i && slotTime === slot.time
                          ? 'bg-white/30 text-white border-white/50'
                          : 'bg-white border-gray-200 hover:bg-indigo-100'
                      }`}
                    >
                      <span>{slot.time}</span>
                      {!slot.isBooked && (
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          dayIndex === i && slotTime === slot.time ? 'bg-white' : 'bg-emerald-500'
                        }`}></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {slotTime && selectedDay && (
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-center">
              <p className="font-bold">Selected</p>
              <p className="text-sm opacity-95">
                {daysOfWeek[selectedDay[0].datetime.getDay()]} • {slotTime} • Dr. {docInfo.name}
              </p>
            </div>
          )}
        </div>
      </div>

      {showConfirmModal && selectedDay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white text-center rounded-t-2xl">
              <h2 className="text-2xl font-bold">Confirm booking</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="font-bold text-lg">{docInfo.name}</p>
                <p className="text-sm text-gray-600">
                  {daysOfWeek[selectedDay[0].datetime.getDay()]} • {slotTime}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl flex justify-between items-center">
                <span className="font-bold text-emerald-700">Fee</span>
                <span className="text-2xl font-black text-emerald-600">{fee}{currency_symbol}</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={bookAppointment}
                  disabled={isBooking}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isBooking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Booking...
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