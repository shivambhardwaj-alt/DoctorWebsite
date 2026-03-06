import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { backend_url, userToken, setToken,currentUser,setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    if (userToken) {
        

      navigate('/', { replace: true });
    }
  }, [userToken, navigate]);


  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Trim inputs to remove whitespace
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      console.log(trimmedPassword);
      const trimmedName = name.trim();

      if (!trimmedEmail || !trimmedPassword) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      if (state === 'Sign Up' && !trimmedName) {
        setError('Name is required for signup');
        setLoading(false);
        return;
      }

      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const api_url = `${backend_url}${endpoint}`;
      
      console.log(' API URL:', api_url);
      console.log(' Payload:', state === 'Sign Up' ? 
        {name: trimmedName, email: trimmedEmail, password: trimmedPassword} : 
        {email: trimmedEmail, password: trimmedPassword}
      );

      const payload = state === 'Sign Up' ? 
        {name: trimmedName, email: trimmedEmail, password: trimmedPassword} : 
        {email: trimmedEmail, password: trimmedPassword};

      const { data } = await axios.post(api_url, payload);
      console.log(' Response:', data);

      // Check if success (handle both success boolean and token existence)
      if (data.success || data.token) {
        const userToken = data.token;
        localStorage.setItem('userToken', userToken); // Fixed: was 'data.token'
        setToken(userToken);
        setCurrentUser(data.userObj);
        toast.success('LoggedIn Successfully!');
        
        // Clear form after success
        setName('');
        setEmail('');
        setPassword('');
        setError('');


        
      } else {
        setError(data.message || data.error || 'Login/Signup failed');
        toast.error(error);
      }
    } catch (error) {
      console.error(' Error:', error.response?.data || error.message);
      
      // Better error messages
      if (error.response?.status === 401) {
        setError('Invalid email or password');
      } else if (error.response?.status === 400) {
        setError(error.response?.data?.message || 'Invalid data provided');
      } else if (error.response?.status === 409) {
        setError('User already exists. Please login instead.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
      toast.error(error);

      
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setState(state === 'Sign Up' ? 'Login' : 'Sign Up');
    setName(''); 
    setEmail(''); 
    setPassword('');
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6">
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-700">
              {state === 'Sign Up' ? 'Creating Account...' : 'Signing In...'}
            </p>
            <p className="text-sm text-gray-500">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative">
          
          {/* Debug info - remove in production */}
          {/* <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
            <div>Backend URL: <span className="font-mono">{backend_url}</span></div>
            <div>Mode: <span className="font-semibold">{state}</span></div>
          </div> */}

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              Please {state === 'Sign Up' ? "sign up" : "login"} to book an appointment
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {state === 'Sign Up' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {state === 'Sign Up' ? 'Create Account' : 'Login'}
            </button>
          </form>

          <div className="pt-6 text-center border-t border-gray-100">
            <p className="text-gray-600">
              {state === 'Sign Up' ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={toggleForm}
                disabled={loading}
                className="ml-1 font-semibold text-emerald-600 hover:text-emerald-700 transition-colors disabled:opacity-50"
              >
                {state === 'Sign Up' ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
