import EmergencyNotice from "../models/emergencyNotice.js";

// Create a new notice
const createEmergencyNotice = async (req, res) => {
  try {
    const notice = await EmergencyNotice.create(req.body);
    res.status(201).json({ message: "Notice added successfully", notice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a notice by ID
const deleteEmergencyNotice = async (req, res) => {
  try {
    const notice = await EmergencyNotice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ error: "Notice not found" });
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllEmergencyNotices = async(req,res)=>{
    try {
        const notices = await EmergencyNotice.find().sort({ createdAt: -1 }); // latest first
        res.json(notices);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


export { createEmergencyNotice, deleteEmergencyNotice, getAllEmergencyNotices };