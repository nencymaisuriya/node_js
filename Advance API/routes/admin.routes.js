const express = require("express");
const route = express.Router();

const {
  registerAdmin,
  loginAdmin,
  registerStudent,
  loginStudent,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  AdminProfile,       
  updateProfile       
} = require("../controllers/admin.controller");


const auth = require('../middleware/auth.middleware');

// Admin Auth Routes
route.post("/admin/register", registerAdmin);
route.post("/admin/login", loginAdmin);

// Admin CRUD
route.get("/admin/alladmins", getAllAdmins);
route.get("/admin/:id", getAdminById);
route.put("/admin/:id", updateAdmin);
route.delete("/admin/:id", deleteAdmin);

// Student Auth Routes
route.post("/student/register", registerStudent);
route.post("/student/login", loginStudent);

// Student CRUD
route.get("/student/all", getAllStudents);
route.get("/student/:id", getStudentById);
route.put("/student/:id", updateStudent);
route.delete("/student/:id", deleteStudent);

//profile for both
route.get("/profile", auth, AdminProfile);
route.put("/profile", auth, updateProfile);

module.exports = route;




