const mongoose = require ('mongoose');

const url = 'mongodb://localhost:27017/admin_session';

mongoose.connect(url);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('db is connected');
    
});
db.on('error',(err)=>{
    console.log('db is not connected',err);
    
});
db.on('disconnected',()=>{
    console.log('db is disconnected');
    
});

module.exports = db;