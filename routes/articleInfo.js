const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const articleInfoService = require('../services/articleInfoService')
//点赞文章
router.post('/add_goods', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let articleData = req.body

    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleInfoService.addGoods(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//取消点赞
router.get('/remove_goods', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let articleData = req.query

    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleInfoService.removeGoods(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});

//获取点赞状态
router.get('/get_goods_status', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let articleData = req.query

    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleInfoService.getGoodsStatus(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//收藏文章
router.get('/add_collect', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let articleData = req.query

    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleInfoService.addCollect(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//取消收藏
router.get('/remove_collect', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let articleData = req.query

    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleInfoService.removeCollect(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//获取收藏列表
router.get('/get_collect_list', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let articleData = req.query

    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleInfoService.getCollectList(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});

//添加评论
router.post('/add_comments', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let articleData = req.body

    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleInfoService.addComments(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});

//添加二级评论
router.post('/add_second_comments', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let articleData = req.body
    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleInfoService.addSecondComments(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    res.json({ code: '200', data: data })

                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});

//查询评论列表
router.get('/select_comments', function (req, res, next) {
    // let accessToken = req.get('accessToken')
    let articleData = req.query

    console.log(articleData)
    articleInfoService.selectComments(articleData,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })

});

//查询二级评论列表
router.get('/select_second_comments', function (req, res, next) {
    // let accessToken = req.get('accessToken')
    let articleData = req.query
    console.log(articleData)
    articleInfoService.selectSecondComments(articleData,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});

//更新点赞收藏评论数
router.get('/get_counts', function (req, res, next) {
    // let accessToken = req.get('accessToken')
    let articleData = req.query
    console.log(articleData)
    articleInfoService.getCounts(articleData,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                console.log(JSON.stringify(error), '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});
module.exports = router;