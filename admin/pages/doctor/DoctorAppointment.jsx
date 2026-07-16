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

  // ================= FETCH DATA ON MOUNT =================
  useEffect(() => {
    if (doctorToken) {
      getAllAppointment();
    }
  }, [doctorToken]);

  // ================= PURE UTILITY FUNCTION =================
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return isNaN(age) ? 0 : age;
  };

  // ================= DERIVED DATA STATS (MEMOIZED) =================
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

  // Empty State Dashboard View
  if (!appointmentData || appointmentData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4 text-black">
        <div className="bg-white p-8 rounded-xl border-2 border-black max-w-sm w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-200">
            <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight mb-1">No Appointments</h2>
          <p className="text-gray-500 text-sm">Your schedule is currently clear.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-10 px-4 pb-12 font-sans selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title Section */}
        <div className="border-b border-gray-200 pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Appointments</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track your active patient sessions.</p>
          </div>
          <div className="bg-gray-100 border border-gray-200 px-4 py-1.5 font-mono text-xs font-bold rounded">
            TOTAL: {appointmentData.length}
          </div>
        </div>

        {/* ================= DESKTOP TABLE VIEW ================= */}
        <div className="hidden lg:block overflow-x-auto border-2 border-black rounded-xl shadow-sm">
          <div className="min-w-[900px] bg-white">
            {/* Table Header Layout */}
            <div className="grid grid-cols-[90px_180px_100px_140px_70px_100px_180px] bg-gray-50 border-b-2 border-black font-bold text-xs uppercase tracking-wider text-gray-700">
              <div className="px-4 py-4 text-left">ID</div>
              <div className="px-4 py-4 text-left">Patient</div>
              <div className="px-4 py-4 text-center">Payment</div>
              <div className="px-4 py-4 text-left">Date & Time</div>
              <div className="px-4 py-4 text-center">Age</div>
              <div className="px-4 py-4 text-right">Fees</div>
              <div className="px-4 py-4 text-center">Action</div>
            </div>

            {/* Table Body Content Rows */}
            {appointmentData.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-[90px_180px_100px_140px_70px_100px_180px] items-center hover:bg-gray-50 border-b border-gray-200 last:border-b-0 transition duration-150"
              >
                <div className="px-4 py-4 font-mono text-xs text-gray-400 font-medium">
                  #{item._id?.slice(-6)}
                </div>

                <div className="px-4 py-4">
                  <p className="font-bold text-sm tracking-tight">{item.userData?.name || "N/A"}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[160px]">{item.userData?.email}</p>
                </div>

                <div className="px-4 py-4 flex justify-center">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border ${
                    item.payment
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {item.payment ? "Paid" : "Pending"}
                  </span>
                </div>

                <div className="px-4 py-4 text-xs font-medium">
                  <p className="text-black">{item.slotTime}</p>
                  <p className="text-gray-400 mt-0.5">{item.slot_date}</p>
                </div>

                <div className="px-4 py-4 text-center font-mono text-xs font-semibold text-gray-600">
                  {calculateAge(item.userData?.dob)}y
                </div>

                <div className="px-4 py-4 text-right font-black text-sm">
                  ₹{item.docData?.fees || item.amount || 0}
                </div>

                {/* Actions Trigger Blocks */}
                <div className="px-4 py-4 flex justify-center gap-1">
                  {item.isCompleted ? (
                    <span className="text-xs font-bold uppercase text-emerald-600 px-3 py-1.5 bg-emerald-50 rounded border border-emerald-100">
                      Completed
                    </span>
                  ) : item.cancelled ? (
                    <span className="text-xs font-bold uppercase text-red-600 px-3 py-1.5 bg-red-50 rounded border border-red-100">
                      Cancelled
                    </span>
                  ) : (
                    <div className="flex gap-1.5 w-full">
                      <button 
                        onClick={() => completeAppointment(item._id)}
                        className="flex-1 text-center bg-black text-white text-[11px] font-bold uppercase py-1.5 hover:bg-gray-800 transition duration-150 rounded"
                      >
                        Done
                      </button>
                      <button 
                        onClick={() => cancelAppointment(item._id)}
                        className="flex-1 text-center border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-bold uppercase py-1.5 transition duration-150 rounded"
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

        {/* ================= MOBILE STACK VIEW ================= */}
        <div className="lg:hidden space-y-4">
          {appointmentData.map((item) => (
            <div key={item._id} className="bg-white border-2 border-black rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between border-b border-gray-100 pb-3 mb-3">
                <div>
                  <p className="font-bold text-base tracking-tight">{item.userData?.name || "N/A"}</p>
                  <p className="text-xs text-gray-400">{item.userData?.email}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                  item.payment ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                }`}>
                  {item.payment ? "Paid" : "Pending"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-xs mb-4">
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Appt ID</p>
                  <p className="font-mono text-black font-semibold">#{item._id?.slice(-6)}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Patient Age</p>
                  <p className="text-black font-semibold">{calculateAge(item.userData?.dob)} years</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Schedule</p>
                  <p className="text-black font-semibold">{item.slotTime}</p>
                  <p className="text-gray-400 text-[11px]">{item.slot_date}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Total Fees</p>
                  <p className="text-black font-black text-sm">₹{item.docData?.fees || item.amount || 0}</p>
                </div>
              </div>

              <div className="pt-1">
                {item.isCompleted ? (
                  <div className="w-full text-center text-xs font-bold uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 py-2 rounded">
                    Appointment Completed
                  </div>
                ) : item.cancelled ? (
                  <div className="w-full text-center text-xs font-bold uppercase text-red-600 bg-red-50 border border-red-200 py-2 rounded">
                    Session Cancelled
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => completeAppointment(item._id)}
                      className="flex-1 bg-black text-white text-xs font-bold uppercase py-2.5 hover:bg-gray-800 transition rounded"
                    >
                      Complete Session
                    </button>
                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold uppercase py-2.5 transition rounded"
                    >
                      Cancel Appt
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-3xl font-black">{stats.paidCount}</p>
            <p className="text-xs uppercase tracking-wider font-bold text-gray-500 mt-1">Paid Sessions</p>
          </div>

          <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-3xl font-black">{stats.completedCount}</p>
            <p className="text-xs uppercase tracking-wider font-bold text-gray-500 mt-1">Completed Sessions</p>
          </div>

          <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-3xl font-black">₹{stats.totalRevenue}</p>
            <p className="text-xs uppercase tracking-wider font-bold text-gray-500 mt-1">Accumulated Revenue</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorAppointment;