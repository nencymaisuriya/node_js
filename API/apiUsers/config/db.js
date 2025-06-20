const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/APIUsers"

mongoose.connect(url);

const db =mongoose.connection;

db.on("connected",()=>{
    console.log("db is connected.");  
})
db.on("error",(err)=>{
    console.log("error",err);
    
})
db.on("disconneted",()=>{
    console.log("db is disconnected.");   
})
module.exports=db;