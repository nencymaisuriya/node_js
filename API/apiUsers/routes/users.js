const express = require('express');
const route = express.Router();

const { fecthUsers, insertUsers, DeleteUsers, UpdateUsers } = require('../controllers/userscontrollers');


route.get('/users', fecthUsers);

route.post('/users', insertUsers);

route.delete('/users/:id', DeleteUsers);

route.patch('/users/:id', UpdateUsers);

//use studnets route
route.use('/students', require('../routes/student'))


module.exports = route;