import LETTERMODEL from '../model/letterModel'
import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import mongoose from 'mongoose';

//添加私信
function addLetter(userData, callback) {
    CONNECT.connect().then(res => {
        LETTERMODEL.save(userData, (err, data, numAffected) => {
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

//查询私信列表
function selectLetter(userData, callback) {
    CONNECT.connect().then(res => {
        LETTERMODEL.aggregate([
            {
                // 分组
                $group: {
                    // 多字段分组，_id后是分组字段，分组字段可写为null来将所有结果聚合到一起
                    _id: { to: "$to" },
                }
            },
            {
                $lookup: {
                    from: "user",
                    localField: "to",
                    foreignField: "_id",
                    as: "toUser"
                },
            }, {
                $match: userData
            }], (err, data) => {
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

//删除会话
function deleteLetterWithUser(userData, callback) {
    CONNECT.connect().then(res => {
        LETTERMODEL.remove(userData, (err, data) => {
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
    addLetter: addLetter,
    selectLetter: selectLetter,
    deleteLetterWithUser: deleteLetterWithUser


};