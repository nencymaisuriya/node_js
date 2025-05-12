const express = require('express');
const multer = require('multer');
const path = require('path');
const libaraycontroller = require('../controllers/libaraycontroller')
const router = express.Router();


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null ,  ("./uploads/") );
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/',libaraycontroller.libpage);
router.get('/add',libaraycontroller.addlib);
router.post('/insert', upload.single('image'), libaraycontroller.insertlib);
router.get('/delete/:id', libaraycontroller.deletelib);

module.exports = router;


