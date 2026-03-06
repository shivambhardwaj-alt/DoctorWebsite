import mongoose from "mongoose";
import 'dotenv/config';

const connectDb = async() =>{
    mongoose.connection.on('connected' ,() => {
        console.log('DATABASE CONNECTED ');
    })
    await mongoose.connect(`${process.env.MONGODB_LOCAL}/careConnect`);
}


export default connectDb;