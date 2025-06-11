const Category = require("../models/categorymodel");
const SubCategory = require("../models/subcategorymodel");
const ExtraCategory = require("../models/extracategorymodel");

// Add Extra Category Page
const addExtraCategoryPage = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    const allSubCategory = await SubCategory.find({});

    if (allCategory && allSubCategory) {
      res.render("extracategory/addextracategory", {
        success: req.flash("success"),
        error: req.flash("error"),
        allCategory,
        allSubCategory,
      });
    } else {
      req.flash("error", "Categories or SubCategories not found.");
      res.redirect("/extracategory/addextracategory");
    }
  } catch (e) {
    console.log(e);
    req.flash("error", "Exception occurred while loading the form.");
    res.redirect("/extracategory/addextracategory");
  }
};

// Insert Extra Category
const insertExtraCategory = async (req, res) => {
  console.log(req.body);

  try {
    const insertExtraCategory = await ExtraCategory.create(req.body);

    if (insertExtraCategory) {
      req.flash("success", `${req.body.extraCategory_title} is inserted...`);
    } else {
      req.flash("error", `${req.body.extraCategory_title} insertion failed...`);
    }

    res.redirect("/extracategory/addextracategory");
  } catch (e) {
    console.log(e);
    req.flash("error", `Exception occurred: ${e}`);
    res.redirect("/extracategory/addextracategory");
  }
};

// View Extra Category Page
const viewExtraCategoryPage = async (req, res) => {
  try {
    const allExtraCategory = await ExtraCategory.find()
      .populate("category_id")
      .populate("subCategory_id");

    if (allExtraCategory) {
      res.render("extracategory/viewextracategory", {
        success: req.flash("success"),
        error: req.flash("error"),
        allExtraCategory,
      });
    } else {
      req.flash("error", "No extra categories found.");
      res.redirect("/extracategory/viewextracategory");
    }
  } catch (e) {
    console.log(e);
    req.flash("error", "Exception occurred while viewing extra categories.");
    res.redirect("/extracategory/viewextracategory");
  }
};

const deleteExtracategory = async (req, res) => {
    const id = req.params.id;
    console.log("Deleting extracategory with id:", id);
    try {
        const productDeleteData = await product.deleteMany({
            extraCategory_id: id,
        });

        const deleteextraCategory = await ExtraCategory.findByIdAndDelete(id);

        if (deleteextraCategory && productDeleteData) {
            req.flash("success", `${deleteextraCategory.extraCategory_title} deleted successfully.`);
        } else {
            req.flash("error", "ExtraCategory not found.");
        }
    } catch (error) {
        console.log("Error deleting extracategory:", error);
        req.flash("error", "Something went wrong while deleting.");
    }
    res.redirect("/extracategory/viewextracategory");
};

// update extracategory
const updateExtracategorypage = async (req, res) => {
    try {
        const id = req.params.id;
        const currentAdmin = req.user;

        const allCategory = await Category.find({});
        const allSubCategory = await SubCategory.find({});
        const updateExtraCategory = await ExtraCategory.findById(id);

        if (!updateExtraCategory) {
            req.flash("error", "ExtraCategory not found");
            return res.redirect("/extracategory/viewextracategory");
        }

        res.render('extracategory/editextracategory', {
            currentAdmin,
            success: req.flash("success"),
            error: req.flash("error"),
            allCategory,
            allSubCategory,
            updateExtraCategory
        });
    } catch (error) {
        console.error(error);
        req.flash("error", "Server error");
        res.redirect("/extracategory/updateExtracategory");
    }
};

// Edit ExtraCategory
const editExtraCategory = async (req, res) => {
    try {
        const updateData = await ExtraCategory.findByIdAndUpdate(req.params.id, req.body);
        if (updateData) {
            req.flash("success", "ExtraCategory updated successfully.");
        } else {
            req.flash("error", "ExtraCategory update failed.");
        }
        res.redirect("/extracategory/viewextracategory");
    } catch (e) {
        console.error(e);
        req.flash("error", "Server error while updating ExtraCategory.");
        res.redirect("/extracategory/viewextracategory");
    }
};


module.exports = {
  addExtraCategoryPage,
  insertExtraCategory,
  viewExtraCategoryPage,
  editExtraCategory,
  updateExtracategorypage,
  deleteExtracategory
};
