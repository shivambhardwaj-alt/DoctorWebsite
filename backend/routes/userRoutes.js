import express from 'express';
import { registerUser ,loginUser, getDoctors,updateProfile,paymentRazorpay, getUserProfile, bookAppointment,myAppointmentList, deleteAppointment, setRazorPay} from '../controller/userController.js';
import upload from '../middlewares/multer.js';
import authUser from '../middlewares/authUser.js';


const userRouter = express.Router();


userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/getDoctors',getDoctors);
userRouter.get('/get-profile',authUser,getUserProfile)
userRouter.post('/updateProfile',authUser,upload.single('image'),updateProfile)

userRouter.post('/book-appointment',authUser,bookAppointment);


userRouter.get('/get-myAppointmentList',authUser,myAppointmentList)

userRouter.post('/cancelAppointment',authUser,deleteAppointment);
userRouter.post('/payment',authUser,paymentRazorpay)
userRouter.post('/verify-payment',authUser,setRazorPay);




export default userRouter;