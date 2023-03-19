const pool = require("../database/database");
const bcrypt = require("bcrypt");

users = {
    //functions for registration
    createUser: function (req, res, next) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.send(err);

            pool.connect(function (err, client, done) {
                if (err)
                    return res.send(err);

                client.query(`INSERT INTO users(user_type,email,password)
                          VALUES($1,$2,$3)`, [req.body.type, req.body.email, hash], function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else
                        res.redirect('/login');


                })
            })
        })
    },

    //function for login
    getUser: function (req, res, next) {

        pool.query(`SELECT * FROM users WHERE email = $1`, [req.body.email], (err, result) => {

            if (err)
                console.log(err)

            if (result.rows.length > 0) {
                bcrypt.compare(req.body.password, result.rows[0].password, (err, response) => {
                    if (err) console.log(err)

                    if (response) {
                        const {password, ...rest} = result.rows[0]
                        req.user = rest

                    } else req.message = 'Wrong password'
                    next()
                })
            } else {
                req.message = 'User does not exist'
                next();
            }
        })
    },

    getEmail: function (req,res,next){
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT email FROM users INNER JOIN lecture l ON l.teacher_id = users.id 
                                                          WHERE l.teacher_id = $1; `, [req.cookies.user.id], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    console.log(result.rows)
                    req.email = result.rows;
                    next();
                }
            })
        })
    },
    //check if user is blocked
    isUserBlocked: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT status FROM users WHERE email = $1`,[req.body.email], function (err, res) {
                done();
                console.log(res);
                if (err)
                    return res.send(err);
                if (res.rows[0].status === 'inactive') {
                    req.isBlocked = true;
                    req.message = 'You are blocked.'
                }
                next();
            })
        })
    },
    unblockIfNecessary: function (req, res, next) {
        if (req.isBlocked) {
            pool.connect(function (err, client, done) {
                if (err)
                    return res.send(err);

                client.query(`SELECT unblockUser($1)`,[req.user.id], function (err, res) {
                    done();
                    console.log(res);
                    if (err)
                        return res.send(err);
                    if (res.rows[0].unblockuser)
                        req.isUnblocked = true;
                    else req.isUnblocked = false;
                    next();
                })
            })
        }
        next();
    }
}




module.exports = users;