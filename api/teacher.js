const pool = require("../database/database");
const util = require("../util/util_functions");
const upload = require("../util/cloudinary");

teacher = {

    //get functions (select)
    getLectures: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`SELECT * FROM lecture WHERE teacher_id=$1`, [req.cookies.user.id], function (err, result) {
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
    getMe: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            console.log('oooooooj')
            console.log(req.cookies.user.id)
            client.query(`SELECT email FROM users WHERE id=$1`, [req.cookies.user.id], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.user = result.rows[0];
                    next();
                }
            })
        })
    },

    getLecturesByCode: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err) {
                return res.send(err);
            }
            client.query(`SELECT * FROM lecture WHERE code=$1`, [req.params.code], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.lecture = result.rows[0];
                    next();
                }
            })
        })
    },
    getQuestions: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM questions WHERE lecture_code = $1 AND isHidden = false; `, [req.params.code], function (err, result) {
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
    getQuestionByCode:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`SELECT * FROM questions WHERE lecture_code = $1 AND isHidden = false; `, [req.params.code], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.questions = result.rows[0];
                    next();
                }
            })
        })
    },
    getHiddenQuestions: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM questions WHERE isHidden = 'true' AND lecture_code = $1;`, [req.params.code], function (err, result) {
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

    answerQuestion:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`UPDATE lecture SET answers = answers + 1 WHERE code = $1`, [req.params.code],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);

                    else {
                        res.redirect('back')
                        next();
                    }

                })
        })
    },

    //function for creating new lecture (insert)
    createLecture: function (req, res, next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`INSERT INTO lecture(code,name,time,frequency, teacher_id)
                          VALUES($1,$2,$3,$4,$5)`, [req.body.code, req.body.name, req.body.time, req.body.frequency, req.cookies.user.id],
                function (err, result) {
                    done();

                    if (err)
                        return res.send(err);
                    else {
                        res.redirect('/teacher/lectures');
                        next();
                    }

                })
        })
    },
    addLectureCover: async (req, res, next) => {
        let result = await upload(util.dataUri(req.files.cover.name, req.files.cover.data))
        let query = `INSERT INTO lecture_cover (lecture_code, cover_name, cover_url, cover_number) VALUES ($1, $2, $3, 1)`
        const params = [req.body.code, req.files.cover.name, result.secure_url]



        pool.query(query, params, (err, result) => {
            if (err) console.log(err)
            else
                next()
        })
    },


    //functions for deleting questions
    deleteQuestion: function (req, res, next) {
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

        /*pool.query('DELETE FROM questions WHERE id = $1', [req.params.id], (error, results) => {
            if (error)
                throw error
            //res.redirect('back');
            next();
        })
*/
    },
    deleteHiddenQuestion: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);
            client.query(`DELETE FROM hiddenQuestion WHERE id = $1`, [req.params.id],
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

    //functions for sorting lectures
    sortByTime: function (req,res,next) {

        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM lecture WHERE teacher_id=$1
                          ORDER BY time`, [req.cookies.user.id], function (err, result) {
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
    sortByFrequency: function (req,res,next) {

        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM lecture WHERE teacher_id=$1
                          ORDER BY frequency`, [req.cookies.user.id], function (err, result) {
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
    sortByQuestions:function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM lecture WHERE teacher_id=$1
                          ORDER BY number`, [req.cookies.user.id], function (err, result) {
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
    sortByAQ: function (req,res,next) {
        pool.connect(function (err, client, done) {
            if (err)
                return res.send(err);

            client.query(`SELECT * FROM lecture WHERE teacher_id=$1
                          ORDER BY answers`, [req.cookies.user.id], function (err, result) {
                done();

                if (err)
                    return res.send(err);
                else {
                    req.lectures = result.rows;
                    next();
                }
            })
        })


    }
}
module.exports = teacher;