import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DoctorContext } from '../context/DoctorContext';

const Login2 = () => {
  const {adminToken, setToken, backend_url } = useContext(AdminContext);

  const{doctorToken,setDoctorToken}  = useContext(DoctorContext);

  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    let response;

    if (role === 'Admin') {
      response = await axios.post(
        `${backend_url}/api/admin/login`,
        { email: trimmedEmail, password },
        { headers: { 'Content-Type': 'application/json' }, timeout: 15000 }
      );

      const { data } = response;
      console.log(data);

      if (data.sucess && data.token) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        toast.success('Admin login successful!');
      } else {
        toast.error(data.message || 'Admin login failed');
      }

    } else {
      response = await axios.post(
        `${backend_url}/api/doctor/login`,
        { email: trimmedEmail, password },
        { headers: { 'Content-Type': 'application/json' }, timeout: 15000 }
      );

      const { data } = response;

      if (data.success && data.doctorToken) {
        setDoctorToken(data.doctorToken);
        localStorage.setItem('doctorToken', data.doctorToken);
        toast.success('Doctor login successful!');
      } else {
        toast.error(data.message || 'Doctor login failed');
      }
    }

    setEmail('');
    setPassword('');

  } catch (error) {
    console.error(error);

    let errorMessage = 'Login failed';

    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Server timeout. Is backend running?';
    } else if (error.response?.status === 401) {
      errorMessage = 'Invalid email or password';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 border-4 border-white/20">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round " strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent mb-4 tracking-tight">
            {role} Portal
          </h1>
          <p className="text-xl font-semibold text-white/90">{role}  Dashboard Access</p>
          <p className="text-gray-300 text-lg mt-1">Secure login for web administration</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/30 rounded-4xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-lg font-bold text-emerald-100 mb-4 tracking-wide flex items-center">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@doctorsportal.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-4 pr-6 py-5 bg-white/10 border-2 border-white/20 rounded-3xl text-white placeholder-gray-300 text-xl font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/40 focus:border-emerald-400/80 transition-all duration-500 backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-lg font-bold text-emerald-100 mb-4 tracking-wide flex items-center">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-4 pr-6 py-5 bg-white/10 border-2 border-white/20 rounded-3xl text-white placeholder-gray-300 text-xl font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/40 focus:border-emerald-400/80 transition-all duration-500 backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}

             


             
              className="group relative w-full flex justify-center items-center py-6 px-8 border-2 border-transparent text-xl font-black rounded-3xl text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                'Login'
              )}
            </button>
            

            








          </form>

{/* Change the form type */}

          <div className = 'flex flex-col gap-2 px-3 items-center justify-center mt-3'>
              {/* <p className='text-lg  mt-2 text-white'>{role + 'Login'}  Click Here</p> */}
           <button  onClick = {() => setRole(role === 'Admin' ? 'Doctor' : 'Admin')}className='sm text-white cursor-pointer '>{role === 'Admin' ? 'Doctor' : 'Admin'} <span className='text-white text-lg'>Login?   </span><span className='text-white'>   Click Here</span></button>  
          </div>
        </div>
      </div>

      {/* Background animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Login2;
