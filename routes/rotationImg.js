const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const rotationImgService = require('../services/rotationImgService')
//获取所有图片
router.get('/get_all_rotation_img_list', function (req, res, next) {
    // let rotationImgData = req.query
    // console.log(rotationImgData)
    rotationImgService.selectRotationImg({},
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

//根据信息获取图片
router.get('/get_rotation_img_list_by_info', function (req, res, next) {
    let rotationImgData = req.query
    console.log(rotationImgData)
    rotationImgService.selectRotationImg(rotationImgData,
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

//修改图片信息
router.post('/update_rotation_img', function (req, res, next) {
    let accessToken = req.query.accessToken
    let rotationImgData = req.query
    delete rotationImgData.accessToken
    console.log(rotationImgData)
    if (token.checkToken(accessToken)) {
        rotationImgService.updateRotationImg(rotationImgData,
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
//删除图片
router.post('/delete_rotation_img', function (req, res, next) {
    let accessToken = req.query.accessToken
    let rotationImgData = req.query
    delete rotationImgData.accessToken
    console.log(rotationImgData)
    if (token.checkToken(accessToken)) {
        rotationImgService.deleteRotationImg(rotationImgData,
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
//添加图片
router.post('/add_rotation_img', function (req, res, next) {
    let accessToken = req.query.accessToken
    let rotationImgData = req.query
    delete rotationImgData.accessToken
    console.log(rotationImgData)
    if (token.checkToken(accessToken)) {
        rotationImgService.addRotationImg(rotationImgData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + error)
                    next(error);
                } else {
                    console.log(error, '数据::::' + data)
                    if (data.rotationImgname) {
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