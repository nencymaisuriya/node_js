const express = require('express');
const db = require('./config/db');
const app = express();
const port=8000;

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/users'));

app.listen(port,(err)=>{
    if(err){
        console.log("error :", err);      
    }
    console.log("server is start");

    
})