import mongoose from "mongoose";
import AttendanceCode from "./models/attendanceCode.js"; // Adjust path

const seedData = [
  { code: "XY67B2", date: "2024-05-20" },
  { code: "KL99P1", date: "2024-05-21" },
  { code: "MN44Q8", date: "2024-05-22" },
  { code: "RV12Z5", date: "2024-05-23" }
];

const seedDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/smart-school");
    
    // Clear existing data to avoid unique key errors
    await AttendanceCode.deleteMany({});
    
    // Insert seed data
    await AttendanceCode.insertMany(seedData);
    
    console.log("Database Seeded successfully! ✅");
    process.exit();
  } catch (err) {
    console.error("Error seeding database: ❌", err);
    process.exit(1);
  }
};

seedDB();