import USERMODEL from '../model/userModel'
import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
function userRegister(userData, callback) {
    CONNECT.connect().then(res=>{
        //用账号去数据库中查找账号是否已经注册
    USERMODEL.find(userData, (err, data) => {
        if (err) {
            callback(err,data)
            //抛出异常
        } else {
            //data是我们查数据库得到的数据，没有查到为[]
            if (data == 0) {
                const register = new USERMODEL(userData);
                register.save((err,data, numAffected) => {
                    if (err) {
                        callback(err,data)
                        //数据库异常
                    } else {
                        //保存成功
                        callback(err,data[0])
                    }
                });
            } else {
                console.log(data)
                callback(err,errorNumber.USER_ALREADY())
                //提示用户该账户已经注册
            }
        }
    });
    }).catch(err=>{
        console.log(err)
        callback(err,'链接数据库失败')
    })
    
}

function userLogin(userData, callback) {
    CONNECT.connect().then(res=>{
        //用账号去数据库中查找账号是否已经注册
    USERMODEL.find(userData, (err, data) => {
        if (err) {
            callback(err,data)
            //抛出异常
        } else {
            //data是我们查数据库得到的数据，没有查到为[]
            if (data == 0) {
                callback(err,errorNumber.USER_LOGIN_ERR())
            } else {
                callback(err,data[0])
            }
        }
    });
    }).catch(err=>{
        console.log(err)
        callback(err,'链接数据库失败')
    })
}

//设置管理员
function setManagement(userData,callback){
    CONNECT.connect().then(res=>{
        //用账号去数据库中查找账号是否已经注册
    USERMODEL.update({username:userData['username']},{$set:{permission:'1'}}, (err, data) => {
        if (err) {
            callback(err,data)
            //抛出异常
        } else {
            //data是我们查数据库得到的数据，没有查到为[]
            if (data == 0) {
                callback(err,errorNumber.USER_FIND_ERR())
            } else {
                callback(err,data[0])
            }
        }
    });
    }).catch(err=>{
        console.log(err)
        callback(err,'链接数据库失败')
    })
}

//根据id获取用户信息

function getUSerInfoByID(data,callback){
    CONNECT.connect().then(res=>{
        //用账号去数据库中查找账号是否已经注册
    USERMODEL.find({_id:data['_id']}, (err, data) => {
        if (err) {
            callback(err,data)
            //抛出异常
        } else {
            //data是我们查数据库得到的数据，没有查到为[]
            if (data == 0) {
                callback(err,errorNumber.USER_FIND_ERR())
            } else {
                callback(err,data[0])
            }
        }
    });
    }).catch(err=>{
        console.log(err)
        callback(err,'链接数据库失败')
    })
}
//封号
//解禁
function updateUserPermission(data,callback){
    CONNECT.connect().then(res=>{
        //用账号去数据库中查找账号是否已经注册
    USERMODEL.update({_id:data['_id']}, {$set:{permission:data['permission']}},(err, data) => {
        if (err) {
            callback(err,data)
            //抛出异常
        } else {
            //data是我们查数据库得到的数据，没有查到为[]
            if (data == 0) {
                callback(err,errorNumber.USER_FIND_ERR())
            } else {
                callback(err,data[0])
            }
        }
    });
    }).catch(err=>{
        console.log(err)
        callback(err,'链接数据库失败')
    })
}
/**
 * 根据信息查询用户
 * @param {*} data 
 * @param {*} callback 
 */
//验证用户名
//验证昵称
function getUserInfoByUserNameAndNickName(data,callback){
    CONNECT.connect().then(res=>{
        //用账号去数据库中查找账号是否已经注册
    USERMODEL.find(data,(err, data) => {
        if (err) {
            callback(err,data)
            //抛出异常
        } else {
            //data是我们查数据库得到的数据，没有查到为[]
            if (data == 0) {
                callback(err,{})
            } else {
                callback(err,data[0])
            }
        }
    });
    }).catch(err=>{
        console.log(err)
        callback(err,'链接数据库失败')
    })
}
//修改个人信息

function updateUserInfo(data,callback){
    CONNECT.connect().then(res=>{
        //用账号去数据库中查找账号是否已经注册
    USERMODEL.update({_id:data['_id']},{$set:data},(err, data) => {
        if (err) {
            callback(err,data)
            //抛出异常
        } else {
            //data是我们查数据库得到的数据，没有查到为[]
            if (data == 0) {
                callback(err,{})
            } else {
                callback(err,data[0])
            }
        }
    });
    }).catch(err=>{
        console.log(err)
        callback(err,'链接数据库失败')
    })
}
//获取所有用户列表
module.exports = {
    userRegister: userRegister,
    userLogin: userLogin,
    setManagement:setManagement,
    getUSerInfoByID:getUSerInfoByID,
    updateUserPermission:updateUserPermission,
    getUserInfoByUserNameAndNickName:getUserInfoByUserNameAndNickName,
    updateUserInfo:updateUserInfo



};