import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import VIDEOINFOMODEL from '../model/videoInfoModel'
import VIDEOMODEL from '../model/videoModel'
import SECONDVIDEOMODEL from '../model/secondVideoModel'
import mongoose from 'mongoose';
//点赞文章
function addGoods(videoData, callback) {
    CONNECT.connect().then(res => {
        const video = new VIDEOINFOMODEL(videoData)
        video.save(videoData, (err, data, numAffected) => {
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
//取消点赞
function removeGoods(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOINFOMODEL.remove(videoData, (err, data, numAffected) => {
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
//获取点赞状态

function getGoodsStatus(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOINFOMODEL.find({ userid: mongoose.Types.ObjectId(videoData['userid']), videoid: mongoose.Types.ObjectId(videoData['userid']) }, (err, data, numAffected) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //数据库异常
            } else {
                console.log(data)
                //保存成功
                if (data) {
                    callback(err, { desc: '已点赞', status: '1' })
                } else {
                    callback(err, { desc: '未点赞', status: '0' })
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}

//收藏文章
function addCollect(videoData, callback) {
    CONNECT.connect().then(res => {
        const video = new VIDEOINFOMODEL(videoData)
        video.save(videoData, (err, data, numAffected) => {
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //数据库异常
            } else {
                console.log(data)
                //保存成功
                if (data) {
                    callback(err, data)
                } else {
                    callback(err, { desc: '收藏失败' })
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
//取消收藏
function removeCollect(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOINFOMODEL.remove({ _id: mongoose.Types.ObjectId(videoData['_id']) }, (err, data, numAffected) => {
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
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
//获取收藏列表
function getCollectList(videoData, callback) {
    let _num = +videoData['page_size'];//每页几条
    let _total = 0;
    let _skip = +videoData['page_no'] * _num;
    let _filter = { userid: mongoose.Types.ObjectId(videoData['userid']), type: videoData.type };
    CONNECT.connect().then(res => {
        VIDEOINFOMODEL.find(_filter, (err, data) => {
            if (err) {
                callback(err, data)
                //查询错误
            } else {
                _total = data.length;//获得总条数
            }
        })
        VIDEOINFOMODEL.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "collectUser"
                },
            },
            {
                $lookup: {
                    from: "video",
                    localField: "videoid",
                    foreignField: "_id",
                    as: "videoUser"
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
            }, {
                // 跳过条数，管道中limit和skip的先后顺序会影响最后的输出条数，当前结果为3条
                $skip: _skip
            },
            {
                // 查询条数
                $limit: _num
            }], (err, data) => {
                mongoose.disconnect()
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
//添加评论
function addComments(videoData, callback) {
    CONNECT.connect().then(res => {
        const video = new VIDEOINFOMODEL(videoData)
        video.save((err, data, numAffected) => {
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
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

//添加二级评论

function addSecondComments(videoData, callback) {
    CONNECT.connect().then(res => {
        const video = new SECONDVIDEOMODEL(videoData)
        video.save((err, data, numAffected) => {
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
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
//查询评论列表
function selectComments(videoData, callback) {
    CONNECT.connect().then(res => {
        let _num = +videoData['page_size'];//每页几条
        let _skip = +videoData['page_no'] * _num;
        let _total = 0
        let _filter = { videoid: mongoose.Types.ObjectId(videoData['videoid']), type: videoData['type'], parentid: '0' };
        let data = []
        VIDEOINFOMODEL.find(_filter, (err, data) => {
            if (err) {
                callback(err, data)
                //查询错误
            } else {
                console.log('的方式＋＋＋＋' + data)
                _total = data.length;//获得总条数
            }
        })
        VIDEOINFOMODEL.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "from",
                    foreignField: "_id",
                    as: "fromUser"
                },
            },
            {
                $lookup: {
                    from: "user",
                    localField: "to",
                    foreignField: "_id",
                    as: "toUser"
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
            }, {
                // 跳过条数，管道中limit和skip的先后顺序会影响最后的输出条数，当前结果为3条
                $skip: _skip
            },
            {
                // 查询条数
                $limit: _num
            },
        ], (err, data) => {
            if (err) {
                mongoose.disconnect()
                callback(err, data)
                //抛出异常
            } else {
                mongoose.disconnect()
                //格式化数据
                console.log('评论列表＋＋＋＋＋' + data)
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

//查询二级评论列表
function selectSecondComments(videoData, callback) {
    CONNECT.connect().then(res => {
        let _filter = { videoid: mongoose.Types.ObjectId(videoData['videoid']) };

        let data = []
        SECONDVIDEOMODEL.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "from",
                    foreignField: "_id",
                    as: "fromUser"
                },
            },
            {
                $lookup: {
                    from: "user",
                    localField: "to",
                    foreignField: "_id",
                    as: "toUser"
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
            }
        ], (err, data) => {
            if (err) {
                mongoose.disconnect()
                callback(err, data)
                //抛出异常
            } else {
                mongoose.disconnect()
                //格式化数据
                console.log('二级评论列表＋＋＋＋＋' + data)
                callback(err, data)
            }
        });

    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
//根据文章获取点赞评论收藏数
function getCounts(videoData, callback) {
    CONNECT.connect().then(res => {
        VIDEOINFOMODEL.find({ videoid: mongoose.Types.ObjectId(videoData['videoid']) }, (err, data, numAffected) => {
            if (err) {
                callback(err, data)
                //数据库异常
            } else {
                console.log(data)
                //保存成功
                if (data) {
                    let goodscount = 0
                    let commentscount = 0
                    let collectscount = 0
                    data.map(i => {
                        if (i.type === '0') {
                            goodscount = goodscount + 1
                        } else if (i.type === '1') {
                            collectscount = collectscount + 1
                        } else if (i.type === '2') {
                            commentscount = commentscount + 1
                        }
                    })

                    VIDEOMODEL.update({ _id: mongoose.Types.ObjectId(videoData['videoid']) },
                        { $set: { goodscount: goodscount, commentscount: commentscount, collectscount: collectscount } },
                        function (err, data) {
                            mongoose.disconnect()
                            if (err) {
                                console.log('更新文章点赞收藏评论数失败', err)
                            } else {
                                console.log('更新文章点赞收藏评论数成功', data)
                            }
                        })
                    callback(err, { videoid: mongoose.Types.ObjectId(videoData['videoid']), goodscount: goodscount, commentscount: commentscount, collectscount: collectscount })
                }

            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
module.exports = {
    addGoods: addGoods,
    removeGoods: removeGoods,
    getGoodsStatus: getGoodsStatus,
    addCollect: addCollect,
    removeCollect: removeCollect,
    getCollectList: getCollectList,
    addComments: addComments,
    selectComments: selectComments,
    getCounts: getCounts,
    selectSecondComments: selectSecondComments,
    addSecondComments: addSecondComments
}