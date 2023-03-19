const express = require('express');
const guest = require("../api/guest");
const router = express.Router();


/* GET access page for guest. */
router.get('/', function(req, res, next) {
    res.render('access');
});

router.post('/access-lecture', guest.getLecture, guest.getCover, function (req, res, next) {
    if (req.lecture)
        res.render('guest/guestView', {lecture: req.lecture, cover: req.cover});
    else {
        req.message = 'Lecture does not exist'
        res.render('err');
    }
});
router.get('/access-lecture', guest.getLecture,function(req, res, next) {
    res.render('guest/guestView', {lecture: req.lecture});

});

module.exports = router;