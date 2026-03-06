import React, { useCallback, useContext } from 'react'
import { doctors } from '../assets/assets'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'





const TopDoctors = () => {
  const {fetchDoctors,doctorList} = useContext(AppContext);

  
let isAvailableDoctors = doctorList.length > 0 ;

const navigate=  useNavigate();



  return(isAvailableDoctors ? (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-emerald-800">
            Top Doctors to Book
          </h2>
          <div className="w-20 h-1 mx-auto bg-emerald-500 rounded-full" />
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our list of trusted and verified doctors
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="flex md:flex-row flex-col gap-6 lg:gap-8 mb-10  mx-auto items-center justify-center">
          {doctorList.slice(0,4).map((item, index) => (
            <Link
              key={index}
              to={`/appointment/${item._id}`}
               onClick={() => window.scrollTo(0, 0)}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col max-w-sm w-full cursor-pointer overflow-hidden h-96"
            >
              {/* Doctor Image */}
              <div className="w-full h-52 overflow-hidden rounded-t-2xl bg-gray-50">
                <img
                  src={item.image}
                  alt={`Dr. ${item.name}`}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Doctor Info */}
              <div className="p-5 flex flex-col flex-1">
                {/* Availability */}
                <span className="text-xs text-emerald-600 font-semibold mb-1">
                  Available
                </span>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800">
                  Dr. {item.name}
                </h3>

                {/* Speciality */}
                <p className="text-sm text-gray-600 mb-4">
                  {item.speciality}
                </p>

                {/* Book Button */}
                <button className="mt-auto  cursor-pointer w-full py-2.5 text-sm font-medium text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors">
                  Book Appointment
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button onClick={() => {navigate('/doctors'); window.scrollTo(0,0)}} className=" cursor-pointer px-10 py-3 text-sm font-semibold text-white bg-emerald-500 rounded-2xl hover:bg-emerald-600 transition">
            Load More Doctors
          </button>
        </div>

      </div>
    </section> 
  ):<div className=' flex items-center justify-center mt-10 p-2 mb-20'>
     <div className="text-center mb-16 space-y-4   w-full bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-3xl lg:text-4xl font-bold text-emerald-800">
            Top Doctors to Book
          </h2>
          <div className="w-20 h-1 mx-auto bg-emerald-500 rounded-full" />
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our list of trusted and verified doctors
          </p>


          <p className='text-2xl  text-emerald-500 font-bold'> No Doctors Available </p>
        </div>


  </div>)
}

export default TopDoctors
