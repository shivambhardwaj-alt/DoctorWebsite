import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";

const DoctorAppointment = () => {
  const { doctorToken, appointmentData, getAllAppointment, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  
  useEffect(() => {
    if (doctorToken) {
      getAllAppointment();
    }
  }, [doctorToken]);

 

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return isNaN(age) ? 0 : age;
  };

  if (!appointmentData || appointmentData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pl-0 pt-20">
        <div className="bg-white p-8 rounded-xl shadow-lg border ">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">No Appointments</h2>
          <p className="text-gray-600 text-center">Nothing scheduled yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-12 p-3  relative z-0">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600 mt-1">Total: {appointmentData.length}</p>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 relative z-10">
          <div className="min-w-[800px] overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-[80px_140px_80px_140px_60px_80px_220px] bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 sticky top-0 z-20">
              <div className="px-4 py-4 font-semibold text-gray-800 text-xs uppercase tracking-wide text-left">ID</div>
              <div className="px-4 py-4 font-semibold text-gray-800 text-xs uppercase tracking-wide text-left">Patient</div>
              <div className="px-4 py-4 font-semibold text-gray-800 text-xs uppercase tracking-wide text-center">Payment</div>
              <div className="px-4 py-4 font-semibold text-gray-800 text-xs uppercase tracking-wide text-left">Date & Time</div>
              <div className="px-4 py-4 font-semibold text-gray-800 text-xs uppercase tracking-wide text-center">Age</div>
              <div className="px-4 py-4 font-semibold text-gray-800 text-xs uppercase tracking-wide text-right">Fees</div>
              <div className="px-4 py-4 font-semibold text-gray-800 text-xs uppercase tracking-wide text-right">Action</div>
            </div>

            {/* Data Rows */}
            {appointmentData.map((item, index) => (
              <div 
                key={item._id} 
                className="grid grid-cols-[80px_140px_80px_140px_60px_80px_220px] gap-0 items-center hover:bg-gray-50 transition-colors duration-150 group border-b border-gray-50 last:border-b-0"
              >
                {/* ID */}
                <div className="px-4 py-4 font-mono text-sm text-gray-500 font-medium truncate">
                  {item._id?.slice(-6)}
                </div>

                {/* Patient */}
                <div className="px-4 py-4">
                  <p className="font-medium text-gray-900 text-sm truncate">{item.userData?.name || 'N/A'}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[120px]">
                    {item.userData?.email?.slice(0, 20)}...
                  </p>
                </div>

                {/* Payment */}
                <div className="px-4 py-4 flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.payment 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {item.payment ? "Paid" : "Pending"}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="px-4 py-4">
                  <p className="text-xs text-gray-600 font-medium">{item.slotTime }</p>
                  <p className="text-xs text-gray-600 font-medium">{item.slot_date}</p>
                </div>

                {/* Age */}
                <div className="px-4 py-4 flex justify-center">
                  <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-800">
                    {calculateAge(item.userData?.dob)} yrs
                  </span>
                </div>

                {/* Fees */}
                <div className="px-4 py-4 text-right">
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{item.docData?.fees || item.amount || 0}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="px-4 py-4 flex justify-end space-x-2">
                  {item.isCompleted ? (
                    <button className="px-4 py-2 bg-gray-400 text-white text-sm font-medium rounded-lg cursor-not-allowed">
                      Completed
                    </button>
                  ) : item.cancelled ? (
                    <button className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg cursor-not-allowed">
                      Cancelled
                    </button>
                  ) : (
                    <>
                     <p className="text-white bg-green-600 px-2 py-2 rounded-lg font-medium cursor-not-allowed">UpComing</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8 max-w-full justify-center items-center">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg overflow-hidden flex-1 max-w-xs text-center">
            <p className="text-3xl font-bold">{appointmentData.filter(a => a.payment).length}</p>
            <p className="text-lg font-medium mt-1">Paid</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg overflow-hidden flex-1 max-w-xs text-center">
            <p className="text-3xl font-bold">{appointmentData.filter(a => a.isCompleted).length}</p>
            <p className="text-lg font-medium mt-1">Completed</p>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg overflow-hidden flex-1 max-w-xs text-center">
            <p className="text-3xl font-bold">
              ₹{appointmentData.reduce((sum, a) => sum + (a.amount || 0), 0)}
            </p>
            <p className="text-lg font-medium mt-1">Total Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
