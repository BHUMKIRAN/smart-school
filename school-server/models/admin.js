import mongoose from "mongoose";

// Create schema (structure of user document)
const adminSchema = new mongoose.Schema(
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

    password: {
      type: String,
      required: true, // must store hashed password
    },
    resetPasswordToken : String ,
    resetPasswordExpire : Date,
  },
  { timestamps: true }, // Automatically adds createdAt & updatedAt
);

// Export model
export default mongoose.model("Admin", adminSchema);
