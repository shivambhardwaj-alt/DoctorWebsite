import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [imageFile, setImageFile] = useState(null);
  // const { userData, setUserData } = useContext(AppContext);
  const { userToken, backend_url, currentUser, setCurrentUser,userData,setUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);



  



  // =======================button to redirect user to send to login page for profile======================
  
  const handleClick = () => {
    navigate("/login");
    window.scrollTo(0, 0);
  };






  const toggleEdit = () => setIsEdit(!isEdit);

  const navigate = useNavigate();
  const onSubmitHandler = async () => {
    try {
      const formData = new FormData();
      
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      
      formData.append("address", JSON.stringify(userData.address));

      // image
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.post(
        `${backend_url}/api/user/updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`, 
          },
        }
      );
      console.log(data);

      if (data.success) {
        toast.success("Updated Successfully");
        setIsEdit(false); 
        // Update currentUser with new data
        setCurrentUser(prev => ({ ...prev, ...userData }));
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Internal Error!");
      console.log(error.message);
    }
  };

  return (userData ? (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
    
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden ring-1 ring-green-200/50">
          {/* Profile Image Section */}
          <div className="p-10 sm:p-14 text-center relative bg-gradient-to-b from-green-50/80 to-white/90 border-b border-green-100">
            <div className="relative inline-block group">
              <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-3xl overflow-hidden shadow-2xl ring-8 ring-white/60 hover:ring-green-200/80 transition-all duration-500 group-hover:scale-105">
                <img 
                  src={userData.image} 
                  alt="Profile" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              {isEdit && (
                <label className="absolute -bottom-4 -right-4 w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-green-500/25 hover:scale-110 transition-all duration-300 cursor-pointer border-4 border-white ring-4 ring-white/60 group-hover:translate-y-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m1.5-3l2-2m0 0l2-2m-2 2l-2-2m2 2H16" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImageFile(file);
                        // preview image
                        setUserData(prev => ({
                          ...prev,
                          image: URL.createObjectURL(file)
                        }));
                      }
                    }}
                  />
                </label>
              )}
            </div>
            <div className="mt-8">
              {isEdit ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full max-w-lg mx-auto block text-4xl sm:text-5xl font-black text-gray-900 bg-transparent border-0 border-b-4 border-green-200 focus:border-emerald-500 focus:outline-none py-4 text-center placeholder-gray-500 transition-all duration-300 tracking-tight"
                  placeholder="Your full name"
                />
              ) : (
                <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-lg">
                  {currentUser?.name || userData?.name}
                </h1>
              )}
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-10 sm:p-14 space-y-10">
            {/* Contact Information */}
            <div className="group">
              <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border-l-4 border-emerald-400">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                 <img src={assets.email} alt="" className='w-10 bg-white' />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-900 transition-colors">Contact Information</h2>
              </div>
              
              <div className="grid lg:grid-cols-1 gap-8">
                <div className="space-y-6">
                  <div className="info-field">
                    <label className="block text-sm font-bold text-emerald-800 uppercase tracking-wider mb-3 bg-emerald-100 px-3 py-1 rounded-full inline-block text-xs">
                      Email Address
                    </label>
                    {isEdit ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-6 py-5 border-2 border-green-100 rounded-xl bg-gradient-to-r from-white to-green-50 focus:border-emerald-400 focus:ring-8 focus:ring-emerald-100/50 focus:outline-none transition-all duration-300 text-xl font-semibold text-gray-900 shadow-sm hover:shadow-md"
                      />
                    ) : (
                      <div className="px-6 py-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border-2 border-green-100 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                        <p className="text-xl font-bold text-gray-900">{userData.email}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="info-field">
                    <label className="block text-sm font-bold text-emerald-800 uppercase tracking-wider mb-3 bg-emerald-100 px-3 py-1 rounded-full inline-block text-xs">
                      Phone Number
                    </label>
                    {isEdit ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-6 py-5 border-2 border-green-100 rounded-3xl bg-gradient-to-r from-white to-green-50 focus:border-emerald-400 focus:ring-8 focus:ring-emerald-100/50 focus:outline-none transition-all duration-300 text-xl font-semibold text-gray-900 shadow-sm hover:shadow-md"
                      />
                    ) : (
                      <div className="px-6 py-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border-2 border-green-100 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                        <p className="text-xl font-bold text-gray-900">{userData.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="info-field">
                    <label className="block text-sm font-bold text-emerald-800 uppercase tracking-wider mb-3 bg-emerald-100 px-3 py-1 rounded-full inline-block text-xs">
                      Full Address
                    </label>
                    {isEdit ? (
                      <>
                        <input
                          type="text"
                          value={userData.address.line1}
                          onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                          className="w-full px-6 py-5 border-2 border-green-100 rounded-3xl bg-gradient-to-r from-white to-green-50 focus:border-emerald-400 focus:ring-8 focus:ring-emerald-100/50 focus:outline-none transition-all duration-300 text-xl mb-4 font-semibold text-gray-900 shadow-sm"
                          placeholder="Street address, number"
                        />
                        <input
                          type="text"
                          value={
                          userData?.address?.line1?.trim()
                          ? userData.address.line2
                            : ''
                            }
                            readOnly={!userData?.address?.line1}
                          onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                          className="w-full px-6 py-5 border-2 border-green-100 rounded-3xl bg-gradient-to-r from-white to-green-50 focus:border-emerald-400 focus:ring-8 focus:ring-emerald-100/50 focus:outline-none transition-all duration-300 text-xl font-semibold text-gray-900 shadow-sm"
                          placeholder="City, State, ZIP"
                        />
                      </>
                    ) : (
                      <div className="px-6 py-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5"></div>
                        <p className="text-xl font-bold text-gray-900 relative z-10 leading-relaxed">
                          {userData.address.line1}
                          <br />
                          <span className="text-lg font-semibold text-emerald-800">{userData.address.line2}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="group">
              <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl border-l-4 border-teal-400">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                 <img src={assets.people} alt="" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-900 transition-colors">Basic Information</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="info-field">
                  <label className="block text-sm font-bold text-teal-800 uppercase tracking-wider mb-3 bg-teal-100 px-3 py-1 rounded-full inline-block text-xs">
                    Gender
                  </label>
                  {isEdit ? (
                    <select 
                      value={userData.gender}
                      onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}
                      className="w-full px-6 py-5 border-2 border-green-100 rounded-3xl bg-gradient-to-r from-white to-green-50 focus:border-teal-400 focus:ring-8 focus:ring-teal-100/50 focus:outline-none transition-all duration-300 text-xl font-semibold text-gray-900 shadow-sm appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgPjxwYXRoIGQ9Ik0xIDFMMyAzTDUgMSIgc3Ryb2tlPSIjNkI3MjgwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-right pr-12"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="px-6 py-5 bg-gradient-to-r from-teal-50 to-green-50 rounded-3xl border-2 border-green-100 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                      <p className="text-xl font-bold text-gray-900">{userData.gender}</p>
                    </div>
                  )}
                </div>
                
                <div className="info-field">
                  <label className="block text-sm font-bold text-teal-800 uppercase tracking-wider mb-3 bg-teal-100 px-3 py-1 rounded-full inline-block text-xs">
                    Date of Birth
                  </label>
                  {isEdit ? (
                    <input 
                      type="date" 
                      value={userData.dob}
                      onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))}
                      className="w-full px-6 py-5 border-2 border-green-100 rounded-3xl bg-gradient-to-r from-white to-green-50 focus:border-teal-400 focus:ring-8 focus:ring-teal-100/50 focus:outline-none transition-all duration-300 text-xl font-semibold text-gray-900 shadow-sm hover:shadow-md"
                    />
                  ) : (
                    <div className="px-6 py-5 bg-gradient-to-r from-teal-50 to-green-50 rounded-3xl border-2 border-green-100 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                      <p className="text-xl font-bold text-gray-900">{userData.dob}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-10 sm:px-14 pb-14 pt-8 bg-gradient-to-t from-green-50/80 to-transparent border-t border-green-100">
            <div className="text-center">
              <div
                className={`inline-flex items-center gap-3 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-green-500/30 transform hover:-translate-y-2 active:translate-y-1 transition-all duration-300 focus:outline-none focus:ring-8 focus:ring-emerald-200/50 group cursor-pointer ${
                  isEdit 
                    ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 ring-emerald-500/50' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 ring-green-500/50'
                }`}
                onClick={isEdit ? onSubmitHandler : toggleEdit}>{isEdit ? ('Save Changes') : ('Edit Profile')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


               
  ):
  <div className='flex flex-col items-center justify-center'>
    <h1 className='text-2xl mt-10 font-normal text-gray-600'>Please login to make a profile </h1>

    <div className='flex flex-col items-center justify-center'>
      <p className='text-lg text-gray-700 px-2 py-4 '>Create Profile By just Clicking on Create Profile Button</p>
      <button onClick={()=> {navigate('/login');window.scrollTo(0,0);}} className='bg-green-600 px-15 py-4  rounded-xl cursor-pointer'> Create Profile </button>
    </div>

  </div>

)
}

export default Profile
