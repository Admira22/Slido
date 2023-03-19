const pool = require("../database/database");
const util = require("../util/util_functions");
guest = {
    //functions for asking and getting questions
    askQuestion: function (req, res, next) {

        const containsForbiddenWord = util.checkIfContainsForbiddenWords(req.forbiddenWords, req.body.question)
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`INSERT INTO questions(text,lecture_code, isHidden)
                          VALUES($1,$2,$3)`, [req.body.question, req.params.code, containsForbiddenWord],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else {
                        res.redirect('back');
                        next();
                    }


                })
        })
    },
    countQuestions: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`UPDATE lecture SET number = number + 1 WHERE code = $1`, [req.params.code],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    next();


                })
        })
    },

    getQuestions: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM questions WHERE lecture_code = $1 AND isHidden = false ;`, [req.params.code],
                function (err, result) {
                done();

                if (err)
                    return res.send(err)
                else {
                    req.questions = result.rows;
                    next();
                }
            })
        })
    },

    //functions for lecture
    getLecture: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM lecture WHERE code = $1`, [req.body.code],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    req.lecture = result.rows[0];
                    next();
                })
        })

    },
    getCover: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM lecture_cover WHERE lecture_code = $1`, [req.body.code],
                function (err, result) {
                    done();

                    if (err) {
                        return res.send(err);
                    }
                    req.cover = result.rows[0];
                    next();
                })
        })

    },

    markLecture1: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`INSERT INTO lecture_mark(lecture_code,mark)
                          VALUES($1,$2)`, [req.params.code,1],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    next();


                })
        })

    },
    markLecture2: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`INSERT INTO lecture_mark(lecture_code,mark)
                          VALUES($1,$2)`, [req.params.code,2],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    next();


                })
        })

    },
    markLecture3: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`INSERT INTO lecture_mark(lecture_code,mark)
                          VALUES($1,$2)`, [req.params.code,3],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    next();

                })
        })

    },
    markLecture4: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`INSERT INTO lecture_mark(lecture_code,mark)
                          VALUES($1,$2)`, [req.params.code,4],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    next();


                })
        })

    },
    markLecture5: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }

            client.query(`INSERT INTO lecture_mark(lecture_code,mark)
                          VALUES($1,$2)`, [req.params.code,5],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    next();


                })
        })

    },

    //function for liking questions
    likeQuestion: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`UPDATE questions SET reaction = reaction + 1 WHERE id = $1`, [req.params.id], function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    next();
                })
        })

    },
    sortByLikes: function (req, res, next) {

        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`SELECT * FROM questions WHERE lecture_code = $1
                          ORDER BY reaction;`, [req.params.code], function (err, result) {
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

    //filtering questions based on number of likes
    filterFive: function (req,res,next) {

        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`SELECT * FROM questions WHERE lecture_code = $1
                          AND reaction >= 5;`, [req.params.code], function (err, result) {
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
    filterTen: function (req,res,next) {

        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`SELECT * FROM questions WHERE lecture_code = $1
                          AND reaction >= 10;`, [req.params.code], function (err, result) {
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
    filterFifteen: function (req,res,next) {

        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`SELECT * FROM questions WHERE lecture_code = $1
                          AND reaction >= 15;`, [req.params.code], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.questions = result.rows;
                    next();
                }
            })
        })
    }


}
module.exports = guest;