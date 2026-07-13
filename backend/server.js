import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/connectDb.js'
import { connect } from 'mongoose';
import connectCloudinary from './config/connectCloudinary.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';

import doctorRouter from './routes/doctorRoutes.js';
import mailRouter from './routes/mailRouter.js';
import smsRouter from './routes/smsRoutes.js';
// create app
const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors());
const startSever = async() => {
  try{

    connectDb();
    connectCloudinary();
    app.use('/api/user',userRouter);
    app.use('/api/admin',adminRouter);
    app.use('/api/doctor',doctorRouter);

    app.get("/health" , (req, res) => {
      return res.json("Working fine");
    })


    app.listen(port,() => {
     console.log(`Server is running on ${port}`); 
    })


  }catch(error){
    console.log("Error happened in starting the server",error);
  }
}

startSever();