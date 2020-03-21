const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const keywordService = require('../services/keywordService')

//添加关键字
router.post('/add_keyword', function (req, res, next) {
    let accessToken = req.query.accessToken
    let wordData = req.query
    delete wordData.accessToken
    console.log(wordData)
    if (token.checkToken(accessToken)) {
        keywordService.addKeyword(wordData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error) )
                    next(error);
                } else {
                    console.log(JSON.stringify(error) , '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }

});

//删除关键字
router.get('/delete_keyword', function (req, res, next) {
    let accessToken = req.query.accessToken
    let wordData = req.query
    delete wordData.accessToken
    console.log(wordData)
    if (token.checkToken(accessToken)) {
        keywordService.deleteKeyword(wordData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error) )
                    next(error);
                } else {
                    console.log(JSON.stringify(error) , '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }

});

//编辑关键字
router.post('/update_keyword', function (req, res, next) {
    let accessToken = req.query.accessToken
    let wordData = req.query
    delete wordData.accessToken
    console.log(wordData)
    if (token.checkToken(accessToken)) {
        keywordService.updateKeyword(wordData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error) )
                    next(error);
                } else {
                    console.log(JSON.stringify(error) , '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }

});

//获取所有关键字
router.get('/get_all_keywords', function (req, res, next) {
    let accessToken = req.query.accessToken
    let wordData = req.query
    delete wordData.accessToken
    console.log(wordData)
    if (token.checkToken(accessToken)) {
        keywordService.selectKeyword({},
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error) )
                    next(error);
                } else {
                    console.log(JSON.stringify(error) , '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }

});

//视频关键字监控
router.post('/video_keywords', function (req, res, next) {
    keywordService.videoKeyword({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error) )
                next(error);
            } else {
                console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data });
            }
        })

});
//文章关键字监控

router.post('/article_keywords', function (req, res, next) {
    keywordService.articleKeyword({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error) )
                next(error);
            } else {
                console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data });
            }
        })

});
module.exports = router;