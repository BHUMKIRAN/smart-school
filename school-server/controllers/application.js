import Application from "../models/application.js";

export const createApplication = async (req, res) => {
  try {
    const { studentId, message } = req.body;

    const application = new Application({
      student: studentId,
      message,
    });

    await application.save();

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student", "name email class")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Application status updated",
      application,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};