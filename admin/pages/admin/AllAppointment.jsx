import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useState } from 'react';
import { AppContext } from '../../context/AppContext';
import {toast} from 'react-toastify';
import axios from 'axios';
const AllAppointment = () => {
  const { adminToken, appointmentList, getAllAppointments ,backend_url,sortByDate} = useContext(AdminContext);

  const {calculateAge } = useContext(AppContext);
  console.log(appointmentList);

  // Fetch appointments on mount if token exists
  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
      
    }
  }, [adminToken]);



  const handleView = () => {

    // viewing the page  will give appointment who has with 
    toast.warn('Not Available')

  }

  const deleteAppointment = async(apppointmentId) => {

    try{
      // admin will cancel the appointment saving it as history 
      const {data} = await axios.post(backend_url +  '/api/admin/delete-appointment',{apppointmentId},{headers:{Authorization:`Bearer ${adminToken}`}});

      console.log(data);

      


      if(data.success){
        toast.success('Deleted Successfully');

        getAllAppointments();
        
      }else{
        toast.error(data.message);
      }

      


      




    }catch(error){

      toast.error('Failed')
      
    }

  }


 


  const len_boolean = appointmentList && appointmentList.length > 0;
  console.log(len_boolean);
  console.log(appointmentList)

  return (
    <div className=" min-h-screen  max-w-[1000px] bg-gradient-to-br from-slate-50 to-indigo-100 py-8 px-0 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Appointments</h1>
          <p className="text-gray-600">Manage and view all patient appointments</p>
        </div>

        {len_boolean ? (
          <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden ">
            {/* Table Container */}
            <div className="overflow-x-auto min-w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 w-full">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-2 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-2 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-2 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Fees
                    </th>
                    <th className="px-10 py-4 text-left  text-xs font-semibold text-white uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointmentList.map((appointment, index) => (
                    <tr key={appointment._id || index} className="hover:bg-indigo-50 transition-colors duration-200">
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{appointment._id?.slice(-6).toUpperCase() || `APT-${index + 1}`}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-1">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.userData.name || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                       <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-600">
                        {/* {calculateAge(appointment.userData.dob)} */}
                        </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div>
                          <div className="text-indigo-600 font-semibold">
                            {appointment.slot_date ? appointment.slot_date : 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.slotTime || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Dr. {appointment.docData.name || 'N/A'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        ${appointment.docData.fees || 0}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button onClick={() => handleView()} className='cursor-pointer bg-amber-400 hover:bg-amber-600 text-white px-3 py-1 rounded-lg text-white transition-all duration-200 transform hover:scale-105'>
                          View
                        </button>
                        <button onClick = {() => deleteAppointment(appointment._id)}className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs transition-all duration-200 transform hover:scale-105">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-1 bg-white rounded-2xl shadow-xl border border-dashed border-gray-300">
            <div className="mx-auto h-24 w-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
              <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first appointment</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              + Add Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointment;
