const express = require('express');
const users = require("../api/users");
const router = express.Router();


router.get('/new-user',function(req, res, next) {
    res.render('register');
});
router.post('/new-user',users.createUser,function (req,res,next) {
});
router.get('/login',function(req, res, next) {
    res.render('login');
});
router.get('/register/new-user',function(req, res, next) {
    res.render('register');
});
module.exports = router;