import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MeetOurTeam = () => {
  const {doctorList} = useContext(AppContext);
  
  function setDoctorList(){
    if(doctorList.length > 2){
      return doctorList.slice(0,3);
    }else{
      return doctorList;
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-medium text-slate-800 text-center mt-30">Meet Our Team</h1>
      <p className="text-slate-500 text-center">The people behind the product, passionate about what they do.</p>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
        {setDoctorList().map((item,index) => (
          <div key={item._id} className="max-w-80 bg-black text-white rounded-2xl flex flex-col overflow-hidden">
            <div className="relative h-64 w-64 mx-auto -mt-px overflow-hidden rounded-2xl">
              <img 
                src={item.image} 
                alt={` ${item.name}`} 
                className="h-64 w-64 rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
              />
              <div className="absolute bottom-0 z-10 h-full w-full bg-gradient-to-t pointer-events-none from-black/90 to-transparent"></div>
            </div>
            <div className="px-4 pb-6 text-center flex-1 flex flex-col justify-end">
              <p className="mt-4 text-lg font-medium">Dr {item.name}</p>
              <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MeetOurTeam
