const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const movieController = require('../controllers/moviecontroller');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null ,  ("./uploads/") );
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/',movieController.moviepage);
router.get('/addmovie',movieController.addmoive);
router.post('/insert_movie', upload.single('image'), movieController.insert_movie);
router.get('/edit_movie/:id', movieController.updatemovie);
router.post('/edit_movie/:id', upload.single('image'), movieController.edit_movie);
router.get('/delete/:id', movieController.delete_movie);
router.get('/indetails/:id',movieController.in_details);


module.exports = router;