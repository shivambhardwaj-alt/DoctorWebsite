import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { doctorProfile, doctorToken, getDoctorProfile, backend_url } = useContext(DoctorContext);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');

  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (doctorToken) {
      getDoctorProfile();
    }
  }, [doctorToken]);


  useEffect(() => {
    if (doctorProfile) {
      resetFormFields();
    }
  }, [doctorProfile]);


  const resetFormFields = () => {
    setName(doctorProfile.name || '');
    setEmail(doctorProfile.email || '');
    setSpeciality(doctorProfile.speciality || '');
    setExperience(doctorProfile.experience || '');
    setAbout(doctorProfile.about || '');
    setPreview(null);
    setImageFile(null);
  };


  const handleCancel = () => {
    resetFormFields();
    setIsEdit(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  
  const updateProfile = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('speciality', speciality);
      formData.append('experience', experience);
      formData.append('about', about);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const { data } = await axios.post(
        `${backend_url}/api/doctor/change-profile`, 
        formData, 
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );

      if (data.success) {
        toast.success('Profile updated successfully!');
        await getDoctorProfile();
        setIsEdit(false);
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Server error: Failed to update profile');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!doctorProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
          <span className="text-sm font-bold uppercase tracking-wider">Synchronizing profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-10 px-4 sm:px-6 lg:px-8 pb-16 font-sans selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto">
        
  
        <div className="border-b border-gray-200 pb-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Provider Profile</h1>
            <p className="text-sm text-gray-500 mt-1">Configure your professional credential visibility settings.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {isEdit ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none border-2 border-black text-black text-xs font-black uppercase tracking-wider px-6 py-2.5 hover:bg-gray-50 transition duration-150 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none bg-black text-white text-xs font-black uppercase tracking-wider px-6 py-2.5 hover:bg-gray-800 transition duration-150 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="w-full sm:w-auto bg-black text-white text-xs font-black uppercase tracking-wider px-8 py-3 hover:bg-gray-800 transition duration-150 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Edit Account Profile
              </button>
            )}
          </div>
        </div>

       
        <div className="bg-white border-2 border-black rounded-xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="relative group flex-shrink-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-black relative bg-gray-50">
              <img
                src={preview || doctorProfile.image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {isEdit && (
              <label
                htmlFor="doctor-image"
                className="absolute inset-0 bg-black/80 rounded-xl flex flex-col items-center justify-center text-white font-bold text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 border-2 border-black tracking-wide uppercase"
              >
                Update Image
                <input
                  id="doctor-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <div className="flex-1 text-center md:text-left w-full">
            {isEdit ? (
              <div className="space-y-3 max-w-md">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Legal Name"
                  className="text-2xl font-black text-black bg-white border border-gray-300 px-3 py-1.5 rounded outline-none focus:border-black w-full"
                />
                <input
                  type="text"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  placeholder="Medical Domain Speciality"
                  className="text-xs font-bold uppercase tracking-wider text-gray-600 bg-white border border-gray-300 px-3 py-1.5 rounded outline-none focus:border-black w-full"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-black tracking-tight">{doctorProfile.name}</h2>
                <div className="mt-2.5 inline-flex items-center px-3 py-1 border border-black font-mono text-xs font-bold uppercase tracking-wider rounded bg-gray-50">
                  {doctorProfile.speciality}
                </div>
              </div>
            )}
          </div>
        </div>

       
        <div className="grid md:grid-cols-5 gap-8 items-start">
          
         
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
            <h3 className="text-base font-black uppercase tracking-wider border-b border-gray-100 pb-3">
              Practice Credentials
            </h3>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                Years of Experience
              </label>
              {isEdit ? (
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full text-sm font-bold bg-white border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
                />
              ) : (
                <p className="text-sm font-bold bg-gray-50 border border-gray-100 rounded px-3 py-2 text-black">
                  {doctorProfile.experience}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                Spoken Languages
              </label>
              <p className="text-sm font-bold bg-gray-50 border border-gray-100 rounded px-3 py-2 text-black">
                English, Hindi
              </p>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                Assignment Terms
              </label>
              <p className="text-sm font-bold bg-gray-50 border border-gray-100 rounded px-3 py-2 text-black truncate">
                Full Time Practitioner
              </p>
            </div>
          </div>

     
          <div className="md:col-span-3 space-y-6">
            
      
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-black uppercase tracking-wider border-b border-gray-100 pb-3 mb-4">
                Clinical Biography
              </h3>
              {isEdit ? (
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className="w-full text-sm leading-relaxed text-black bg-white border border-gray-300 focus:border-black rounded p-3 outline-none resize-y transition duration-150"
                  placeholder="Tell patients about your clinical history..."
                />
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-line">
                  {doctorProfile.about || "No biography provided yet."}
                </p>
              )}
            </div>

         
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-black uppercase tracking-wider border-b border-gray-100 pb-3 mb-4">
                Contact Protocols
              </h3>
              <div className="space-y-3 font-medium text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Direct Line A</span>
                  <span className="font-mono font-bold">+1 222 322 232</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Direct Line B</span>
                  <span className="font-mono font-bold">+2 323 423 232</span>
                </div>
                <div className="py-2">
                  <span className="block text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">
                    Verified Digital Mailing Address
                  </span>
                  {isEdit ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full font-mono text-xs text-black bg-white border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
                    />
                  ) : (
                    <p className="font-mono text-xs font-bold underline decoration-gray-300 underline-offset-2 break-all">
                      {doctorProfile.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;