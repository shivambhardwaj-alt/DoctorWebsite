import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

import Login2 from '../pages/Login2'

// Admin Pages
import Dashboard from '../pages/admin/Dashboard'
import AllAppointment from '../pages/admin/AllAppointment'
import AddDoctor from '../pages/admin/AddDoctor'
import DoctorsList from '../pages/admin/DoctorsList'

// Doctor Pages
import DoctorProfile from '../pages/doctor/DoctorProfile'
import DoctorAppointment from '../pages/doctor/DoctorAppointment'
import DoctorDashboard from '../pages/doctor/DoctorDashboard'
import AdminHome from '../pages/admin/AdminHome'
import DoctorHome from '../pages/doctor/DoctorHome'

import DoctorToday from '../pages/doctor/DoctorToday'

const App = () => {

  const { adminToken } = useContext(AdminContext)

  const { doctorToken } = useContext(DoctorContext)

  
  if (!adminToken && !doctorToken) {
    return (
      <>
        <Login2 />
        <ToastContainer theme="dark" autoClose={3000} />
      </>
    )
  }

  return (
    <>
      <ToastContainer theme="dark" autoClose={3000} />

      {/* Navbar */}
      <Navbar />

      {/* Layout */}
      <div className="flex">

        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-11 bg-slate-900">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="ml-18 lg:ml-[230px] mt-16 w-full p-6 bg-slate-100 min-h-screen">
          <Routes>

            {/* ================= ADMIN ROUTES ================= */}
            {adminToken && (
              <>
             
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointment />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />

              </>
            )}

            {/* ================= DOCTOR ROUTES ================= */}
            {doctorToken && (
              <>

                <Route path = '/doctor' element  = {<DoctorHome />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-appointment" element={<DoctorAppointment />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route path = '/today-appointment' element = {<DoctorToday />} />
              </>
            )}

          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
