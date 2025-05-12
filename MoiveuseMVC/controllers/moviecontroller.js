const movies = require("../models/moviemodel");
const fs = require('fs'); 
const path = require('path');

// index
const moviepage = async (req, res) => {
  try {
    const allMovies = await movies.find();
    res.render("index", { movies: allMovies });
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.send("Server error");
  }
};

// addmovie 
const addmoive = async (req, res) => {
  res.render('addmovieform');
};

// insert
const insert_movie = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    await movies.create(req.body);
    res.redirect('/');
  } catch (err) {
    console.error("Error inserting movie:", err);
    res.send("Insert error");
  }
};

// update
const updatemovie = async (req, res) => {
  try {
    const movie = await movies.findById(req.params.id);
    if (movie) {
      res.render('updatemovie', { movie });
    }
  } catch (err) {
    res.send('Server Error');
  }
};

// edit 
const edit_movie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movies.findById(id);

    if (!movie) return res.send('Movie not found');

    if (req.file) {
      if (movie.image) fs.unlinkSync(movie.image); 
      req.body.image = req.file.path;
    } else {
      req.body.image = movie.image; 
    }

    await movies.findByIdAndUpdate(id, req.body);
    res.redirect('/');
  } catch (err) {
    console.error('Edit Movie Error:', err);
    res.send('Server Error');
  }
};


// delete
const delete_movie = async (req, res) => {
  try {
    const movie = await movies.findById(req.params.id);

    if (!movie) {
      return res.send("Movie not found");
    }
    if (movie.image && fs.existsSync(movie.image)) {
      fs.unlinkSync(movie.image);
    }

    await movies.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.send("Delete error");
  }
};

// indetails
const in_details = async (req,res) =>{
  const movie = await movies.findById(req.params.id);
  res.render('indetails',{movie});
  
}
module.exports = {
  moviepage,
  addmoive,
  insert_movie,
  updatemovie,
  edit_movie,
  delete_movie,
  in_details
};
