import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorsModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available, //  NEW
    } = req.body

    const imageFile = req.file

    // ---------- BASIC VALIDATION ----------
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      fees === undefined ||
      !address
    ) {
      return res.json({
        success: false,
        message: 'All fields are required',
      })
    }

    if (!imageFile) {
      return res.json({
        success: false,
        message: 'Doctor image is required',
      })
    }

    // ---------- EMAIL VALIDATION ----------
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Invalid email address',
      })
    }

    // ---------- DUPLICATE EMAIL CHECK ----------
    const existingDoctor = await doctorModel.findOne({ email })
    if (existingDoctor) {
      return res.json({
        success: false,
        message: 'Doctor already exists with this email',
      })
    }

    // ---------- PASSWORD VALIDATION ----------
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Password must be at least 8 characters',
      })
    }

    // ---------- HASH PASSWORD ----------
    const hashedPassword = await bcrypt.hash(password, 10)

    // ---------- UPLOAD IMAGE ----------
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
      folder: 'doctors',
    })

    // ---------- BOOLEAN HANDLING ----------
    const isAvailable =
      available === undefined ? true : available === 'true' || available === true

    // ---------- CREATE DOCTOR ----------
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
      degree,
      speciality,
      experience,
      about,
      available: isAvailable, 
      fees,
      address: typeof address === 'string' ? JSON.parse(address) : address,
      date: Date.now(),
    })

    await newDoctor.save()

    return res.json({
      success: true,
      message: 'Doctor added successfully',
    })
  } catch (error) {
    console.error(error)
    return res.json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}



//  api for login admin  
const loginAdmin = (req,res) =>{
    try{

        const{email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){


            const token = jwt.sign(email + password,process.env.JWT_SECRET);
            res.json({sucess:true,message:'Token Issued Sucessfully',token:token});

        }else{
            res.json({sucess:false,message:error.message});
        }

        

    }catch(error){
        console.log(error.mesage);
        res.json({sucess:false,message:error.message});
    }
}



// api for fetching all  the doctors in the database

const allDoctorsFetched =async(req,res) =>{
  try{
    const doctors = await doctorModel.find({}).select('-password');
    res.json({sucess:true,message:"Done Sucessfully",doctors});
  }catch(error){
    res.json({sucess:false,message:error.message});
  }


}







// ==================== Api to get the appointment of the doctors =========================




const appointmentDoctor = async(req,res) => {
  try{

    const appointments = await appointmentModel.find({});
  

    res.json({success:true,appointments});

    








  }catch(error){
    res.json({success:false,error:error.message});
  }
}












// =============================Api to get the all the data for the frontend dashbord in the admin ===============

const adminDashboardData = async(req,res) => {
  try{

    const doctors_data =  await doctorModel.find({});
    const users_data  = await userModel.find({});

    const appointments = await appointmentModel.find({});
    const new_appointments = appointments.length > 10 ? appointments.reverse().slice(0,10): appointments;
    const dasboardData = {
      doctors:doctors_data.length,
      appointments:appointments.length,
      patients:users_data.length,
      newAppointments :new_appointments
    }


    res.json({success:true,dashboard:dasboardData});

  }catch(error){
    res.json({success:false,error:error.message});
  }
}


// ========================== api to delete the appointment with the requested id =========================


const deleteAppointment = async (req, res) => {
  try {
    
    const {apppointmentId}  = req.body;
    

    if (!apppointmentId) {
      return res.json({ success: false, message: "Appointment ID missing" });
    }

    const appointmentData = await appointmentModel.findById(apppointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (!appointmentData.cancelled && !appointmentData.isCompleted) {
      return res.json({
        success: false,
        message: "Cannot delete active appointment"
      });
    }

    
    const deletedAppointmentdata = await appointmentModel.findById(apppointmentId);
    const doc_id = deletedAppointmentdata.doc_id;
    // const docotrData = await doctorModel.findById


    const deletedAppointment = await appointmentModel.findByIdAndDelete(apppointmentId);


    

    if (deletedAppointment) {
      return res.json({ success: true, message: "Appointment deleted" });
    }

    return res.json({ success: false, message: "Deletion failed" });

  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};





export { addDoctor,loginAdmin,allDoctorsFetched,appointmentDoctor ,adminDashboardData,deleteAppointment}
