const Enrollment = require('../models/enrollment.model'); 

exports.updateProgress = async (req, res) => {
  try {
    const { enrollmentId, completed } = req.body;

    const found = await Enrollment.findById(enrollmentId);
    if (!found) return res.status(404).json({ msg: "Enrollment not found" });

    found.progress = completed; 
    await found.save();

    res.status(201).json({ msg: "Progress updated", enrollment: found });
  } catch (error) {
    res.status(400).json({ msg: "Failed to update progress", error: error.message });
  }
};


exports.getProgressByStudent = async (req, res) => {
  try {
    const studentId = req.user.id;

    const progress = await Enrollment.find({ student: studentId }).populate('course');
    res.status(201).json({ msg: "Student progress fetched", progress });
  } catch (error) {
    res.status(400).json({ msg: "Failed to fetch progress", error: error.message });
  }
};


exports.getAllProgress = async (req, res) => {
  try {
    const allProgress = await Enrollment.find().populate('student').populate('course');
   res.status(201).json({ msg: "All progress records fetched", progress: allProgress });
  } catch (error) {
    res.status(400).json({ msg: "Failed to fetch all progress", error: error.message });
  }
};

