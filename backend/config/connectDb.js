import mongoose from "mongoose";
import 'dotenv/config';

const connectDb = async () => {
    try {
      

        if (!process.env.MONGODB) {
            throw new Error("MONGODB URI is missing");
        }

        await mongoose.connect(process.env.MONGODB);

        console.log("DATABASE CONNECTED");
    } catch (error) {
        console.error("DB ERROR:", error.message);
        process.exit(1);
    }
};

export default connectDb;