const Admin = require('../models/adminmodel');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Dashboard Page
const dashboardPage = async (req, res) => {
        res.render('dashboard', { success: req.flash('success'), error: req.flash('error') });
   
};

// Add Admin Page
const addAdminPage = (req, res) => {
        res.render('addAdmin', { success: req.flash('success'), error: req.flash('error') });
   
};

// Insert New Admin
const insertAdmin = async (req, res) => {
    try {
        req.body.image = req.file.path;
        const insert = await Admin.create(req.body);
        if (insert) {
            req.flash('success', 'Admin added successfully!');
        } else {
            req.flash('error', 'Admin could not be added.');
        }
        res.redirect('/addAdmin');
    } catch (error) {
        req.flash('error', 'Something went wrong.');
        res.send(`<h2> not found : ${error} </h2>`);
    }
};

// View All Admins (excluding current)
const viewAdminPage = async (req, res) => {
    try {
        const records = await Admin.find();
        res.render('viewAdmin', {
            
            records,
            success: req.flash('success'),
            error: req.flash('error')
        });
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
};

// Edit Admin Page
const updateAdmin = async (req, res) => {
    try {
        const data = await Admin.findById(req.query.id);
        if (data) {
            res.render('updateAdmin', {
                data,
                success: "",
                error: ""
            });
        } else {
            console.log("Single Record not found...");
        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
};

// Edit Admin Logic
const editAdmin = async (req, res) => {
    try {
        const data = await Admin.findById(req.params.editId);
        if (!data) return res.send("Admin not found");

        // If new image is uploaded, delete old one and update path
        if (req.file) {
            const oldPath = "public" + data.image; // e.g., "/uploads/xyz.jpg"
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

            req.body.image = "/uploads/" + req.file.filename;
        } else {
            req.body.image = data.image; // keep old image
        }

        await Admin.findByIdAndUpdate(req.params.editId, req.body);
        req.flash('success', 'Admin updated successfully');
        res.redirect('/viewadmin');

    } catch (e) {
        console.error("Edit error:", e);
        res.send(`<p>Error: ${e.message}</p>`);
    }
};


// Delete Admin
const deleteAdmin = async (req, res) => {
    try {
        const data = await Admin.findById(req.params.id);
        if (!data) return res.status(404).send("Admin not found");

        const imagePath = path.join(__dirname, '..', data.image.replace(/^\/+/, ''));
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        await Admin.findByIdAndDelete(req.params.id);
        req.flash('success', 'Admin deleted successfully');
        res.redirect('/viewAdmin');
    } catch (e) {
        console.error("Delete error:", e);
        res.status(500).send(`<p> Error: ${e} </p>`);
    }
};

// Login Page
const login = (req, res) => {
    res.render('login', { success: "", error: "" });
};

// Login Logic
const userChecked = async (req, res) => {
    console.log("-------Running------------");
        req.flash('success', 'Admin login successfully');
        res.redirect("/dashboard");
};

// Logout
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err);
        res.redirect("/");
    });
};

// Profile Page
const profile = async (req, res) => {
    const currentAdmin = req.user;
    res.render("profile", { currentAdmin, success: "", error: "" });
};


//profile update 
const profileupdateAdmin = async (req, res) => {
    const updateId = req.query.id;

    try {
        const data = await Admin.findById(updateId);
        const currentAdmin = req.user;

        if (data) {
            res.render('profileUpdate', { data, currentAdmin ,success: "", error: "" });
        } else {
            console.log("Single Record not found...");

        }
    } catch (e) {

        res.send(`<p> Not Found : ${e} </p>`);
    }
}

//edit profile
const editProfile= async (req, res) => {
    try {
        const data = await Admin.findById(req.params.editId);
        if (!data) return res.send("Admin not found");

        // If new image is uploaded, delete old one and update path
        if (req.file) {
            const oldPath = "public" + data.image; // e.g., "/uploads/xyz.jpg"
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

            req.body.image = "/uploads/" + req.file.filename;
        } else {
            req.body.image = data.image; // keep old image
        }

        await Admin.findByIdAndUpdate(req.params.editId, req.body);
        req.flash('success', 'update successfully');
        res.redirect('/profile');

    } catch (e) {
        console.error("Edit error:", e);
        res.send(`<p>Error: ${e.message}</p>`);
    }
};



// Password Change Page
const passchangepage = async (req, res) => {
        res.render('passwordChange',{success: "", error: "" }); 
    };

// Handle Password Change
const passchange = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {
        if (!req.user) {
            req.flash('error', 'User not logged in');
            return res.redirect('/passchange');
        }

        const myAdmin = await Admin.findById(req.user.id);

        if (myAdmin.password !== currentPassword) {
            req.flash('error', 'Current password is incorrect');
            return res.redirect('/passchange');
        }

        if (newPassword === currentPassword) {
            req.flash('error', 'New password must be different from current password');
            return res.redirect('/passchange');
        }

        if (newPassword !== confirmPassword) {
            req.flash('error', 'New and confirm passwords do not match');
            return res.redirect('/passchange');
        }

        await Admin.findByIdAndUpdate(req.user.id, { password: newPassword });
        req.flash('success', 'Password updated successfully. Please log in again.');
        return req.logout(() => res.redirect('/'));
    } catch (e) {
        console.error("Password update error:", e);
        req.flash('error', 'Something went wrong.');
        return res.redirect('/passchange');
    }
};


// Forgot Password Page
const lostpass = async (req, res) => {
    res.render('lostpass');
};

// Send OTP
const checkEmail = async (req, res) => {
    const email = req.body.email;
    const data = await Admin.findOne({ email });

    if (data) {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            service: "gmail",
            secure: false,
            auth: {
                user: "nencymaisuriya@gmail.com",
                pass: "yzdltsnjhxurspnw",
            },
        });

        const OTP = Math.floor(Math.random() * 999999);

        const info = await transporter.sendMail({
            from: 'nencymaisuriya@gmail.com',
            to: email,
            subject: "One-Time Password (OTP) for Forget Password",
            html:  `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f3f3f3;
          padding: 0;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: 30px auto;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }
        .sub-header {
          text-align: center;
          font-size: 16px;
          color: #555;
          margin-bottom: 20px;
        }
        .greeting {
          font-size: 16px;
          color: #333;
          margin-bottom: 20px;
        }
        .otp-box {
          text-align: center;
          font-size: 36px;
          color: #4CAF50;
          font-weight: bold;
          margin: 30px 0;
          border: 2px dashed #4CAF50;
          padding: 20px;
          border-radius: 10px;
          background-color: #f9f9f9;
        }
        .note {
          font-size: 14px;
          color: #777;
          margin-bottom: 20px;
          text-align: center;
        }
        .support {
          font-size: 14px;
          color: #555;
          margin-top: 30px;
          text-align: center;
        }
        .footer {
          text-align: center;
          font-size: 13px;
          color: #aaa;
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">OTP Verification</div>
        <div class="sub-header">Secure your account with the One-Time Password (OTP)</div>

        <div class="greeting">
          Hello <strong>${email}</strong>,<br><br>
          We received a request to reset your password. Please use the following One-Time Password (OTP) to proceed with the verification:
        </div>

        <div class="otp-box">${OTP}</div>

        <div class="note">
          ⚠️ This OTP is valid for <strong>5 minutes</strong> only. Do not share it with anyone for security reasons.
        </div>

        <div class="support">
          If you did not request a password reset, please ignore this email or contact our support team immediately.<br>
          Need help? Reach out at <a href="mailto:support@example.com">support@example.com</a>
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </div>
    </body>
  </html>,
`

        });

        if (info.messageId) {
            res.cookie('OTP', OTP);
            res.cookie('email', email);
            res.redirect('otpVerify');
        } else {
            res.redirect('lostPass');
        }
    } else {
        res.redirect('/lostPass');
    }
};   

// Verify OTP Page
const otpVerify = (req, res) => {
    res.render('otpVerify');
};

// Check OTP
const checkOTP = (req, res) => {
    if (req.body.OTP === req.cookies.OTP) {
        res.redirect('/newSetPasswordPage');
    } else {
        res.redirect('otpVerify');
    }
};

// New Password Set Page
const newSetPasswordPage = (req, res) => {
    res.render('newSetPasswordpage');
};

// Update New Password
const updateNewPassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) return res.redirect('/newSetPasswordPage');

        const email = req.cookies.email;
        const user = await Admin.findOne({ email });
        if (!user) return res.redirect('/newSetPasswordPage');

        const updated = await Admin.findByIdAndUpdate(user.id, { password: newPassword });
        if (updated) {
            res.clearCookie('email');
            res.clearCookie('OTP');
            res.redirect('/');
        } else {
            res.redirect('/newSetPasswordPage');
        }
    } catch (e) {
        res.send(`Not Found : ${e}`);
    }
};

module.exports = {
    dashboardPage,
    addAdminPage,
    insertAdmin,
    viewAdminPage,
    updateAdmin,
    editAdmin,
    deleteAdmin,
    login,
    userChecked,
    logout,
    profile,
    editProfile,
    profileupdateAdmin,
    passchangepage,
    passchange,
    lostpass,
    otpVerify,
    checkEmail,
    checkOTP,
    newSetPasswordPage,
    updateNewPassword
};
