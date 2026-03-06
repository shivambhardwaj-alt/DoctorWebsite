import express from 'express';
import { addDoctor,adminDashboardData,allDoctorsFetched,appointmentDoctor,deleteAppointment,loginAdmin } from '../controller/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';
import { changeAvailable }  from '../controller/doctorController.js';

const adminRouter = express.Router();
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-doctors',authAdmin,allDoctorsFetched);
adminRouter.post('/change-availability',authAdmin,changeAvailable);
adminRouter.get('/get-all-appointments',authAdmin,appointmentDoctor);

adminRouter.get('/get-dashboard-data',authAdmin,adminDashboardData);
adminRouter.post('/delete-appointment',authAdmin,deleteAppointment);


export default adminRouter;