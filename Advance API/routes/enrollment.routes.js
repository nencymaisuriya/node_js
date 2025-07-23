const express = require('express');
const route = express.Router();
const {
  enrollInCourse,
  getEnrollmentById,
  getAllEnrollments
} = require('../controllers/enrollment.controller');

const auth = require('../middleware/auth.middleware');
const requireRole=require('../middleware/rolebase.middleware')

route.post('/enroll', auth, requireRole('student'), enrollInCourse);
route.get('/get/:id', auth, getEnrollmentById);
route.get('/all', auth, requireRole('admin'), getAllEnrollments);//adminrole

module.exports = route;
