import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import VIDEOMODEL from '../model/videoModel'
import mongoose from 'mongoose';
//上传视频
function addVideo(videoData, callback) {
    CONNECT.connect().then(res => {
        const video = new VIDEOMODEL(videoData);
        video.save((err, data) => {
            if (err) {
                callback(err, data)
            } else {
                console.log(data)
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
                    },{
                        // 查询条件
                        $match: {_id:mongoose.Types.ObjectId(data['_id'])}

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
            }

        })
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}

//删除视频
function deleteVideo(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOMODEL.remove(videoData, (err, data) => {
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

//修改视频
function updateVideo(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOMODEL.update({ _id: mongoose.Types.ObjectId(videoData['_id'] )}, { $set: videoData },(err,data)=>{
            VIDEOMODEL.aggregate([{
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
            },{
                // 查询条件
                $match:{_id:mongoose.Types.ObjectId(videoData['_id'])}

            },], (err, data) => {
                mongoose.disconnect()
                if (err) {
                    callback(err, data)
                    //抛出异常
                } else {
                    
                    callback(err, data)
                }
            });
        })
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
    let _id = videoData['userid'];
    let sortid = videoData['sortid']
    console.log(_num,_skip)
    if (_id) {
        _filter = { userid: mongoose.Types.ObjectId(videoData['userid'] )};
    }else if(sortid){
        _filter = { sortid: mongoose.Types.ObjectId(videoData['sortid']) };
    }
    console.log(_filter)
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
            }, 
            {
                // 查询条件
                $match: _filter

            },
            {
                // 排序
                $sort: {
                    // 倒序
                    "_id": -1
                }
            },{
                // 跳过条数，管道中limit和skip的先后顺序会影响最后的输出条数，当前结果为3条
                $skip: _skip
            },
            {
                // 查询条数
                $limit: _num
            },
            ], (err, data) => {
                mongoose.disconnect()
                if (err) {
                    callback(err, data)
                    //抛出异常
                } else {
                    
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
            },
            {
                $match: {_id:mongoose.Types.ObjectId(videoData['_id'])}

            }], (err, data) => {
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

//添加浏览量
function addVideoLook(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOMODEL.update({ _id: mongoose.Types.ObjectId(videoData['_id'] )}, { $set: { lookscount: +videoData['lookscount'] + 1 } }, (err, data) => {
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
module.exports = {
    addVideo: addVideo,
    deleteVideo: deleteVideo,
    updateVideo: updateVideo,
    selectVideo: selectVideo,
    getVideoInfoById: getVideoInfoById,
    addVideoLook: addVideoLook
}