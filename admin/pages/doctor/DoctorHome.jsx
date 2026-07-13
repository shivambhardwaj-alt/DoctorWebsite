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

  // ======================== FUNCTION TO DELETE THE APPOINTMENT FROM HISTORY =======================
  const deleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_url + '/api/doctor/delete-appointment',
        { appointmentId: appointmentId },
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      if (data.success) {
        toast.success('Record successfully cleared');
        getCancelledAppointments();
      } else {
        toast.error("Failed to delete record.");
      }
    } catch (error) {
      toast.error('An error occurred.');
    }
  };

 
  function nameShorter(name) {
    if (!name) return 'N/A';
    const cleanName = name.toString();
    return cleanName.length > 14 ? cleanName.slice(0, 12) + "..." : cleanName;
  }

 
  const totalCount = cancelledAppointments?.length || 0;
  const paidCount = cancelledAppointments?.filter(item => item.userData?.payment).length || 0;
  const pendingCount = totalCount - paidCount;
  
  const paidPercentage = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;
  const pendingPercentage = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;


  if (!cancelledAppointments || totalCount === 0) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6">
        <div className="bg-white border border-slate-100 rounded-3xl p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Cancelled Appointments</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            All caught up! Your schedule looks clean. Cancelled patient records will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Cancellation Analytics</h1>
            <p className="text-slate-500 text-sm mt-1">Review and manage records for processing updates.</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Live Records System
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Total Cancellations</p>
              <h3 className="text-5xl font-black text-slate-900 mt-2">{totalCount}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              Requiring database housekeeping
            </p>
          </div>

          
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900">Financial Breakdown of Cancellations</h4>
              <span className="text-xs font-medium text-slate-400">Relative Proportions</span>
            </div>
            
            <div className="space-y-4">
           
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Paid ({paidCount})
                  </span>
                  <span className="font-bold text-slate-900">{paidPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${paidPercentage}%` }}></div>
                </div>
              </div>

      
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Unpaid / Pending ({pendingCount})
                  </span>
                  <span className="font-bold text-slate-900">{pendingPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${pendingPercentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

   
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Patient Document Queue</h3>
            <span className="px-2.5 py-1 text-xs font-semibold text-red-700 bg-red-50 rounded-md border border-red-100">
              Action Required
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {cancelledAppointments.map((item) => {
              const patientGender = item.userData?.gender || item.userData?.Gender || 'N/A';
              
              return (
                <div key={item._id} className="p-6 hover:bg-slate-50/50 transition-colors duration-150 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
          
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <img 
                      src={item.userData?.image} 
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-900 text-base tracking-tight truncate">
                          {nameShorter(item.userData?.name)}
                        </h4>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          patientGender.toLowerCase() === 'male' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          patientGender.toLowerCase() === 'female' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                          'bg-slate-50 text-slate-600 border border-slate-200'
                        }`}>
                          {patientGender}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">ID: {item._id.slice(0, 10)}...</p>
                    </div>
                  </div>

              
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1 text-xs">
                    <div>
                      <span className="block text-slate-400 font-medium mb-0.5">Email Address</span>
                      <span className="font-semibold text-slate-700 break-all">{item.userData?.email || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-medium mb-0.5">Phone Number</span>
                      <span className="font-semibold text-slate-700">{item.userData?.phone || 'N/A'}</span>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                      <span className="block text-slate-400 font-medium mb-0.5">Registered Address</span>
                      <span className="font-medium text-slate-600 line-clamp-1">
                        {item.userData?.address?.line1 || 'No structural address on file'}
                      </span>
                    </div>
                  </div>

                
                  <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      item.userData?.payment 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}>
                      {item.userData?.payment ? '● Settled' : '● Unpaid'}
                    </span>
                    
                    <button 
                      onClick={() => deleteAppointment(item._id)}
                      className="inline-flex items-center justify-center px-4 py-2 bg-white text-xs font-bold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100 cursor-pointer"
                    >
                      Purge Record
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorHome;