const mongoose = require('mongoose');

const movieschema = new mongoose.Schema({
    title:{
         type: String,
          required: true 
    }, 
    year: {
         type: Number, 
         required: true 
    },
    director: { 
        type: String, 
        required: true 
    },
    type :{
        type:String,
        required:true
    },
    image: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('movie', movieschema);
