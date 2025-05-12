const libaray = require('../models/libaraymodel');
const fs = require('fs');
const path = require('path');

// index 

const libpage = async (req, res) => {
  try {
    const alllibaray = await libaray.find();
    res.render("index", { libaray: alllibaray });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.send("Server error");
  }
};

// add
const addlib = async (req, res) => {
  res.render('add');
};

// insert

const insertlib = async (req, res) => {
  try {
    if (req.file) req.body.image = req.file.path;

    const { bookname, bookprice, bookdate, time, location, auth, image } = req.body;
    if (!bookname || !bookprice || !bookdate || !time || !location || !auth || !image) {
      return res.send("All fields are required");
    }

    await libaray.create(req.body);
    res.redirect('/');
  } catch (err) {
    console.error("Insert error:", err);
    res.send("Insert error");
  }
};

const deletelib = async (req, res) => {
  try {
    const book = await libaray.findById(req.params.id);

    if (!book) {
      return res.send("Book not found");
    }
    if (book.image && fs.existsSync(book.image)) {
      fs.unlinkSync(book.image);
    }

    await libaray.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error("Error deleting book:", error);
    res.send("Delete error");
  }
};



module.exports={    
  libpage,
  addlib,
  insertlib,
  deletelib,
}
