var express = require('express');
var router = express.Router();

var users = require('../controllers/auth')

//register
router.post('/register', users.register);
router.post('/login', users.login);
router.post('/token', users.token);




module.exports = router;


