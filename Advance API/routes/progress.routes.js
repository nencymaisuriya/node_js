const express = require('express');
const route = express.Router();
const {
  updateProgress,
  getProgressByStudent,
  getAllProgress
} = require('../controllers/progress.controller');

const auth = require('../middleware/auth.middleware');
const requireRole =require('../middleware/rolebase.middleware');

route.put('/update', auth, requireRole, updateProgress);//roleadmin
route.post('/student', auth, requireRole, getProgressByStudent);//rolestud
route.get('/all', auth, requireRole, getAllProgress);//roleadmin

module.exports = route;
