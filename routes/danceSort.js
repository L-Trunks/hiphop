const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const danceSortService = require('../services/danceSortService')
//获取所有舞种
router.get('/get_all_dance_sort_list', function (req, res, next) {
    // let sortData = req.query
    // console.log(sortData)
    danceSortService.selectSort({},
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error) )
                next(error);
            } else {
                // console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});

//根据信息获取舞种
router.get('/get_dance_sort_list_by_info', function (req, res, next) {
    let sortData = req.query
    console.log(sortData)
    danceSortService.selectSort(sortData,
        function (error, data) {
            if (error) {
                console.log('出现错误:' + JSON.stringify(error) )
                next(error);
            } else {
                console.log(JSON.stringify(error) , '数据::::' + data)
                res.json({ code: '200', data: data })

            }
        })
});

//修改舞种信息
router.post('/update_dance_sort', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let sortData = req.body
    console.log(sortData)
    if (token.checkToken(accessToken)) {
        danceSortService.updateSort(sortData,
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
//删除舞种
router.post('/delete_dance_sort', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let sortData = req.body
    console.log(sortData)
    if (token.checkToken(accessToken)) {
        danceSortService.deleteSort(sortData,
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
//添加舞种
router.post('/add_dance_sort', function (req, res, next) {
    let accessToken = req.get('accessToken')
    let sortData = req.body
    console.log(sortData,accessToken)
    if (token.checkToken(accessToken)) {
        danceSortService.addSort(sortData,
            function (error, data) {
                if (error) {
                    console.log('出现错误:' + JSON.stringify(error) )
                    next(error);
                } else {
                    console.log(JSON.stringify(error) , '数据::::' + data)
                    if (data.sortname) {
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