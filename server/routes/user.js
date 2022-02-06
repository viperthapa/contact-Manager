var express = require('express');
var router = express.Router();

var users = require('../controller/user')

//register
router.post('/register', users.registerUser);
router.post('/login', users.loginUser);


module.exports = router;


