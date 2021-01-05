const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const keywordService = require('../services/keywordService')

//添加关键字
router.post('/add_keyword', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let wordData = req.body
    console.log(wordData)
    if (token.checkToken(accessToken)) {
        keywordService.addKeyword(wordData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }

});

//删除关键字
router.get('/delete_keyword', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let wordData = req.query

    console.log(wordData)
    if (token.checkToken(accessToken)) {
        keywordService.deleteKeyword(wordData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }

});

//编辑关键字
router.post('/update_keyword', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let wordData = req.body

    console.log(wordData)
    if (token.checkToken(accessToken)) {
        keywordService.updateKeyword(wordData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }

});

//获取所有关键字
router.get('/get_all_keywords', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let wordData = req.query

    console.log(wordData)
    if (token.checkToken(accessToken)) {
        keywordService.selectKeyword({},
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
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
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data });
            }
        })

});
//文章关键字监控

router.post('/article_keywords', function (req, res, next) {
    keywordService.articleKeyword({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data });
            }
        })

});

//用户关键字监控

router.post('/user_keywords', function (req, res, next) {
    keywordService.userKeyword({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data });
            }
        })

});

//一级文章评论关键字监控

router.post('/article_info_keywords', function (req, res, next) {
    keywordService.articleInfoKeyword({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data });
            }
        })

});
//一级视频评论关键字监控

router.post('/video_info_keywords', function (req, res, next) {
    keywordService.videoInfoKeyword({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data });
            }
        })

});

//二级文章评论关键字监控
router.post('/second_article_keywords', function (req, res, next) {
    keywordService.secondArticleKeyword({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data });
            }
        })

});

//二级视频评论关键字监控
router.post('/second_video_keywords', function (req, res, next) {
    keywordService.secondVideoKeyword({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data });
            }
        })

});

module.exports = router;