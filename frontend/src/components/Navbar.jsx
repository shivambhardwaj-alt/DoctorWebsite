import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const {
    userToken,
    setToken,
    currentUser,
    setCurrentUser,
    userData,
    setUserData,
  } = useContext(AppContext)

  // Safe image access
  const userImage = userData?.image

  const logOut = () => {
    setToken('')
    localStorage.removeItem('userToken')
    setCurrentUser({})
    setUserData({})
    navigate('/')
  }

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-emerald-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Enhanced */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
              <img src={assets.heart} alt="" className='w-5 '  />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                CareConnect
              </h1>
              <p className="text-xs text-emerald-600 font-medium tracking-wide">Healthcare Simplified</p>
            </div>
          </div>

          {/* Desktop Menu - Enhanced with Animations */}
          <ul className="hidden lg:flex items-center gap-2 font-medium">
            {[
              { path: '/', label: 'HOME' },
              { path: '/doctors', label: 'DOCTORS' },
              { path: '/about', label: 'ABOUT' },
              { path: '/contact', label: 'CONTACT' },
              { path: '/developer', label: 'DEVELOPER' }
            ].map(({ path, label }, index) => (
              <NavLink
                key={index}
                to={path}
                className={({ isActive }) => `
                  relative px-4 py-2 rounded-2xl font-semibold text-sm transition-all duration-300
                  group hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md
                  ${isActive ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : 'text-gray-700'}
                `}
              >
                <span>{label}</span>
                {path !== '/' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300 origin-center" />
                )}
              </NavLink>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {userToken ? (
              /* Enhanced Profile Dropdown */
              <div className="flex items-center cursor-pointer gap-2 group relative">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={userImage || assets.profile_pic}
                    alt="Profile"
                    className="rounded-2xl w-12 h-12 object-cover ring-2 ring-emerald-200/50 shadow-lg group-hover:ring-emerald-300/70 transition-all duration-300"
                  />
                  {/* Online Status */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full ring-2 ring-white shadow-md animate-pulse"></div>
                </div>

                {/* Dropdown Icon */}
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md group-hover:rotate-180 transition-all duration-300">
                  <img src={assets.dropdown_icon} alt="" className='w-2' />
                </div>

                {/* Enhanced Dropdown Menu */}
                <div className="absolute right-0 top-14 hidden group-hover:block bg-white/95 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-emerald-100/50 min-w-56 z-50 animate-in fade-in-slide-down duration-200">
                  <div className="py-2">
                    <p className="px-4 py-2 text-sm font-semibold text-emerald-700 border-b border-emerald-100 mb-2">
                      Welcome back!
                    </p>
                    <div className="space-y-1">
                      <button
                        onClick={() => navigate('/my-profile')}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all flex items-center gap-3 group/item"
                      >
                        <img src={assets.people} alt="" className='w-4' />
                        My Profile
                      </button>
                      <button
                        onClick={() => navigate('/my-appointments')}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all flex items-center gap-3 group/item"
                      >
                        <img src={assets.calendar} alt="" className='w-4' />
                        My Appointments
                      </button>
                      <button
                        onClick={logOut}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all flex items-center gap-3 group/item mt-1"
                      >
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Enhanced CTA Button */
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl hover:shadow-emerald-500/50 hover:scale-105 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hidden lg:block"
              >
                CREATE ACCOUNT
              </button>
            )}

            {/* Mobile Menu Icon - Enhanced */}
            <button
              onClick={() => setShowMenu(true)}
              className="lg:hidden p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:scale-110 transition-all duration-300 shadow-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- ENHANCED MOBILE MENU ---------------- */}
      <div
        className={`fixed inset-0 bg-gradient-to-b from-emerald-500/95 to-teal-500/95 backdrop-blur-2xl z-40 transform ${
          showMenu ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } transition-all duration-500 lg:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setShowMenu(false)}
            className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col items-center gap-8 text-lg font-semibold text-white px-6 mt-8">
          <NavLink 
            to="/" 
            onClick={() => setShowMenu(false)}
            className="py-3 px-6 rounded-2xl bg-white/20 backdrop-blur-xl hover:bg-white/30 hover:scale-105 transition-all duration-300 w-full text-center shadow-xl"
          >
            HOME
          </NavLink>

          <NavLink 
            to="/doctors" 
            onClick={() => setShowMenu(false)}
            className="py-3 px-6 rounded-2xl bg-white/20 backdrop-blur-xl hover:bg-white/30 hover:scale-105 transition-all duration-300 w-full text-center shadow-xl"
          >
            DOCTORS
          </NavLink>

          <NavLink 
            to="/about" 
            onClick={() => setShowMenu(false)}
            className="py-3 px-6 rounded-2xl bg-white/20 backdrop-blur-xl hover:bg-white/30 hover:scale-105 transition-all duration-300 w-full text-center shadow-xl"
          >
            ABOUT
          </NavLink>

          <NavLink 
            to="/contact" 
            onClick={() => setShowMenu(false)}
            className="py-3 px-6 rounded-2xl bg-white/20 backdrop-blur-xl hover:bg-white/30 hover:scale-105 transition-all duration-300 w-full text-center shadow-xl"
          >
            CONTACT
          </NavLink>

          {!userToken && (
            <button
              onClick={() => {
                navigate('/login')
                setShowMenu(false)
              }}
              className="bg-white text-emerald-600 px-12 py-4 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 mt-4"
            >
              CREATE ACCOUNT
            </button>
          )}

          {userToken && (
            <div className="w-full space-y-3 bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20">
              <button
                onClick={() => {
                  navigate('/my-profile')
                  setShowMenu(false)
                }}
                className="w-full py-3 px-6 text-left bg-white/30 backdrop-blur-xl rounded-2xl hover:bg-white/50 transition-all flex items-center gap-4 text-lg"
              >
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </button>

              <button
                onClick={() => {
                  navigate('/my-appointments')
                  setShowMenu(false)
                }}
                className="w-full py-3 px-6 text-left bg-white/30 backdrop-blur-xl rounded-2xl hover:bg-white/50 transition-all flex items-center gap-4 text-lg"
              >
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                My Appointments
              </button>

              <button
                onClick={logOut}
                className="w-full py-3 px-6 text-left bg-red-500/20 backdrop-blur-xl rounded-2xl hover:bg-red-500/30 text-red-200 hover:text-red-100 transition-all flex items-center gap-4 text-lg font-bold border border-red-400/30"
              >
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
