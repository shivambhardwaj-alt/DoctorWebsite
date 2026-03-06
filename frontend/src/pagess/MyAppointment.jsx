import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { assets } from '../assets/assets';

const MyAppointment = () => {
  const navigate = useNavigate();
  const { userToken, backend_url } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getAppointmentList = async () => {
    if (userToken) {
      const { data } = await axios.get(
        backend_url + '/api/user/get-myAppointmentList',
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );
      setAppointments(data.appointments.reverse());
    }
  }

  useEffect(() => {
    if (userToken) {
      getAppointmentList();
    }
  }, [userToken])

  const paymentInitialize = async (order) => {
    if (!window.Razorpay) {
      toast.error('Razorpay SDK not loaded')
      return
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'DoctorPayment',
      description: "Doctor's appointment fees",
      order_id: order.id,
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backend_url}/api/user/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          )

          if (data.success) {
            getAppointmentList()
            navigate('/my-appointments')
          } else {
            toast.error('Payment verification failed')
          }
        } catch (error) {
          toast.error('Payment verification failed')
        }
      },
      theme: {
        color: '#22c55e',
      },
    }

    const razorpay = new window.Razorpay(options)
    razorpay.on('payment.failed', function (response) {
      toast.error(response.error.description || 'Payment failed')
    })
    razorpay.open()
  }

  const appointmentPayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/user/payment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )

      if (!data.success) {
        toast.error('Unable to do the transaction')
        return
      }
      await paymentInitialize(data.order)
    } catch (error) {
      toast.error('Payment Failed due to Internal Reason!')
    }
  }

  const cancelAppointment = async(appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_url + '/api/user/cancelAppointment',
        { appointmentId: appointmentId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`  
          }
        }
      );

      if(data.success){
        toast.success('Cancelled Successfully');
        setShowCancelModal(false);
        getAppointmentList()
      }else{
        toast.error('Unable to Cancel');
      }
    }catch(error){
      toast.error('Unable to Cancel')
    }
  }

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  }

  const handlePayClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPayModal(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-2xl mb-4">
            My Appointments
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6">
            Track, manage, and stay organized with all your upcoming doctor appointments in one place.
          </p>
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
              <div className='flex flex-row gap-1'>
                <img src={assets.calendar} alt="" className='w-10' />
                <p className='mt-2'>What to Expect</p>
              </div>
            </h3>
            <ul className="text-sm text-gray-700 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete appointment details
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
                Secure payment options
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Easy cancellation policy
              </li>
              <li className="flex items-start gap-2">
                <img src={assets.location} alt="" className='w-4'/>
                Clinic location & directions
              </li>
            </ul>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/50 shadow-lg">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Upcoming</h3>
            <p className="text-2xl font-black text-emerald-600">
              {appointments.filter(item => !item.cancelled).length}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/50 shadow-lg">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Cancelled</h3>
            <p className="text-2xl font-black text-red-600">
              {appointments.filter(item => item.cancelled).length}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/50 shadow-lg md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Important Reminder</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Please arrive 15 minutes early for your appointment. Bring valid ID and any prescription documents. Cancellations require 24-hour notice.
            </p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4 mb-12">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-xl rounded-xl shadow-lg hover:shadow-xl border border-white/50 hover:border-emerald-200 transition-all duration-300 p-5"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                {/* Doctor Image & Number */}
                <div className="flex items-center gap-3 lg:col-span-1">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-xl ring-2 ring-emerald-100">
                      <img
                        src={item.docData.image}
                        alt={item.docData.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-xs font-bold flex items-center justify-center shadow-md ring-2 ring-white">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="lg:col-span-2 space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                    Dr. {item.docData.name}
                  </h3>
                  <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg">
                    {item.docData.speciality}
                  </span>
                  
                  <div className="flex items-center gap-2 p-2.5 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-lg">
                   <img src={assets.calendar} alt="" className='w-4'/>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{item.slot_date}</p>
                      <p className="text-sm font-bold text-gray-900">{item.slotTime}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 p-2 bg-blue-50 rounded-lg">
                    🏥 {item.docData.address.line1}, {item.docData.address.line2}
                  </div>
                  
                  <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <strong>Status:</strong> {item.cancelled ? '❌ Cancelled' : '✅ Upcoming'} | 
                    <strong> Fee:</strong> ₹50
                  </div>
                </div>

                {/* Actions */}
                {!item.cancelled ? 
                  <div className="flex flex-col gap-2 lg:flex-col h-full justify-end">
                    <button 
                      onClick={() => handlePayClick(item)}
                      className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-emerald-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-1"
                    >
                      💳 Pay Now
                    </button>
                    <button 
                      onClick={() => handleCancelClick(item)}
                      className="px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-gray-300 transition-all flex items-center justify-center gap-1"
                    >

                      <div>
                        <img src={assets.cross_icon} alt="" className='w-5' />
                      </div>
                       Cancel
                    </button>
                  </div>
                :
                  <div className="flex justify-center lg:justify-end pt-4 h-full items-end">
                    <span className="px-6 py-2.5 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold text-sm rounded-lg shadow-lg">
                      Cancelled
                    </span>
                  </div>
                }
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How do I prepare for my appointment?</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Arrive 15 minutes early with valid ID, insurance card, and any prescription documents. Fast if instructed by your doctor.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What is your cancellation policy?</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Cancel 24 hours before your appointment to avoid fees. Use the Cancel button or contact our support team.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods are accepted?</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                All major credit/debit cards, UPI, net banking, and popular wallets through secure Razorpay gateway.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Do I need to bring anything?</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Government ID, previous medical records, current medications list, and insurance details if applicable.
              </p>
            </div>
          </div>
        </div>

        {/* No Appointments */}
        {appointments.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center shadow-xl">
              <svg className="w-14 h-14 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Appointments Yet</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              You haven't booked any appointments. Start your healthcare journey with our expert doctors.
            </p>
            <button 
              onClick={() => navigate('/doctors')} 
              className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-600 transform hover:-translate-y-1 transition-all duration-300"
            >
              Book First Appointment
            </button>
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center pt-12 pb-8 border-t border-emerald-100/50">
          <p className="text-sm text-gray-600 mb-2">
            Need help? Contact support at <span className="font-semibold text-emerald-600">support@healthcare.com</span>
          </p>
          <p className="text-xs text-gray-500">
            © 2025 Healthcare Platform. All rights reserved.
          </p>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-white/50">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 text-white text-center rounded-t-2xl">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-1">Cancel Appointment?</h2>
            </div>
            <div className="p-6">
              <div className="text-center mb-6 p-4 bg-gray-50 rounded-xl">
                <p className="font-bold text-lg mb-1">Dr. {selectedAppointment.docData.name}</p>
                <p className="text-sm text-gray-600">{selectedAppointment.slot_date} at {selectedAppointment.slotTime}</p>
              </div>
              <p className="text-sm text-gray-600 mb-6 text-center">This action cannot be undone. Please cancel at least 24 hours before your appointment.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl shadow-md transition-all"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={() => cancelAppointment(selectedAppointment._id)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-red-400 transition-all flex items-center justify-center gap-2"
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pay Confirmation Modal */}
      {showPayModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-white/50">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-5 text-white text-center rounded-t-2xl">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-1">Confirm Payment</h2>
            </div>
            <div className="p-6">
              <div className="text-center mb-6 p-4 bg-emerald-50 rounded-xl">
                <p className="font-bold text-lg mb-1">Dr. {selectedAppointment.docData.name}</p>
                <p className="text-sm text-gray-600 mb-2">{selectedAppointment.slot_date} at {selectedAppointment.slotTime}</p>
                <div className="bg-white p-3 rounded-lg shadow-sm border">
                  <p className="text-2xl font-black text-emerald-600">₹50</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Consultation Fee</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPayModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl shadow-md transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowPayModal(false);
                    appointmentPayment(selectedAppointment._id);
                  }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-emerald-400 transition-all flex items-center justify-center gap-2"
                >
                  💳 Pay ₹50 Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyAppointment
