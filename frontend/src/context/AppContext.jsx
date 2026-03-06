import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets ,doctors} from "../assets/assets.js";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const currency_symbol = "$";

  const [userToken, setToken] = useState(
    localStorage.getItem("userToken") || ""
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [doctorList, setDoctorList] = useState([]); 

  // ================= USER PROFILE =================
  const uploadUserProfileData = async () => {
    if (!userToken) return;

    try {
      const { data } = await axios.get(
        `${backend_url}/api/user/get-profile`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // console.log(data);

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ================= DOCTORS =================
  const fetchDoctors = async () => {
 

    try {
      const { data } = await axios.get(
        `${backend_url}/api/user/getDoctors`);

      if (data.success) {
        setDoctorList(data.availableDoctors || []);
      } else {
        toast.error("Doctors not found");
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= EFFECT =================
  useEffect(() => {
    
      fetchDoctors();
      uploadUserProfileData();
     
    
  }, [userToken]);





  // =============use Effect for the  profile =================


  useEffect(() => {
    if(userToken){
      uploadUserProfileData();
    }
  },[userToken])

  const value = {
    currency_symbol,
    userToken,
    setToken,
    backend_url,

    // doctors
    doctorList,
    fetchDoctors,
    doctors,

    // user
    currentUser,
    setCurrentUser,
    userData,
    setUserData,
    uploadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
