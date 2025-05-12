const express = require('express');
const multer = require('multer');
const path = require('path');
const route = express.Router();

const {
  dashboardPage,
  addAdminPage,
  insertAdmin,
  viewAdminPage,
  updateAdmin,
  editAdmin,
  deleteAdmin,
  profile,
  login,
  userChecked,
  logout,
  passchange,
  passchangepage,
  lostpass,
  otpVerify,
  checkEmail,
  checkOTP,
  newSetPasswordPage, // ✅ Add this
  updateNewPassword
} = require('../controllers/admincontroller');

// Multer configuration

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // not inside /public
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });
console.log('routing');

// Routing
route.get('/', login);
route.post('/login', userChecked);
route.get('/logout', logout);

route.get('/dashboard', dashboardPage);

route.get('/addAdmin', addAdminPage);
route.post('/insertAdmin', upload.single('image'), insertAdmin);

route.get('/viewadmin', viewAdminPage);
route.get('/updateAdmin', updateAdmin);
route.post('/editAdmin/:editId', upload.single('image'), editAdmin);
route.get('/deleteAdmin/:id', deleteAdmin);

route.get('/profile', profile);

// Password Change
route.get('/passchange', passchangepage);
route.post('/passwordChange', passchange);

// Lost Password / OTP Flow
route.get('/lostpass', lostpass);
route.post('/checkEmail', checkEmail);
route.get('/otpVerify', otpVerify);
route.post('/checkOTP', checkOTP);
route.get('/newSetPasswordPage', newSetPasswordPage); 
route.post('/updateNewPassword',updateNewPassword)

module.exports = route;
//gmankvwsxcrctlwc