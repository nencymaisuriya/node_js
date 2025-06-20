const express = require('express')
const route = express.Router();

const upload = require('../middleware/student');



const { addstudents, fetchStudents, DeleteStudents, updateStudents, fetchSingleStudents } = require('../controllers/studentcontrollers');



route.get('/fetchStud', fetchStudents);

route.post('/addStud', upload.single('image'), addstudents);

route.delete('/deleteStud/:id', DeleteStudents);

route.put('/updateStud/:id', upload.single('image'), updateStudents);

route.get('/fecthSingalStud/:id', fetchSingleStudents);




module.exports = route; 