import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import VIDEOMODEL from '../model/articleModel'
import mongoose from 'mongoose';
//上传视频
function addVideo(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOMODEL.save(videoData, (err, data, numAffected) => {
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

//删除视频
function deleteVideo(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOMODEL.remove(videoData, (err, data) => {
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

//修改视频
function updateVideo(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOMODEL.update({ _id: mongoose.Types.ObjectId(videoData['_id']) }, { $set: videoData })
            .find({ _id: mongoose.Types.ObjectId(videoData['_id']) }).aggregate([{
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "videoUser"
                },
            },
            {
                $lookup: {
                    from: "danceSort",
                    localField: "sortid",
                    foreignField: "_id",
                    as: "videoSort"
                },
            }], (err, data) => {
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

//查询视频
function selectVideo(videoData, callback) {
    let _num = +videoData['page_size'];//每页几条
    let _total = 0;
    let _skip = +videoData['page_no'] * _num;
    let _filter = {};
    let _id = mongoose.Types.ObjectId(videoData['_id']);
    if (_id) {
        _filter = { '_id': mongoose.Types.ObjectId(videoData['_id']) };
    }
    CONNECT.connect().then(res => {
        VIDEOMODEL.find(_filter, (err, data) => {
            if (err) {
                callback(err, data)
                //查询错误
            } else {
                _total = data.length;//获得总条数
            }
        })
        VIDEOMODEL.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "videoUser"
                },
            },
            {
                $lookup: {
                    from: "danceSort",
                    localField: "sortid",
                    foreignField: "_id",
                    as: "videoSort"
                },
            }, {
                // 查询条件
                $match: _filter

            },
            {
                // 排序
                $sort: {
                    // 倒序
                    "_id": -1
                }
            },
            {
                // 查询条数
                $limit: _num
            },
            {
                // 跳过条数，管道中limit和skip的先后顺序会影响最后的输出条数，当前结果为3条
                $skip: _skip
            },
            {
                // 计数
                $count: "count"
            }], (err, data) => {
                if (err) {
                    callback(err, data)
                    //抛出异常
                } else {
                    console.log(data)
                    //格式化数据
                    const page = {
                        page_no: +videoData['page_no'] + 1,
                        page_size: _num,
                        total: _total,
                        data: data
                    };
                    callback(err, page)
                }
            });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}

//根据id获取视频信息
function getVideoInfoById(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOMODEL.aggregate([

            {
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "articleUser"
                },
            },
            {
                $lookup: {
                    from: "danceSort",
                    localField: "sortid",
                    foreignField: "_id",
                    as: "articleSort"
                },
            }, {
                $match: videoData

            },], (err, data) => {
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

//添加浏览量
function addVideoLook(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOMODEL.update({ _id: mongoose.Types.ObjectId(videoData['_id']) }, { $set: { lookcount: videoData.lookcount + 1 } }, (err, data) => {
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
    addVideo: addVideo,
    deleteVideo: deleteVideo,
    updateVideo: updateVideo,
    selectVideo: selectVideo,
    getVideoInfoById: getVideoInfoById,
    addVideoLook: addVideoLook
}