const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const upload = require('express-fileupload');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const accessRouter = require('./routes/access');
const adminRouter = require('./routes/admin');
const teacherRouter = require('./routes/teacher');
const guestLecture = require('./routes/guest');
const jwt = require("jsonwebtoken");


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(upload());
app.use(express.static(path.join(__dirname, 'public')));

//rute kojima svi imaju pristup
//presretac

app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/access',accessRouter);
app.use('/guest',guestLecture);
const openRoutes = ['/', '/login', '/register', '/register/new-user', '/logout', '/access', '/guest','/favicon.ico']

app.use((req, res, next) => {
  if (openRoutes.includes(req.url) || req.url.includes('/register/') || req.url.includes('/logout/')
      || req.url.includes('/access/'))
    return next()
  try {
    jwt.verify(req.cookies.user_token, '42')
  } catch (err) {
    console.log(err)
    res.redirect('/')
    return next()
  }
  next()
})

app.use((req, res, next) => {
  if (!req.cookies.user_type || openRoutes.includes(req.url)
      || req.url.includes('/register/') || req.url.includes('/logout/') || req.url.includes('/access/'))
    return next()
  if (req.url.includes('/admin/') && req.cookies.user_type === 'admin')
    return next()
  if ((req.url.includes('/teacher/') && req.cookies.user_type === 'teacher'))
    return next()
  return res.redirect('back')
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/access',accessRouter);*/
app.use('/admin',adminRouter);
app.use('/teacher',teacherRouter);
/*app.use('/guest',guestLecture);*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
