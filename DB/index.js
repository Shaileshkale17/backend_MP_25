import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//new 

export const ConnectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_API}/${process.env.DB_NAME}`
    );
    console.log(
      `\n MongoDB Connection Instance || !BD HOST ${ConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection Error: " + error);
    process.exit(1);
  }
};
