import { createContext } from "react";
import { useState } from "react";


export const AppContext = createContext(null);


const AppContextProvider  =(props) =>{







    const calculateAge = (dob)=>  {
      if (!dob) return null;
    
      const birthDate = new Date(dob);
      const today = new Date();
    
      const[showDiv , setShowDiv] = useState(false);
      let age = today.getFullYear() - birthDate.getFullYear();
    
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
    
      
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }


   
    
      return age;
    }
    const value = {

        calculateAge

    }

    return (
    <AppContext.Provider value = {value}>
        {props.children}
    </AppContext.Provider>


    )
}


export default AppContextProvider;