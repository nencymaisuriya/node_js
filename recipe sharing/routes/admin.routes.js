const express = require('express');

const route = express.Router();

const { adminregister,adminlogin,alladmin,updateadmin} = require('../controller/admin.controller');

route.post('/register', adminregister);

route.post('/login', adminlogin);

route.get('/alladmin', alladmin);

route.put('/update',updateadmin);

module.exports = route;

