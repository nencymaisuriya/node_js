const category = require("../models/categorymodel");
const subCategory = require("../models/subcategorymodel");
const extraCategory = require("../models/extracategorymodel");
const products = require("../models/productmodel");

// Add Product Page
const addProductPage = async (req, res) => {
  try {
    const allCategory = await category.find();
    const allSubCategory = await subCategory.find();
    const allExtraCategory = await extraCategory.find();

    if (allCategory && allSubCategory && allExtraCategory) {
      res.render("products/addproducts", {
        success: req.flash("success"),
        error: req.flash("error"),
        allCategory,
        allSubCategory,
        allExtraCategory,
      });
    } else {
      res.redirect("back");
    }
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

// Insert Product
const insertProduct = async (req, res) => {
  console.log(req.body);
  try {
    req.body.product_image = req.file.path;
    const productInsert = await products.create(req.body);

    if (productInsert) {
      req.flash("success", "Product is inserted...");
    } else {
      req.flash("error", "Product is insertion failed...");
    }
    res.redirect("back");
  } catch (e) {
    console.log(e);
  }
};

// View Products
const viewProductPage = async (req, res) => {
  try {
    const allProducts = await products
      .find()
      .populate("category_id")
      .populate("subcategory_id")
      .populate("extracategory_id");

    console.log(allProducts);

    if (allProducts) {
      res.render("products/viewproducts", {
        allProducts,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      res.redirect("back");
    }
  } catch (e) {
    console.log(e);
    res.redirect("back");
  }
};

module.exports = {
  addProductPage,
  insertProduct,
  viewProductPage,
};