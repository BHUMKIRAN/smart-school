import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const applicationSchema = new Schema({
  student: {
    type: Types.ObjectId,
    ref: "Student",
    required: true,
  },
  type: {
    type: String,
    enum: ["Leave Certificate", "Transfer Certificate", "Scholarship", "Other"],
    required: true,
  },
  date: { type: Date, default: Date.now },
  priority: { type: String, enum: ["Normal", "High"], default: "Normal" },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  reason: { type: String, default: "" },
}, { timestamps: true });

// Methods to approve/reject
applicationSchema.methods.approve = function() {
  this.status = "Accepted";
  return this.save();
};

applicationSchema.methods.reject = function() {
  this.status = "Rejected";
  return this.save();
};

// Auto-populate student including grade
applicationSchema.pre(/^find/, function() {
  this.populate({
    path: "student",
    select: "name email grade",
    populate: { path: "grade", select: "name section" }, // only if grade is a ref
  });
});

export default model("Application", applicationSchema);
