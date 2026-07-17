import React, { useContext, useEffect, useState } from 'react'
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

// Derives a payment badge {label, className} from the appointment state.
const getPaymentStatus = (appointment) => {
  if (appointment.cancelled) {
    return { label: 'Cancelled', className: 'bg-red-50 text-red-600 border border-red-200' }
  }
  if (appointment.payment) {
    return { label: 'Paid', className: 'bg-green-50 text-green-700 border border-green-200' }
  }
  return { label: 'Pending', className: 'bg-yellow-50 text-yellow-700 border border-yellow-200' }
}

const AllAppointment = () => {
  const { adminToken, appointmentList, getAllAppointments, backend_url } = useContext(AdminContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken]);

  const handleView = (appointment) => {
    setSelectedAppointment(appointment)
  }

  const closeModal = () => setSelectedAppointment(null)

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

  // Marks an appointment as paid. Backend should reject this for
  // cancelled appointments so the state stays consistent.
  const markAsPaid = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_url + '/api/admin/mark-payment-paid',
        { appointmentId },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (data.success) {
        toast.success('Marked as Paid');
        getAllAppointments();
        // Keep the modal's view of payment status in sync if it's open
        setSelectedAppointment((prev) =>
          prev && prev._id === appointmentId ? { ...prev, payment: true } : prev
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to update payment status')
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
                    <th className="px-5 py-3.5 text-left text-[11px] font-mono tracking-widest text-black/40 uppercase">Payment</th>
                    <th className="px-5 py-3.5 text-right text-[11px] font-mono tracking-widest text-black/40 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {appointmentList.map((appointment, index) => {
                    const status = getPaymentStatus(appointment)
                    const canMarkPaid = !appointment.cancelled && !appointment.payment

                    return (
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
                          {import.meta.env.VITE_CURRENCY === 'INR' ? "₹" : "$"}{appointment.docData?.fees || 0}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => canMarkPaid && markAsPaid(appointment._id)}
                            disabled={!canMarkPaid}
                            title={canMarkPaid ? 'Click to mark as paid' : undefined}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.className} ${canMarkPaid ? 'cursor-pointer hover:brightness-95' : 'cursor-default'}`}
                          >
                            {status.label}
                          </button>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-right text-sm space-x-2">
                          <button
                            onClick={() => handleView(appointment)}
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
                    )
                  })}
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

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={closeModal}
          onMarkPaid={markAsPaid}
        />
      )}
    </div>
  );
};

const AppointmentDetailsModal = ({ appointment, onClose, onMarkPaid }) => {
  const status = getPaymentStatus(appointment)
  const canMarkPaid = !appointment.cancelled && !appointment.payment
  const user = appointment.userData || {}
  const doc = appointment.docData || {}
  const currencySymbol = import.meta.env.VITE_CURRENCY === 'INR' ? "₹" : "$"

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-black/10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-black/10 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-black">Appointment Details</h2>
            <p className="text-black/45 text-sm">
              #{appointment._id?.slice(-6).toUpperCase() || 'N/A'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-black/40 hover:text-black text-xl leading-none px-2"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">

          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.className}`}>
              Payment: {status.label}
            </span>
            {canMarkPaid && (
              <button
                onClick={() => onMarkPaid(appointment._id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black text-white hover:bg-black/85 transition-colors"
              >
                Mark as Paid
              </button>
            )}
          </div>

          <section>
            <h3 className="text-[11px] font-mono tracking-widest text-black/40 uppercase mb-2">Patient</h3>
            <div className="flex gap-4 items-start">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name || 'Patient'}
                  className="w-16 h-16 rounded-full object-cover border border-black/10"
                />
              )}
              <div className="text-sm space-y-1">
                <p className="font-medium text-black">{user.name || 'N/A'}</p>
                <p className="text-black/55">{user.email || 'N/A'}</p>
                <p className="text-black/55">{user.phone || 'N/A'}</p>
                <p className="text-black/55">
                  {getAge(user.dob)} yrs &middot; {user.gender || 'Not Selected'}
                </p>
                <p className="text-black/55">
                  {[user.address?.line1, user.address?.line2].filter(Boolean).join(', ') || 'No address on file'}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-mono tracking-widest text-black/40 uppercase mb-2">Doctor</h3>
            <div className="flex gap-4 items-start">
              {doc.image && (
                <img
                  src={doc.image}
                  alt={doc.name || 'Doctor'}
                  className="w-16 h-16 rounded-full object-cover border border-black/10"
                />
              )}
              <div className="text-sm space-y-1">
                <p className="font-medium text-black">{doc.name || 'N/A'}</p>
                <p className="text-black/55">{doc.degree} &middot; {doc.speciality}</p>
                <p className="text-black/55">{doc.experience}</p>
                <p className="text-black/55">
                  {[doc.address?.line1, doc.address?.line2].filter(Boolean).join(', ') || 'No address on file'}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-mono tracking-widest text-black/40 uppercase mb-2">Appointment</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <p className="text-black/45">Date</p>
              <p className="text-black text-right">{appointment.slot_date || 'N/A'}</p>
              <p className="text-black/45">Time</p>
              <p className="text-black text-right">{appointment.slotTime || 'N/A'}</p>
              <p className="text-black/45">Fees</p>
              <p className="text-black text-right">{currencySymbol}{doc.fees || appointment.amount || 0}</p>
              <p className="text-black/45">Status</p>
              <p className="text-black text-right">
                {appointment.cancelled ? 'Cancelled' : appointment.isCompleted ? 'Completed' : 'Scheduled'}
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default AllAppointment;