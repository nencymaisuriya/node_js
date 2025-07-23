const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true
  },
  progress: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started"
  }
}, { timestamps: true });

module.exports = mongoose.model('enrollment', enrollmentSchema,'enrollment');
