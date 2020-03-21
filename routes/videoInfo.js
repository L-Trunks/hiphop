const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const videoInfoService = require('../services/videoInfoService')
//点赞文章
router.get('/add_goods', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoInfoService.addGoods(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//取消点赞
router.get('/remove_goods', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoInfoService.removeGoods(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});

//获取点赞状态
router.get('/get_goods_status', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoInfoService.getGoodsStatus(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//收藏文章
router.get('/add_collect', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoInfoService.addCollect(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//取消收藏
router.get('/remove_collect', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoInfoService.removeCollect(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//获取收藏列表
router.get('/get_collect_list', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoInfoService.getCollectList(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});

//添加评论
router.get('/add_comments', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoInfoService.addComments(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//查询评论列表
router.get('/select_comments', function (req, res, next) {
    let accessToken = req.query.accessToken
    let videoData = req.query
    delete videoData.accessToken
    console.log(videoData)
    if (token.checkToken(accessToken)) {
        videoInfoService.selectComments(videoData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
module.exports = router;