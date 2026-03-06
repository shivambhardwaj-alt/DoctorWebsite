import express from 'express'
import { sendSMS } from '../controller/smsController.js';
import authUser from '../middlewares/authUser.js';


const smsRouter = express.Router();

smsRouter.post('/sms',authUser,sendSMS);
export default smsRouter;