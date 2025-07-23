const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ['student'],
    default: 'student'
  }
});

module.exports = mongoose.model('student', studentSchema,'student');



