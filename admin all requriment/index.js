const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./config/db');
const localStrategy = require("./middleware/passport");
const app = express();
const port = 8000;


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(session({
    secret: 'nm@21',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.currentAdmin);



app.use('/', require('./routes/admin'));
app.use('/products', require('./routes/product'));


app.listen(port, () =>{
    console.log("server is started");

});