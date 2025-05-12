const mongoose = require('mongoose');

const libschema = mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  bookprice: {
    type: Number,
    required: true,
  },
  bookdate: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  auth: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('library', libschema);
