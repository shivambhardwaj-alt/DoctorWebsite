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

// --- Minimalist Icon Set ---
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
  { key: 'appointments', label: 'Total Appointments', icon: CalendarIcon, tint: 'bg-blue-50 text-blue-600 border-blue-100' },
  { key: 'doctors', label: 'Verified Doctors', icon: StethoscopeIcon, tint: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { key: 'patients', label: 'Registered Patients', icon: UsersIcon, tint: 'bg-purple-50 text-purple-600 border-purple-100' },
  { key: 'amount', label: 'Gross Revenue', icon: RupeeIcon, tint: 'bg-amber-50 text-amber-600 border-amber-100', isCurrency: true },
];

const StatusBadge = ({ appt }) => {
  const status = appt.cancelled ? 'Cancelled' : appt.isCompleted ? 'Completed' : 'Pending';
  const styles = {
    Cancelled: 'bg-rose-50 text-rose-700 border-rose-100',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Pending: 'bg-amber-50 text-amber-800 border-amber-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

const formatCurrency = (value = 0) => `₹${Number(value).toLocaleString('en-IN')}`;

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8 space-y-8 animate-pulse">
    <div className="space-y-2">
      <div className="h-8 w-48 bg-slate-200 rounded-md" />
      <div className="h-4 w-64 bg-slate-200 rounded-md" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 bg-white border border-slate-100 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-80 bg-white border border-slate-100 rounded-xl" />
      <div className="h-80 bg-white border border-slate-100 rounded-xl" />
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

  // Transform data dynamically for charts based on context response
  const { statusData, timelineData } = useMemo(() => {
    if (!dashboardData?.newAppointments) return { statusData: [], timelineData: [] };

    let completed = 0, cancelled = 0, pending = 0;
    const dateCounts = {};

    dashboardData.newAppointments.forEach((appt) => {
      // 1. Calculate Status Aggregations
      if (appt.cancelled) cancelled++;
      else if (appt.isCompleted) completed++;
      else pending++;

      // 2. Format Timeline Matrix (Grouping Volume by Date)
      const dateKey = appt.slot_date || 'Unknown';
      dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;
    });

    const timeline = Object.keys(dateCounts).map(date => ({
      date: date.split('_').join(' ') || date, // Sanitizes date formats if separated by underscores
      Appointments: dateCounts[date]
    })).reverse().slice(-7); // Keep recent 7 active structural days

    return {
      statusData: [
        { name: 'Completed', value: completed, color: '#10b981' },
        { name: 'Pending', value: pending, color: '#f59e0b' },
        { name: 'Cancelled', value: cancelled, color: '#f43f5e' }
      ],
      timelineData: timeline
    };
  }, [dashboardData]);

  if (!dashboardData) {
    return <DashboardSkeleton />;
  }

  const recentAppointments = dashboardData.newAppointments?.slice(0, 5) ?? [];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">System Administration Overview</h1>
            <p className="text-slate-500 text-sm mt-0.5">Real-time control matrix for clinic metadata and scheduling metrics.</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold text-slate-600 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync Operational
          </div>
        </div>

        {/* 4-Column Core Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STAT_CARDS.map(({ key, label, icon: Icon, tint, isCurrency }) => (
            <div key={key} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{label}</span>
                <h3 className="text-2xl font-black text-slate-950">
                  {isCurrency ? formatCurrency(dashboardData[key]) : dashboardData[key] ?? 0}
                </h3>
              </div>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${tint}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Recharts Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Booking Vector Area Chart */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm lg:col-span-2 flex flex-col justify-between">
            <div className="mb-4">
              <h4 className="text-sm font-bold text-slate-900">Appointment Velocity Trend</h4>
              <p className="text-xs text-slate-400">Total volume changes captured across active scheduling slots</p>
            </div>
            <div className="w-full h-64 overflow-x-auto overflow-y-hidden">
              <div className="min-w-[450px] h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAppts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="Appointments" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAppts)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Allocation Breakout Donut Chart */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Allocation Status Breakdown</h4>
              <p className="text-xs text-slate-400">Percentage metrics grouped by status</p>
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

            {/* Custom Interactive Legend Elements */}
            <div className="grid grid-cols-3 gap-1 border-t border-slate-100 pt-3 text-center">
              {statusData.map((status) => (
                <div key={status.name} className="space-y-0.5">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                    {status.name}
                  </span>
                  <p className="text-sm font-bold text-slate-800">{status.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Unified Table Module */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Recent Activity Matrix</h3>
            <span className="text-xs font-semibold text-slate-400">Showing last 5 updates</span>
          </div>

          {recentAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarIcon className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-slate-500 text-xs font-semibold">No appointments found</p>
            </div>
          ) : (
            <>
              {/* Desktop Roster Layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="py-3 px-5">Patient Name</th>
                      <th className="py-3 px-5">Assigned Practitioner</th>
                      <th className="py-3 px-5">Slot Windows</th>
                      <th className="py-3 px-5 text-right">Processing Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {recentAppointments.map((appt, idx) => (
                      <tr key={appt._id || idx} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-3.5 px-5 text-slate-950 font-bold">{appt.userData?.name || 'N/A'}</td>
                        <td className="py-3.5 px-5 text-slate-600">{appt.docData?.name || 'N/A'}</td>
                        <td className="py-3.5 px-5 text-slate-500">
                          <span>{appt.slot_date}</span>
                          <span className="mx-1.5 text-slate-300">•</span>
                          <span className="font-mono text-slate-400">{appt.slotTime}</span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <StatusBadge appt={appt} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="md:hidden divide-y divide-slate-100 text-xs">
                {recentAppointments.map((appt, idx) => (
                  <div key={appt._id || idx} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-950 text-sm">{appt.userData?.name || 'N/A'}</p>
                        <p className="text-slate-400">Doctor: <span className="text-slate-600 font-semibold">{appt.docData?.name || 'N/A'}</span></p>
                      </div>
                      <StatusBadge appt={appt} />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span>{appt.slot_date}</span>
                      <span>•</span>
                      <span className="font-mono">{appt.slotTime}</span>
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