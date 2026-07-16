import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify';
import axios from 'axios';

// Safely computes age from a dob string. Returns 'N/A' for anything
// missing, malformed, or that would otherwise produce NaN.
const getAge = (dob) => {
  if (!dob) return 'N/A'

  const birthDate = new Date(dob)
  if (isNaN(birthDate.getTime())) return 'N/A'

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age >= 0 ? age : 'N/A'
}

const AllAppointment = () => {
  const { adminToken, appointmentList, getAllAppointments, backend_url } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken]);

  const handleView = () => {
    toast.warn('Not Available')
  }

  const deleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_url + '/api/admin/delete-appointment',
        { appointmentId },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (data.success) {
        toast.success('Deleted Successfully');
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed')
    }
  }

  const hasAppointments = appointmentList && appointmentList.length > 0;

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-1.5">All Appointments</h1>
          <p className="text-black/45">
            {hasAppointments ? `${appointmentList.length} appointment${appointmentList.length !== 1 ? 's' : ''}` : 'Manage and view all patient appointments'}
          </p>
        </div>

        {hasAppointments ? (
          <div className="border border-black/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Id</th>
                    <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Patient</th>
                    <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Age</th>
                    <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Date & Time</th>
                    <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Doctor</th>
                    <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Fees</th>
                    <th className="px-5 py-3.5 text-right text-[11px] font-mono tracking-widest text-black/40 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {appointmentList.map((appointment, index) => (
                    <tr key={appointment._id || index} className="hover:bg-black/[0.02] transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-black/70">
                        #{appointment._id?.slice(-6).toUpperCase() || `APT-${index + 1}`}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {appointment.userData?.name || 'N/A'}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-black/55">
                        {getAge(appointment.userData?.dob)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm">
                        <div className="text-black font-medium">{appointment.slot_date || 'N/A'}</div>
                        <div className="text-black/45">{appointment.slotTime || 'N/A'}</div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {appointment.docData?.name || 'N/A'}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-black">
                        ${appointment.docData?.fees || 0}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right text-sm space-x-2">
                        <button
                          onClick={handleView}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-black/15 text-black/70 hover:bg-black/5 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteAppointment(appointment._id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black text-white hover:bg-black/85 transition-colors"
                        >
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
          <div className="text-center py-20 border border-dashed border-black/15 rounded-xl">
            <h3 className="text-lg font-semibold text-black mb-1.5">No appointments found</h3>
            <p className="text-black/45 mb-6">Appointments will appear here once patients start booking</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointment;