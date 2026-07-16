import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext(null);

const DoctorContextProvider = (props) => {
  const backend_url = import.meta.env.VITE_LOCAL_BACKEND_URL || import.meta.env.VITE_BACKEND_URL;

  const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') || '');
  const [appointmentData, setAppointmentData] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [todayAppointment, setTodayAppointment] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);

  function sortByDate(data, order) {
    return [...data].sort((a, b) => {
      const [d1, m1, y1] = a.slot_date.split('-').map(Number);
      const [d2, m2, y2] = b.slot_date.split('-').map(Number);

      const dateA = new Date(y1, m1 - 1, d1);
      const dateB = new Date(y2, m2 - 1, d2);

      if (dateA.getTime() !== dateB.getTime()) {
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }

      const [h1, min1] = a.slotTime.split(':').map(Number);
      const [h2, min2] = b.slotTime.split(':').map(Number);

      const timeA = h1 * 60 + min1;
      const timeB = h2 * 60 + min2;

      return order === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }

  const getAllAppointment = async () => {
    try {
      const { data } = await axios.get(
        backend_url + '/api/doctor/get-appointments',
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      const sortedAppointments = sortByDate(data.appointments || [], 'desc');
      setAppointmentData(sortedAppointments);
    } catch (error) {
      console.log(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_url + '/api/doctor/cancel-appointment',
        { appointmentId },
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );

      if (data.success) {
        getAllAppointment();
        toast.success('Cancelled');
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Failed');
    }
  };

  function filterByDateAndTime(appointments) {
    const now = new Date();

    const parseDateAndTime = (given_date, given_time) => {
      const [day, month, year] = given_date.split('-').map(Number);
      let [time, meridian] = given_time.split(' ');
      let [hours, minutes] = time.split(':').map(Number);

      if (meridian === 'PM' && hours !== 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;

      return new Date(year, month - 1, day, hours, minutes);
    };

    return appointments.filter((app) => {
      if (!app.slot_date || !app.slotTime) return false;
      const appointmentDateTime = parseDateAndTime(app.slot_date, app.slotTime);
      return appointmentDateTime >= now;
    });
  }

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        backend_url + '/api/doctor/dashboard-fetch',
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );

      if (data.success) {
        const filteredData = filterByDateAndTime(data.dashboardData.latestAppointments || []);
        setDashboardData({
          ...data.dashboardData,
          latestAppointments: filteredData,
        });
      } else {
        console.log('Failed to load dashboard data');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backend_url + '/api/doctor/complete-appointment',
        { appointmentId },
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );

      if (data.success) {
        getAllAppointment();
        toast.success('Complete');
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Failed');
    }
  };

  // worthless function here ....

 const getDoctorProfile = async () => {
  if (!doctorToken) return;
  try {
    const { data } = await axios.get(
      backend_url + '/api/doctor/get-profile',
      { headers: { Authorization: `Bearer ${doctorToken}` } }
    );
    console.log(data.doctorData);

    if (data.success) {
      setDoctorProfile(data.doctorData || data.doctor || data.profile || {});
    } else {
      setDoctorProfile({});
    }
  } catch (error) {
    console.log(error.message);
    setDoctorProfile({});
  }
};

  const getCancelledAppointments = async () => {
    try {
      const { data } = await axios.get(
        backend_url + '/api/doctor/get-cancelled',
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );

      if (data.success) {
        const sortedAppointments = sortByDate(data.cancelledAppointments || [], 'asc');
        setCancelledAppointments(sortedAppointments);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

const getTodayAppointment = async () => {
  try {
    const { data } = await axios.get(
      backend_url + '/api/doctor/today-appointment',
      { headers: { Authorization: `Bearer ${doctorToken}` } }
    );

    if (data.success) {
      const sortedAppointments = sortByDate(data.appointments || [], 'asc');
      setTodayAppointment(sortedAppointments);
      console.log("Today appointments are:", data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

  useEffect(() => {
    if (doctorToken) {
      getDoctorProfile();
    }
  }, [doctorToken]);
 

  const value = {
    doctorToken,
    setDoctorToken,
    backend_url,
    getAllAppointment,
    appointmentData,
    setAppointmentData,
    cancelAppointment,
    completeAppointment,
    setDashboardData,
    getDashboardData,
    dashboardData,
    getDoctorProfile,
    doctorProfile,
    setDoctorProfile,
    cancelledAppointments,
    setCancelledAppointments,
    getCancelledAppointments,
    sortByDate,
    todayAppointment,
    setTodayAppointment,
    getTodayAppointment,
    filterByDateAndTime,
    loadingProfile,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;