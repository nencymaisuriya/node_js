const category = require("../models/categorymodel");
const subCategory = require("../models/subcategorymodel");
const extracategory = require("../models/extracategorymodel");
const products = require("../models/productmodel");
const fs = require("fs");



// Add Category Page Render
const addCategoryPage = (req, res) => {
const currentAdmin = req.user;
  res.render("category/addcategory", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};
// Insert Category Page
const insertcategory = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    req.body.c_image = req.file.path;
    const insert = await category.create(req.body);

    if (insert) {
      req.flash("success", "Category Inserted...");
    } else {
      req.flash("error", "Category Insertion failed...");
    }
    res.redirect("/category/addcategory");  // ✅ Fixed path
  } catch (e) {
    req.flash("error", `Exception : ${e}`);
    res.redirect("/category/addcategory");  // ✅ Fixed path
  }
};


// View Category Page Render
const viewcategoryPage = async (req, res) => {
  try {
    const record = await category.find({});

    if (record) {
      res.render("category/viewcategory", {
        records: record,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      req.flash("error", "No Category Found....");
      res.redirect("dashboard");
    }
  } catch (e) {
    console.log(e);

    res.redirect("/category/viewcategory");
  }
};

// Delete Category
const deletecategory = async (req, res) => {
  console.log(req.params);

  try {
    const subCategoryDeleteData = await subCategory.deleteMany({
      category_id: req.params.id,
    });

    const extraCategoryDeleteData = await extracategory.deleteMany({
      category_id: req.params.id,
    });

    const productDeleteData = await products.deleteMany({
      category_id: req.params.id,
    });

    if (subCategoryDeleteData && extraCategoryDeleteData && productDeleteData) {
      const deleteData = await category.findByIdAndDelete({
        _id: req.params.id,
      });
      console.log("Deleted Data", deleteData);

      if (deleteData) {
        fs.unlinkSync(deleteData.c_image);
        req.flash("success", "Category Deleted....");
      } else {
        req.flash("error", "Category Not Deleted...");
      }
    } else {
      req.flash("error", "Category Not Deleted...");
    }

    req.redirect("/category/viewcategory");
  } catch (e) {
    console.log(e);
    res.redirect("/category/viewcategory");
  }
};

// Update Category Page
const editcategoryPage = async (req, res) => {
  try {
    console.log(req.query.id);

    const data = await category.findById(req.query.id);

    console.log("Edit Data", data);

    if (data) {
      res.render("category/editcategory", {
        data: data,
        success: "",
        error: "",
      });
    } else {
      res.redirect("/category/viewcategory");
    }
  } catch (e) {
    console.log(e);

    res.redirect("/category/viewcategory");
  }
};

// Update Category
const updatecategory = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    console.log(req.file);

    const data = await category.findById(req.params.id);

    if (req.file) {
      console.log("Request File Called....");

      fs.unlinkSync(data.c_image);

      req.body.c_image = req.file.path;

      const updateData = await category.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      console.log("Update Data ", updateData);

      if (updateData) {
        req.flash("success", "Category updated successfully...");
      } else {
        req.flash("error", "Category updation failed...");
      }
    } else {
      console.log("Not File Called....");

      if (data) {
        req.body.c_image = data.c_image;

        const updateData = await category.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        console.log("Update Data ", updateData);

        if (updateData) {
          req.flash("success", "Category updated successfully...");
        } else {
          req.flash("error", "Category updation failed...");
        }
      } else {
        req.flash("error", "Data not found...");
      }
    }

    res.redirect("/category/viewcategory");
  } catch (e) {
    console.log("Exception", e);
    res.redirect("back");
  }
};

module.exports = {
  addCategoryPage,
  insertcategory,
  viewcategoryPage,
  deletecategory,
  editcategoryPage,
  updatecategory,
};