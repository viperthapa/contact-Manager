const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contact')
const auth = require("../middleware/user")


router.get('/contacts', auth, contactsController.all); //display all data of contacts
router.get('/contacts/:id', auth, contactsController.show); //display single data of contacts
router.post('/contacts', auth, contactsController.create);
router.put('/contacts/:id', auth, contactsController.update);
router.delete('/contacts/:id', auth, contactsController.delete);

module.exports = router;








