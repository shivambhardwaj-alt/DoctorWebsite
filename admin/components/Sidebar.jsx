import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../src/assets/assets.js';
import { DoctorContext } from '../context/DoctorContext.jsx';

const navLinkClass = ({ isActive }) =>
  `group relative flex items-center gap-3 px-3 lg:px-4 py-2.5 rounded-lg font-medium text-sm
   transition-all duration-200
   ${isActive
      ? 'bg-black text-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35)]'
      : 'text-black/60 hover:bg-black/5 hover:text-black'}`;

const NavItem = ({ to, icon, label }) => (
  <NavLink to={to} className={navLinkClass}>
    {({ isActive }) => (
      <>
        {/* active tick */}
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-full transition-all duration-200
            ${isActive ? 'bg-white' : 'bg-transparent'}`}
        />
        <img
          src={icon}
          alt=""
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110
            ${isActive ? 'brightness-0 invert' : 'opacity-60 grayscale'}`}
        />
        <span className="hidden lg:block whitespace-nowrap tracking-wide">
          {label}
        </span>

        {/* tooltip for collapsed (icon-only) rail on smaller screens */}
        <span
          className="lg:hidden pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 rounded-md
            bg-black text-white text-xs font-chart-mono whitespace-nowrap opacity-0
            group-hover:opacity-100 transition-opacity duration-150 z-50"
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);

const Sidebar = () => {
  const { adminToken } = useContext(AdminContext);
  const { doctorToken } = useContext(DoctorContext);

  return (
    <aside
      className="h-screen bg-white border-r border-black/10 fixed top-20 left-0 z-40
        w-16 lg:w-60 transition-all duration-300 ease-in-out
        shadow-[1px_0_0_rgba(0,0,0,0.04),8px_0_24px_-16px_rgba(0,0,0,0.15)]"
    >
      <div className="h-full flex flex-col px-2 lg:px-4 py-6 overflow-y-auto overflow-x-hidden
        scrollbar-thin scrollbar-thumb-black/15 scrollbar-track-transparent">

        {/* Admin Sidebar */}
        {adminToken && (
          <div className="space-y-1">
            <p className="hidden lg:block font-chart-mono text-[10px] tracking-[0.25em]
              text-black/40 uppercase px-4 mb-3">
              Admin
            </p>
            <ul className="space-y-1">
              <NavItem to="/admin-dashboard" icon={assets.home_icon} label="Dashboard" />
              <NavItem to="/all-appointments" icon={assets.appointment_icon} label="Appointments" />
              <NavItem to="/add-doctor" icon={assets.add_icon} label="Add Doctor" />
              <NavItem to="/doctor-list" icon={assets.people_icon} label="Doctors List" />
            </ul>
          </div>
        )}

        {/* Doctor Sidebar */}
        {doctorToken && (
          <div className="space-y-1">
            <p className="hidden lg:block font-chart-mono text-[10px] tracking-[0.25em]
              text-black/40 uppercase px-4 mb-3">
              Doctor
            </p>
            <ul className="space-y-1">
              <NavItem to="/doctor-dashboard" icon={assets.home_icon} label="Dashboard" />
              <NavItem to="/doctor-appointment" icon={assets.appointment_icon} label="Appointments" />
              <NavItem to="/doctor-profile" icon={assets.doctor_icon} label="Profile" />
              <NavItem to="/today-appointment" icon={assets.list_icon} label="Today" />
            </ul>

            <div className="my-3 border-t border-black/10" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;