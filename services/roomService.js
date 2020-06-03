import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import ROOMMODEL from '../model/roomModel'
import mongoose from 'mongoose';

//新建房间
function addRoom(roomData, callback) {
    CONNECT.connect().then(res => {
        ROOMMODEL.find(roomData, (err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                if (data == 0) {
                    const room = new ROOMMODEL(roomData);
                    room.save((err, data, numAffected) => {
                        mongoose.disconnect()
                        if (err) {
                            callback(err, data)
                            //数据库异常
                        } else {
                            //保存成功
                            callback(err, data)
                        }
                    });
                } else {
                    //一个人只能创建一个房间
                    callback(err, errorNumber.ROOM_ALREADY())
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}

//删除房间
function deleteRoom(roomData, callback) {
    CONNECT.connect().then(res => {
        ROOMMODEL.remove({ '_id': mongoose.Types.ObjectId(roomData['_id']) }, (err, data, numAffected) => {
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


//编辑房间
function updateRoom(roomData, callback) {
    CONNECT.connect().then(res => {
        ROOMMODEL.update({ '_id': mongoose.Types.ObjectId(roomData['_id']) }, { $set: roomData }, (err, data, numAffected) => {
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

//查询房间
function selectRoom(roomData, callback) {
    CONNECT.connect().then(res => {
        let filter = roomData
        if (filter['_id']) {
            filter['_id'] = mongoose.Types.ObjectId(roomData['_id'])
        }
        if (filter['userid']) {
            filter['userid'] = mongoose.Types.ObjectId(roomData['userid'])
        }
        ROOMMODEL.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "roomUser"
                },
            }, {
                // 查询条件
                $match: filter
            },
            {
                // 排序
                $sort: {
                    // 倒序
                    "_id": -1
                }
            },
        ], (err, data, numAffected) => {
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
module.exports = {
    addRoom: addRoom,
    deleteRoom: deleteRoom,
    updateRoom: updateRoom,
    selectRoom: selectRoom
}