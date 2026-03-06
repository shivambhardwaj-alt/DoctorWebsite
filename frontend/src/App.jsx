import React from 'react'
import {Route,Routes} from 'react-router-dom';
// import {Routes,Route} from 'react-router-dom';
import Home from './pagess/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import AllDoctors from './pagess/AllDoctors';
import Appointment from './pagess/Appointment';
import About from './pagess/About';
import Contact from './pagess/Contact';
import Login from './pagess/Login.jsx';
import Profile from './pagess/Profile.jsx';
import MyAppointment from './pagess/MyAppointment.jsx';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Developer from './pagess/Developer.jsx';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[2%]'>
      <ToastContainer theme="dark" autoClose={3000} />
      <Navbar />
     <Routes>
      <Route path='/' element = {<Home />} />
      <Route path = '/doctors' element  = {<AllDoctors />} />
      <Route path  = '/doctors/:speciality' element = {<AllDoctors />} />
      <Route path = '/appointment/:id' element = {<Appointment />} />
      <Route path = '/about' element  = {<About />} />
      <Route path = '/contact' element  = {<Contact />}  />
      <Route path = '/login' element  = {<Login />}  />
      <Route path = 'my-profile' element = {<Profile />} />
      <Route path = 'my-appointments' element = {<MyAppointment />} />
      <Route path = '/developer' element = {<Developer />} />

      
     





      

     </Routes>
      
     <Footer />
     </div>
  );
};

export default App;


