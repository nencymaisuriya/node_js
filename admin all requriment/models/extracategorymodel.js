const mongoose = require("mongoose");

const extraCategorySchema = mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  subCategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  extraCategory_title: {
    type: String,
    required: true,
  },
});

const extraCategory = mongoose.model(
  "ExtraCategory",
  extraCategorySchema,
  "ExtraCategory"
);

module.exports = extraCategory;