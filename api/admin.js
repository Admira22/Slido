const pool = require("../database/database");

admin = {
    //get functions (select)
    getAllUsers: function (req,res,next){
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM users WHERE user_type = $1`,['teacher'], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                 else {
                    req.users = result.rows;
                    next();
                }
            })
        })
    },
    getLectures: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM lecture`,[], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                 else {
                    req.lectures = result.rows;
                    next();
                }
            })
        })
    },
    getQuestions: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM questions WHERE isHidden = false;`, [], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.questions = result.rows;
                    next();
                }
            })
        })
    },
    getHiddenQuestions: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM questions WHERE isHidden = true;`, [], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.hiddenquestions = result.rows;
                    next();
                }
            })
        })
    },
    getForbiddenWords: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`SELECT * FROM forbidden_words;`, [], function (err, result) {
                done();

                if (err) {
                    return res.send(err);
                } else {
                    req.forbiddenWords = result.rows;
                    next();
                }
            })
        })


    },

    answerQuestion: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`UPDATE lecture SET numberofanswers = numberofanswers + 1 WHERE id = $1`, [req.params.id], function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    next();
                })
        })

    },

    addWord: function (req,res,next){
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`INSERT INTO forbidden_words(word) VALUES($1)`, [req.body.word],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    next();


                })
        })

    },
    checkForForbiddenWords: function (req, res, next){
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`UPDATE questions SET isHidden = true WHERE text LIKE '%' || $1 || '%'`, [req.body.word],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else
                        res.redirect('/admin/forbiddenWords');


                })
        })

    },

    //(update)
    updateWord: function (req,res,next){
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`UPDATE forbidden_words SET word = $1 WHERE id = $2`, [req.body.word,req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else
                        res.redirect('/admin/forbiddenWords');
                })
        })

    },
    updateLecture: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`UPDATE lecture SET code  = $1, name = $2, time = $3, frequency = $4
                          WHERE id = $5`, [req.body.code,req.body.name,req.body.time,req.body.frequency,req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else {
                        res.redirect('/admin/lectures');
                        next();
                    }

                })
        })
    },

    //block user
    blockUser:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`UPDATE users SET status = 'inactive' WHERE id = $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else{
                        res.redirect('back')
                        next();
                    }


                })
        })

    },
    blockUser2:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            console.log('HEJ')
            console.log(req.body.blockedDays)
            console.log(req.params.id)
            client.query(`UPDATE users SET unblocked = NOW() + interval 15 day WHERE id = $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else{
                        console.log('OVO JE PROSLO 2')
                        next();
                    }


                })
        })

    },


    //delete functions (delete)
    deleteUser: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`DELETE FROM users WHERE id = $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else{
                        res.redirect('back')
                        next();
                    }


                })
        })
    },
    deleteQuestion: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`DELETE FROM questions WHERE id = $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else{
                        res.redirect('back')
                        next();
                    }


                })
        })

    },
    deleteHiddenQuestion: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`DELETE FROM questions WHERE id = $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else{
                        res.redirect('back')
                        next();
                    }


                })
        })
    },
    deleteForbiddenWords: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`DELETE FROM forbidden_words WHERE id = $1`, [req.params.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else{
                        res.redirect('back')
                        next();
                    }


                })
        })
    },

    //create function (insert)
    createLecture: function (req,res,next){
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`INSERT INTO lecture(code,name,time,frequency)
                          VALUES($1,$2,$3,$4)`, [req.body.code,req.body.name,req.body.time,req.body.frequency],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else
                        res.redirect('/admin/lectures');


                })
        })
    }

}
module.exports = admin;