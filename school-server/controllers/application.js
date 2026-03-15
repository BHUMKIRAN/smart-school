import Application from "../models/application.js";

// Student submits a new application

export const createApplication = async (req, res) => {
  try {
    // Use student from payload
    const { type, priority, reason, student } = req.body;
    if (!student) return res.status(400).json({ message: "Student ID required" });

    const newApplication = await Application.create({
      student, // use student from payload
      type,
      priority: priority || "Normal",
      reason: reason || "",
    });

    res.status(201).json({ message: "Application submitted", application: newApplication });
  } catch (error) {
    res.status(500).json({ message: "Error submitting application", error: error.message });
  }
};
// Admin gets all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};
// Admin updates status (approve/reject)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // action = "approve" or "reject"

    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: "Application not found" });

    if (action === "approve") await application.approve();
    else if (action === "reject") await application.reject();
    else return res.status(400).json({ message: "Invalid action" });

    res.status(200).json({ message: `Application ${action}d`, application });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};
