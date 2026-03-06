import express from 'express';
// import DoctorsList from '../../admin/pages/admin/DoctorsList';
import { cancelAppointment, changeProfile, completeAppointment, dashboardDataFetch, deleteAppointment, getCancelled, getDoctorAppointment, getDoctorProfile, getTodayAppointment, loginDoctor, markCompleteAppointment } from '../controller/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

import upload from '../middlewares/multer.js';

const doctorRouter = express.Router();



doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/get-appointments',authDoctor,getDoctorAppointment);

doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment);
doctorRouter.post('/complete-appointment',authDoctor,completeAppointment);
doctorRouter.get('/dashboard-fetch',authDoctor,dashboardDataFetch);
doctorRouter.get('/get-profile',authDoctor,getDoctorProfile);
doctorRouter.post('/change-profile',authDoctor,upload.single('image'),changeProfile);
doctorRouter.get('/get-cancelled',authDoctor,getCancelled);
doctorRouter.post('/delete-appointment',authDoctor,deleteAppointment);
doctorRouter.get('/today-appointment',authDoctor,getTodayAppointment);
doctorRouter.post('/complete-appointment',authDoctor,markCompleteAppointment);



export default doctorRouter;