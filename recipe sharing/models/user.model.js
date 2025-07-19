const mongoose = require('mongoose');

const usernschema = mongoose.Schema({
 email:{
    type:'string',
 },
 password:{
    type:'string'
 }
    
});

module.exports=mongoose.model('user',usernschema,'user');
   