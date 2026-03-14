import AttendanceCode from "../models/attendanceCode.js";
import getNepalDateString from "../utils/attendanceDate.js";

export const getTodayAttendanceCode = async (req, res) => {
  try {
    const today = getNepalDateString();

    const attendanceCode = await AttendanceCode.findOne({ date: today });

    if (!attendanceCode) {
      return res.status(404).json({
        success: false,
        message: "Attendance code not found for today",
      });
    }

    res.status(200).json({
      success: true,
      data: attendanceCode,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching attendance code",
      error: error.message,
    });
  }
};
