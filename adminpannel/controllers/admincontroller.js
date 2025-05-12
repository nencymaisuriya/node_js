const Admin = require('../models/adminmodel');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Dashboard Page
const dashboardPage = async (req, res) => {
    const currentAdmin = await Admin.findById(req.cookies.adminId);
    if (!currentAdmin) return res.redirect('/');
    res.render('dashboard', { currentAdmin });
};

// Add Admin Page
const addAdminPage = async (req, res) => {
    const currentAdmin = await Admin.findById(req.cookies.adminId);
    res.render('addadmin', { currentAdmin });
};

// Insert New Admin
const insertAdmin = async (req, res) => {
    try {
       req.body.image = "/uploads/" + req.file.filename;

        const insert = await Admin.create(req.body);

        if (insert) {
            console.log("Admin Data is Inserted...");
        } else {
            console.log("Admin Data is not inserted...");
        }

        res.redirect('/addAdmin');
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
};



// View All Admins (excluding current)
const viewAdminPage = async (req, res) => {
    const adminId = req.cookies.adminId;

    if (!adminId) {
        console.log('adminId cookie not found');
        return res.redirect('/');
    }

    try {
        const currentAdmin = await Admin.findById(adminId);
        const records = await Admin.find({ _id: { $ne: adminId } });

        console.log("User Data", records);
        res.render('viewAdmin', { records, currentAdmin });
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
};


// Edit Admin Page
const updateAdmin = async (req, res) => {
    const updateId = req.query.id;

    try {
        const data = await Admin.findById(updateId);
        const currentAdmin = req.cookies.admin;

        if (data) {
            res.render('updateAdmin', { data, currentAdmin });
        } else {
            console.log("Single Record not found...");

        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
}

// Edit Admin Logic
const editAdmin = async (req, res) => {
    const editId = req.params.editId;

    try {
        const data = await Admin.findById(editId);
        if (req.file) {
            const oldImagePath = path.join(__dirname, '..', data.image);  
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            req.body.image = "/uploads/" + req.file.filename;
        } else {
            req.body.image = data.image;
        }
        await Admin.findByIdAndUpdate(editId, req.body);
        res.redirect('/viewadmin');
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
};


// Delete Admin
const deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const data = await Admin.findById(adminId);
        const imagePath = path.join(__dirname, '..', data.image);

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); 
        } else {
            console.log("Image file not found, skipping deletion.");
        }
        await Admin.findByIdAndDelete(adminId);

        res.redirect('/viewAdmin'); 
    } catch (e) {
        console.log("Error during deletion:", e);
        res.send(`<p> Not Found : ${e} </p>`);
    }
};

// Login Page
const login = (req, res) => {
    if (req.cookies.adminId) return res.redirect('/dashboard');
    res.render('login');
};

// Login Logic
const userChecked = async (req, res) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (user && user.password === password) {
        res.cookie('adminId', user._id.toString(), { httpOnly: true });
        return res.redirect('/dashboard');
    }
    res.redirect('/');
};

// Logout
const logout = (req, res) => {
    res.clearCookie('adminId');
    res.redirect('/');
};

// Profile Page
const profile = async (req, res) => {
    const currentAdmin = await Admin.findById(req.cookies.adminId);
    res.render('profile', { currentAdmin });
};

// Password Change Page
const passchangepage = async (req, res) => {
    const adminId = req.cookies.adminId;
    if (adminId) {
        try {
            const currentAdmin = await Admin.findById(adminId);
            res.render('passwordChange', { currentAdmin });
        } catch (err) {
            console.log("Error loading admin:", err);
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
};


// Handle Password Change
const passchange = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const adminId = req.cookies.adminId;

    if (!adminId) {
        return res.redirect('/');
    }

    try {
        const myAdmin = await Admin.findById(adminId);

        if (myAdmin.password === currentPassword) {
            if (newPassword !== currentPassword) {
                if (newPassword === confirmPassword) {
                    await Admin.findByIdAndUpdate(adminId, { password: newPassword });
                    console.log("Password updated...");
                    res.clearCookie('adminId');
                    res.redirect('/');
                } else {
                    console.log("New and confirm passwords do not match");
                    res.redirect('/changePassword');
                }
            } else {
                console.log("New password should be different from current password");
                res.redirect('/changePassword');
            }
        } else {
            console.log("Current password is incorrect");
            res.redirect('/changePassword');
        }
    } catch (e) {
        console.error("Password update error:", e);
        res.send(`<p> Error: ${e} </p>`);
    }
};



// Forgot Password Pages
const lostpass = async (req, res) => {
    res.render('lostpass');
}

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
            html: `<html>...<div class="otp-box">OTP: ${OTP}</div>...</html>`,
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

//Verify OTP
const otpVerify = (req, res) =>{
res.render('otpVerify');
} 

//Check OTP
const checkOTP = (req, res) => {
    if (req.body.OTP === req.cookies.OTP) {
        res.redirect('/newSetPasswordPage');
    } else {
        res.redirect('otpVerify');
    }
};

// New Password Set Page
const newSetPasswordPage = (req, res) =>{
     res.render('newSetPasswordpage');
}

// Update Password
const updateNewPassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) return res.redirect('back');

        const email = req.cookies.email;
        const user = await Admin.findOne({ email });
        if (!user) return res.redirect('back');

        const updated = await Admin.findByIdAndUpdate(user.id, { password: newPassword });
        if (updated) {
            res.clearCookie('email');
            res.clearCookie('OTP');
            res.redirect('/');
        } else {
            res.redirect('back');
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
    passchangepage,
    passchange,
    lostpass,
    otpVerify,
    checkEmail,
    checkOTP,
    newSetPasswordPage,
    updateNewPassword
};
