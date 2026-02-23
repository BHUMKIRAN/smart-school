import mongoose from "mongoose";

const emergencyNoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Notice message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    postedBy: {
      type: String,
      default: "Admin", // or store userId if you have authentication
    },
  },
  {
    timestamps: true, // automatically creates createdAt and updatedAt
  }
);

export default  mongoose.model("EmergencyNotice", emergencyNoticeSchema);