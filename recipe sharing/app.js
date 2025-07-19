const express = require('express');
require('dotenv').config();
require('./config/db');

const app = express();

app.use(express.urlencoded({extended: true}))

app.use('/',require('./routes/admin.routes'));
app.use('/api/user',require('./routes/user.routes'));
app.use('/api/recipe',require('./routes/recipe.routes'));


app.listen(process.env.port, () => {
      console.log(`Server running on port`);  
    });