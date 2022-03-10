var express = require('express');
var router = express.Router();

var users = require('../controllers/auth')

//register
router.post('/register', users.register);
router.get('/user', users.all);
router.post('/login', users.login);
router.post('/refreshtoken', users.refreshToken);




module.exports = router;


