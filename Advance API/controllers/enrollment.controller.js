const Enrollment = require("../models/enrollment.model");


exports.enrollInCourse = async (req, res) => {
  try {
    const { course } = req.body;
    const student = req.user.id;

    const existing = await Enrollment.findOne({ student, course });
    if (existing) return res.status(400).json({ msg: "Already enrolled" });

    const newEnrollment = await Enrollment.create({ student, course });
    res.status(201).json({ msg: "Enrolled successfully", enrollment: newEnrollment });
  } catch (err) {
    res.status(400).json({ msg: "Enrollment failed", error: err.message });
  }
};

exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate("student").populate("course");
    if (!enrollment) return res.status(404).json({ msg: "Enrollment not found" });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching enrollment", error: err.message });
  }
};

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("student").populate("course");
    res.status(201).json(enrollments);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching enrollments", error: err.message });
  }
};
