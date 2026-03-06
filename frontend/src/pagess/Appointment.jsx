import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Appointment = () => {
  const { id } = useParams()
  const { doctorList, currency_symbol, userToken, backend_url } = useContext(AppContext)
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)   
  const [slotTime, setSlotTime] = useState('')  
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isBooking, setIsBooking] = useState(false)


  // I will add one more logic here where disappearing slots if it is present in hashset of slots booked by other users. I will update that hashset every 30 seconds by fetching data from backend. This way we can avoid double booking of same slot by multiple users at same time.
  const [bookedSlots, setBookedSlots] = useState(new Set());

  const fetchDocInfo = useCallback(() => {
    if (doctorList.length > 0) {
      const doc_info = doctorList.find(doc => doc._id === id)
      setDocInfo(doc_info)
    }
  }, [doctorList, id])

  const getAvailableSlot = useCallback(() => {
    setDocSlots([])
    const today = new Date()
    let allSlots = []

    for (let i = 0; i < 7; i++) {
      const currDate = new Date(today)
      currDate.setDate(today.getDate() + i)
      const endTime = new Date(currDate)
      endTime.setHours(21, 0, 0, 0)
      let startTime = new Date(currDate)

      if (i === 0) {
        startTime.setHours(startTime.getHours() > 10 ? startTime.getHours() + 1 : 10)
        startTime.setMinutes(startTime.getMinutes() > 30 ? 30 : 0)
      } else {
        startTime.setHours(10)
        startTime.setMinutes(0)
      }

      const daySlots = []
      let currentSlot = new Date(startTime)

      while (currentSlot < endTime) {
        const formattedTime = currentSlot.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        daySlots.push({
          datetime: new Date(currentSlot),
          time: formattedTime
        })

        currentSlot.setMinutes(currentSlot.getMinutes() + 30)
      }

      allSlots.push(daySlots)
    }

    setDocSlots(allSlots)
  }, [])

  useEffect(() => {
    fetchDocInfo()
  }, [fetchDocInfo])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlot()
    }
  }, [docInfo, getAvailableSlot])

  const bookAppointment = async () => {
    if (!userToken) {
      toast.warn('Login to book an appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      toast.error('Please select a time slot first')
      return
    }

    try {
      setIsBooking(true)
      const selectedSlot = docSlots[slotIndex].find(slot => slot.time === slotTime)
      const date = selectedSlot.datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      
      const slot_date = `${day}-${month}-${year}`
      const doc_id = docInfo._id

      const { data } = await axios.post(
        backend_url + '/api/user/book-appointment',
        { slot_date, slotTime, doc_id },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      if (data.success) {
        toast.success('Appointment booked successfully!')
        setShowConfirmModal(false)
        setSlotTime('')
        setSlotIndex(0)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Profile Card - Compact */}
        <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Doctor Image */}
            <div className="flex flex-col items-center lg:order-2">
              <div className="relative">
                <img
                  src={docInfo.image}
                  alt={docInfo.name}
                  className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-2xl shadow-xl ring-2 ring-white/50 bg-gradient-to-br from-indigo-100 to-purple-100 p-2"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl shadow-xl border-2 border-white">
                  <img src={assets.verified} className="w-5 h-5" alt="Verified" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="inline-flex items-center px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl">
                  ✓ Verified
                </span>
                <p className="mt-2 text-lg font-semibold text-gray-700">
                  {docInfo.experience}+ Years
                </p>
              </div>
            </div>

            {/* Doctor Details */}
            <div className="lg:col-span-2 lg:order-1 space-y-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                  {docInfo.name}
                </h1>
                <p className="text-lg text-gray-600 mt-1 font-medium">
                  {docInfo.degree} • {docInfo.speciality}
                </p>
              </div>

              {/* Compact Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase font-medium">Patients</p>
                  <p className="text-xl font-bold text-indigo-600">15K+</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase font-medium">Rating</p>
                  <p className="text-xl font-bold text-amber-500">4.9</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase font-medium">Status</p>
                  <div className="text-sm font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Available
                  </div>
                </div>
              </div>

              {/* Compact About */}
              <div className="p-4 bg-white/50 rounded-xl border border-white/30">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  About
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{docInfo.about}</p>
              </div>

              {/* Compact Fee & Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Fee</h3>
                  <p className="text-3xl font-black text-emerald-600">
                    50{currency_symbol}
                  </p>
                </div>
                <button 
                  onClick={handleBookNow}
                  disabled={!slotTime}
                  className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                    slotTime 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-105 hover:shadow-emerald-500 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Slots Section */}
        <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            Available Slots
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {docSlots.map((daySlots, dayIndex) => (
              <div
                key={dayIndex}
                onClick={() => {
                  setSlotIndex(dayIndex)
                  setSlotTime(daySlots[0]?.time || '')
                }}
                className={`p-4 rounded-xl border shadow-md cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                  slotIndex === dayIndex
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white border-indigo-400 ring-2 ring-indigo-300'
                    : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold capitalize">
                    {daysOfWeek[new Date(daySlots[0]?.datetime).getDay()]}
                  </h3>
                  <p className="text-2xl font-black text-indigo-600">
                    {new Date(daySlots[0]?.datetime).getDate()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(daySlots[0]?.datetime).toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {daySlots.slice(0, 10).map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSlotIndex(dayIndex)
                        setSlotTime(slot.time)
                      }}
                      className={`w-full p-3 rounded-lg border flex justify-between items-center text-sm transition-all ${
                        slotIndex === dayIndex && slotTime === slot.time
                          ? 'bg-white/30 text-white border-white/50 shadow-md scale-105'
                          : 'bg-white border-gray-200 hover:bg-indigo-100 hover:border-indigo-300 hover:shadow-md'
                      }`}
                    >
                      <span>{slot.time}</span>
                      <span className={`w-3 h-3 rounded-full ${
                        slotIndex === dayIndex && slotTime === slot.time 
                          ? 'bg-white' 
                          : 'bg-emerald-500 animate-pulse'
                      }`}></span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {slotTime && (
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl text-center">
              <h3 className="text-lg font-bold mb-1">Selected</h3>
              <p className="text-sm opacity-95">
                {daysOfWeek[new Date(docSlots[slotIndex][0]?.datetime).getDay()]} • {slotTime} • Dr. {docInfo.name}
              </p>
            </div>
          )}
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-white/50">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white text-center rounded-t-2xl">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-1">Confirm Booking</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="font-bold text-lg">{docInfo.name}</p>
                <p className="text-sm text-gray-600">
                  {daysOfWeek[new Date(docSlots[slotIndex][0]?.datetime).getDay()]} • {slotTime}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl flex justify-between items-center">
                <span className="text-lg font-bold text-emerald-700">Fee:</span>
                <span className="text-2xl font-black text-emerald-600">50{currency_symbol}</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={bookAppointment}
                  disabled={isBooking}
                  className="flex-1 bg-gradient-to-r cursor-pointer from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-emerald-400 transition-all flex items-center justify-center gap-2"
                >
                  {isBooking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin "></div>
                      Booking...
                    </>
                  ) : (
                    'Confirm & Pay'
                  )}
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
