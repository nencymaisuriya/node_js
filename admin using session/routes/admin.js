const express = require('express');
const passport = require('passport');
const upload = require("../middleware/adminmulter");
const passportmiddleware = require("../middleware/passport");
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
  profileupdateAdmin,
  editProfile,
  login,
  userChecked,
  logout,
  passchange,
  passchangepage,
  lostpass,
  otpVerify,
  checkEmail,
  checkOTP,
  newSetPasswordPage, 
  updateNewPassword
} = require('../controllers/admincontroller');
console.log('routing');

route.get('/', passport.checkLostPasswordAuthentication, login);
route.post('/login', passport.authenticate('local', {failureRedirect : "/"}), userChecked);
route.get('/logout', logout);   

route.get('/dashboard',passport.checkAuthentication, dashboardPage);

route.get('/addAdmin',passport.checkAuthentication, addAdminPage);
route.post('/insertAdmin', upload.single('image'), insertAdmin);

route.get('/viewadmin',passport.checkAuthentication, viewAdminPage);
route.get('/updateAdmin',passport.checkAuthentication, updateAdmin);
route.post('/editAdmin/:editId', upload.single('image'), editAdmin);
route.get('/deleteAdmin/:id',passport.checkAuthentication, deleteAdmin);

route.get('/profile',passport.checkAuthentication, profile);
route.get('/profileupdateAdmin',passport.checkAuthentication, profileupdateAdmin);
route.post('/editProfile/:editId', upload.single('image'), editProfile);

// Password Change
route.get('/passchange',passport.checkAuthentication, passchangepage);
route.post('/passwordChange', passchange);

// Lost Password / OTP Flow
route.get('/lostpass',passport.checkLostPasswordAuthentication, lostpass);
route.post('/checkEmail', checkEmail);
route.get('/otpVerify',passport.checkLostPasswordAuthentication, otpVerify);
route.post('/checkOTP', checkOTP);
route.get('/newSetPasswordPage',passport.checkLostPasswordAuthentication, newSetPasswordPage); 
route.post('/updateNewPassword',updateNewPassword)

module.exports = route, passportmiddleware;

