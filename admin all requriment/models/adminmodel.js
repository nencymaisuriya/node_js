const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    hobby: {
        type: Array,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const admin = mongoose.model('admin', AdminSchema, "Admin");

module.exports = admin;

