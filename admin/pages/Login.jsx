import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState('Admin'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const { setToken, backend_url } = useContext(AdminContext);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     setLoading(true); // Show loading

//     try {
//       if (state === 'Admin') {
//         // FIXED: Correct URL (removed extra colon) and use backend_url consistently
//         const { data } = await axios.post(
//           `${backend_url}/api/admin/login`, // Use template literal and backend_url
//           { 
//             email: email.trim(),  // Trim whitespace
//             password: password 
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             timeout: 10000 // 10 second timeout
//           }
//         );

//         if (data.success) {
//           console.log('Token:', data.token);
//           setToken(data.token);
//           console.log(token);
//           localStorage.setItem('adminToken', data.token);
//           alert("done successfully")
       
         
//         } else {
         
//         }
//       } else {
        
//         const { data } = await axios.post(
//           `${backend_url}/api/doctor/login`,
//           { 
//             email: email.trim(),
//             password 
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             timeout: 10000
//           }
//         );

//         if (data.success) {
//           console.log('Doctor Token:', data.token);
//           // Handle doctor token separately
//           localStorage.setItem('doctorToken', data.token);
          
//         } else {
          
//         }
//       }
//     } catch (error) {
//       console.error('Login Error:', error.response?.data || error.message);
      
//       // Better error handling
//       if (error.code === 'ECONNABORTED') {
//         alert('Request timeout. Please check if backend is running on port 4000.');
//       } else if (error.response?.status === 404) {
//         alert('Login endpoint not found. Check if backend is running at ' + backend_url);
//       } else if (error.response?.status === 500) {
//         alert('Server error. Check backend console.');
//       } else {
//         alert('Login failed: ' + (error.response?.data?.message || error.message));
//       }
//     } finally {
//       setLoading(false); // Hide loading
//     }
//   };



const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    const { data } = await axios.post(
      backend_url + '/api/admin/login',
      {
        email: "shivambhardwaj2115@gmail.com",
        password: "shivam@123"
      }
    );

    if (data.success) {
      alert('Data Fetched');
      console.log(data.token);
    } else {
      alert('Nothing happened');
      console.log('Backend returned success = false');
    }

  } catch (error) {
    console.error('Axios error ❌', error.response?.data || error.message);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
            <svg
              className="h-8 w-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {state} Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Sign in to your {state.toLowerCase()} account
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-400 text-white bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-200 disabled:opacity-50"
                placeholder="admin@hospital.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-400 text-white bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-200 disabled:opacity-50"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setState(state === 'Admin' ? 'Doctor' : 'Admin');
                setEmail('');
                setPassword('');
              }}
              disabled={loading}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200 underline disabled:opacity-50"
            >
              {state === 'Admin' ? ' Switch to Doctor Login' : ' Switch to Admin Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
