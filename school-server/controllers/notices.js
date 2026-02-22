import Notice from "../models/notices.js";

// Create a new notice
const createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json({ message: "Notice added successfully", notice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a notice by ID
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ error: "Notice not found" });
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single notice by ID
const readNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ error: "Notice not found" });
    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notices (frontend fetches this)
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }); // latest first
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createNotice, deleteNotice, readNotice, getAllNotices };