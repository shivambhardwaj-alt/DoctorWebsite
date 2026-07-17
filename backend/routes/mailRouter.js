import express from 'express';
import authUser from '../middlewares/authUser.js';
import { sendMailDeveloper } from '../controller/mailController.js';


const mailRouter =  express.Router()


mailRouter.post('/mail-developer',authUser,sendMailDeveloper);






export default mailRouter;
