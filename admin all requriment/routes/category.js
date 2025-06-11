const express = require('express');
const route = express.Router();
const upload = require('../middleware/category');

const {addCategoryPage,insertcategory,viewcategoryPage,deletecategory,editcategoryPage,updatecategory}=require('../controllers/categorycontroller');

// Add Category Page
route.get('/addcategory', addCategoryPage);
route.post('/insertcategory', upload.single('c_image'), insertcategory);

// View Category Page
route.get('/viewcategory', viewcategoryPage);

// Delete Category
route.get('/deletecategory/:id', deletecategory);

// Edit Category Page
route.get('/editcategoryPage', editcategoryPage);

// Update Category
route.post('/updatecategory/:id', upload.single('c_image'), updatecategory);

module.exports = route;