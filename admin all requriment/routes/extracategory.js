const express = require("express");

const route = express.Router();

const {
  addExtraCategoryPage,
  insertExtraCategory,
  viewExtraCategoryPage,
  deleteExtracategory,
  updateExtracategorypage,
  editExtraCategory
} = require("../controllers/extracategorycontroller");

// Add Extra Category Page
route.get("/addextracategory", addExtraCategoryPage);

// Insert Extra Category
route.post("/insertExtraCategory", insertExtraCategory);

// View Extra Category Page
route.get("/viewextracategory", viewExtraCategoryPage);

route.get('/deleteExtracategory/:id', deleteExtracategory);
route.get('/updateExtracategorypage/:id', updateExtracategorypage);
route.post('/editExtraCategory/:id', editExtraCategory);

module.exports = route;