const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    c_title: {
        type: String,
        required: true,
    },
    c_image: {
        type: String,
        required: true,
    },
});

const category = mongoose.model('category', categorySchema, 'category');
module.exports = category;
 