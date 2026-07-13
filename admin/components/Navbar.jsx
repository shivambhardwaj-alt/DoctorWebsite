import React from 'react'
import { assets } from '../src/assets/assets.js'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext.jsx'

const Navbar = () => {
    const { adminToken, setToken } = useContext(AdminContext);
    const { doctorToken, setDoctorToken } = useContext(DoctorContext);
    const navigate = useNavigate()

    const logout = () => {
        if (adminToken) {
            setToken('')
            localStorage.removeItem('adminToken')
        } else {
            setDoctorToken('')
            localStorage.removeItem('doctorToken')
        }
    }

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-black/10 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo & Brand */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <img
                                src={assets.admin_logo}
                                alt="Doctors Portal Admin"
                                className="h-11 w-11 rounded-xl border border-black/10 hover:scale-105 transition-transform duration-200 cursor-pointer p-1.5"
                            />
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-black rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                                A
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col">
                            <h1 className="text-xl font-bold text-black tracking-tight">
                                Doctors Portal
                            </h1>
                            <p className="text-[11px] font-semibold text-black/50 tracking-[0.15em] uppercase">
                                {adminToken ? 'Admin Dashboard' : 'Doctor Portal'}
                            </p>
                        </div>
                    </div>

                    {/* User Status & Logout */}
                    <div className="flex items-center space-x-3">
                        {/* User Status Badge */}
                        <div className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider
                            bg-black/5 border border-black/10 text-black/70 transition-colors duration-200
                            hover:bg-black/10">
                            {adminToken ? 'Admin' : 'Doctor'}
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-black/85
                                rounded-xl font-semibold text-white text-xs uppercase tracking-wider
                                transition-all duration-200 active:scale-95
                                focus:outline-none focus:ring-2 focus:ring-black/30 focus:ring-offset-2
                                cursor-pointer"
                        >
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar