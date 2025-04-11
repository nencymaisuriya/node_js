const express = require('express');
const db = require('./config/db'); 
const path = require("path");
const app = express();
const port = 9000;

app.set("views", path.join(__dirname, "views"))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/', require("./routes/propertyRoutes"));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/add-property', (req, res) => {
    res.render('addProperty');  
});
app.listen(port, () => {
    console.log('server started');
});
