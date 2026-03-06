import transporter from "../config/ConnectMailer.js";
import userModel from "../models/userModel.js";

import 'dotenv/config';

export const sendMailDeveloper = async (req, res) => {
  try {
    const { message } = req.body;

    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userEmail = user.email;
    console.log(userEmail)

    await transporter.sendMail({
      from: `"Doctor Booking" <${userEmail}>`,
      to: process.env.NODEMAILER_APP_EMAIL, 
      subject: "Booking Website for me ", 
      html: `<p>${message}</p>`,
    });

    res.status(200).json({ success: true, message: "Email Sent Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email sent Failed" });
  }
};

