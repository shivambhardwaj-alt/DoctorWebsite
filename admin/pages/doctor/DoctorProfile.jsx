import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { doctorToken, backend_url } = useContext(DoctorContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const getDoctorProfile = async () => {
    if (!doctorToken) return;

    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backend_url}/api/doctor/get-profile`,
        {
          headers: { Authorization: `Bearer ${doctorToken}` },
        }
      );

      

      const profile = data?.doctorData || data?.doctor || data?.profile || {};
      setDoctorProfile(profile);

      setName(profile.name || '');
      setEmail(profile.email || '');
      setSpeciality(profile.speciality || '');
      setExperience(profile.experience || '');
      setAbout(profile.about || '');
      setPreview(profile.image || null);
    } catch (error) {
      console.log(error.message);
      setDoctorProfile({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorToken) {
      getDoctorProfile();
    } else {
      setLoading(false);
    }
  }, [doctorToken]);

  const handleCancel = () => {
    setName(doctorProfile.name || '');
    setEmail(doctorProfile.email || '');
    setSpeciality(doctorProfile.speciality || '');
    setExperience(doctorProfile.experience || '');
    setAbout(doctorProfile.about || '');
    setPreview(doctorProfile.image || null);
    setImageFile(null);
    setIsEdit(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
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
        {
          headers: { Authorization: `Bearer ${doctorToken}` },
        }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-black">
        <div className="text-sm uppercase tracking-[0.2em] text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Provider Profile</h1>
            <p className="text-sm text-gray-500 mt-2">Manage your professional details.</p>
          </div>

          <div className="flex gap-2">
            {isEdit ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-semibold rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-semibold rounded-full bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-5 py-2.5 text-sm font-semibold rounded-full bg-black text-white hover:bg-gray-800"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={preview || doctorProfile.image || 'https://via.placeholder.com/300'}
                  alt={name || 'Doctor'}
                  className="w-full h-full object-cover"
                />
              </div>

              {isEdit && (
                <label className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 text-white text-xs font-semibold opacity-0 hover:opacity-100 transition cursor-pointer">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <div className="flex-1 w-full space-y-4 text-center md:text-left">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-2xl font-bold bg-transparent outline-none border-b border-gray-200 focus:border-black pb-2"
                    placeholder="Full name"
                  />
                  <input
                    type="text"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="w-full text-sm font-medium text-gray-600 bg-transparent outline-none border-b border-gray-200 focus:border-black pb-2"
                    placeholder="Speciality"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-black tracking-tight">{doctorProfile.name || '—'}</h2>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{doctorProfile.speciality || '—'}</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Credentials</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-2">
                  Experience
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 outline-none focus:bg-white"
                  />
                ) : (
                  <p className="text-sm text-gray-700 bg-gray-50 px-4 py-3 rounded-2xl">
                    {doctorProfile.experience || '—'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-2">
                  Email
                </label>
                {isEdit ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 outline-none focus:bg-white"
                  />
                ) : (
                  <p className="text-sm text-gray-700 bg-gray-50 px-4 py-3 rounded-2xl break-all">
                    {doctorProfile.email || '—'}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">About</h3>

            {isEdit ? (
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={7}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 outline-none focus:bg-white resize-none"
                placeholder="Write about yourself"
              />
            ) : (
              <p className="text-sm leading-7 text-gray-700">
                {doctorProfile.about || 'No biography provided yet.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;