import React, { useContext, useEffect, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';


const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const StethoscopeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4.8 2.3A.3.3 0 1 0 5.4 2.3.3.3 0 1 0 4.8 2.3M8 2v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4V2M8 22a6 6 0 0 0 6-6v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);
const UsersIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const RupeeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3c3 0 5-1.5 5-5" />
  </svg>
);

const STAT_CARDS = [
  { key: 'appointments', label: 'Total Appointments', icon: CalendarIcon },
  { key: 'doctors', label: 'Verified Doctors', icon: StethoscopeIcon },
  { key: 'patients', label: 'Registered Patients', icon: UsersIcon },
  { key: 'amount', label: 'Gross Revenue', icon: RupeeIcon, isCurrency: true },
];


const STATUS_STYLES = {
  Completed: { className: 'bg-green-50 text-green-700 border border-green-200', chart: '#15803d' },
  Pending: { className: 'bg-yellow-50 text-yellow-700 border border-yellow-200', chart: '#a16207' },
  Cancelled: { className: 'bg-red-50 text-red-600 border border-red-200', chart: '#dc2626' },
};

const getApptStatus = (appt) => (appt.cancelled ? 'Cancelled' : appt.isCompleted ? 'Completed' : 'Pending');

const StatusBadge = ({ appt }) => {
  const status = getApptStatus(appt);
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status].className}`}>
      {status}
    </span>
  );
};

const formatCurrency = (value = 0) => `₹${Number(value).toLocaleString('en-IN')}`;

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-white py-8 px-4 sm:px-8 space-y-8 animate-pulse">
    <div className="space-y-2">
      <div className="h-8 w-48 bg-black/5 rounded-md" />
      <div className="h-4 w-64 bg-black/5 rounded-md" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 bg-white border border-black/10 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-80 bg-white border border-black/10 rounded-xl" />
      <div className="h-80 bg-white border border-black/10 rounded-xl" />
    </div>
  </div>
);

const Dashboard = () => {
  const { adminToken, dashboardData, getDashboardData } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getDashboardData();
    }
  }, [adminToken]);


  const { statusData, timelineData } = useMemo(() => {
    if (!dashboardData?.newAppointments) return { statusData: [], timelineData: [] };

    let completed = 0, cancelled = 0, pending = 0;
    const dateCounts = {};

    dashboardData.newAppointments.forEach((appt) => {

      const status = getApptStatus(appt);
      if (status === 'Cancelled') cancelled++;
      else if (status === 'Completed') completed++;
      else pending++;

    
      const dateKey = appt.slot_date || 'Unknown';
      dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;
    });

    const timeline = Object.keys(dateCounts).map(date => ({
      date: date.split('_').join(' ') || date, 
      Appointments: dateCounts[date]
    })).reverse().slice(-7); 

    return {
      statusData: [
        { name: 'Completed', value: completed, color: STATUS_STYLES.Completed.chart },
        { name: 'Pending', value: pending, color: STATUS_STYLES.Pending.chart },
        { name: 'Cancelled', value: cancelled, color: STATUS_STYLES.Cancelled.chart }
      ],
      timelineData: timeline
    };
  }, [dashboardData]);

  if (!dashboardData) {
    return <DashboardSkeleton />;
  }

  const recentAppointments = dashboardData.newAppointments?.slice(0, 5) ?? [];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">


        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-black/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-1.5">Admin Dashboard</h1>
            <p className="text-black/45">Overview of appointments, doctors, and revenue</p>
          </div>
          <div className="flex items-center gap-2 border border-black/10 px-3.5 py-1.5 rounded-lg text-xs font-medium text-black/60 self-start md:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Live
          </div>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STAT_CARDS.map(({ key, label, icon: Icon, isCurrency }) => (
            <div key={key} className="bg-white border border-black/10 rounded-xl p-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-black/40 uppercase">{label}</span>
                <h3 className="text-2xl font-bold text-black">
                  {isCurrency ? formatCurrency(dashboardData[key]) : dashboardData[key] ?? 0}
                </h3>
              </div>
              <div className="w-11 h-11 rounded-lg border border-black/10 bg-black/[0.03] flex items-center justify-center shrink-0 text-black/70">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          
          <div className="bg-white border border-black/10 rounded-xl p-5 lg:col-span-2 flex flex-col justify-between">
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-black">Appointment Volume</h4>
              <p className="text-xs text-black/45">Bookings across the most recent active days</p>
            </div>
            <div className="w-full h-64 overflow-x-auto overflow-y-hidden">
              <div className="min-w-[450px] h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAppts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000000" stopOpacity={0.12}/>
                        <stop offset="95%" stopColor="#000000" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                    <XAxis dataKey="date" stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '10px', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="Appointments" stroke="#000000" strokeWidth={2} fillOpacity={1} fill="url(#colorAppts)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

     
          <div className="bg-white border border-black/10 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-black">Status Breakdown</h4>
              <p className="text-xs text-black/45">Grouped by appointment status</p>
            </div>

            <div className="h-44 relative flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} Bookings`, 'Total']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

          
            <div className="grid grid-cols-3 gap-1 border-t border-black/10 pt-3 text-center">
              {statusData.map((status) => (
                <div key={status.name} className="space-y-0.5">
                  <span className="text-[11px] font-medium text-black/40 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                    {status.name}
                  </span>
                  <p className="text-sm font-bold text-black">{status.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      
        <div className="border border-black/10 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-black/10 flex items-center justify-between">
            <h3 className="font-semibold text-black text-sm">Recent Appointments</h3>
            <span className="text-xs text-black/40">Last 5</span>
          </div>

          {recentAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarIcon className="w-8 h-8 text-black/20 mb-2" />
              <p className="text-black/45 text-xs font-medium">No appointments found</p>
            </div>
          ) : (
            <>
             
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Patient</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Doctor</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Date & Time</th>
                      <th className="px-5 py-3.5 text-right text-[11px] font-mono tracking-widest text-black/40 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {recentAppointments.map((appt, idx) => (
                      <tr key={appt._id || idx} className="hover:bg-black/[0.02] transition-colors">
                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-black">{appt.userData?.name || 'N/A'}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-black/70">{appt.docData?.name || 'N/A'}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm">
                          <span className="text-black">{appt.slot_date}</span>
                          <span className="mx-1.5 text-black/25">&middot;</span>
                          <span className="text-black/45">{appt.slotTime}</span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-right">
                          <StatusBadge appt={appt} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              
              <div className="md:hidden divide-y divide-black/5 text-xs">
                {recentAppointments.map((appt, idx) => (
                  <div key={appt._id || idx} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium text-black text-sm">{appt.userData?.name || 'N/A'}</p>
                        <p className="text-black/45">Doctor: <span className="text-black/70 font-medium">{appt.docData?.name || 'N/A'}</span></p>
                      </div>
                      <StatusBadge appt={appt} />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-black/45 font-medium bg-black/[0.02] p-2 rounded-lg border border-black/10">
                      <span>{appt.slot_date}</span>
                      <span>&middot;</span>
                      <span>{appt.slotTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;