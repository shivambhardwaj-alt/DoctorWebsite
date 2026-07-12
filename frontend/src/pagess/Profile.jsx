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

  const fieldClass = "w-full px-3.5 py-2.5 bg-white border border-[#14213D]/15 rounded-sm text-sm text-[#14213D] " +
    "placeholder-[#9A968C]/70 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/25 focus:border-[#0F6E56] transition-colors";

  const displayClass = "px-3.5 py-2.5 bg-[#FAFAF7] rounded-sm border border-[#14213D]/8";

  return (userData ? (
    <div className="min-h-screen bg-white py-10 sm:py-14 px-4 font-chart-sans relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
        .font-chart-serif { font-family: 'Source Serif 4', Georgia, serif; }
        .font-chart-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-chart-mono { font-family: 'JetBrains Mono', monospace; }
        .chart-grid {
          background-image:
            linear-gradient(to right, #0F6E5608 1px, transparent 1px),
            linear-gradient(to bottom, #0F6E5608 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      <div className="absolute inset-0 chart-grid pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-3 text-center">
          Patient record
        </p>

        <div className="bg-white rounded-md border border-[#14213D]/10 shadow-[0_1px_2px_rgba(20,33,61,0.05),0_16px_40px_-16px_rgba(20,33,61,0.16)] overflow-hidden">

          {/* Profile image + name */}
          <div className="pt-10 pb-8 px-8 text-center border-b border-[#14213D]/10">
            <div className="relative inline-block">
              <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-md overflow-hidden border border-[#14213D]/10">
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEdit && (
                <label className="absolute -bottom-2 -right-2 w-9 h-9 bg-[#14213D] text-white rounded-sm flex items-center justify-center
                  hover:bg-[#0F6E56] transition-colors duration-200 cursor-pointer border-2 border-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <div className="mt-6">
              {isEdit ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full max-w-sm mx-auto block font-chart-serif text-2xl sm:text-3xl font-semibold text-[#14213D]
                    bg-transparent border-0 border-b-2 border-[#0F6E56]/30 focus:border-[#0F6E56] focus:outline-none py-2 text-center
                    placeholder-[#9A968C] transition-colors"
                  placeholder="Your full name"
                />
              ) : (
                <h1 className="font-chart-serif text-2xl sm:text-3xl font-semibold text-[#14213D]">
                  {currentUser?.name || userData?.name}
                </h1>
              )}
            </div>
          </div>

          {/* Content sections */}
          <div className="px-6 sm:px-8 py-8 space-y-8">

            {/* Contact information */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-[#0F6E56]/8 rounded-sm flex items-center justify-center shrink-0">
                  <img src={assets.email} alt="" className="w-5" />
                </div>
                <h2 className="font-chart-serif text-lg font-semibold text-[#14213D]">Contact information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">
                    Email address
                  </label>
                  {isEdit ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                      className={fieldClass}
                    />
                  ) : (
                    <p className={`${displayClass} text-sm text-[#14213D] font-medium`}>{userData.email}</p>
                  )}
                </div>

                <div>
                  <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">
                    Phone number
                  </label>
                  {isEdit ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                      className={fieldClass}
                    />
                  ) : (
                    <p className={`${displayClass} text-sm text-[#14213D] font-medium`}>{userData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">
                    Full address
                  </label>
                  {isEdit ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={userData.address.line1}
                        onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                        className={fieldClass}
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
                        className={fieldClass}
                        placeholder="City, State, ZIP"
                      />
                    </div>
                  ) : (
                    <div className={`${displayClass} text-sm text-[#14213D] font-medium leading-relaxed`}>
                      {userData.address.line1}
                      <br />
                      <span className="text-[#6B6458]">{userData.address.line2}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Basic information */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-[#0F6E56]/8 rounded-sm flex items-center justify-center shrink-0">
                  <img src={assets.people} alt="" className="w-5" />
                </div>
                <h2 className="font-chart-serif text-lg font-semibold text-[#14213D]">Basic information</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">
                    Gender
                  </label>
                  {isEdit ? (
                    <select
                      value={userData.gender}
                      onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                      className={fieldClass}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className={`${displayClass} text-sm text-[#14213D] font-medium`}>{userData.gender}</p>
                  )}
                </div>

                <div>
                  <label className="font-chart-mono text-[10px] tracking-[0.15em] text-[#9A968C] uppercase block mb-1.5">
                    Date of birth
                  </label>
                  {isEdit ? (
                    <input
                      type="date"
                      value={userData.dob}
                      onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                      className={fieldClass}
                    />
                  ) : (
                    <p className={`${displayClass} text-sm text-[#14213D] font-medium`}>{userData.dob}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[#14213D]/10">
            <button
              onClick={isEdit ? onSubmitHandler : toggleEdit}
              className="w-full py-3 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200"
            >
              {isEdit ? 'Save changes' : 'Edit profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 font-chart-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
        .font-chart-serif { font-family: 'Source Serif 4', Georgia, serif; }
        .font-chart-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-chart-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="max-w-sm w-full text-center">
        <p className="font-chart-mono text-[11px] tracking-[0.25em] text-[#0F6E56] uppercase mb-3">
          No record found
        </p>
        <h1 className="font-chart-serif text-2xl font-semibold text-[#14213D] mb-3">
          Please log in to view your profile
        </h1>
        <p className="text-sm text-[#6B6458] mb-6">
          Create a profile in a few seconds to book and manage your appointments.
        </p>
        <button
          onClick={() => { navigate('/login'); window.scrollTo(0, 0); }}
          className="px-8 py-3 bg-[#14213D] text-white font-semibold text-sm rounded-sm hover:bg-[#0F6E56] transition-colors duration-200"
        >
          Create profile
        </button>
      </div>
    </div>
  )
  )
}

export default Profile