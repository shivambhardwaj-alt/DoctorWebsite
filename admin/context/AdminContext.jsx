import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {

 
  const [adminToken, setAdminToken] = useState(() => {
  return localStorage.getItem('adminToken') ?? '';
});




  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [appointmentList,setAppointmentsList] = useState([]);
  const [dashboardData,setDashboardData] = useState({});


  const backend_url = import.meta.env.VITE_LOCAL_BACKEND_URL || import.meta.env.VITE_BACKEND_URL;






  
  const changeAvailable = async (doc_id) => {
   
  try {
    const { data } = await axios.post(
      `${backend_url}/api/admin/change-availability`,
      {docId: doc_id },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);

     
      setDoctorList((prev) =>
        prev.map((doc) =>
          doc._id === doc_id
            ? { ...doc, available: !doc.available }
            : doc
        )
      );
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to update availability");
  }
};



  // ========= Fetch Doctors =========
  
    // if (!token) {
    //   console.warn(" Token missing. Skipping API call.");
    //   return;
    // }

    // if (!backend_url) {
    //   console.error(" Backend URL is undefined. Check .env file.");
    //   return;
    // }




    // ======================= function to get Admin Dashboard Data  =============================



    const getDashboardData = async() => {

      try{

        const {data} = await axios.get(backend_url + '/api/admin/get-dashboard-data',{headers:{Authorization: `Bearer ${adminToken}`}});
          
        if(data.success){
          setDashboardData(data.dashboard)
        }

      }catch(error){
        console.log(error.message);
      }

    }

    







    const fetchDoctors = async () => {
      try {
        setLoading(true);
        

        const response = await axios.get(
          `${backend_url}/api/admin/all-doctors`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
              "Content-Type": "application/json",
            },
            timeout: 15000,
          }
        );

        

        const { data } = response;
        



        if (data.sucess) {
          console.log(" DOCTORS DATA:", data.doctors);
          setDoctorList(data.doctors);
        } else {
          console.error(" API :", data?.message);
        }

      } catch (error) {
        console.error(" FETCH FAILED:");

        if (error.response) {
          console.error("STATUS:", error.response.status);
          console.error("DATA:", error.response.data);
        } else if (error.request) {
          console.error("NO RESPONSE FROM SERVER");
        } else {
          console.error("ERROR:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };


    // ================= Getting allthe appointments  = ===========================


    const getAllAppointments = async() => {
      try{

        const {data} =  await axios.get(backend_url + '/api/admin/get-all-appointments',{headers: {Authorization : `Bearer ${adminToken}`}});

        if(data.success){
        setAppointmentsList(data.appointments)

        }else{
          toast.error('Not Worked')
        }

      }catch(error){
        return console.log(error.message);

      }
    }




    // =================use Effect for the getAllAppointments ========================


    
    






  // ===== Context Value =====
  const value = {
    adminToken,
    setAdminToken,
    backend_url,
    doctorList,
    loading,
    changeAvailable,
    fetchDoctors,

    getAllAppointments,
    setAppointmentsList,
    appointmentList,
    getDashboardData,
    dashboardData,
    setDashboardData,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
