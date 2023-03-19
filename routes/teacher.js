const express = require('express');
const teacher = require("../api/teacher");
const admin = require("../api/admin");
const guest = require("../api/guest");
const users = require("../api/users");
const emails = require("../util/email");
const router = express.Router();


router.get('/home/:id', teacher.getMe, function(req, res, next) {
    res.render('teacher/teacherView' , {user: req.user});
});

//izmjena
router.get('/lectures', teacher.getLectures,teacher.getMe,function(req, res, next) {
    res.render('teacher/teacherLectures' , {lectures: req.lectures,user: req.user });
});
router.get('/sorted-time',teacher.sortByTime,teacher.getMe,function (req,res,next){
    res.render('teacher/teacherLectures' , {lectures: req.lectures, user: req.user});
});
router.get('/sorted-frequency',teacher.sortByFrequency,teacher.getMe,function (req,res,next){
    res.render('teacher/teacherLectures' , {lectures: req.lectures,user: req.user });
});
router.get('/sorted-questions',teacher.sortByQuestions,teacher.getMe,function (req,res,next){
    res.render('teacher/teacherLectures' , {lectures: req.lectures,user: req.user });
});

router.get('/sorted-answered-questions',teacher.sortByAQ,teacher.getMe,function (req,res,next) {
    res.render('teacher/teacherLectures',{lectures: req.lectures,user: req.user});
});
router.get('/createLecture/new-lecture', function(req, res, next) {
    res.render('teacher/createLecturee');
});
router.post('/createLecture/new-lecture',teacher.createLecture,teacher.addLectureCover,function(req, res, next) {
});

router.get('/questions/:code', teacher.getQuestions,teacher.getMe,function(req, res, next) {
        res.render('teacher/teacherQuestions', {
            questions: req.questions,
            lectures: req.lectures,
            code: req.params.code,
            user: req.user
        });

});

router.post('/question-answer/:code',teacher.answerQuestion,function (req,res,next) {

});

router.get('/hiddenQuestions/:code',teacher.getHiddenQuestions,teacher.getMe,function (req,res,next) {
    res.render('teacher/hiddenQuestions',{hiddenquestions: req.hiddenquestions,user: req.user})
});
router.get('/questions-delete/:id',teacher.deleteQuestion,function (req,res,next) {

});
router.get('/hiddenQuestions/:id',teacher.deleteQuestion,function (req,res,next) {

});


router.get('/email-report/:code', users.getEmail,teacher.getQuestionByCode,teacher.getLecturesByCode,function (req,res,next) {
    if(req.email && req.lecture && req.questions) {
        console.log('moj email,zasto')
        console.log(req.email)
        const {email} = req.email;
        const {name, number, answers} = req.lecture;
        const {text} = req.questions;
        emails.lectureReport(email,name, text,number, answers);
        res.render('teacher/email_succ');
    }

});
router.get('/code',function(req, res, next) {
    res.render('code');
});
router.post('/share-via-email',function (req,res,next) {
    emails.shareLectureCode(req.body.email, req.body.code);
    res.render('success')

});
router.get('/log-out',function (req, res, next) {
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = router;