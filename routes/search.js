const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const searchService = require('../services/searchService')
//获取视频结果
router.get('/get_video_result_list', function (req, res, next) {
    let data = req.query
    searchService.getResultVideoList(data,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error) )
                next(error);
            } else {
                console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});

//获取文章结果
router.get('/get_article_result_list', function (req, res, next) {
    searchService.getResultArticleList(req.query,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error) )
                next(error);
            } else {
                console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});
module.exports = router;