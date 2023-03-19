const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'slidowebapp@gmail.com',
        pass: 'qewbrjlzunvejoaf'
    }
});

const emails = {
    //dodatna spec za forget password
    changePassword: (passCode, email) => {
        const emailBody = {
            from: 'slidowebapp@gmail.com',
            to: email,
            subject: 'Reset password',
            text: ` ${passCode} is your Slido code.`
        }

        transporter.sendMail(emailBody, (error, info) => {
            if (error) console.log(error)
        })
    },

    shareLectureCode: (email, code) => {
        const emailBody = {
            from: 'slidowebapp@gmail.com',
            to: email,
            subject: 'Join in',
            text: `Using this code: ${code}, you can join my lecture.`
        }

        transporter.sendMail(emailBody, (res,error, info) => {
            if (error) console.log(error)
        })
    },
    lectureReport: (email,name,text,number,answers) => {
        const emailBody = {
            from: 'slidowebapp@gmail.com',
            to: email,
            subject: 'Lecture report',
            text: `Report for ${name}\n
                   All questions for "${name}" lecture:\n
                   1.${text}
                   Number of asked questions:${number}\n
                   Number of answered questions:${answers}`
        }

        transporter.sendMail(emailBody, (error, info) => {
            if (error) console.log(error)
        })

    }
}

module.exports = emails