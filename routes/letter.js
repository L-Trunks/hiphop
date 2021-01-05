const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const letterService = require('../services/letterService')

//发送私信
router.post('/send_letter', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let userData = req.body
    
    console.log(userData)
    if (token.checkToken(accessToken)) {
        letterService.addLetter(userData,
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

//根据用户查询私信列表
router.post('/select_letter_list_by_user', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let userData = req.body
    
    console.log(userData)
    if (token.checkToken(accessToken)) {
        letterService.selectLetter(userData,
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

//删除会话
router.post('/delete_letter_with_user', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let userData = req.body
    
    console.log(userData)
    if (token.checkToken(accessToken)) {
        letterService.deleteLetterWithUser(userData,
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