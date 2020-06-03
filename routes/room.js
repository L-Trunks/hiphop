const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const roomService = require('../services/roomService')
//获取所有房间
router.get('/get_all_room_list', function (req, res, next) {
    let roomData = req.query
    console.log(roomData)
    roomService.selectRoom(roomData,
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

//根据信息获取房间信息
router.get('/get_room_info_by_info', function (req, res, next) {
    let roomData = req.query
    console.log(roomData)
    roomService.selectRoom(roomData,
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

//修改房间信息
router.post('/update_room', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let roomData = req.body

    console.log(roomData)
    if (token.checkToken(accessToken)) {
        roomService.updateRoom(roomData,
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
//删除房间
router.post('/delete_room', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let roomData = req.body

    console.log(roomData)
    if (token.checkToken(accessToken)) {
        roomService.deleteRoom(roomData,
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
//添加房间
router.post('/add_room', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let roomData = req.body
    console.log(roomData)
    if (token.checkToken(accessToken)) {
        roomService.addRoom(roomData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error))
                    next(error);
                } else {
                    console.log(JSON.stringify(error), '数据::::' + data)
                    if (data && data.title) {
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