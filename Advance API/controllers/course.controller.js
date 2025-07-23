const Course = require("../models/course.model");

exports.addCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      createdBy: req.user._id 
    });
    res.status(201).json({ msg: "Course added successfully", course });
  } catch (err) {
    res.status(400).json({ msg: "Error adding course", error: err.message });
  }
};


exports.editCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.status(201).json({ msg: "Course updated successfully", course });
  } catch (err) {
    res.status(400).json({ msg: "Error updating course", error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.starus(201).json({ msg: "Course deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Error deleting course", error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ msg: "Error retrieving course", error: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(201).json(courses);
  } catch (err) {
    res.status(400).json({ msg: "Error retrieving courses", error: err.message });
  }
};
