import mongoose from "mongoose";

// Function to connect MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri || typeof mongoUri !== "string") {
      throw new Error(
        "MONGO_URI is not set. In Docker Compose, use the Mongo service name (e.g. mongodb://db:27017/smart-school).",
      );
    }

    // Connect using MONGO_URI from environment / .env
    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected Successfully ");

  } catch (error) {
    console.error("Database connection failed ", error.message);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
