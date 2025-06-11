const category = require("../models/categorymodel");
const subCategory = require("../models/subcategorymodel");
const extraCategory = require("../models/extracategorymodel");
const products = require("../models/productmodel");

// Add SubCategory Page
// Add SubCategory Page
const addSubCategoryPage = async (req, res) => {
  try {
    const allCategory = await category.find({});

    res.render("subcategory/addsubcategory", {
      allCategory,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (e) {
    console.log(e);
    res.redirect("/subcategory/addsubcategory");
  }
};

// Insert SubCategory
const insertSubCategory = async (req, res) => {
  console.log(req.body);

  try {
    const insert = await subCategory.create(req.body);

    if (insert) {
      req.flash("success", "Subcategory inserted...");
    } else {
      req.flash("error", "Subcategory insertion failed...");
    }

    res.redirect("/subcategory/addsubcategory");
  } catch (e) {
    console.log(e);
    req.flash("error", `Exception ${e}`);
    res.redirect("/subcategory/addsubcategory");
  }
};

// View SubCategory
const viewSubCategoryPage = async (req, res) => {
  try {
    const record = await subCategory.find().populate("category_id").exec();

    if (record) {
      res.render("subcategory/viewSubCategory", {
        records: record,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      req.flash("error", "SubCategory not found..");
      res.redirect("/subcategory/viewSubcategory");
    }
  } catch (e) {
    console.log(e);
    res.redirect("/subcategory/viewSubcategory");
  }
};

// Delete SubCategory
const deleteSubCategory = async (req, res) => {
  const deleteId = req.params.id;

  try {
    const deletExtraCategory = await extraCategory.deleteMany({
      subCategory_id: deleteId,
    });

    const productDeleteData = await products.deleteMany({
      subcategory_id: deleteId,
    });

    if (deletExtraCategory) {
      const deleteSubCategory = await subCategory.findByIdAndDelete(deleteId);

      if (deleteSubCategory) {
        req.flash(
          "success",
          `${deleteSubCategory.subcategory_title} deleted successfully...`
        );
      } else {
        req.flash("error", "SubCategory deletion failed...");
      }
    } else {
      req.flash("error", "Related data deletion failed...");
    }

    res.redirect("/subcategory/viewsubcategory");
  } catch (e) {
    console.log(e);
    res.redirect("/subcategory/viewsubcategory");
  }
};

// Update SubCategory Page
const updateSubCategoryPage = async (req, res) => {
  try {
    const allCategory = await category.find({});
    const updateSubCategory = await subCategory.findById(req.params.id);

    if (allCategory && updateSubCategory) {
      res.render("subcategory/editSubCategory", {
        allCategory,
        updateSubCategory,
        success: "",
        error: "",
      });
    } else {
      res.redirect("/subcategory/viewsubcategory");
    }
  } catch (e) {
    console.log(e);
    res.redirect("/subcategory/viewsubcategory");
  }
};

// Update SubCategory
const updateSubCategory = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  try {
    const updateData = await subCategory.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (updateData) {
      req.flash("success", "SubCategory is updated...");
    } else {
      req.flash("error", "SubCategory is not updated...");
    }

    res.redirect("/subcategory/viewsubcategory");
  } catch (e) {
    console.log(e);
    res.redirect("/subcategory/viewsubcategory");
  }
};


module.exports = {
  addSubCategoryPage,
  insertSubCategory,
  viewSubCategoryPage,
  deleteSubCategory,
  updateSubCategoryPage,
  updateSubCategory,
};