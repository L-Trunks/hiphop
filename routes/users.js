const express = require('express');
const router = express.Router();
//token
import errorNumber from '../config/errorNum'
import { fuchsia } from 'color-name';
import errorNum from '../config/errorNum';
const token = require('../token/token') //引入
const tokenTimes = 604800 //token有效期 单位秒
const userService = require('../services/userService')

//登录
router.post('/login', function (req, res, next) {
  let userData = req.body
  console.log(userData)
  userService.userLogin(userData,
    function (error, data) {
      if (error) {
        console.log('出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log(JSON.stringify(error), '数据::::' + typeof data)
        if (data != 0 ) {
          let tokens = token.createToken(data[0].username, tokenTimes);
          res.json({ code: '200', data: data, accessToken: tokens && tokens || null });
        } else {
          res.json(errorNumber.USER_LOGIN_ERR())
        }

      }
    })
});

//注册
router.post('/register', function (req, res, next) {
  let userData = req.body
  console.log(userData)
  userService.userRegister(userData,
    function (error, data) {
      if (error) {
        console.log('出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log(JSON.stringify(error), '数据::::' + data)
        if (data && data.username) {
          res.json({ code: '200', data: data });
        } else {
          res.json(data)
        }

      }
    })

});

//根据token获取用户信息
router.post('/get_user_info_by_token', function (req, res, next) {
  let userData = req.body.accessToken || req.query.accessToken || req.get('accessToken')
  console.log(userData)
  if (token.checkToken(userData)) {
    let userName = token.decodeToken(userData)
    console.log(userName)
    userService.getUserInfoByUserNameAndNickName({ username: userName.payload.data },
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

//设置管理员及认证用户
router.post('/set_management', function (req, res, next) {
  let accessToken = req.get('accessToken')
  let userData = req.body
  delete userData.accessToken
  console.log(userData)
  if (token.checkToken(accessToken)) {
    userService.setManagement(userData,
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

//根据id获取用户信息
router.get('/get_user_info_by_id', function (req, res, next) {
  console.log(req.query)
  let userData = req.query
  let accessToken = req.get('accessToken')

  if (token.checkToken(accessToken)) {
    userService.getUSerInfoByID(userData,
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

//封号
router.post('/ban_user', function (req, res, next) {
  let accessToken = req.get('accessToken')
  let userData = req.body

  console.log(userData)
  if (token.checkToken(accessToken)) {
    userService.updateUserPermission(userData,
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

//解禁
router.post('/unban_user', function (req, res, next) {
  let accessToken = req.get('accessToken')
  let userData = req.body

  console.log(userData)
  if (token.checkToken(accessToken)) {
    userService.updateUserPermission(userData,
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

//验证用户名
router.post('/verify_user_name', function (req, res, next) {
  let userData = req.body
  console.log(userData)
  userService.getUserInfoByUserNameAndNickName(userData,
    function (error, data) {
      if (error) {
        console.log('出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log(JSON.stringify(error), '数据::::' + data)
        if (data == 0) {
          res.json({ code: '200', data: data });
        } else {
          res.json(errorNum.USER_ALREADY())
        }
      }
    })
});

//验证昵称

router.post('/verify_nick_name', function (req, res, next) {
  let userData = req.body
  console.log(userData)
  userService.getUserInfoByUserNameAndNickName(userData,
    function (error, data) {
      if (error) {
        console.log('出现错误:' + JSON.stringify(error))
        next(error);
      } else {
        console.log(JSON.stringify(error), '数据::::' + data)

        if (data == 0) {
          res.json({ code: '200', data: data });
        } else {
          res.json({ code: '1008', data: data })
        }
      }
    })
});

//修改密码
router.post('/update_password', function (req, res, next) {
  let userData = req.body
  console.log(userData)

  let accessToken = req.get('accessToken')
  if (token.checkToken(accessToken)) {
    userService.verifyOldPassWord({ _id: userData._id, password: userData.oldpassword },
      function (error, data) {
        if (error) {
          console.log('出现错误:' + JSON.stringify(error))
          next(error);
        } else {
          console.log(JSON.stringify(error), '数据::::' + data)
          if (!data) {
            res.json({ code: '400', desc: '未知错误' });
          } else {
            if (data.username) {
              userService.updateUserInfo({ _id: userData._id, password: userData.nowpassword }, function (error, data) {
                if (error) {
                  console.log('出现错误:' + JSON.stringify(error))
                  next(error);
                } else {
                  res.json({ code: '200', desc: '修改成功,请重新登录' });
                }
              })
            } else {
              res.json({ code: '200', data: data })

            }

          }
        }
      })
  } else {
    res.json(errorNumber.TOKEN_TIME_OUT())
  }
});

//修改个人信息
router.post('/update_user_info', function (req, res, next) {
  let userData = req.body
  console.log(userData)

  let accessToken = req.get('accessToken')
  if (token.checkToken(accessToken)) {
    userService.updateUserInfo(userData,
      function (error, data) {
        if (error) {
          console.log('出现错误:' + JSON.stringify(error))
          next(error);
        } else {
          console.log(JSON.stringify(error), '数据::::' + data)
          if (!data) {
            res.json({ code: '400', desc: '未知错误' });
          } else {
            res.json({ code: '200', data: data })
          }
        }
      })
  } else {
    res.json(errorNumber.TOKEN_TIME_OUT())
  }
});

//获取所有用户列表
router.get('/get_all_user_list', function (req, res, next) {
  let userData = req.query
  console.log(userData)

  let accessToken = req.get('accessToken')
  if (token.checkToken(accessToken)) {
    userService.getUserList(userData,
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

//获取普通用户列表
router.get('/get_user_list', function (req, res, next) {
  let userData = req.query
  console.log(userData)

  let accessToken = req.get('accessToken')
  if (token.checkToken(accessToken)) {
    userService.getUserList(userData,
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
//获取管理员列表
router.get('/get_management_user_list', function (req, res, next) {
  let userData = req.query
  console.log(userData)

  let accessToken = req.get('accessToken')
  if (token.checkToken(accessToken)) {
    userService.getUserList(userData,
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
//获取街舞大神列表
router.get('/get_god_user_list', function (req, res, next) {
  let userData = req.query
  console.log(userData)

  let accessToken = req.get('accessToken')
  if (token.checkToken(accessToken)) {
    userService.getUserList(userData,
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
