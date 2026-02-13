import mongoose from "mongoose";

// Function to connect MongoDB
const connectDB = async () => {
  try {
    // Connect using MONGO_URI from .env
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully ");

  } catch (error) {
    console.error("Database connection failed ", error.message);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;