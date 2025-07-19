const express = require('express');

const route = express.Router();

const { userregister,userlogin,allusers,updateuser} = require('../controller/user.controller');

route.post('/register', userregister);

route.post('/login', userlogin);

route.get('/alluser', allusers);

route.put('/update',updateuser);

module.exports = route;