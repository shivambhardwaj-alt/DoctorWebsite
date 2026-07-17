import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/connectDb.js'
import { connect } from 'mongoose';
import { fileURLToPath } from 'url'
import fs from 'fs';
import path from 'path';
import connectCloudinary from './config/connectCloudinary.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';

import doctorRouter from './routes/doctorRoutes.js';
import mailRouter from './routes/mailRouter.js';
import smsRouter from './routes/smsRoutes.js';
import './scheduler/scheduler.js'

const app = express()

const port = process.env.PORT || 4000



//  a temporary fix for the uploads (needed to fix)



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadsDir = path.join(__dirname, 'uploads')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log('Created uploads folder at:', uploadsDir)
} else {
  console.log('Uploads folder already exists')
}


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