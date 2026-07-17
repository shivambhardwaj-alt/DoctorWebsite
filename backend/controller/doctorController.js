import doctorModel from "../models/doctorsModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import {v2 as cloudinary} from 'cloudinary';
import mongoose from "mongoose";
const changeAvailable = async (req, res) => {
 

  try {
    const { docId } = req.body;

  

    const doctor = await doctorModel.findById(docId);
    

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    doctor.available = !doctor.available;

   

    await doctor.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: "Availability toggled",
      available: doctor.available,
    });

  } catch (error) {
 
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ========================== Api for the login of the doctor =========================



const loginDoctor = async(req,res) => { 
  try{

    const {email,password} = req.body;
    console.log("Request Generated at login Doctor");


    const doctor_exist  = await doctorModel.findOne({email});
    if(!doctor_exist){
      return res.json({success:false,error:"Doctor Not Found"});
      
    }
    const isMatch = await bcrypt.compare(password,doctor_exist.password);
    if(!isMatch){
      return res.json({success:false,message:"Password Incorrect"});
    }
    const doctorToken = jwt.sign({id:doctor_exist._id},process.env.JWT_SECRET);
    console.log("Request Successful and token is generated for the user");
    res.json({success:true,doctorToken:doctorToken});

    




  }catch(error){


    res.json({success:false,error:error.message});
  }
}





// ====================== Api to  get the doctor's appointment==============================

const getDoctorAppointment = async(req,res) => {


  try{

    

  const {docId} = req.user;
  
  const appointments =  await appointmentModel.find({doc_id:docId});


  res.json({success:true,appointments});




  }catch(error){
    res.json({success:false,error:error.message});
  }








}



// ================== Api to mark the Completion of appointment ================================= to be checked


const completeAppointment = async (req, res) => {
  try {
   
    const {appointmentId} = req.body;
    
    

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID missing"
      });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

   
    // if (appointmentData.docId.toString() !== doctorId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Not authorized"
    //   });
    // }

    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { isCompleted: true },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Appointment completed"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};




// ================================= Api to Cancel the Doctor's appintment ====================================



const cancelAppointment = async (req, res) => {
  try {
    const { docId } = req.user;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointment.doc_id.toString() !== docId) {
      return res.status(403).json({ success: false, message: "Not authorized to cancel this appointment" });
    }

    if (appointment.cancelled) {
      return res.status(400).json({ success: false, message: "Appointment already cancelled" });
    }

    if (appointment.payment || appointment.isCompleted) {
      return res.status(403).json({ success: false, message: "Not Able to update" });
    }

    appointment.cancelled = true;
    await appointment.save();

    return res.json({ success: true, message: "Cancelled Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};



// =================================== Api to get all the information of the doctor for the dashboard page ==================




const dashboardDataFetch = async (req, res) => {
  try {
    const { docId } = req.user;

    const appointments = await appointmentModel.find({ doc_id: docId });

    let earnings = 0;
    const patients = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted && item.payment && !item.cancelled) {
        earnings += item.amount;
      }
      if (!item.cancelled) {
        patients.add(item.userId);
      }
    });

    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    const newAppointments = appointments.filter(
      (item) => item.slot_date?.trim() === formattedDate
    );

    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(today.getDate() - i);

      const dayKey = `${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`;
      const dayLabel = day.toLocaleDateString('en-US', { weekday: 'short' });

      const dayEarnings = appointments
        .filter(
          (item) =>
            item.slot_date?.trim() === dayKey &&
            item.isCompleted &&
            item.payment &&
            !item.cancelled
        )
        .reduce((sum, item) => sum + (item.amount || 0), 0);

      chartData.push({ name: dayLabel, Earnings: dayEarnings });
    }

    const dashboardData = {
      earnings,
      appointment: appointments.length,
      patient: patients.size,
      latestAppointments: newAppointments,
      chartData,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

// ======================== Api to get the doctor'Profile Information for the page =========================


const getDoctorProfile = async(req,res) => {
  try{

    const {docId} = req.user;
   

   
    const doctorData = await doctorModel.findById(docId);
    // console.log(doctorData);

    res.json({sucess:true,doctorData});






  }catch(error){
    res.json({success:false,error:error.message});
  }
}


// ========================Api to change the profile of the doctor ==========================================


const changeProfile = async (req, res) => {
  try {
    const { docId } = req.user;

    let image_url = req.body.image;

    const { name, email, speciality, experience, about } = req.body;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        { resource_type: "image" }
      );
      image_url = uploadResult.secure_url;
    }

    const data = {
      name,
      email,
      speciality,
      experience,
      about
    };

    if (image_url) {
      data.image = image_url;
    }

    const updatedUser = await doctorModel.findByIdAndUpdate(
      docId,                
      data,
      {
        new: true,
        runValidators: true,
        select: "-password"
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    return res.json({
      success: false,
      error: error.message
    });
  }
};



// ============================= Api to fetch all the cancelled data ==========================


const getCancelled = async(req,res) => {


  try{



      const { docId } = req.user;
     


    
    const appointments = await appointmentModel.find({doc_id:docId});


    // ====================LOGIC TO FILTER ALL THE CANCELLED APPOINTMENTS =======================
    const newCancelledAppointments = appointments.filter(item => item.cancelled);
    res.json({success:true,cancelledAppointments:newCancelledAppointments});

  }catch(error){
    res.json({success:false,error:error.message});


  }
}


// =================== API IS NOT WORKING  =====================
const deleteAppointment = async(req,res) => {
  try{
    const {docId} = req.user;
    const {appointmentId} = req.body;


 
   
    const data = await appointmentModel.findByIdAndDelete(appointmentId);
    if(data){
      return res.json({success:true,message:"Deleted"});
    }
    res.json({sucess:false,error:"Failed"});



  }catch(error){
    res.json({success:false,error:error.message});
  }
}
const getTodayAppointment = async (req, res) => {
  try {
    const { docId } = req.user;

    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    const appointments = await appointmentModel.find({
      doc_id: docId,
      slot_date: formattedDate,
    });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// ====================== API TO MARK THE COMPLETION OF THE APPOINTMENT= =================================

const markCompleteAppointment = async(req,res) => {

  try{


    
    const {docId} = req.user;
    const {appointmentId} = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    if(appointment.cancelled || appointment.payment || appointment.isCompleted){
      return res.status(403).json({success : false , message : "Forbidden Action"});
    }
    const data = await appointmentModel.findOneAndUpdate({doc_id : docId , _id : appointmentId},{isCompleted:true,payment:true});
    if(data){
      return res.json({success:true ,message:'Marked'})

    }
    
    return res.json({success:false,data : 'Failed'});


  }catch(error){

    res.json({success:false,error:error.message});
  }
}


const markPaid = async (req, res) => {
  try {
    const { docId } = req.user;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findOneAndUpdate({
      _id: appointmentId,
      doc_id: docId,
    } , );

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointment.cancelled) {
      return res.status(400).json({ success: false, message: "Cannot mark a cancelled appointment as paid" });
    }

    appointment.payment = true;
    appointment.isCompleted = true;
    await appointment.save();

    return res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Error" });
  }
};








export { changeAvailable,loginDoctor,markPaid ,markCompleteAppointment,getCancelled,getTodayAppointment ,getDoctorAppointment,changeProfile,cancelAppointment,completeAppointment,dashboardDataFetch,getDoctorProfile,deleteAppointment};
