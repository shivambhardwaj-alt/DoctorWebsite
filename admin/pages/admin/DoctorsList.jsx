import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const {adminToken, doctorList, changeAvailable,fetchDoctors } = useContext(AdminContext);


  useEffect(() => {

    if(adminToken){
      fetchDoctors();
    }
  },[])

  console.log(doctorList);
  
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold  mb-2 text-emerald-700">All Doctors</h1>
          <p className=" text-lg text-emerald-700">Manage doctor availability</p>
        </div>
        <div className="text-sm text-emerald-600 font-semibold bg-emerald-100 px-4 py-2 rounded-xl self-end">
          {doctorList?.length || 0} Doctors
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctorList?.map((item, index) => (
          <div 
            key={index}
            className="group bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-emerald-200"
          >
            {/* Doctor Image */}
            <div className="w-24 min-h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-300">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                Dr. {item.name}
              </h3>
              <p className="text-emerald-600 font-semibold bg-emerald-100 px-3 py-1 rounded-full text-sm inline-block">
                {item.speciality}
              </p>
            </div>

            {/* Availability Toggle - Full Width & Prominent */}
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-100 shadow-lg">
              <div className="flex flex-col items-center gap-2">
                <p className={`font-bold text-lg transition-colors ${
                  item.available 
                    ? 'text-emerald-700' 
                    : 'text-gray-500'
                }`}>
                  {item.available ? 'Available' : 'Not Available'}
                </p>
                
                <div className="flex flex-col  items-center justify-center gap-2 p-3 bg-white/80 rounded-xl border-2 border-emerald-200 w-full">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={item.available}
                      onChange={() => changeAvailable(item._id)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                  <span className={`font-semibold transition-colors text-xl ${
                    item.available ? 'text-emerald-700' : 'text-gray-500'
                  }`}>
                    Toggle 



                  </span>


                  <span className= {`text-lg font-semibold transition-colors ${item.available ? 'text-emerald-700' : 'text-gray-500'}`}>Availability</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!doctorList?.length && (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Doctors Found</h3>
          <p className="text-gray-500 mb-6">Add your first doctor to get started</p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Add Doctor
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
