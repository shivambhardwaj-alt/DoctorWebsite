import React, { useContext, useEffect, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";

const DoctorAppointment = () => {
  const { 
    doctorToken, 
    appointmentData, 
    getAllAppointment, 
    cancelAppointment, 
    completeAppointment 
  } = useContext(DoctorContext);

 
  useEffect(() => {
    if (doctorToken) {
      getAllAppointment();
    }
  }, [doctorToken]);


  const calculateAge = (dob) => {
    if (!dob || dob === "Not Selected") return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return isNaN(age) ? "N/A" : `${age}y`;
  };


  const stats = useMemo(() => {
    if (!appointmentData) return { paidCount: 0, completedCount: 0, totalRevenue: 0 };
    
    return appointmentData.reduce(
      (acc, appt) => {
        if (appt.payment) acc.paidCount++;
        if (appt.isCompleted) acc.completedCount++;
        acc.totalRevenue += appt.amount || appt.docData?.fees || 0;
        return acc;
      },
      { paidCount: 0, completedCount: 0, totalRevenue: 0 }
    );
  }, [appointmentData]);


  if (!appointmentData || appointmentData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] px-4 text-black">
        <div className="bg-white p-10 border-2 border-black max-w-md w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center rounded-none">
          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-6 border-2 border-black rounded-none">
            <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-wide mb-2">No Appointments</h2>
          <p className="text-gray-500 text-sm">Your booking schedule is currently clear.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-black pt-12 px-6 pb-16 font-sans selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto">
        
  
        <div className="border-b-2 border-black pb-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Appointments</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Manage, inspect, and transition active clinical patient sessions.</p>
          </div>
          <div className="bg-white border-2 border-black px-5 py-2 font-mono text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            TOTAL SCHEDULER: {appointmentData.length}
          </div>
        </div>

   
        <div className="hidden lg:block border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white mb-10">
          <div className="min-w-full">
         
            <div className="grid grid-cols-[110px_2fr_1.2fr_1.5fr_1fr_1fr_2.2fr] bg-gray-100 border-b-2 border-black font-bold text-xs uppercase tracking-wider text-gray-700">
              <div className="px-6 py-4 text-left">Session ID</div>
              <div className="px-6 py-4 text-left">Patient</div>
              <div className="px-6 py-4 text-center">Payment</div>
              <div className="px-6 py-4 text-left">Date & Time</div>
              <div className="px-6 py-4 text-center">Age</div>
              <div className="px-6 py-4 text-right">Amount</div>
              <div className="px-6 py-4 text-center">Management Actions</div>
            </div>

            
            <div className="divide-y-2 divide-gray-100">
              {appointmentData.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-[110px_2fr_1.2fr_1.5fr_1fr_1fr_2.2fr] items-center hover:bg-gray-50 transition duration-150"
                >
                  <div className="px-6 py-5 font-mono text-xs text-gray-400 font-bold uppercase">
                    #{item._id?.slice(-6)}
                  </div>

                  <div className="px-6 py-5">
                    <p className="font-bold text-base tracking-tight">{item.userData?.name || "N/A"}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px] mt-0.5">{item.userData?.email}</p>
                  </div>

                  <div className="px-6 py-5 flex justify-center">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider border-2 ${
                      item.payment
                        ? "bg-emerald-50 text-emerald-800 border-emerald-600"
                        : "bg-amber-50 text-amber-800 border-amber-600"
                    }`}>
                      {item.payment ? "PAID" : "PENDING"}
                    </span>
                  </div>

                  <div className="px-6 py-5 text-xs font-semibold">
                    <p className="text-black text-sm font-bold">{item.slotTime}</p>
                    <p className="text-gray-500 mt-1 font-mono">{item.slot_date}</p>
                  </div>

                  <div className="px-6 py-5 text-center font-mono text-sm font-bold text-gray-700">
                    {calculateAge(item.userData?.dob)}
                  </div>

                  <div className="px-6 py-5 text-right font-black text-base text-gray-900">
                    ₹{item.docData?.fees || item.amount || 0}
                  </div>

                 
                  <div className="px-6 py-5 flex justify-center">
                    {item.isCompleted ? (
                      <span className="text-xs font-extrabold uppercase text-emerald-700 px-4 py-2 bg-emerald-50 border-2 border-emerald-600 w-full text-center">
                        ✓ COMPLETED
                      </span>
                    ) : item.cancelled ? (
                      <span className="text-xs font-extrabold uppercase text-red-700 px-4 py-2 bg-red-50 border-2 border-red-600 w-full text-center">
                        ✕ CANCELLED
                      </span>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <button 
                          onClick={() => completeAppointment(item._id)}
                          className="flex-1 text-center bg-black text-white text-xs font-bold uppercase py-2 hover:bg-emerald-700 hover:text-white border-2 border-black transition duration-150"
                        >
                          Done
                        </button>
                        <button 
                          onClick={() => cancelAppointment(item._id)}
                          className="flex-1 text-center border-2 border-red-600 text-red-600 hover:bg-red-50 text-xs font-bold uppercase py-2 transition duration-150"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      
        <div className="lg:hidden space-y-6">
          {appointmentData.map((item) => (
            <div key={item._id} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start justify-between border-b-2 border-gray-100 pb-4 mb-4">
                <div>
                  <p className="font-bold text-lg tracking-tight">{item.userData?.name || "N/A"}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.userData?.email}</p>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border-2 ${
                  item.payment ? "bg-emerald-50 text-emerald-800 border-emerald-600" : "bg-amber-50 text-amber-800 border-amber-600"
                }`}>
                  {item.payment ? "PAID" : "PENDING"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-4 text-xs mb-6">
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-1">Session ID</p>
                  <p className="font-mono text-black font-bold text-sm">#{item._id?.slice(-6)}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-1">Patient Age</p>
                  <p className="text-black font-bold text-sm">{calculateAge(item.userData?.dob)}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-1">Schedule Slot</p>
                  <p className="text-black font-bold">{item.slotTime}</p>
                  <p className="text-gray-500 text-[11px] font-mono mt-0.5">{item.slot_date}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-1">Base Fees</p>
                  <p className="text-black font-black text-base">₹{item.docData?.fees || item.amount || 0}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                {item.isCompleted ? (
                  <div className="w-full text-center text-xs font-black uppercase text-emerald-700 bg-emerald-50 border-2 border-emerald-600 py-2.5">
                    ✓ Appointment Completed
                  </div>
                ) : item.cancelled ? (
                  <div className="w-full text-center text-xs font-black uppercase text-red-700 bg-red-50 border-2 border-red-600 py-2.5">
                    ✕ Session Cancelled
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => completeAppointment(item._id)}
                      className="flex-1 bg-black text-white text-xs font-bold uppercase py-3 hover:bg-emerald-700 border-2 border-black transition duration-150"
                    >
                      Complete Session
                    </button>
                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-50 text-xs font-bold uppercase py-3 transition duration-150"
                    >
                      Cancel Appt
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-4xl font-black text-black">{stats.paidCount}</p>
            <p className="text-[11px] uppercase tracking-widest font-extrabold text-gray-500 mt-2">Paid Sessions</p>
          </div>

          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-4xl font-black text-black">{stats.completedCount}</p>
            <p className="text-[11px] uppercase tracking-widest font-extrabold text-gray-500 mt-2">Completed Sessions</p>
          </div>

          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center bg-gray-50">
            <p className="text-4xl font-black text-emerald-800">₹{stats.totalRevenue}</p>
            <p className="text-[11px] uppercase tracking-widest font-extrabold text-gray-500 mt-2">Accumulated Revenue</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorAppointment;