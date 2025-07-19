const mongoose = require('mongoose');

mongoose.connect(process.env.uri)
  .then(() => console.log('Connected'))
  .catch((e)=>console.log('Error',e))
