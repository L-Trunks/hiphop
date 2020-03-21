const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const messageService = require('../services/messageService')

//新增消息
router.post('/add_message', function (req, res, next) {
    let accessToken = req.query.accessToken
    let messageData = req.query
    delete messageData.accessToken
    console.log(messageData)
    if (token.checkToken(accessToken)) {
        messageService.addMessage(messageData,
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
//根据用户id获取消息列表
router.get('/get_message_list_by_user', function (req, res, next) {
    let accessToken = req.query.accessToken
    let messageData = req.query
    delete messageData.accessToken
    console.log(messageData)
    if (token.checkToken(accessToken)) {
        messageService.selectMessage(messageData,
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

//删除消息
router.get('/delete_message', function (req, res, next) {
    let accessToken = req.query.accessToken
    let messageData = req.query
    delete messageData.accessToken
    console.log(messageData)
    if (token.checkToken(accessToken)) {
        messageService.deleteMessage(messageData,
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
//更新消息
router.post('/update_message', function (req, res, next) {
    let accessToken = req.query.accessToken
    let messageData = req.query
    delete messageData.accessToken
    console.log(messageData)
    if (token.checkToken(accessToken)) {
        messageService.updateMessage(messageData,
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
module.exports = router;