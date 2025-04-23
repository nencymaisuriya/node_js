const express = require('express');
const app = express();
const db = require('./config/db');
const port = 8000;
app.set('view engine', 'ejs')
app.use('/',require('./routes/libaray'));
app.listen(port,()=>{
    console.log('server is started');
});