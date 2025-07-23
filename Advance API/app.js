const express = require("express");
require("dotenv").config();
require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/admin.routes'));
app.use('/api/course', require('./routes/course.routes'));
app.use('/api/enrollment', require('./routes/enrollment.routes'));
app.use('/api/progress', require('./routes/progress.routes'));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log("Server is started...", process.env.PORT);
});