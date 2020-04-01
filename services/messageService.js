import MESSAGEMODEL from '../model/messageModel'
import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import mongoose from 'mongoose';

//发送消息
function addMessage(messageData, callback) {
    CONNECT.connect().then(res => {
        MESSAGEMODEL.find(messageData, (err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    const message = new MESSAGEMODEL(messageData);
                    message.save((err, data) => {
                        mongoose.disconnect()
                        if (err) {
                            callback(err, data)
                            //抛出异常
                        } else {
                            callback(err, data)
                        }
                    });
                } else {
                    console.log(data + '该信息已存在')

                }
            }
        });

    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}
//更新消息
function updateMessage(messageData, callback) {
    CONNECT.connect().then(res => {
        MESSAGEMODEL.update({ _id: messageData[_id] }, { $set: messageData }, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                callback(err, data)
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}
//删除消息

function deleteMessage(messageData, callback) {
    CONNECT.connect().then(res => {
        MESSAGEMODEL.remove(messageData, (err, data) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                callback(err, data)
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}

//根据用户id获取消息列表
function selectMessage(messageData, callback) {
    CONNECT.connect().then(res => {
        MESSAGEMODEL.aggregate([
            {
                $match: messageData

            },
            {
                $lookup: {
                    from: "user",
                    localField: "from",
                    foreignField: "_id",
                    as: "fromUser"
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
    addMessage: addMessage,
    updateMessage: updateMessage,
    deleteMessage: deleteMessage,
    selectMessage: selectMessage

};