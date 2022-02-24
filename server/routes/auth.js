var express = require('express');
var router = express.Router();

var users = require('../controller/auth')

//register
router.post('/register', users.register);
router.post('/login', users.login);



module.exports = router;


