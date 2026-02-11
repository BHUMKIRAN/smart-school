import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const res = await mongoose.connect("mongodb://127.0.0.1:27017/schoolDB");
    console.log("MongoDB Connected");
    // console.log(res)
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
