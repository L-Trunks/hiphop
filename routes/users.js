const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
const token = require('../token/token') //引入
const tokenTimes = 604800 //token有效期 单位秒
const userService = require('../services/userService')

//登录
router.post('/login', function (req, res, next) {
  let userData = req.query
  console.log(userData)
  userService.userLogin(userData,
    function (error, data) {
      if (error) {
        console.log('出现错误:' + error)
        next(error);
      } else {
        console.log('出现错误::' + error, '数据::::' + data)
        if (data && data.username) {
          let tokens = token.createToken(data.username, tokenTimes);
          res.json({ code: '200', data: data, accessToken: tokens && tokens || null });
        } else {
          res.json(errorNumber.USER_LOGIN_ERR())
        }

      }
    })
});

//注册
router.post('/register', function (req, res, next) {
  let userData = req.query
  console.log(userData)
  userService.userRegister(userData,
    function (error, data) {
      if (error) {
        console.log('出现错误:' + error)
        next(error);
      } else {
        console.log('出现错误::' + error, '数据::::' + data)
        if(data && data.username){
          res.json({ code: '200', data: data });
        }else{
          res.json(data)
        }
        
      }
    })

});

//根据token获取用户信息
router.post('/get_user_info_by_token', function (req, res, next) {
  let userData = req.query
  console.log(userData)
  if (token.checkToken(userData)) {
    let userName = token.decodeToken(userData)
    userService.getUserInfoByUserNameAndNickName({username:userName},
      function (error, data) {
        if (error) {
          console.log('出现错误:' + error)
          next(error);
        } else {
          console.log('出现错误::' + error, '数据::::' + data)
          res.json({ code: '200', data: data });
        }
      })
  } else {
    res.json(errorNumber.TOKEN_TIME_OUT())
  }

});

//设置管理员
router.post('/set_management', function (req, res, next) {
  let accessToken = req.query.accessToken
  let userData = req.query
  delete userData.accessToken
  console.log(userData)

  if (token.checkToken(accessToken)) {
    userService.setManagement(userData,
      function (error, data) {
        if (error) {
          console.log('出现错误:' + error)
          next(error);
        } else {
          console.log('出现错误::' + error, '数据::::' + data)
          res.json({ code: '200', data: data });
        }
      })
  } else {
    res.json(errorNumber.TOKEN_TIME_OUT())
  }

});

//根据id获取用户信息
router.get('/get_user_info_by_id', function (req, res, next) {
  console.log(req.query)
  let userData = {}
  if(typeof req.query === 'String'){
    userData = JSON.parse(req.query)
  }else{
    userData = req.query
  }
  let accessToken = req.get('accessToken')
  userData.accessToken ? delete userData.accessToken :''
  if (token.checkToken(accessToken)) {
    userService.getUSerInfoByID(userData,
      function (error, data) {
        if (error) {
          console.log('出现错误:' + error)
          next(error);
        } else {
          console.log('出现错误::' + error, '数据::::' + data)
          res.json({ code: '200', data: data });
        }
      })
  } else {
    res.json(errorNumber.TOKEN_TIME_OUT())
  }

});
module.exports = router;
