import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { doctorProfile, doctorToken, getDoctorProfile,backend_url } = useContext(DoctorContext);

  const [name,setName] = useState('');
  const[email,setEmail] = useState('');
  const [address,setAddress] = useState('');
  const [speciality,setSpeciality] = useState('');
  const [experience,setExperience] = useState('');
  const[about,setAbout] = useState('');

  useEffect(() => {
    getDoctorProfile()
  }, [doctorToken])

  useEffect(() => {
  if (doctorProfile) {
    setName(doctorProfile.name);
    setEmail(doctorProfile.email);
    setAddress(doctorProfile.address);
    setSpeciality(doctorProfile.speciality);
    setExperience(doctorProfile.experience);
    setAbout(doctorProfile.about);
  }
}, [doctorProfile]);

  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  
  const changeProfile = async() => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      // formData.append('address', address);
      formData.append('speciality', speciality);
      formData.append('experience', experience);
      formData.append('about', about);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const {data} =await axios.post(`${backend_url}/api/doctor/change-profile`,formData,{headers: {Authorization : `Bearer ${doctorToken}`}});
      console.log(data);

      if(data.success){
      toast.success('Profile updated successfully!');
      getDoctorProfile();
      setIsEdit(false);
      setPreview(null);

      }else{
        toast.error('Failed to Upload')
      }
    } catch(error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  
  const handleClick = () => {
    if (isEdit) {
      
      changeProfile();
    } else {
     
      setIsEdit(true);
    }
  };

  if (!doctorProfile) {
    return <div className="flex items-center justify-center min-h-screen bg-emerald-50">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Image & Basic Info */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg relative">
              <img 
                src={preview || doctorProfile.image} 
                alt={doctorProfile.name}
                className="w-full h-full object-cover"
              />
            </div>

            {isEdit && (
              <>
                <input
                  id="doctor-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="doctor-image"
                  className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white font-semibold cursor-pointer rounded-full opacity-0 hover:opacity-100 transition-all duration-300 gap-1 z-10"
                >
                  <span className="text-sm">Change Photo</span>
                </label>
              </>
            )}
          </div>
          <div className='flex flex-col items-center justify-between'>

            {isEdit ?  
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 bg-transparent border-none outline-none text-center"
              /> :  
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                {doctorProfile.name}
              </h2>
            }
            
            {isEdit ? 
              <input 
                type='text' 
                onChange={(e) => {setSpeciality(e.target.value)}}
                value={speciality} 
                className='text-center inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-lg font-medium outline-0' 
              /> : 
              <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-lg font-medium">
                {doctorProfile.speciality}
              </span>
            }
          </div>
        </div>

        {/* Rest of your component remains exactly the same */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center border-b border-emerald-200 pb-4">
              Profile Details
            </h1>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-emerald-50/50 rounded-xl">
                <div className="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Experience</p>
                  { isEdit ? 
                    <input 
                      type='text' 
                      value={experience} 
                      onChange={(e) => setExperience(e.target.value)} 
                      className='outline-0 bg-transparent text-xl font-bold text-gray-900'
                    /> : 
                    <p className="text-xl font-bold text-gray-900">{doctorProfile.experience}</p>
                  }
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-emerald-50/50 rounded-xl">
                <div className="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Languages</p>
                  <p className="text-xl font-bold text-gray-900">English, Hindi</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-emerald-50/50 rounded-xl">
                <div className="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Availability</p>
                  <p className="text-xl font-bold text-gray-900">Full Time {doctorProfile.speciality}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biography & Contact */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                Biography
              </h3>

              {isEdit ? 
                <div>
                  <textarea 
                    name="about" 
                    id="about" 
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className='text-gray-700 text-sm w-full h-32 outline-0 bg-transparent border border-gray-300 rounded-xl p-4 resize-vertical'
                  />
                </div> :
                <p className="text-gray-700 leading-relaxed text-lg">
                  {doctorProfile.about}
                </p>
              }
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                Contact
              </h3>
              <div className="space-y-3">
                <p className="text-lg font-semibold text-gray-800">+1 222 322 232</p>
                <p className="text-lg font-semibold text-gray-800">+2 323 423 232</p>
                {isEdit ? 
                  <input 
                    type='email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='font-medium outline-0 text-lg bg-transparent border-b border-gray-300 w-full p-1'
                  /> : 
                  <p className='text-emerald-600 font-medium'>{doctorProfile.email}</p>
                }
                <p className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                  Socialmedia.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Button - Works Perfectly */}
      <div className="flex justify-center pb-8">
        <button 
          onClick={handleClick}
          className="px-10 bg-emerald-600 hover:bg-emerald-700 rounded-2xl py-4 cursor-pointer text-xl font-bold text-white transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
        >
          {isEdit ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>
  )
}

export default DoctorProfile
