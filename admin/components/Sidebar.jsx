import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../src/assets/assets.js';
import { DoctorContext } from '../context/DoctorContext.jsx';

const Sidebar = () => {
  const { adminToken } = useContext(AdminContext);
  const { doctorToken } = useContext(DoctorContext);
  
  return (
    <div className="h-screen bg-gradient-to-b from-emerald-500 to-teal-600 border-r border-white/20 shadow-xl fixed top-20 left-0 z-50 overflow-hidden
      max-w-3xs 
      transition-all duration-300 ease-in-out">
      <div className="h-full p-2 sm:p-4 lg:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-emerald-700/50">
        
        {/* Admin Sidebar */}
        {adminToken && (










          <ul className="space-y-2">
             






            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 sm:p-3 lg:p-3 rounded-lg text-white/90 font-medium transition-all duration-200 border-l-3 group ${
                  isActive 
                    ? 'bg-white/30 border-emerald-200 scale-105 shadow-md' 
                    : 'border-transparent hover:bg-white/20 hover:scale-105 hover:border-emerald-100'
                }`
              }
            >
              <img 
                src={assets.home_icon} 
                alt="Dashboard" 
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert transition-transform group-hover:scale-110 flex-shrink-0" 
              />
              <p className="group-hover:translate-x-1 transition-transform whitespace-nowrap hidden sm:hidden md:hidden lg:block">
                DASHBOARD
              </p>
            </NavLink>

            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 sm:p-3 lg:p-3 rounded-lg text-white/90 font-medium transition-all duration-200 border-l-3 group ${
                  isActive 
                    ? 'bg-white/30 border-emerald-200 scale-105 shadow-md' 
                    : 'border-transparent hover:bg-white/20 hover:scale-105 hover:border-emerald-100'
                }`
              }
            >
              <img 
                src={assets.appointment_icon} 
                alt="Appointments" 
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert transition-transform group-hover:scale-110 flex-shrink-0" 
              />
              <p className="group-hover:translate-x-1 transition-transform whitespace-nowrap hidden sm:hidden md:hidden lg:block">
                APPOINTMENTS
              </p>
            </NavLink>

            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 sm:p-3 lg:p-3 rounded-lg text-white/90 font-medium transition-all duration-200 border-l-3 group ${
                  isActive 
                    ? 'bg-white/30 border-emerald-200 scale-105 shadow-md' 
                    : 'border-transparent hover:bg-white/20 hover:scale-105 hover:border-emerald-100'
                }`
              }
            >
              <img 
                src={assets.add_icon} 
                alt="Add Doctor" 
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert transition-transform group-hover:scale-110 flex-shrink-0" 
              />
              <p className="group-hover:translate-x-1 transition-transform whitespace-nowrap hidden sm:hidden md:hidden lg:block">
                ADD DOCTOR
              </p>
            </NavLink>

            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 sm:p-3 lg:p-3 rounded-lg text-white/90 font-medium transition-all duration-200 border-l-3 group ${
                  isActive 
                    ? 'bg-white/30 border-emerald-200 scale-105 shadow-md' 
                    : 'border-transparent hover:bg-white/20 hover:scale-105 hover:border-emerald-100'
                }`
              }
            >
              <img 
                src={assets.people_icon} 
                alt="Doctors" 
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert transition-transform group-hover:scale-110 flex-shrink-0" 
              />
              <p className="group-hover:translate-x-1 transition-transform whitespace-nowrap hidden sm:hidden md:hidden lg:block">
                DOCTORS LIST
              </p>
            </NavLink>




            










          </ul>
        )}

        {/* Doctor Sidebar */}
        {doctorToken && (
          <div className="space-y-2 mt-4 lg:mt-0">




            
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 sm:p-3 lg:p-3 rounded-lg text-white/90 font-medium transition-all duration-200 border-l-3 group ${
                  isActive 
                    ? 'bg-white/30 border-emerald-200 scale-105 shadow-md' 
                    : 'border-transparent hover:bg-white/20 hover:scale-105 hover:border-emerald-100'
                }`
              }
            >
              <img 
                src={assets.home_icon} 
                alt="Dashboard" 
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert transition-transform group-hover:scale-110 flex-shrink-0" 
              />
              <p className="group-hover:translate-x-1 transition-transform whitespace-nowrap hidden sm:hidden md:hidden lg:block">
                DASHBOARD
              </p>
            </NavLink>

            <NavLink
              to="/doctor-appointment"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 sm:p-3 lg:p-3 rounded-lg text-white/90 font-medium transition-all duration-200 border-l-3 group ${
                  isActive 
                    ? 'bg-white/30 border-emerald-200 scale-105 shadow-md' 
                    : 'border-transparent hover:bg-white/20 hover:scale-105 hover:border-emerald-100'
                }`
              }
            >
              <img 
                src={assets.appointment_icon} 
                alt="Appointments" 
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert transition-transform group-hover:scale-110 flex-shrink-0" 
              />
              <p className="group-hover:translate-x-1 transition-transform whitespace-nowrap hidden sm:hidden md:hidden lg:block">
                APPOINTMENTS
              </p>
            </NavLink>

            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 sm:p-3 lg:p-3 rounded-lg text-white/90 font-medium transition-all duration-200 border-l-3 group ${
                  isActive 
                    ? 'bg-white/30 border-emerald-200 scale-105 shadow-md' 
                    : 'border-transparent hover:bg-white/20 hover:scale-105 hover:border-emerald-100'
                }`
              }
            >
              <img 
                src={assets.doctor_icon} 
                alt="Profile" 
                className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert transition-transform group-hover:scale-110 flex-shrink-0" 
              />
              <p className="group-hover:translate-x-1 transition-transform whitespace-nowrap hidden sm:hidden md:hidden lg:block">
                PROFILE
              </p>
            </NavLink>



            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 sm:p-3 lg:p-3 rounded-lg text-white/90 font-medium transition-all duration-200 border-l-3 group ${
                  isActive 
                    ? 'bg-white/30 border-emerald-200 scale-105 shadow-md' 
                    : 'border-transparent hover:bg-white/20 hover:scale-105 hover:border-emerald-100'
                }`
              }
            >
              <img 
                src={assets.cancel_icon} 
                alt="Dashboard" 
                className="w-5 h-5 sm:w-8 sm:h-8 brightness-0 invert transition-transform group-hover:scale-110 flex-shrink-0" 
              />
              <p className="group-hover:translate-x-1 transition-transform whitespace-nowrap hidden sm:hidden md:hidden lg:block">
                CANCELLED
              </p>
            </NavLink>




            <NavLink
              to="/today-appointment"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 sm:p-3 lg:p-3 rounded-lg text-white/90 font-medium transition-all duration-200 border-l-3 group ${
                  isActive 
                    ? 'bg-white/30 border-emerald-200 scale-105 shadow-md' 
                    : 'border-transparent hover:bg-white/20 hover:scale-105 hover:border-emerald-100'
                }`
              }
            >
              <img 
                src={assets.list_icon} 
                alt="Dashboard" 
                className="w-5 h-5 sm:w-8 sm:h-8 brightness-0 invert transition-transform group-hover:scale-110 flex-shrink-0" 
              />
              <p className="group-hover:translate-x-1 transition-transform whitespace-nowrap hidden sm:hidden md:hidden lg:block">
                TODAY
              </p>
            </NavLink>



            










          </div>
        )}
      </div>
    </div> 
  );
};

export default Sidebar;
