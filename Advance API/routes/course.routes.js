const express = require('express');
const route = express.Router();

const {
  addCourse,
  editCourse,
  deleteCourse,
  getCourseById,
  getAllCourses
} = require('../controllers/course.controller');

const auth  = require('../middleware/auth.middleware');
const  requireRole= require('../middleware/rolebase.middleware');


route.post('/add', auth, requireRole('admin'), addCourse);
route.put('/edit/:id', auth, requireRole('admin'), editCourse);
route.delete('/delete/:id', auth, requireRole('admin'), deleteCourse);


route.get('/get/:id', auth, getCourseById);
route.get('/all', auth, getAllCourses);

module.exports = route;




