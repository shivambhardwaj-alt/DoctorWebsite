import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../src/assets/assets.js';

const DoctorDashboard = () => {
  const { getDashboardData, dashboardData, doctorToken } = useContext(DoctorContext);
  const [currentTreatmentUser, setCurrentTreatmentUser] = useState(null);

  // ================= FETCH DASHBOARD DATA =================
  useEffect(() => {
    getDashboardData();
  }, [doctorToken]);

  if (!dashboardData) {
    return (
      <div className="min-h-screen mt-10 p-6 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  // ================= PURE FUNCTION (NO STATE HERE) =================
  const checkTreatment = (item, duration = 30) => {
    try {
      const now = new Date();
      const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      const [time, meridian] = item.slotTime.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (meridian === 'PM' && hours !== 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;

      const startTime = new Date(today);
      startTime.setHours(hours, minutes, 0, 0);

      const endTime = new Date(
        startTime.getTime() + duration * 60 * 1000
      );

      return now >= startTime && now <= endTime;
    } catch (error) {
      console.error('Error checking treatment time:', error);
      return false;
    }
  };

  // ================= SET CURRENT TREATMENT USER =================
  useEffect(() => {
    if (!dashboardData?.latestAppointments?.length) {
      setCurrentTreatmentUser(null);
      return;
    }

    const activeAppointment = dashboardData.latestAppointments.find(item =>
      checkTreatment(item, 30)
    );

    setCurrentTreatmentUser(activeAppointment || null);
  }, [dashboardData?.latestAppointments]);


  // console.log(currentTreatmentUser);

  return (
    <div className="min-h-screen mt-10 p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <h1 className="text-4xl font-bold uppercase bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-8">
        Dashboard
      </h1>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {/* Earnings */}
        <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 hover:border-emerald-200">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl shadow-lg">
              <img src={assets.earning_icon} alt="Earnings" className="w-12 h-12" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Earnings</p>
              <p className="text-3xl font-bold">
                ${dashboardData.earnings || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 hover:border-blue-200">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg">
              <img src={assets.appointment_icon} alt="Appointments" className="w-12 h-12" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Appointments</p>
              <p className="text-3xl font-bold">
                {dashboardData.latestAppointments?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 hover:border-purple-200">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-lg">
              <img src={assets.patients_icon} alt="Patients" className="w-12 h-12" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Treated Patients</p>
              <p className="text-3xl font-bold">
                {dashboardData.patient || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LATEST APPOINTMENTS ================= */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 max-w-[500px]">
          <h2 className="text-2xl font-bold mb-8">Latest Appointments</h2>

          <div className="space-y-4">
            {dashboardData.latestAppointments?.map((item, index) => {
              const isLive = checkTreatment(item, 30);

              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-4 rounded-2xl border transition-all ${
                    isLive
                      ? 'ring-4 ring-emerald-300 bg-emerald-50'
                      : 'bg-white'
                  }`}
                >
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{item.userData.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.userData.email}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.slotTime}
                    </p>
                  </div>

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isLive
                        ? 'bg-emerald-500 text-white animate-pulse'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {isLive ? 'LIVE TREATMENT' : 'Scheduled'}
                  </div>
                </div>
              );
            })}
          </div>

          {(!dashboardData.latestAppointments ||
            dashboardData.latestAppointments.length === 0) &&
            !currentTreatmentUser && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No appointments today</p>
              </div>
            )}
        </div>

        
        {currentTreatmentUser && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <h2 className="text-xl font-bold mb-4 text-emerald-600">
              Currently Treating
            </h2>
            <img
              src={currentTreatmentUser.userData.image}
              alt={currentTreatmentUser.userData.name}
              className="w-24 h-24 rounded-2xl mb-4"
            />
            <p className="font-semibold">
              {currentTreatmentUser.userData.name}
            </p>
            <p className="text-sm text-gray-500">
              {currentTreatmentUser.userData.email}
            </p>
            <p>{currentTreatmentUser.userData.phone}</p>
           <p></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
