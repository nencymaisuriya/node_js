const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  subcategory_title: {
    type: String,
    required: true,
  },
});

const subCategory = mongoose.model("SubCategory",subCategorySchema,"SubCategory");

module.exports = subCategory;