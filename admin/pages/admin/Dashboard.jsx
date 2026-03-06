import React from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';
import { assets } from '../../src/assets/assets';

const Dashboard = () => {
  const { adminToken, dashboardData, setDashboardData, getDashboardData } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getDashboardData();
    }
  }, [adminToken]);


  console.log(dashboardData);
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center justify-between p-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Total Appointments */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex flex-col items-center justify-between">
            
            <div className="flex flex-col items-center sm:ml-3 ml-2">
              <p className="text-3xl font-bold text-gray-900">{dashboardData.appointments}</p>
              <p className="text-lg font-medium text-gray-600 mt-1">Appointments</p>
            </div>
          </div>
        </div>

        {/* Doctors */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex  flex-col items-center">
           
            <div className="flex flex-col items-center sm:ml-3 ml-2">
              <p className="text-3xl font-bold text-gray-900 ml-4">{dashboardData.doctors}</p>
              <p className="text-xl font-medium text-gray-600 mt-1">Doctors</p>
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex flex-col items-center justify-between">
            
            <div className=" flex flex-col items-center sm:ml-3 ml-2 ">
              <p className="text-3xl font-bold text-gray-900">{dashboardData.patients}</p>
              <p className="text-sm font-medium text-gray-600 mt-1">Patients</p>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex flex-col items-center justify-between">
            
            <div className=" flex flex-col items-center sm:ml-3 ml-2 ">
              <p className="text-3xl font-bold text-gray-900">₹{dashboardData.amount || 0}</p>
              <p className="text-sm font-medium text-gray-600 mt-1">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8  ">
        {/* Appointments Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hidden md:block ">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-8 h-8 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Recent Appointments
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 font-semibold text-gray-700">Patient</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Doctor</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.newAppointments?.slice(0, 5).map((appt, idx) => (
                  <tr key={appt._id || idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center px-1">
                       
                        <span className="font-medium text-gray-900">{appt.userData?.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center px-2">
                        
                        <span className="font-medium text-gray-900">{appt.docData?.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-700">
                      <div className='px-4  flex flex-col items-center'>
                        <p className="font-medium">{appt.slot_date}</p>
                        <p className="text-sm text-gray-500">{appt.slotTime}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        appt.cancelled 
                          ? 'bg-red-100 text-red-800' 
                          : appt.isCompleted 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appt.cancelled ? 'Cancelled' : appt.isCompleted ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {dashboardData.newAppointments?.length > 5 && (
            <p className="text-center text-gray-500 mt-4 text-sm">Showing 5 of {dashboardData.newAppointments.length} appointments</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <span className="text-gray-700">Total Appointments</span>
                <span className="text-2xl font-bold text-blue-600">{dashboardData.appointments}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <span className="text-gray-700">Active Doctors</span>
                <span className="text-2xl font-bold text-green-600">{dashboardData.doctors}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                <span className="text-gray-700">Registered Patients</span>
                <span className="text-2xl font-bold text-purple-600">{dashboardData.patients}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
