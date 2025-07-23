const Admin = require("../models/admin.model");
const Student = require("../models/student.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword ,role: "admin" });

    res.status(201).json({ msg: "Admin registered", admin });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
  { id: admin._id, role: admin.role }, 
  process.env.SECRET,
  { expiresIn: "7d" }
);



    res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Student.create({ name, email, password: hashedPassword });

    res.status(201).json({ msg: "Student registered", student });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ msg: "Student not found" });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(401).json({ msg: "Invalid credentials" });

     const token = jwt.sign(
  { id: student._id, role: student.role }, 
  process.env.SECRET,
  { expiresIn: "7d" }
);

    res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};

//================= ADMIN CRUD =================//

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching admins", error: err.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching admin", error: err.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const updated = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Admin not found" });
    res.status(200).json({ msg: "Admin updated", admin: updated });
  } catch (err) {
    res.status(500).json({ msg: "Update failed", error: err.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Admin not found" });
    res.status(200).json({ msg: "Admin deleted", admin: deleted });
  } catch (err) {
    res.status(500).json({ msg: "Deletion failed", error: err.message });
  }
};



exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching students", error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching student", error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Student not found" });
    res.status(200).json({ msg: "Student updated", student: updated });
  } catch (err) {
    res.status(500).json({ msg: "Update failed", error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Student not found" });
    res.status(200).json({ msg: "Student deleted", student: deleted });
  } catch (err) {
    res.status(500).json({ msg: "Deletion failed", error: err.message });
  }
};


exports.AdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id; 

    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    res.status(200).json({ msg: "Admin profile fetched", admin });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching admin profile", error: error.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const model = req.user.role === "admin" ? Admin : Student;
    const updatedUser = await model.findByIdAndUpdate(req.user._id, req.body, { new: true });

    res.status(200).json({ msg: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: "Profile update failed", error: err.message });
  }
};
