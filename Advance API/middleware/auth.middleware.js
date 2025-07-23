const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const Student = require("../models/student.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ status: false, error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    let user;
    if (decoded.role === "admin") {
      user = await Admin.findById(decoded.id);
    } else {
      user = await Student.findById(decoded.id);
    }

    if (!user) return res.status(404).json({ status: false, error: "User not found" });

    req.user = {
      id: user._id,
      role: decoded.role || user.role 
    };

    next();
  } catch (err) {
    res.status(401).json({ status: false, error: "Invalid token" });
  }
};

module.exports = auth;
