const express = require('express');
const admin = require("../api/admin");
const guest = require("../api/guest");
const teacher = require("../api/teacher");
const router = express.Router();


/* GET home page for admin. */
router.get('/home/:id', admin.getAllUsers,function(req, res, next) {
    if (req.users)
        res.render('admin/adminView' , { id: req.params.id, users: req.users});
});
router.get('/users', admin.getAllUsers, function(req, res, next) {
        res.render('admin/adminUsers' , {users: req.users});
});

router.get('/lectures', admin.getLectures, function(req, res, next) {
    res.render('admin/adminLectures' , {lectures: req.lectures});
});
router.get('/createLecture/new-lecture', admin.getLectures, function(req, res, next) {
    res.render('createLecture');
});
router.post('/createLecture/new-lecture', admin.createLecture,teacher.addLectureCover,function(req, res, next) {
});

router.get('/edit-lecture/:id',admin.getLectures,function (req,res,next) {
    res.render('editLecture');
});
router.post('/edit-lecture/:id',admin.updateLecture,teacher.addLectureCover,function (req,res,next) {

});

router.get('/questions', admin.getQuestions, function(req, res, next) {
    res.render('admin/adminQuestions' , {questions: req.questions});
});
router.get('/answer-question/:id' , admin.answerQuestion,function(req, res, next) {

});
router.get('/hiddenQuestions', admin.getHiddenQuestions, function(req, res, next) {
    res.render('admin/adminHiddenQuestions' , {hiddenquestions: req.hiddenquestions});
});

router.get('/forbiddenWords',admin.getForbiddenWords,function (req,res,next) {
    res.render('admin/adminForbiddenWords',{forbiddenWords: req.forbiddenWords})
});

router.get('/add-word', admin.getLectures, function(req, res, next) {
    res.render('admin/addForbiddenWord');
});
router.post('/new-word', admin.addWord, admin.checkForForbiddenWords, function(req, res, next) {
});

router.get('/edit-word/:id', admin.getForbiddenWords, function(req, res, next) {
    res.render('admin/editWord',{forbiddenWords: req.forbiddenWords,word: req.params.forbiddenWords,
    id: req.params.forbiddenWords});
});
router.post('/edit-word/:id',admin.updateWord,function (req,res,next){

});
router.get('/questions-delete/:id',admin.deleteQuestion,function (req, res, next) {
});
router.get('/users/:id',admin.deleteUser,function (req, res, next) {
});
router.post('/block-user/:id',admin.blockUser,function (req,res,next) {

});
router.get('/hiddenQuestions/:id',admin.deleteHiddenQuestion,function (req, res, next) {
});
router.get('/forbiddenWords/:id',admin.deleteForbiddenWords,function (req, res, next) {

});
router.get('/log-out',function (req, res, next) {
    res.clearCookie('user');
    res.redirect('/');
})
module.exports = router;