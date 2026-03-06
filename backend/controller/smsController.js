import twilio from 'twilio';
import 'dotenv/config';

// Twilio credentials from .env
const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

export const sendSMS = async (req, res) => {
  try {
    const {name,email, message } = req.body; 


    const newMessage = `Message from ${name} -- ${email} ---- ${message}`;

    

    const sms = await client.messages.create({
      body: message,          
      from: process.env.TWILIO_MOBILE_NO, 
      to: process.env.MY_MOBILE_NO,                
    });

    res.status(200).json({ success: true, sid: sms.sid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
