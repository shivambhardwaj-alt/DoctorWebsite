import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_APP_EMAIL,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});



export default transporter;