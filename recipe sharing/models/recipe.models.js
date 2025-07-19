const mongoose = require('mongoose');

const recipeschema = mongoose.Schema({
    name: { type: String,
         required: true 
        },
    recipe: {type: String,
         required: true 
        },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdDate: {
         type: Date, 
        default: Date.now }
    
});

module.exports=mongoose.model('recipe',recipeschema,'recipe');
   



    


