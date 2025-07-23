const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'student'],
    required: true
  }
});

module.exports = mongoose.model("Admin", adminSchema);

