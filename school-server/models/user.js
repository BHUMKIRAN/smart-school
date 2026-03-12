import mongoose from "mongoose";

// Create schema (structure of user document)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // name is mandatory
    },

    email: {
      type: String,
      required: true,
      unique: true, // no duplicate emails allowed
    },

 

    role: {
      type: String,
      enum: ["admin", "teacher", "student"], 
      // Only these 3 roles allowed
      default: "student",
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Export model
export default mongoose.model("user", userSchema)