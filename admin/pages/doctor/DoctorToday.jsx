import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import {toast} from 'react-toastify';
import axios from 'axios';

const DoctorToday = () => {
  const { getTodayAppointment, todayAppointment, doctorToken, backend_url } = useContext(DoctorContext);

  // Mark appointment as completed
  const compeletedAppointment = async(appointmentId) => {
    try {
      const {data} = await axios.post(backend_url + '/api/doctor/complete-appointment', 
        {appointmentId: appointmentId}, 
        {headers: {Authorization : `Bearer ${doctorToken}`}}
      );

      if(data.success){
        toast.success("Appointment Completed Successfully!");
        getTodayAppointment();
      }
    } catch(error) {
      toast.error('Failed to complete appointment');
    }
  }

  useEffect(() => {
    getTodayAppointment();
  }, [doctorToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 to-teal-50/50 py-6 px-2 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-6 lg:mb-10">
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Today's Appointments
          </h1>
          <p className="text-lg sm:text-xl text-emerald-700 font-medium">
            {todayAppointment?.length || 0} scheduled
          </p>
        </div>

       
        <div className="lg:hidden bg-white/95 backdrop-blur-xl rounded-xl p-3 shadow-md border border-emerald-100 mb-3 flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <span className="w-8 flex-shrink-0">#</span>
          <span className="flex-1 min-w-0">Patient</span>
          <span className="w-20 flex-shrink-0 text-right">Status</span>
        </div>

        
        <div className="hidden lg:flex bg-white/95 backdrop-blur-xl rounded-xl p-3 lg:p-4 shadow-md border border-emerald-100 mb-3 gap-3 lg:gap-4 items-center font-semibold text-emerald-800 text-xs lg:text-sm">
          <span className="w-10 text-center flex-shrink-0">#</span>
          <span className="min-w-[100px] lg:min-w-[70px] flex-1">Patient</span>
          <span className="min-w-[120px] lg:min-w-[70px] flex-shrink-0">Email</span>
          <span className="min-w-[90px] lg:min-w-[70px] flex-shrink-0">Phone</span>
          <span className="min-w-[140px] lg:min-w-[70px] flex-1">Address</span>
          <span className='min-w-[140px] lg:min-w-[70px] flex-shrink-0'>Slot Time</span>
          <span className="w-44 flex-shrink-0 text-right">Actions</span>
        </div>

        {/* Appointments List */}
        <div className="space-y-2 lg:space-y-3">
          {todayAppointment?.length > 0 ? (
            todayAppointment.map((item, index) => (
              <div key={index} className="group bg-white/95 backdrop-blur-xl hover:bg-white hover:shadow-lg rounded-xl p-3 lg:p-4 border border-emerald-50/50 hover:border-emerald-200/70 transition-all duration-300">
                
            
                <div className="lg:hidden flex items-center gap-2 h-16">
                  {/* Index */}
                  <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-lg flex items-center justify-center text-xs font-bold shadow flex-shrink-0">
                    {index + 1}
                  </div>

                  {/* Patient Only */}
                  <div className="flex-1 min-w-0 flex items-center gap-2 pr-2">
                    <img 
                      src={item.userData.image} 
                      alt={item.userData.name}
                      className="w-9 h-9 rounded-lg object-cover ring-1 ring-emerald-100 shadow flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-emerald-800 truncate">{item.userData.name}</p>
                      <p className="text-xs text-gray-600 truncate">{item.userData.phone}</p>
                    </div>
                  </div>

                
                  <div className="flex flex-col gap-1 items-end flex-shrink-0 w-20">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap ${
                      item.payment ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.payment ? '✓' : '⚠️'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap ${
                      item.isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.isCompleted ? 'Done' : '⏳'}
                    </span>
                  </div>
                </div>

              
                <div className="hidden lg:grid lg:grid-cols-[50px_1fr_140px_100px_1fr_120px_160px] lg:gap-3 items-center h-20">
                  {/* Index */}
                  <div className="w-10 text-center flex-shrink-0">
                    <span className="text-lg font-black text-emerald-600">{index + 1}</span>
                  </div>

                  {/* Patient */}
                  <div className="flex items-center gap-2 min-w-0">
                    <img 
                      src={item.userData.image} 
                      alt={item.userData.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-100 shadow hover:scale-105 transition-transform flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm lg:text-base text-emerald-800 truncate">{item.userData.name}</p>
                      <p className="text-xs text-gray-600 capitalize truncate">
                        {item.userData.gender === "Not Selected" ? 'N/A' : item.userData.gender}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="min-w-[120px]">
                    <p className="text-xs lg:text-sm text-gray-700 truncate">{item.userData.email}</p>
                  </div>

                  {/* Phone */}
                  <div className="min-w-[90px]">
                    <p className="text-xs lg:text-sm font-medium text-emerald-700 truncate">{item.userData.phone}</p>
                  </div>

                  {/* Address */}
                  <div className="min-w-[140px]">
                    <p className="text-xs lg:text-sm text-gray-600 truncate leading-tight">
                      {item.userData.address?.line1 || 'Not Available'}{' '}
                      {item.userData.address?.line2 || ''}
                    </p>
                  </div>

                  {/* Slot Time */}
                  <div className="min-w-[70px] flex flex-1 items-center justify-center">
                    <p className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-1 py-1 rounded-lg">
                      {item.slotTime}
                    </p>
                  </div>

              
                  <div className="flex items-center gap-2 w-full justify-end">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm whitespace-nowrap ${
                      item.payment 
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                        : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                    }`}>
                      {item.payment ? 'Paid' : 'Unpaid'}
                    </span>
                    
                    <button 
                      onClick={() => compeletedAppointment(item._id)} 
                      disabled={item.isCompleted}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-1 cursor-pointer ${
                        item.isCompleted 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 hover:shadow-md hover:scale-105'
                      }`}
                    >
                      {item.isCompleted ? '✓ Done' : 'Complete'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 lg:py-16 bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-dashed border-emerald-200 shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-emerald-800 mb-2">No Appointments</h3>
              <p className="text-emerald-600 text-sm lg:text-base">Enjoy your day ☕</p>
            </div>
          )}
        </div>

        {/* Tiny Summary - Desktop Only */}
        {todayAppointment?.length > 0 && (
          <div className="grid lg:grid-cols-4 gap-3 mt-8 lg:mt-12 hidden lg:grid">
            <div className="bg-white/90 backdrop-blur-xl rounded-xl p-4 text-center shadow-md border border-emerald-100 hover:shadow-lg transition-all">
              <div className="text-2xl lg:text-3xl font-black text-emerald-600 mb-1">{todayAppointment.length}</div>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Total</p>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-xl p-4 text-center shadow-md border border-emerald-100 hover:shadow-lg transition-all">
              <div className="text-2xl lg:text-3xl font-black text-green-600 mb-1">
                {todayAppointment.filter(item => item.payment).length}
              </div>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Paid</p>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-xl p-4 text-center shadow-md border border-emerald-100 hover:shadow-lg transition-all">
              <div className="text-2xl lg:text-3xl font-black text-blue-600 mb-1">
                {todayAppointment.filter(item => !item.isCompleted).length}
              </div>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Pending</p>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-xl p-4 text-center shadow-md border border-emerald-100 hover:shadow-lg transition-all">
              <div className="text-2xl lg:text-3xl font-black text-green-600 mb-1">
                {todayAppointment.filter(item => item.isCompleted).length}
              </div>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Done</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorToday
