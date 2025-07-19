const mongoose = require('mongoose');

const adminschema = mongoose.Schema({
 name:{
    type:'string',
 },
 email:{
    type:'string',
 },
 password:{
    type:'string'
 }
    
});

module.exports=mongoose.model('admin',adminschema,'admin');
   