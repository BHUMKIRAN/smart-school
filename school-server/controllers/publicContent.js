import LandingContent from "../models/landingContent.js";
import Teacher from "../models/teacher.js";

const getSchoolPageContent = async (_req, res) => {
  try {
    const [content, teachers] = await Promise.all([
      LandingContent.findOne().lean(),
      Teacher.find({ isActive: true }).select("name subject department").lean(),
    ]);

    res.json({
      boardMembers: content?.boardMembers ?? [],
      adminStaff: content?.adminStaff ?? [],
      departments: content?.departments ?? [],
      teachers: (teachers ?? []).map((teacher) => ({
        name: teacher.name,
        subject: teacher.subject,
        department: teacher.department,
      })),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch school page content",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { getSchoolPageContent };
