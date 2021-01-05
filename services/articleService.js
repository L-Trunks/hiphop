import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import ARTICLEMODEL from '../model/articleModel'
import mongoose from 'mongoose';
//上传文章
function addArticle(articleData, callback) {
    CONNECT.connect().then(res => {
        const article = new ARTICLEMODEL(articleData);
        article.save((err, data) => {
            if (err) {
                callback(err, data)
            } else {
                console.log(data)
                ARTICLEMODEL.aggregate([
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

//删除文章
function deleteArticle(articleData, callback) {
    CONNECT.connect().then(res => {
        ARTICLEMODEL.remove(articleData, (err, data) => {
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

//修改文章
function updateArticle(articleData, callback) {
    CONNECT.connect().then(res => {
        ARTICLEMODEL.update({ _id: mongoose.Types.ObjectId(articleData['_id'] )}, { $set: articleData },(err,data)=>{
            ARTICLEMODEL.aggregate([{
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
            },{
                // 查询条件
                $match:{_id:mongoose.Types.ObjectId(articleData['_id'])}

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

//查询文章

function selectArticle(articleData, callback) {
    let _num = +articleData['page_size'];//每页几条
    let _total = 0;
    let _skip = +articleData['page_no'] * _num;
    let _filter = {};
    let _id = articleData['userid'];
    let sortid = articleData['sortid']
    console.log(_num,_skip)
    if (_id) {
        _filter = { userid: mongoose.Types.ObjectId(articleData['userid'] )};
    }else if(sortid){
        _filter = { sortid: mongoose.Types.ObjectId(articleData['sortid']) };
    }
    console.log(_filter)
    CONNECT.connect().then(res => {
        ARTICLEMODEL.find(_filter, (err, data) => {
            if (err) {
                callback(err, data)
                //查询错误
            } else {
                _total = data.length;//获得总条数
            }
        })
        ARTICLEMODEL.aggregate([
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
                        page_no: +articleData['page_no'] + 1,
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
                $match: {_id:mongoose.Types.ObjectId(articleData['_id'])}

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
function addArticleLook(articleData, callback) {
    CONNECT.connect().then(res => {
        ARTICLEMODEL.update({ _id: mongoose.Types.ObjectId(articleData['_id'] )}, { $set: { lookscount: +articleData['lookscount'] + 1 } }, (err, data) => {
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
    addArticle: addArticle,
    deleteArticle: deleteArticle,
    updateArticle: updateArticle,
    selectArticle: selectArticle,
    getArticleInfoById: getArticleInfoById,
    addArticleLook: addArticleLook
}