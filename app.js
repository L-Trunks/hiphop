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
const uploadRouter = require('./routes/upload');
const messageRouter = require('./routes/message');
const keywordsRouter = require('./routes/keywords');
const noticeRouter = require('./routes/notice');
const letterRouter = require('./routes/letter');
const middles = require('./middles/middles');
const bodyParser = require('body-parser');
//定时任务
const cron = require("node-cron");
const app = express();
const keywordService = require('./services/keywordService')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(middles.cors);
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/danceSort', danceSortRouter);
app.use('/api/article', articleRouter);
app.use('/api/video', videoRouter);
app.use('/api/articleInfo', articleInfoRouter);
app.use('/api/videoInfo', videoInfoRouter);
app.use('/api/rotationImg', rotationImgRouter);
app.use('/api/search', searchRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/message', messageRouter);
app.use('/api/keywords', keywordsRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/letter', letterRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//定时任务 全局关键字监控
//每天两分钟执行一次关键字检索

cron.schedule("0 */8 * * * *", function () {
  console.log("执行关键字检索.....");
  keywordService.videoKeyword({},
    function (error, data) {
      if (error) {
        console.log('视频检索出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log('视频检索完成')
      }
    })
  keywordService.articleKeyword({},
    function (error, data) {
      if (error) {
        console.log('文章检索出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log('文章检索完成')
      }
    })
  keywordService.userKeyword({},
    function (error, data) {
      if (error) {
        console.log('用户信息检索出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log('用户信息检索完成')
      }
    })
  keywordService.articleInfoKeyword({},
    function (error, data) {
      if (error) {
        console.log('一级文章评论检索出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log('一级文章评论检索完成')
      }
    })
  keywordService.videoInfoKeyword({},
    function (error, data) {
      if (error) {
        console.log('一级视频评论检索出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log('一级视频评论检索完成')
      }
    })
  keywordService.secondArticleKeyword({},
    function (error, data) {
      if (error) {
        console.log('二级文章评论检索出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log('二级文章评论检索完成')
      }
    })
  keywordService.secondVideoKeyword({},
    function (error, data) {
      if (error) {
        console.log('二级视频评论检索出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log('二级视频评论检索完成')
      }
    })
});
app.listen(8888, () => {
  console.log('后端服务器启动成功，地址是: http://127.0.0.1:8888')
})
module.exports = app;
