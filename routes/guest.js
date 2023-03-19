const express = require('express');
const guest = require("../api/guest");
const admin = require("../api/admin");
const teacher = require("../api/teacher");
const router = express.Router();

/* GET home page for guest. */
/*router.get('/', function(req, res, next) {
    res.render('guest/guestView',{guest: req.params.guest,lecture:req.lecture});
});*/


router.get('/lecture-mark/:code/1',guest.markLecture1,function (req,res,next) {
    res.render('guest/mark')
});
router.get('/lecture-mark/:code/2',guest.markLecture2,function (req,res,next) {
    res.render('guest/mark')
});
router.get('/lecture-mark/:code/3',guest.markLecture3,function (req,res,next) {
    res.render('guest/mark')
});
router.get('/lecture-mark/:code/4',guest.markLecture4,function (req,res,next) {
    res.render('guest/mark')
});
router.get('/lecture-mark/:code/5',guest.markLecture5,function (req,res,next) {
    res.render('guest/mark')
});

router.post('/new-question/:code', admin.getForbiddenWords,guest.askQuestion,guest.countQuestions,function (req, res, next){

});
router.get('/questions/:code', guest.getQuestions, function(req, res, next) {
    res.render('guest/guestQuestions' , {questions: req.questions,lectures: req.lectures, code: req.params.code});
});
router.post('/like-question/:id' , guest.likeQuestion,function(req, res, next) {

});
router.get('/sorted-questions/:code', guest.sortByLikes, function (req,res,next) {
    res.render('guest/guestQuestions',{questions: req.questions,lectures: req.lectures, code: req.params.code})
});

router.get('/filter-5/:code', guest.filterFive, function (req,res,next) {
    res.render('guest/guestQuestions',{questions: req.questions,lectures: req.lectures, code: req.params.code})
});

router.get('/filter-10/:code', guest.filterTen, function (req,res,next) {
    res.render('guest/guestQuestions',{questions: req.questions,lectures: req.lectures, code: req.params.code})
});

router.get('/filter-15/:code', guest.filterFifteen, function (req,res,next) {
    res.render('guest/guestQuestions',{questions: req.questions,lectures: req.lectures, code: req.params.code})
});
module.exports = router;