const express = require('express');
const users = require("../api/users");
const jwt = require("jsonwebtoken");
const router = express.Router();

/* GET login page. */
router.get('/',function(req, res, next) {
    res.render('login');
});
router.post('/',users.getUser,users.isUserBlocked,users.unblockIfNecessary,function (req,res,next) {

    if (req.isBlocked && !req.isUnblocked)
        return res.send({message: 'You are blocked'})

    if (req.user) {
        const token = jwt.sign(req.user, '42', {expiresIn: 60 * 60 * 24});
        res.cookie('user_token', token);
        res.cookie('user', req.user);
        switch(req.user.user_type) {
            case 'admin':
                res.redirect(`/admin/home/${req.user.id}`);
                break;
            default:
                res.redirect(`/teacher/home/${req.user.id}`);
                break;
        }
    }
    else res.render('err_pass')
        //res.send({message: req.message});
})

module.exports = router;