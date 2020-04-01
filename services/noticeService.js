import NOTICEMODEL from '../model/noticeModel'
import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import mongoose from 'mongoose';

//关注用户
function addNotice(userData, callback) {
    CONNECT.connect().then(res => {
        NOTICEMODEL.save(userData, (err, data, numAffected) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //数据库异常
            } else {
                //保存成功
                callback(err, data)
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

//取消关注
function removeNotice(userData, callback) {
    CONNECT.connect().then(res => {
        NOTICEMODEL.remove(userData, (err, data, numAffected) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //数据库异常
            } else {
                //保存成功
                callback(err, data)
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

//查询关注信息
function selectNotice(userData, callback) {
    CONNECT.connect().then(res => {
        NOTICEMODEL.aggregate([
            {
                $match: userData

            },
            {
                $lookup: {
                    from: "user",
                    localField: "to",
                    foreignField: "_id",
                    as: "noticeUser"
                },
            },], (err, data) => {
                mongoose.disconnect()
                if (err) {
                    callback(err, data)
                    //抛出异常
                } else {
                    console.log(data)
                    callback(err, data)
                }
            });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
module.exports = {
    addNotice: addNotice,
    removeNotice: removeNotice,
    selectNotice: selectNotice


};