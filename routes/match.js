const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const matchService = require('../services/matchService')
//获取所有活动
router.get('/get_all_match_list', function (req, res, next) {
    let matchData = req.query
    console.log(matchData)
    matchService.selectMatch(matchData,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                // console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});

//根据信息获取活动信息
router.get('/get_march_info_by_info', function (req, res, next) {
    let matchData = req.query
    console.log(matchData)
    matchService.selectMatch(matchData,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error))
                next(error);
            } else {
                // console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});

//修改活动信息
router.post('/update_match', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let matchData = req.body

    console.log(matchData)
    if (token.checkToken(accessToken)) {
        matchService.updateMatch(matchData,
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
//删除图片
router.post('/delete_match', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let matchData = req.body

    console.log(matchData)
    if (token.checkToken(accessToken)) {
        matchService.deleteMatch(matchData,
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
//添加图片
router.post('/add_Match', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let matchData = req.body
    console.log(matchData)
    if (token.checkToken(accessToken)) {
        matchService.addMatch(matchData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    if (data) {
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