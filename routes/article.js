const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const articleService = require('../services/articleService')
//获取所有文章
router.get('/get_all_article_list', function (req, res, next) {
    // let ArticleData = req.query
    // console.log(ArticleData)
    articleService.selectArticle({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + error)
                next(error);
            } else {
                console.log(error, '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});
//根据用户获取文章
router.get('/get_article_list_by_user', function (req, res, next) {
    let articleData = req.query
    console.log(articleData)
    articleService.selectArticle(articleData,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + error)
                next(error);
            } else {
                console.log(error, '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});
//根据id获取文章信息
router.get('/get_article_info_by_id', function (req, res, next) {
    let articleData = req.query
    console.log(articleData)
    articleService.getArticleInfoById(articleData,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + error)
                next(error);
            } else {
                console.log(error, '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});
//修改文章信息
router.post('/update_article', function (req, res, next) {
    let accessToken = req.query.accessToken
    let articleData = req.query
    delete articleData.accessToken
    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleService.updateArticle(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }

});
//删除文章
router.post('/delete_article', function (req, res, next) {
    let accessToken = req.query.accessToken
    let articleData = req.query
    delete articleData.accessToken
    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleService.deleteArticle(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    res.json({ code: '200', data: data });
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
//添加文章
router.post('/add_article', function (req, res, next) {
    let accessToken = req.query.accessToken
    let articleData = req.query
    delete articleData.accessToken
    console.log(articleData)
    if (token.checkToken(accessToken)) {
        articleService.addArticle(articleData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    if (data.Articlename) {
                        res.json({ code: '200', data: data });
                    } else {
                        res.json(data);
                    }
                }
            })
    } else {
        res.json(errorNumber.TOKEN_TIME_OUT())
    }
});
module.exports = router;