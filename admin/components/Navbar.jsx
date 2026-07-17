import React from 'react'
import { assets } from '../src/assets/assets.js'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext.jsx'

const Navbar = () => {
    const { adminToken, setAdminToken } = useContext(AdminContext);
    const { doctorToken, setDoctorToken } = useContext(DoctorContext);
    const navigate = useNavigate()

    const logout = () => {
        if (adminToken) {
            setAdminToken('')
            localStorage.removeItem('adminToken')
        } else {
            setDoctorToken('')
            localStorage.removeItem('doctorToken')
        }
    }

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-black/10 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-4">
                <div className="flex justify-between items-center h-20">


                    <div className="flex items-center space-x-4 p-1  bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl shadow-sm max-w-max">

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl shadow-md shadow-blue-100">
                                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    <circle cx="12" cy="13" r="1.5" fill="currentColor" />
                                    <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                                    <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                                </svg>
                            </div>


                            <h1 className="text-xl tracking-tight">
                                <span className="font-extrabold text-blue-600">Care</span>
                                <span className="font-semibold text-slate-700">Connect</span>
                            </h1>
                        </div>


                        <div className="hidden md:block h-8 w-[1px] bg-slate-200" />


                        <div className="hidden md:flex flex-col justify-center px-4">
                           
                            <p className="text-[10px] font-bold text-blue-500/80 tracking-wider uppercase mt-0.5">
                                {adminToken ? 'Admin Dashboard' : 'Doctor Portal'}
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center space-x-3">

                        <div className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider
                            bg-black/5 border border-black/10 text-black/70 transition-colors duration-200
                            hover:bg-black/10">
                            {adminToken ? 'Admin' : 'Doctor'}
                        </div>


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