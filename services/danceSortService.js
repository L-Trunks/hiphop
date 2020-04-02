import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import DANCESORTMODEL from '../model/danceSortModel'
import mongoose from 'mongoose';
//添加舞种
function addSort(sortData, callback) {
    CONNECT.connect().then(res => {
        DANCESORTMODEL.find(sortData, (err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                if (data == 0) {
                    const danceSort = new DANCESORTMODEL(sortData);
                    danceSort.save((err, data, numAffected) => {
                        mongoose.disconnect()
                        if (err) {
                            callback(err, data)
                            //数据库异常
                        } else {
                            console.log(data)
                            //保存成功
                            callback(err, data)
                        }
                    });
                } else {
                    mongoose.disconnect()
                    console.log(data)
                    callback(err, errorNumber.DANCE_SORT_ALREADY())

                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}

//删除舞种
function deleteSort(sortData, callback) {
    CONNECT.connect().then(res => {
        DANCESORTMODEL.remove(sortData, (err, data) => {
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

//修改舞种
function updateSort(sortData, callback) {
    CONNECT.connect().then(res => {
        DANCESORTMODEL.update({ _id: mongoose.Types.ObjectId(sortData['_id']) }, { $set: sortData }, (err, data) => {
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

//查询舞种

function selectSort(sortData, callback) {
    CONNECT.connect().then(res => {
        DANCESORTMODEL.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "sortUser"
                }
            }, {
                $match: sortData
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

module.exports = {
    addSort: addSort,
    deleteSort: deleteSort,
    updateSort: updateSort,
    selectSort: selectSort
}