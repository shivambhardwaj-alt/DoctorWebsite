import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../src/assets/assets.js';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

const DoctorDashboard = () => {
  const { getDashboardData, dashboardData, doctorToken } = useContext(DoctorContext);
  const [currentTreatmentUser, setCurrentTreatmentUser] = useState(null);

  // ================= FETCH DASHBOARD DATA =================
  useEffect(() => {
    if (doctorToken) {
      getDashboardData();
    }
  }, [doctorToken]);

  // ================= PURE UTILITY FUNCTION =================
  const checkTreatment = (item, duration = 30) => {
    try {
      if (!item?.slotTime) return false;
      
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const [time, meridian] = item.slotTime.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (meridian === 'PM' && hours !== 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;

      const startTime = new Date(today);
      startTime.setHours(hours, minutes, 0, 0);

      const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

      return now >= startTime && now <= endTime;
    } catch (error) {
      console.error('Error checking treatment time:', error);
      return false;
    }
  };

  // ================= SET CURRENT TREATMENT USER =================
  useEffect(() => {
    const appointments = dashboardData?.latestAppointments;
    if (!appointments?.length) {
      setCurrentTreatmentUser(null);
      return;
    }

    const activeAppointment = appointments.find(item => checkTreatment(item, 30));
    setCurrentTreatmentUser(activeAppointment || null);
  }, [dashboardData?.latestAppointments]);

  // Loading State
  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <div className="animate-pulse font-medium text-lg tracking-wide">Loading dashboard data...</div>
      </div>
    );
  }

  // Mock data for Recharts (Replaces with real weekly/monthly data if available in dashboardData)
  const chartData = dashboardData.chartData || [
    { name: 'Mon', Earnings: (dashboardData.earnings || 0) * 0.1 },
    { name: 'Tue', Earnings: (dashboardData.earnings || 0) * 0.2 },
    { name: 'Wed', Earnings: (dashboardData.earnings || 0) * 0.15 },
    { name: 'Thu', Earnings: (dashboardData.earnings || 0) * 0.3 },
    { name: 'Fri', Earnings: (dashboardData.earnings || 0) * 0.25 },
    { name: 'Sat', Earnings: (dashboardData.earnings || 0) * 0.4 },
    { name: 'Sun', Earnings: dashboardData.earnings || 0 },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-10 font-sans selection:bg-black selection:text-white">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-black tracking-tight uppercase">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your clinic's performance today.</p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Earnings */}
        <div className="bg-white border-2 border-black p-6 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Total Earnings</p>
              <p className="text-3xl font-black mt-2">${dashboardData.earnings || 0}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <img src={assets.earning_icon} alt="Earnings" className="w-8 h-8 invert" />
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white border-2 border-black p-6 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Appointments</p>
              <p className="text-3xl font-black mt-2">{dashboardData.latestAppointments?.length || 0}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <img src={assets.appointment_icon} alt="Appointments" className="w-8 h-8 invert" />
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="bg-white border-2 border-black p-6 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Treated Patients</p>
              <p className="text-3xl font-black mt-2">{dashboardData.patient || 0}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <img src={assets.patients_icon} alt="Patients" className="w-8 h-8 invert" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= RECHARTS INTEGRATION ================= */}
      <div className="bg-white border border-gray-200 p-6 rounded-xl mb-10 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Earnings Performance</h2>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.05}/>
                  <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#777" fontSize={12} tickLine={false} />
              <YAxis stroke="#777" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '2px solid #000', borderRadius: '4px' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="Earnings" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= MAIN CONTENT SPLIT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Latest Appointments List */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 tracking-tight">Latest Appointments</h2>

          <div className="divide-y divide-gray-100">
            {dashboardData.latestAppointments?.map((item, index) => {
              const isLive = checkTreatment(item, 30);

              return (
                <div key={index} className={`flex items-center justify-between py-4 first:pt-0 last:pb-0`}>
                  <div className="flex items-center gap-4">
                    <img
                      src={item.userData.image}
                      alt={item.userData.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <p className="font-bold text-sm tracking-tight text-black">{item.userData.name}</p>
                      <p className="text-xs text-gray-500">{item.userData.email}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.slotTime}</p>
                    </div>
                  </div>

                  <div>
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        Scheduled
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {(!dashboardData.latestAppointments || dashboardData.latestAppointments.length === 0) && (
            <div className="text-center py-12 text-gray-400 border border-dashed border-gray-200 rounded-xl">
              <p className="text-sm">No appointments scheduled for today.</p>
            </div>
          )}
        </div>

        {/* Live Active Treatment Monitor */}
        {currentTreatmentUser && (
          <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold uppercase tracking-wider text-xs">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              Active Treatment Session
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <img
                src={currentTreatmentUser.userData.image}
                alt={currentTreatmentUser.userData.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-black"
              />
              <div>
                <h3 className="font-black text-lg">{currentTreatmentUser.userData.name}</h3>
                <p className="text-xs text-gray-500">{currentTreatmentUser.userData.email}</p>
                <p className="text-xs font-mono text-gray-700 mt-1">{currentTreatmentUser.userData.phone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button className="flex-1 text-center bg-black text-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition duration-150">
                View History
              </button>
              <button className="flex-1 text-center border border-black text-black py-2 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition duration-150">
                End Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;