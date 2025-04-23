const { unlinkSync } = require('fs'); 
const path = require('path');
const Property = require('../models/Property');

//page
const propertyPage = async (req, res) => {
        const properties = await Property.find(); 
        res.render("index", { properties }); 
};


//add
const AddProperty = (req, res) => {
    res.render('addProperty');
};


//insert
const insertProperty = async (req, res) => {
            console.log("Insert is loading...");
            console.log("Data Received:", req.body);
            console.log("Uploaded File:", req.file);
    
            if (req.file) {
                req.body.image = req.file.path;
            }
    
            await Property.create(req.body);
            console.log("Data stored successfully!");
            res.redirect('/');
    };

//delete
const deleteProperty = async (req, res) => {
        const { id } = req.params;
        const property = await Property.findById(id);
        try {
            if (property.image) unlinkSync(property.image);
        } catch (err) {
            console.log("Image file not found, skipping deletion."); 
        }
        await Property.findByIdAndDelete(id);
        res.redirect('/');
   
};


//update 
const updateProperty = async (req, res) => {
   
        const id = req.params.id;

        const property = await Property.findById(id); 

        res.render('updateProperty', { property }); 
    
};

//edit
const editProperty = async (req, res) => {
    const id = req.params.id;
    const property = await Property.findById(id);
        if (req.file) {
            if (property.image) {
                unlinkSync(property.image);
            }
            req.body.image = req.file.path;
        } else {
            req.body.image = property.image;
        }
        await Property.findByIdAndUpdate(id, req.body, { new: true });

        res.redirect('/');

};




module.exports = {
    propertyPage,
    AddProperty,
    insertProperty,
    deleteProperty,
    updateProperty,
    editProperty
};
