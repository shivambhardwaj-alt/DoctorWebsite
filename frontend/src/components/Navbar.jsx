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

  const userImage = userData?.image

  const logOut = () => {
    setToken('')
    localStorage.removeItem('userToken')
    setCurrentUser({})
    setUserData({})
    navigate('/')
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/developer', label: 'Developer' },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-[#14213D]/10 sticky top-0 z-50 font-chart-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
        .font-chart-serif { font-family: 'Source Serif 4', Georgia, serif; }
        .font-chart-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-chart-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">

    
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#14213D] rounded-sm flex items-center justify-center flex-shrink-0">
              <img src={assets.heart} alt="" className="w-4 invert" />
            </div>
            <div>
              <h1 className="font-chart-serif text-xl font-semibold text-[#14213D] leading-none">CareConnect</h1>
              <p className="font-chart-mono text-[9px] tracking-[0.15em] text-[#0F6E56] uppercase mt-1">Healthcare, simplified</p>
            </div>
          </div>

      
          <ul className="hidden lg:flex items-center gap-1 font-chart-mono text-[11px] tracking-[0.1em] uppercase">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative px-4 py-2 font-medium transition-colors duration-150 border-b-2 -mb-px
                  ${isActive ? 'text-[#14213D] border-[#0F6E56]' : 'text-[#9A968C] border-transparent hover:text-[#14213D]'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {userToken ? (
              <div className="flex items-center cursor-pointer gap-2 group relative">
                <img
                  src={userImage || assets.profile_pic}
                  alt="Profile"
                  className="rounded-sm w-9 h-9 object-cover border border-[#14213D]/15"
                />
                <svg className="w-3 h-3 text-[#9A968C] group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

             
                <div className="absolute right-0 top-12 hidden group-hover:block bg-white p-1.5 rounded-md border border-[#14213D]/10 shadow-[0_10px_30px_-8px_rgba(20,33,61,0.20)] min-w-52 z-50">
                  <p className="font-chart-mono text-[9px] tracking-[0.15em] text-[#9A968C] uppercase px-3 pt-2 pb-2 border-b border-[#14213D]/8 mb-1">
                    Signed in
                  </p>
                  <button
                    onClick={() => navigate('/my-profile')}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#14213D] hover:bg-[#FAFAF7] rounded-sm transition-colors flex items-center gap-3"
                  >
                    <img src={assets.people} alt="" className="w-4" />
                    My profile
                  </button>
                  <button
                    onClick={() => navigate('/my-appointments')}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-[#14213D] hover:bg-[#FAFAF7] rounded-sm transition-colors flex items-center gap-3"
                  >
                    <img src={assets.calendar} alt="" className="w-4" />
                    My appointments
                  </button>
                  <button
                    onClick={logOut}
                    className="w-full text-left px-3 py-2.5 text-sm font-semibold text-[#C1493A] hover:bg-[#C1493A]/6 rounded-sm transition-colors flex items-center gap-3 mt-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-[#14213D] text-white px-6 py-2.5 rounded-sm font-semibold text-xs tracking-wide uppercase hover:bg-[#0F6E56] transition-colors duration-200 hidden lg:block"
              >
                Create account
              </button>
            )}

          
            <button
              onClick={() => setShowMenu(true)}
              className="lg:hidden p-2 rounded-sm border border-[#14213D]/12 text-[#14213D] hover:bg-[#FAFAF7] transition-colors duration-150"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 w-screen h-screen bg-white z-[9999] transform ${
          showMenu
            ? 'translate-x-0 visible pointer-events-auto'
            : 'translate-x-full invisible pointer-events-none'
        } transition-transform duration-300 ease-in-out lg:hidden font-chart-sans overflow-y-auto`}
        aria-hidden={!showMenu}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#14213D]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#14213D] rounded-sm flex items-center justify-center">
              <img src={assets.heart} alt="" className="w-3.5 invert" />
            </div>
            <h1 className="font-chart-serif text-lg font-semibold text-[#14213D]">CareConnect</h1>
          </div>
          <button
            onClick={() => setShowMenu(false)}
            className="w-9 h-9 rounded-sm border border-[#14213D]/12 flex items-center justify-center text-[#14213D] hover:bg-[#FAFAF7] transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col px-5 py-4">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `py-3.5 px-3 border-b border-[#14213D]/8 text-base font-medium transition-colors
                ${isActive ? 'text-[#14213D]' : 'text-[#6B6458]'}`
              }
              style={({ isActive }) => ({ borderLeft: isActive ? '3px solid #0F6E56' : '3px solid transparent' })}
            >
              {label}
            </NavLink>
          ))}

          {!userToken && (
            <button
              onClick={() => {
                navigate('/login')
                setShowMenu(false)
              }}
              className="mt-6 w-full py-3.5 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200"
            >
              Create account
            </button>
          )}

          {userToken && (
            <div className="mt-6 space-y-1">
              <p className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase px-3 mb-2">Account</p>
              <button
                onClick={() => { navigate('/my-profile'); setShowMenu(false) }}
                className="w-full py-3 px-3 text-left rounded-sm hover:bg-[#FAFAF7] transition-colors flex items-center gap-3 text-sm font-medium text-[#14213D]"
              >
                <img src={assets.people} alt="" className="w-4" />
                My profile
              </button>
              <button
                onClick={() => { navigate('/my-appointments'); setShowMenu(false) }}
                className="w-full py-3 px-3 text-left rounded-sm hover:bg-[#FAFAF7] transition-colors flex items-center gap-3 text-sm font-medium text-[#14213D]"
              >
                <img src={assets.calendar} alt="" className="w-4" />
                My appointments
              </button>
              <button
                onClick={logOut}
                className="w-full py-3 px-3 text-left rounded-sm hover:bg-[#C1493A]/6 transition-colors flex items-center gap-3 text-sm font-semibold text-[#C1493A]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar