var express = require('express');
var router = express.Router();

//module 
var authRoutes = require('./routes/auth');
var contactRoutes = require('./routes/contact');

router.use(authRoutes);
router.use(contactRoutes);


module.exports = router;
