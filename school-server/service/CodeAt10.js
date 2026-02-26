import cron from "node-cron";
import AttendanceCode from "../models/attendanceCode.js";
import generateCode from "../utils/CodeGenerator.js";

const startCodeGenerator = () => {
  // We add the { scheduled: true, timezone: "Asia/Kathmandu" } object
  cron.schedule("0 10 * * *", async () => {
    // Note: ISOString uses UTC, but at 10 AM Nepal Time (4:15 AM UTC), 
    // the date will still be correct for both.
    const today = new Date().toISOString().split("T")[0];
    const code = generateCode();

    await AttendanceCode.findOneAndUpdate(
      { date: today },
      { code },
      { upsert: true }
    );

    console.log("New attendance code generated for Nepal Time:", code);
  }, {
    scheduled: true,
    timezone: "Asia/Kathmandu"
  });
};

export default startCodeGenerator;