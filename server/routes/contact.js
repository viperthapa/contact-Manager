var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require('path');

var contactsController = require('../controller/contact')
const auth = require("../middleware/user")

//set up multer for storing uploaded files
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        console.log("orginal name", file.originalname)
        cb(null, new Date().toISOString());
        // cb(null, file.fieldname + '-' + Date.now())
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//         cb(null, true);
//         // reject a file
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });
var upload = multer({ storage: storage });
console.log("upload", upload)


//register
router.get('/contacts', auth, contactsController.contacts); //display all data of contacts
router.get('/contacts/:id', auth, contactsController.show); //display single data of contacts
router.post('/contacts', auth, contactsController.create);
router.put('/contacts/:id', auth, upload.single('image'), contactsController.update);
router.delete('/contacts/:id', auth, upload.single('image'), contactsController.delete);

module.exports = router;


