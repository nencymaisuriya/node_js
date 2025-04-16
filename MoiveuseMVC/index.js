const express = require('express');
const db = require('./config/db');
const app =  express();
const port=8000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/', require("./routes/movieroutes"));

app.listen(port, ()=> {
    console.log(`Server is started on http://localhost:${port}`);
    
})