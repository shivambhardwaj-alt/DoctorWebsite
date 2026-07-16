
import 'dotenv/config';




import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Razorpay from "razorpay";
import { v2 as cloudinary } from 'cloudinary';


import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorsModel.js';
import appointmentModel from '../models/appointmentModel.js';


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Credentials" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Wrong Email' });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: 'Please Make Password Strong' });
    }

  
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword
    };

    const newUser = new userModel(userData);

    
    const user = await newUser.save();
    console.log(user);

    
    const { password_new, ...userWithoutPassword } = user._doc;

  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, message: 'Signed Up', token, userWithoutPassword });

  } catch (error) {
    res.json({ success: false, message: 'Signup Failed' });
  }
};

// ====================== login user ======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userModel.findOne({ email: email });
    if (!existUser) {
      return res.status(401).json({ success: false, message: "Wrong Credentials" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    const userObj = existUser.toObject();
    delete userObj.password;

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Wrong Password" });
    }

    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token, userObj });

  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

// ====================api to fetch all the doctors which holds the value true========================
const getDoctors = async (req, res) => {
  try {
    const availableDoctors = await doctorModel.find({ available: true }).select("-password");

    res.status(200).json({
      success: true,
      count: availableDoctors.length,
      availableDoctors,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ============================= api to get the profile of the user =============================
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel
      .findById(userId)
      .select("-password");

    res.json({ success: true, userData });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================api to update the profile of the user ========================
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.user.id;

    let image_url = req.body.image;

    // ===== Upload image if provided =====
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        { resource_type: "image" }
      );
      image_url = uploadResult.secure_url;
    }
    console.log(image_url);

    // ===== Safe address handling =====
    let parsedAddress = address;
    if (typeof (address) === "string") {
      parsedAddress = JSON.parse(address);
    }

    // ===== Update object =====
    const updateData = {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    };

    if (image_url) {
      updateData.image = image_url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
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

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =========================== Api to make an appointment =======================
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { doc_id, slot_date, slotTime } = req.body;

    console.log("Request forwarded");
    console.log(userId);
    console.log(req.body);

    // ================= Fetch Doctor =================
    const docData = await doctorModel
      .findById(doc_id)
      .select('-password');

    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }

    // ================= Slot Booking Logic =================
    let slots_booked = docData.slots_booked || {};

    if (slots_booked[slot_date]) {
      if (slots_booked[slot_date].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not Available" });
      } else {
        slots_booked[slot_date].push(slotTime);
      }
    } else {
      slots_booked[slot_date] = [slotTime];
    }

    await doctorModel.findByIdAndUpdate(doc_id, {
      slots_booked
    });

    // ================= Fetch User =================
    const userData = await userModel
      .findById(userId)
      .select('-password');

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // ================= Clean Doctor Data =================
    const doctorDataForAppointment = {
      ...docData.toObject()
    };
    delete doctorDataForAppointment.slots_booked;
    delete doctorDataForAppointment.password;

    // ================= Create Appointment =================
    const appointmentData = {
      userId,
      doc_id,
      userData,
      docData: doctorDataForAppointment,
      amount: docData.fees,
      slotTime,
      slot_date,
      date: Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    return res.json({
      success: true,
      message: "Appointment Booked!"
    });

  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      error: error.message
    });
  }
};

// ========================Api to get all the user appointment ============================
const myAppointmentList = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await appointmentModel.find({
      userId: userId,
    });

    res.json({ success: true, appointments });

  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}

// ==============================Api to delete the appointment =============================
const deleteAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, error: "User Not Found" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { doc_id, slot_date, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(doc_id);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slot_date] = slots_booked[slot_date].filter((e) => e !== slotTime);

    await doctorModel.findByIdAndUpdate(doc_id, { slots_booked });

    res.json({ success: true, message: 'Cancelled' });

  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}

// ====================Api to make payments ================================
const paymentRazorpay = async (req, res) => {
  console.log("Request came here for the transaction");
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: 'Appointment Cancelled or Not Found',
      });
    }

    if (!appointmentData.amount || appointmentData.amount <= 0) {
      return res.json({
        success: false,
        message: 'Invalid appointment amount',
      });
    }

    const options = {
      amount: Math.round(appointmentData.amount * 100),
      currency: process.env.CURRENCY || 'INR',
      receipt: appointmentId,
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const setRazorPay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status == 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: 'Payment Failed' });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Payment Failed' });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    const { docId } = req.params;

    const docData = await doctorModel.findById(docId).select('slots_booked');

    if (!docData) {
      return res.json({ success: false, message: 'Doctor not found' });
    }

    const slots_booked = docData.slots_booked || {};
    const bookedSlots = [];

    for (const slot_date in slots_booked) {
      const [day, month, year] = slot_date.split('-');
      const times = slots_booked[slot_date];
      times.forEach(time => {
        bookedSlots.push(`${year}-${month}-${day}_${time}`);
      });
    }

    res.json({ success: true, bookedSlots });

  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error.message });
  }
};

export {
  registerUser,
  setRazorPay,
  loginUser,
  getDoctors,
  updateProfile,
  getUserProfile,
  bookAppointment,
  myAppointmentList,
  deleteAppointment,
  paymentRazorpay,
  getBookedSlots
};