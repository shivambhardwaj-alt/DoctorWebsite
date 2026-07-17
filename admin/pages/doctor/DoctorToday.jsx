import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorToday = () => {
  const { getTodayAppointment, todayAppointment, doctorToken, backend_url } = useContext(DoctorContext);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState(null);

  const completedAppointment = async (appointmentId) => {
    setCompletingId(appointmentId);
    try {
      const { data } = await axios.post(
        `${backend_url}/api/doctor/mark-complete-appointment`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${doctorToken}` },
        }
      );

      if (data.success) {
        toast.success('Appointment marked as complete');
        await getTodayAppointment();
      } else {
        toast.error(data.message || 'Failed to complete appointment');
      }
    } catch (error) {
      toast.error('Failed to complete appointment');
    } finally {
      setCompletingId(null);
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!doctorToken) return;
      setLoading(true);
      await getTodayAppointment();
      setLoading(false);
    };

    load();
  }, [doctorToken]);

  return (
    <div className="min-h-screen bg-[#FAFAF9] px-6 py-12 font-sans tracking-tight">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10 border-b-2 border-[#14213D] pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#14213D] uppercase tracking-wide">
              Schedule Overview
            </h1>
            <p className="text-sm text-[#8A8578] mt-1 font-medium">
              Managing appointments for {todayAppointment?.[0]?.slot_date || 'Today'}
            </p>
          </div>
          <div className="text-sm font-bold bg-[#14213D]/5 text-[#14213D] px-4 py-2 border border-[#14213D]/10">
            {todayAppointment?.length || 0} ACTIVE {todayAppointment?.length === 1 ? 'SLOT' : 'SLOTS'}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-28 bg-[#14213D]/5 animate-pulse border border-[#14213D]/10" />
            ))}
          </div>
        ) : todayAppointment?.length > 0 ? (
          <div className="border border-[#14213D]/10 bg-white shadow-sm divide-y divide-[#14213D]/10">

            <div className="hidden md:flex items-center justify-between bg-[#14213D]/5 px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#8A8578]">
              <div className="w-2/5">Patient Details</div>
              <div className="w-1/5 text-center">Scheduled Time</div>
              <div className="w-1/5 text-center">Consultation Fee</div>
              <div className="w-1/5 text-right">Status & Management</div>
            </div>

            {todayAppointment.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 hover:bg-[#FAFAF9] transition-colors"
              >
                <div className="md:w-2/5 flex items-start gap-4 min-w-0">
                  <img
                    src={item?.userData?.image || 'https://via.placeholder.com/100'}
                    alt={item?.userData?.name || 'Patient profile'}
                    className="w-14 h-14 object-cover flex-shrink-0 bg-[#14213D]/5 border border-[#14213D]/20 grayscale contrast-125"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <h2 className="text-base font-bold text-[#14213D] capitalize truncate">
                      {item?.userData?.name || 'Unknown Patient'}
                    </h2>
                    <p className="text-xs font-mono text-[#8A8578] truncate">
                      ID: {item?._id?.substring(0, 8)}...
                    </p>
                    <p className="text-xs text-[#14213D]/70 font-medium truncate">
                      Contact: {item?.userData?.phone === "000000000" ? item?.userData?.email : item?.userData?.phone || '—'}
                    </p>
                  </div>
                </div>

                <div className="md:w-1/5 flex flex-row md:flex-col items-baseline justify-between md:justify-center md:items-center gap-1 border-t md:border-t-0 pt-2 md:pt-0 border-[#14213D]/5">
                  <span className="text-[10px] md:hidden font-bold uppercase tracking-wider text-[#8A8578]">Appointment Time</span>
                  <span className="text-lg font-bold text-[#14213D] tabular-nums bg-[#14213D]/5 px-2.5 py-1 border border-[#14213D]/10 md:border-0 md:bg-transparent md:p-0">
                    {item?.slotTime || '—'}
                  </span>
                </div>

                <div className="md:w-1/5 flex flex-row md:flex-col items-baseline justify-between md:justify-center md:items-center gap-1">
                  <span className="text-[10px] md:hidden font-bold uppercase tracking-wider text-[#8A8578]">Consultation Fee</span>
                  <div className="text-center font-semibold text-sm text-[#14213D]">
                    ₹{item?.amount || '0'}
                    <span className="text-[10px] font-bold block tracking-wider uppercase mt-0.5 text-[#8A8578]">
                      Base Charge
                    </span>
                  </div>
                </div>

                <div className="md:w-1/5 flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-[#14213D]/5">
                  <span
                    className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 border ${
                      item?.payment
                        ? 'bg-[#0F6E56]/5 text-[#0F6E56] border-[#0F6E56]/20'
                        : 'bg-[#C1493A]/5 text-[#C1493A] border-[#C1493A]/20'
                    }`}
                  >
                    {item?.payment ? 'PAID' : 'UNPAID'}
                  </span>

                  {item?.cancelled ? (
                    <span className="text-xs font-extrabold tracking-wider uppercase px-4 py-2.5 border min-w-[110px] text-center bg-[#C1493A]/10 text-[#C1493A] border-[#C1493A]/20">
                      ✕ CANCELLED
                    </span>
                  ) : (
                    <button
                      onClick={() => completedAppointment(item._id)}
                      disabled={item?.isCompleted || completingId === item._id}
                      className={`text-xs font-bold tracking-wider uppercase px-4 py-2.5 border transition-colors min-w-[110px] text-center ${
                        item?.isCompleted
                          ? 'bg-[#0F6E56]/10 text-[#0F6E56] border-[#0F6E56]/20 cursor-default font-extrabold'
                          : 'bg-[#14213D] text-white border-[#14213D] hover:bg-[#0F6E56] hover:border-[#0F6E56] disabled:opacity-50'
                      }`}
                    >
                      {item?.isCompleted ? '✓ DONE' : completingId === item._id ? '...' : 'COMPLETE'}
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-[#14213D]/20 bg-white">
            <p className="text-base font-medium text-[#8A8578]">There are no incoming visits mapped for today.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorToday;