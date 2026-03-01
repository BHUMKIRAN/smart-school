import mongoose, { Schema } from "mongoose";

const boardMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false },
);

const adminStaffSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    qualification: { type: String, trim: true },
    experience: { type: String, trim: true },
  },
  { _id: false },
);

const departmentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    head: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false },
);

const landingContentSchema = new Schema(
  {
    boardMembers: { type: [boardMemberSchema], default: [] },
    adminStaff: { type: [adminStaffSchema], default: [] },
    departments: { type: [departmentSchema], default: [] },
  },
  { timestamps: true },
);

const LandingContent = mongoose.model("LandingContent", landingContentSchema);
export default LandingContent;
