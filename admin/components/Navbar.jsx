import React from 'react'
import { assets } from '../src/assets/assets.js'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext.jsx'

const Navbar = () => {
    const { adminToken, setToken } = useContext(AdminContext);
    const {doctorToken ,setDoctorToken} = useContext(DoctorContext);
    const navigate = useNavigate()
    
    const logout = () => {
     
        if (adminToken) {
            setToken('')
            localStorage.removeItem('adminToken') 
        }
        else{

           
            setDoctorToken('')
            localStorage.removeItem('doctorToken');
        }
        



        
    }

    return (

        <div>
        <nav className=" fixed top-0 left-0 right-0 bg-gradient-to-r from-emerald-900 via-teal-900 to-blue-900 backdrop-blur-xl shadow-2xl border-b border-white/10 z-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo & Brand */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <img 
                                src={assets.admin_logo} 
                                alt="Doctors Portal Admin" 
                                className="h-12 w-12 rounded-2xl shadow-xl border-4 border-white/20 hover:scale-110 transition-all duration-300 cursor-pointer bg-gradient-to-br from-emerald-500/20 to-blue-500/20 p-2"
                            />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center text-xs font-bold text-white animate-pulse">
                                A
                            </div>
                        </div>
                        
                        <div className="hidden md:flex flex-col">
                            <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent tracking-tight">
                                Doctors Portal
                            </h1>
                            <p className="text-sm font-semibold text-emerald-200 tracking-wide uppercase">
                                {adminToken ? 'Admin Dashboard' : 'Doctor Portal'}
                            </p>
                        </div>
                    </div>

                    {/* User Status & Logout */}
                    <div className="flex items-center space-x-4">
                        {/* User Status Badge */}
                        <div className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                            adminToken 
                                ? 'bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-100 shadow-lg shadow-emerald-500/25 hover:bg-emerald-500/30' 
                                : 'bg-blue-500/20 border-2 border-blue-500/50 text-blue-100 shadow-lg shadow-blue-500/25 hover:bg-blue-500/30'
                        }`}>
                            {adminToken ? ' Admin' : ' Doctor'}
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            className="group relative flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl font-semibold text-white text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20 hover:border-white/50 backdrop-blur-sm active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 cursor-pointer"
                        >
                            
                            <span>Logout</span>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-1 -my-1 blur-sm scale-105" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Glow Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 opacity-75 blur-sm" />
        </nav>

        </div>
    )
}

export default Navbar
