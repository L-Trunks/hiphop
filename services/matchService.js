import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import MATCHMODEL from '../model/matchModel'
import mongoose from 'mongoose';

//添加活动
function addMatch(matchData, callback) {
    CONNECT.connect().then(res => {
        const match = new MATCHMODEL(matchData);
        match.save((err, data, numAffected) => {
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

//删除活动
function deleteMatch(matchData, callback) {
    CONNECT.connect().then(res => {
        MATCHMODEL.remove({ '_id': mongoose.Types.ObjectId(matchData['_id']) }, (err, data, numAffected) => {
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


//编辑活动
function updateMatch(matchData, callback) {
    CONNECT.connect().then(res => {
        MATCHMODEL.update({ '_id': mongoose.Types.ObjectId(matchData['_id']) }, { $set: matchData }, (err, data, numAffected) => {
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

//查询活动
function selectMatch(matchData, callback) {
    CONNECT.connect().then(res => {
        let filter = matchData
        if (filter['_id']) {
            filter['_id'] = mongoose.Types.ObjectId(matchData['_id'])
        }
        if (filter['userid']) {
            filter['userid'] = mongoose.Types.ObjectId(matchData['userid'])
        }
        MATCHMODEL.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "matchUser"
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
    addMatch: addMatch,
    deleteMatch: deleteMatch,
    updateMatch: updateMatch,
    selectMatch: selectMatch
}