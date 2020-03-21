const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const danceSortRouter = require('./routes/danceSort');
const articleRouter = require('./routes/article');
const videoRouter = require('./routes/video');
const articleInfoRouter = require('./routes/articleInfo');
const videoInfoRouter = require('./routes/videoInfo');
const rotationImgRouter = require('./routes/rotationImg');
const searchRouter = require('./routes/search');
const middles = require('./middles/middles');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(middles.cors);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/danceSort', danceSortRouter);
app.use('/article', articleRouter);
app.use('/video', videoRouter);
app.use('/articleInfo', articleInfoRouter);
app.use('/videoInfo', videoInfoRouter);
app.use('/rotationImg', rotationImgRouter);
app.use('/searchRouter', searchRouter);

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
app.listen(8888, () => {
  console.log('后端服务器启动成功，地址是: http://127.0.0.1:8888')
})
module.exports = app;
