const express = require("express");

const route = express.Router();

const {
  addProductPage,
  insertProduct,
  viewProductPage,
} = require("../controllers/productController");

const upload = require("../middleware/product");

// Add Product Page
route.get("/addproducts", addProductPage);
// Insert Product
route.post("/insertproducts", upload.single("product_image"), insertProduct);

// View Products
route.get("/viewproducts", viewProductPage);
module.exports = route;