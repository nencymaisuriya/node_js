const express = require('express');
const multer = require('multer');
const path = require('path'); 
const fs = require('fs'); 
const router = express.Router();
const Controller = require("../controllers/propertyController");


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null ,  ("./uploads/") );
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', Controller.propertyPage);
router.get('/add-property', Controller.AddProperty);
router.post('/insert-property', upload.single('image'), Controller.insertProperty);
router.get('/delete/:id', Controller.deleteProperty);
router.get('/update/:id', Controller.updateProperty);
router.post('/edit/:id',  upload.single('image'),Controller.editProperty);

module.exports = router;

 
 
