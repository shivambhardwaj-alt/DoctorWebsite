import React, { useContext, useEffect, useMemo, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

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

const getStatus = (item) => (item.cancelled ? "Cancelled" : item.isCompleted ? "Completed" : "Scheduled");

const STATUS_STYLES = {
  Scheduled: "bg-gray-50 text-gray-700 border-gray-400",
  Completed: "bg-emerald-50 text-emerald-800 border-emerald-600",
  Cancelled: "bg-red-50 text-red-700 border-red-600",
};

const StatusBadge = ({ item }) => {
  const status = getStatus(item);
  return (
    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider border-2 ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
};

const ActionMenu = ({ item, isOpen, onToggle, onClose, onView, onCancel, onComplete, onMarkPaid }) => {
  const menuItems = [
    { label: "View", onClick: () => onView(item) },
    { label: "Mark Complete", onClick: () => onComplete(item._id) },
    { label: "Mark Paid", onClick: () => onMarkPaid(item._id) },
    { label: "Cancel", onClick: () => onCancel(item._id), danger: true },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => onToggle(item._id)}
        className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:bg-gray-100 transition duration-150"
        aria-label="More actions"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="19" cy="12" r="1.8" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute right-0 mt-2 w-44 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
            {menuItems.map((mi) => (
              <button
                key={mi.label}
                onClick={() => {
                  mi.onClick();
                  onClose();
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wide border-b border-gray-100 last:border-b-0 transition duration-150 cursor-pointer ${
                  mi.danger ? "text-red-600 hover:bg-red-50" : "text-black hover:bg-gray-50"
                }`}
              >
                {mi.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AppointmentDetailsModal = ({ item, onClose }) => {
  const user = item.userData || {};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div
        className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b-2 border-black sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Session Details</h2>
            <p className="text-xs text-gray-500 font-mono mt-0.5">#{item._id?.slice(-6)}</p>
          </div>
          <button onClick={onClose} className="text-black/50 hover:text-black text-2xl leading-none px-1" aria-label="Close">
            &times;
          </button>
        </div>

        <div className="px-6 py-5 space-y-5 text-sm">
          <div className="flex gap-2">
            <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border-2 ${
              item.payment ? "bg-emerald-50 text-emerald-800 border-emerald-600" : "bg-amber-50 text-amber-800 border-amber-600"
            }`}>
              {item.payment ? "PAID" : "PENDING"}
            </span>
            <StatusBadge item={item} />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Patient</p>
            <p className="font-bold">{user.name || "N/A"}</p>
            <p className="text-gray-500 text-xs">{user.email || "N/A"}</p>
            <p className="text-gray-500 text-xs">{user.phone || "N/A"}</p>
            <p className="text-gray-500 text-xs">{calculateAge(user.dob)} &middot; {user.gender || "Not Selected"}</p>
          </div>

          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-gray-400 text-xs">Date</p>
            <p className="text-right font-semibold">{item.slot_date || "N/A"}</p>
            <p className="text-gray-400 text-xs">Time</p>
            <p className="text-right font-semibold">{item.slotTime || "N/A"}</p>
            <p className="text-gray-400 text-xs">Fees</p>
            <p className="text-right font-semibold">₹{item.docData?.fees || item.amount || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorAppointment = () => {
  const { doctorToken, backend_url, appointmentData, getAllAppointment } = useContext(DoctorContext);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (doctorToken) {
      getAllAppointment();
    }
  }, [doctorToken]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_url + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );

      if (data.success) {
        toast.success("Appointment cancelled");
        getAllAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to cancel appointment");
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_url + "/api/doctor/mark-complete-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      
      if (data.success) {
        toast.success("Appointment marked complete");
        getAllAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to mark appointment complete");
    }
  };

  const markPaymentPaid = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_url + "/api/doctor/mark-paid",
        { appointmentId },
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      

      if (data.success) {
        toast.success("Payment marked as successful");
        getAllAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update payment status");
    }
  };

  const toggleMenu = (id) => setOpenMenuId((prev) => (prev === id ? null : id));
  const closeMenu = () => setOpenMenuId(null);

  const stats = useMemo(() => {
    if (!appointmentData) return { paidCount: 0, completedCount: 0, totalRevenue: 0 };

    return appointmentData.reduce(
      (acc, appt) => {
        if (appt.payment) acc.paidCount++;
        if (appt.isCompleted) acc.completedCount++;
        if(appt.isCompleted || appt.payment)
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

            <div className="grid grid-cols-[110px_1.8fr_1fr_1fr_1.4fr_0.8fr_1fr_80px] bg-gray-100 border-b-2 border-black font-bold text-xs uppercase tracking-wider text-gray-700">
              <div className="px-6 py-4 text-left">Session ID</div>
              <div className="px-6 py-4 text-left">Patient</div>
              <div className="px-6 py-4 text-center">Payment</div>
              <div className="px-6 py-4 text-center">Status</div>
              <div className="px-6 py-4 text-left">Date & Time</div>
              <div className="px-6 py-4 text-center">Age</div>
              <div className="px-6 py-4 text-right">Amount</div>
              <div className="px-6 py-4 text-center">Actions</div>
            </div>

            <div className="divide-y-2 divide-gray-100">
              {appointmentData.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-[110px_1.8fr_1fr_1fr_1.4fr_0.8fr_1fr_80px] items-center hover:bg-gray-50 transition duration-150"
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

                  <div className="px-6 py-5 flex justify-center">
                    <StatusBadge item={item} />
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
                    <ActionMenu
                      item={item}
                      isOpen={openMenuId === item._id}
                      onToggle={toggleMenu}
                      onClose={closeMenu}
                      onView={setSelectedAppointment}
                      onCancel={cancelAppointment}
                      onComplete={completeAppointment}
                      onMarkPaid={markPaymentPaid}
                    />
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
                <ActionMenu
                  item={item}
                  isOpen={openMenuId === item._id}
                  onToggle={toggleMenu}
                  onClose={closeMenu}
                  onView={setSelectedAppointment}
                  onCancel={cancelAppointment}
                  onComplete={completeAppointment}
                  onMarkPaid={markPaymentPaid}
                />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border-2 ${
                  item.payment ? "bg-emerald-50 text-emerald-800 border-emerald-600" : "bg-amber-50 text-amber-800 border-amber-600"
                }`}>
                  {item.payment ? "PAID" : "PENDING"}
                </span>
                <StatusBadge item={item} />
              </div>

              <div className="grid grid-cols-2 gap-y-4 text-xs">
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

      {selectedAppointment && (
        <AppointmentDetailsModal item={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
      )}
    </div>
  );
};

export default DoctorAppointment;