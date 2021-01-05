const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const noticelService = require('../services/noticeService')

//根据用户获取关注列表
router.get('/get_notice_list_by_user', function (req, res, next) {
    let noticeData = req.query
    console.log(noticeData)
    noticelService.selectNotice(noticeData,
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

//关注用户
router.post('/add_notice', function (req, res, next) {
    let noticeData = req.body
    let accessToken = req.get('accessToken')
    
    console.log(noticeData)
    if (token.checkToken(accessToken)) {
        noticelService.addNotice(noticeData,
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

//取消关注
router.post('/delete_notice', function (req, res, next) {
    let noticeData = req.body
    let accessToken = req.get('accessToken')
    
    console.log(noticeData)
    if (token.checkToken(accessToken)) {
        noticelService.removeNotice(noticeData,
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

module.exports = router;