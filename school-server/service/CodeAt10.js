import cron from "node-cron";
import AttendanceCode from "../models/attendanceCode.js";
import generateCode from "../utils/CodeGenerator.js";
import getNepalDateString from "../utils/attendanceDate.js";

const startCodeGenerator = () => {
  const ensureTodayCode = async () => {
    const today = getNepalDateString();
    const existing = await AttendanceCode.findOne({ date: today });
    if (!existing) {
      const code = generateCode();
      await AttendanceCode.create({ date: today, code });
      console.log("Attendance code initialized for Nepal date:", today, code);
    }
  };

  ensureTodayCode().catch((error) => {
    console.error("Failed to initialize attendance code:", error);
  });

  // We add the { scheduled: true, timezone: "Asia/Kathmandu" } object
  cron.schedule("0 10 * * *", async () => {
    try {
      const today = getNepalDateString();
      const code = generateCode();

      await AttendanceCode.findOneAndUpdate(
        { date: today },
        { code },
        { upsert: true }
      );

      console.log("New attendance code generated for Nepal date:", today, code);
    } catch (error) {
      console.error("Failed to generate attendance code:", error);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kathmandu"
  });
};

export default startCodeGenerator;
