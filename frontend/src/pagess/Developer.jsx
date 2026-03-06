import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios'
import { AppContext } from '../context/AppContext';

const Developer = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const {backend_url,userToken} = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setStatus('');

    try {

const { data } = await axios.post(
  backend_url + '/api/user/mail-developer',
  { message: message },
  {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }
);

     
      
     if(data.success){
      setStatus('Message sent successfully. Thanks for Connecting');
      setMessage('');
      return ;
     }
     setStatus('Failed To Send');
    } catch (error) {
      setStatus('Oops! Something went wrong. Please try again.');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Connect With Me
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Got a project idea, question, or just want to say hi? 
            Drop me a message below!
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
          {status && (
            <div className={`mb-6 p-4 rounded-2xl text-sm font-medium ${
              status.includes('successfully') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {status}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, ask a question, or just say hello..."
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl resize-vertical focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400 shadow-sm hover:shadow-lg min-h-[120px]"
                disabled={isSubmitting}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {message.length}/500 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5 px-8 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" cy="12" r="10" 
                      stroke="currentColor" strokeWidth="4" fill="none" 
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                 <img src={assets.arrow_icon} alt="" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Or connect with me directly:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:your@email.com" className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors">
              <div className='flex flex-row gap-2'>
                <img src={assets.email} alt="" className='w-10' />
                <p className='mt-2'>Email</p>
              </div>
            </a>
            <a  className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors">
             <div className='flex flex-row gap-2'>
                <img src={assets.bag} alt="" className='w-10' />
                <p className='mt-2'>github</p>
              </div>

              </a>
            <a href="https://github.com/yourusername" className="px-4 py-2  text-blue-600 hover:text-gray-900 font-medium hover:underline transition-colors">
            <div className='flex flex-row gap-2'>
                <img src={assets.laptop} alt="" className='w-10' />
                <p className='mt-2'>LinkedIn</p>
              </div>
            
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developer;
