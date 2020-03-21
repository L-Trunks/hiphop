import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import ARTICLEMODEL from '../model/articleModel'
import mongoose from 'mongoose';
//上传文章
function addArticle(articleData, callback) {
    CONNECT.connect().then(res => {
        ARTICLEMODEL.save(articleData).aggregate([
            {
                // 查询条件
                $match: articleData
                
            },
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
            }
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

//删除文章
function deleteArticle(articleData, callback) {
    CONNECT.connect().then(res => {
        ARTICLEMODEL.remove(articleData, (err, data) => {
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

//修改文章
function updateArticle(articleData, callback) {
    CONNECT.connect().then(res => {
        ARTICLEMODEL.update({ _id: articleData['_id'] }, { $set: articleData })
            .find({ _id: articleData['_id'] }).aggregate([{
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

//查询文章

function selectArticle(articleData, callback) {
    let _num = articleData.page_size;//每页几条
    let _total = 0;
    let _skip = articleData.page_no * _num;
    let _filter = {};
    let _id = articleData._id;
    if (_id) {
        _filter = { '_id': articleData._id };
    }
    CONNECT.connect().then(res => {
        ARTICLEMODEL.find(filter, (err, data) => {
            if (err) {
                callback(err, data)
                //查询错误
            } else {
                _total = data.length;//获得总条数
            }
        })
        ARTICLEMODEL.aggregate([{
            // 查询条件
            $match: _filter
            
        },
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
            mongoose.disconnect()
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                console.log(data)
                //格式化数据
                const page = {
                    page_no: _params.page_no + 1,
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
//根据id获取文章信息
function getArticleInfoById(articleData, callback) {
    CONNECT.connect().then(res => {
        ARTICLEMODEL.aggregate([
            {
                $match: articleData
                
            },
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
    addArticle: addArticle,
    deleteArticle: deleteArticle,
    updateArticle: updateArticle,
    selectArticle: selectArticle,
    getArticleInfoById: getArticleInfoById
}