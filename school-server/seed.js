import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/admin.js";

const MONGO_URI = "mongodb+srv://kirankhatri787_db_user:gMRyjJKgxXWYy8NJ@school.ilzuwoa.mongodb.net/"

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);

    const existingAdmin = await Admin.findOne({
      email: "kiran.khatri.787@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Bhadaure@123", 10);

    await Admin.create({
      name: "Super Admin",
      email: "kiran.khatri.787@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
}

seedAdmin();