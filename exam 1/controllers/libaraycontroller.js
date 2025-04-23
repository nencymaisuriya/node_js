const libaray = require('../models/libaraymodel');
// const fs = require(fs);
// const path = require(path);

// index 

const libpage = async (req, res) => {
    try {
      const libaray = await libaray.find();
      res.render("index", { lib : alllib});
    } catch (err) {
      console.error("Error fetching lib:", err);
      res.send("Server error");
    }
  };

// add
const addlib = async (req, res) => {
    res.render('');
  };
  

module.exports={    
    libpage,
    addlib,
}
