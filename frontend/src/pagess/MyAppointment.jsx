import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { assets } from '../assets/assets';

const MyAppointment = () => {
  const navigate = useNavigate();
  const { userToken, backend_url, currency_symbol } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getFee = (appointment) =>
    appointment?.amount ?? appointment?.docData?.fees ?? null;

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
        color: '#0F6E56',
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

  const upcomingCount = appointments.filter(item => !item.cancelled).length;
  const cancelledCount = appointments.filter(item => item.cancelled).length;

  return (
    <div className="min-h-screen bg-white py-10 sm:py-14 px-4 font-chart-sans relative overflow-hidden">
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

      <div className="max-w-4xl mx-auto relative">

        <header className="mb-8 sm:mb-10 border-b-2 border-[#14213D] pb-4 sm:pb-5">
          <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-2">
            Appointment Log
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h1 className="font-chart-serif text-3xl sm:text-4xl font-semibold text-[#14213D] tracking-tight">
              My appointments
            </h1>
            <div className="flex gap-4 font-chart-mono text-xs text-[#6B6458]">
              <span><span className="text-[#14213D] font-semibold">{upcomingCount}</span> upcoming</span>
              <span><span className="text-[#C1493A] font-semibold">{cancelledCount}</span> cancelled</span>
            </div>
          </div>
        </header>

        <div className="flex items-start gap-3 bg-[#0F6E56]/6 border border-[#0F6E56]/15 rounded-sm px-4 py-3 mb-8">
          <img src={assets.calendar} alt="" className="w-4 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#14213D] leading-relaxed">
            Arrive 15 minutes early with a valid ID and any prescription documents. Cancellations require 24-hour notice.
          </p>
        </div>

        <div className="space-y-4 mb-4">
          {appointments.map((item, index) => {
            const fee = getFee(item);
            return (
            <div
              key={index}
              className="relative bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05)]
                hover:shadow-[0_10px_24px_-10px_rgba(20,33,61,0.16)] transition-shadow duration-200 pl-6 pr-5 py-5"
            >
              <div className="absolute left-2 top-0 bottom-0 border-l border-dashed border-[#14213D]/15 hidden sm:block" />
              <div className="absolute left-2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-[#14213D]/20 hidden sm:block" />

              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-center">

                <div className="flex items-center gap-4 lg:contents">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-16 h-16 rounded-sm object-cover border border-[#14213D]/10 flex-shrink-0"
                  />

                  <div className="min-w-0 lg:hidden">
                    <h3 className="font-chart-serif text-lg font-semibold text-[#14213D] truncate"> {item.docData.name}</h3>
                    <span className="font-chart-mono text-[10px] tracking-[0.1em] uppercase text-[#0F6E56]">{item.docData.speciality}</span>
                  </div>
                </div>

                <div className="min-w-0 space-y-1.5">
                  <h3 className="font-chart-serif text-lg font-semibold text-[#14213D] hidden lg:block"> {item.docData.name}</h3>
                  <span className="font-chart-mono text-[10px] tracking-[0.1em] uppercase text-[#0F6E56] hidden lg:inline-block">{item.docData.speciality}</span>
                  <p className="text-sm text-[#4A4438]">
                    {item.slot_date} &middot; <span className="font-medium">{item.slotTime}</span>
                  </p>
                  <p className="text-xs text-[#9A968C] truncate">
                    {item.docData.address.line1}, {item.docData.address.line2}
                  </p>
                  <p className="font-chart-mono text-[10px] tracking-[0.1em] uppercase text-[#6B6458]">
                    {item.cancelled ? 'Cancelled' : 'Upcoming'} &middot; Fee {fee != null ? `${currency_symbol}${fee}` : 'N/A'}
                  </p>
                </div>

                {!item.cancelled ? (
                  <div className="flex sm:flex-col gap-2 lg:w-36">
                    <button
                      onClick={() => handlePayClick(item)}
                      className="flex-1 lg:flex-none px-4 py-2 bg-[#14213D] text-white font-semibold text-xs rounded-sm hover:bg-[#0F6E56] transition-colors duration-200"
                    >
                      Pay now
                    </button>
                    <button
                      onClick={() => handleCancelClick(item)}
                      className="flex-1 lg:flex-none px-4 py-2 border border-[#14213D]/20 text-[#14213D] font-medium text-xs rounded-sm hover:bg-[#14213D]/5 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="lg:w-36 flex sm:justify-end">
                    <span className="px-3 py-1.5 bg-[#C1493A]/8 text-[#C1493A] font-chart-mono text-[10px] tracking-[0.1em] uppercase rounded-sm border border-[#C1493A]/15">
                      Cancelled
                    </span>
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-16 sm:py-20 bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05)]">
            <p className="font-chart-mono text-[11px] tracking-[0.2em] text-[#0F6E56] uppercase mb-2">Empty log</p>
            <h3 className="font-chart-serif text-2xl font-semibold text-[#14213D] mb-3">No appointments yet</h3>
            <p className="text-sm text-[#6B6458] mb-7 max-w-sm mx-auto">
              You haven't booked any appointments. Start your healthcare journey with our expert doctors.
            </p>
            <button
              onClick={() => navigate('/doctors')}
              className="px-8 py-3 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200"
            >
              Book your first appointment
            </button>
          </div>
        )}

        <div className="text-center pt-10 mt-8 border-t border-[#14213D]/10">
          <p className="text-xs text-[#6B6458]">
            Need help? Contact <span className="font-medium text-[#0F6E56]">support@healthcare.com</span>
          </p>
        </div>
      </div>

      {showCancelModal && selectedAppointment && (
        <div className="fixed inset-0 bg-[#14213D]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-sm w-full shadow-2xl border-t-4" style={{ borderTopColor: '#C1493A' }}>
            <div className="p-6">
              <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#C1493A] uppercase mb-1">Confirm cancellation</p>
              <h2 className="font-chart-serif text-xl font-semibold text-[#14213D] mb-4">Cancel this appointment?</h2>

              <div className="bg-[#FAFAF7] border border-[#14213D]/8 rounded-sm px-4 py-3 mb-4">
                <p className="font-semibold text-sm text-[#14213D]"> {selectedAppointment.docData.name}</p>
                <p className="text-xs text-[#6B6458] mt-0.5">{selectedAppointment.slot_date} at {selectedAppointment.slotTime}</p>
              </div>

              <p className="text-xs text-[#6B6458] mb-6">
                This can't be undone. Please cancel at least 24 hours before your appointment.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-2.5 border border-[#14213D]/20 text-[#14213D] font-medium text-sm rounded-sm hover:bg-[#14213D]/5 transition-colors"
                >
                  Keep it
                </button>
                <button
                  onClick={() => cancelAppointment(selectedAppointment._id)}
                  className="flex-1 py-2.5 bg-[#C1493A] text-white font-semibold text-sm rounded-sm hover:bg-[#A63D30] transition-colors"
                >
                  Confirm cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayModal && selectedAppointment && (
        <div className="fixed inset-0 bg-[#14213D]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-sm w-full shadow-2xl border-t-4" style={{ borderTopColor: '#0F6E56' }}>
            <div className="p-6">
              <p className="font-chart-mono text-[10px] tracking-[0.2em] text-[#0F6E56] uppercase mb-1">Confirm payment</p>
              <h2 className="font-chart-serif text-xl font-semibold text-[#14213D] mb-4">Pay consultation fee</h2>

              <div className="bg-[#FAFAF7] border border-[#14213D]/8 rounded-sm px-4 py-3 mb-4">
                <p className="font-semibold text-sm text-[#14213D]"> {selectedAppointment.docData.name}</p>
                <p className="text-xs text-[#6B6458] mt-0.5 mb-3">{selectedAppointment.slot_date} at {selectedAppointment.slotTime}</p>
                <div className="flex items-baseline gap-2 border-t border-[#14213D]/8 pt-3">
                  <span className="font-chart-serif text-2xl font-semibold text-[#14213D]">
                    {(() => { const fee = getFee(selectedAppointment); return fee != null ? `${currency_symbol}${fee}` : 'N/A'; })()}
                  </span>
                  <span className="font-chart-mono text-[10px] tracking-[0.1em] uppercase text-[#9A968C]">Consultation fee</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPayModal(false)}
                  className="flex-1 py-2.5 border border-[#14213D]/20 text-[#14213D] font-medium text-sm rounded-sm hover:bg-[#14213D]/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowPayModal(false);
                    appointmentPayment(selectedAppointment._id);
                  }}
                  className="flex-1 py-2.5 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors"
                >
                  {(() => { const fee = getFee(selectedAppointment); return `Pay ${fee != null ? `${currency_symbol}${fee}` : 'now'}`; })()}
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