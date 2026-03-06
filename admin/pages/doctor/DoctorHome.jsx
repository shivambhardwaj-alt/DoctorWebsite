import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';

import { toast } from 'react-toastify';
const DoctorHome = () => {
  const {
    cancelledAppointments,
    getCancelledAppointments,
    doctorToken,
    backend_url,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (doctorToken) {
      getCancelledAppointments();
    }
  }, [doctorToken]);


  // ========================FUNCTION TO DELETE THE APPOINTMENT FROM HISTORY =======================

  const deleteAppointment = async(appointmentId) => {
    try{

      const {data} = await axios.post(backend_url + '/api/doctor/delete-appointment',{appointmentId : appointmentId},{headers:{Authorization : `Bearer ${doctorToken}`}});
      if(data.success){
        toast.success('Done')
        getCancelledAppointments();
      }else{
        toast.error("Failed!");
      }
      


    }catch(error){
      toast.error('Failed');
    }
  }








  if (!cancelledAppointments || cancelledAppointments.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
           
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">No Cancelled Appointments</h2>
          <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">All your appointments are confirmed and on track. Check back later for updates.</p>
        </div>
      </div>
    );
  }

  function NameShorter(name) {
    const newName = name.toString();
    if (newName.length > 8) {
      return newName.slice(0, 5) + "...";
    }
    return newName;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 py-8 px-0">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Cancelled Appointments
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full shadow-md"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 mb-12 px-4">
          {cancelledAppointments.map((item) => (
            <div 
              key={item._id}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl hover:-translate-y-2 hover:border-emerald-200 transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-red-50 to-rose-50 px-8 py-6 border-b border-red-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={item.userData.image} 
                        alt="Patient"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-4 ring-red-200 group-hover:ring-red-300 transition-all duration-300 shadow-2xl"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                        <span className="text-xs font-bold text-white">✕</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-gray-900">{NameShorter(item.userData.name)}</h3>
                      <p className="text-sm md:text-base text-gray-600">ID: {item._id.toString().slice(0,8)}...</p>
                    </div>
                  </div>
                  <span className="inline-flex px-4 py-2 bg-red-100 text-red-800 text-sm md:text-base font-bold rounded-2xl shadow-md">
                    CANCELLED
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
                    <p className="text-lg font-semibold text-gray-900 break-all">{item.userData.email}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone</label>
                    <p className="text-lg font-semibold text-gray-900">{item.userData.phone || 'N/A'}</p>
                  </div>
                </div>

                {/* Gender & Address */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Gender</label>
                    <span
  className={`inline-flex px-4 py-2 rounded-2xl text-sm font-bold shadow-md ml-3 md:ml-3 ${
    item.userData.Gender === 'Male'
      ? 'bg-blue-100 text-blue-800'
      : item.userData.Gender === 'Female'
      ? 'bg-pink-100 text-pink-800'
      : 'bg-green-600 text-white'
  }`}
>
  {item.userData.gender}
</span>

                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 block">Address</label>
                    <div className="space-y-1 bg-gray-50 p-4 rounded-2xl">
                      <p className="font-semibold text-gray-900">{item.userData.address.line1.length === 0 ? "Not Available" : item.userData.address.line1}</p>
                      {item.userData.address.line2 && (
                        <p className="text-sm text-gray-600">{item.userData.address.line2}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment & Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between pt-4 border-t border-gray-100">
                  <span className={`inline-flex px-6 py-3 rounded-2xl text-base font-bold shadow-lg ${
                    item.userData.payment 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.userData.payment ? '✓ Paid' : ' Pending'}
                  </span>
                  <button onClick = {() =>deleteAppointment(item._id) }   className="group/btn w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-base font-bold rounded-2xl hover:from-red-600 hover:to-red-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-200 cursor-pointer">
                   
                    Delete Record
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-12">
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-200">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Total Cancelled</p>
                <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
                  {cancelledAppointments.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
