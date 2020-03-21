import KEYWORDMODEL from '../model/keywordsModel'
import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import VIDERMODEL from '../model/videoModel'
import ARTICLEMODEL from '../model/articleModel'
import messageService from '../services/messageService'
import mongoose from 'mongoose';
//添加关键字
function addKeyword(wordData, callback) {
    CONNECT.connect().then(res => {

        KEYWORDMODEL.find(wordData, (err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                //data是我们查数据库得到的数据，没有查到为[]
                if (data == 0) {
                    const keyword = new KEYWORDMODEL(wordData);
                    keyword.save((err, data, numAffected) => {
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
                    console.log(data)
                    callback(err, errorNumber.WORD_ALREADY())
                    //提示用户该账户已经注册
                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}
//删除关键字
function deleteKeyword(wordData, callback) {
    CONNECT.connect().then(res => {

        KEYWORDMODEL.remove(wordData, (err, data) => {
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

//编辑关键字
function updateKeyword(wordData, callback) {
    CONNECT.connect().then(res => {

        KEYWORDMODEL.update({ _id: wordData['_id'] }, { $set: wordData }, (err, data) => {
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
//查询关键字
function selectKeyword(wordData, callback) {
    CONNECT.connect().then(res => {

        KEYWORDMODEL.aggregate([
            {
                $match: wordData

            },
            {
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "keywordUser"
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

//视频　文章关键字监控

function videoKeyword(wordData, callback) {
    CONNECT.connect().then(res => {
        let keywords = []
        let selectKeyArr = []
        KEYWORDMODEL.find((err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                console.log(data)
                data && data.length > 0 ? data.map(i => {
                    keywords.push(i.keyword)
                }) : ''
            }
        });
        keywords.map(i => {
            selectKeyArr.push({
                videotitle: {
                    $regex: i,
                    $options: 'gi'
                }
            }, {
                    introduce: {
                        $regex: i,
                        $options: 'gi'
                    }
                })
        })

        query.$and = selectKeyArr
        VIDERMODEL.find(query, function (err, data) {
            mongoose.disconnect()
            if (err) {
                console.log(err)
                callback(err)
            } else {
                if (data && data.length > 0) {
                    data.map(i=>{
                        let messageData = {
                            message:'系统通知:您的视频”'+i.videotitle+'”标题或视频介绍中含有违规字符，请立即修改，逾期未修改合格将会对您的相关内容进行下架处理并扣除信誉分12分！',
                            from:'关键字监控小助手',
                            to:i.userid,
                            status:'0'
                        }
                        messageService.addMessage(messageData,function(err,data){
                            if (err) {
                                console.log(err)
                                callback(err)
                            } else {
                                console.log(data)
                            }
                        })
                    })
                    
                    

                }
            }
        })

    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}


function articleKeyword(wordData, callback) {
    CONNECT.connect().then(res => {
        let keywords = []
        let selectKeyArr = []
        KEYWORDMODEL.find((err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                console.log(data)
                data && data.length > 0 ? data.map(i => {
                    keywords.push(i.keyword)
                }) : ''
            }
        });
        keywords.map(i => {
            selectKeyArr.push({
                title: {
                    $regex: i,
                    $options: 'gi'
                }
            }, {
                    article: {
                        $regex: i,
                        $options: 'gi'
                    }
                })
        })

        query.$and = selectKeyArr
        ARTICLEMODEL.find(query, function (err, data) {
            mongoose.disconnect()
            if (err) {
                console.log(err)
                callback(err)
            } else {
                if (data && data.length > 0) {
                    data.map(i=>{
                        let messageData = {
                            message:'系统通知:您的帖子”'+i.videotitle+'”标题或内容中含有违规字符，请立即修改，逾期未修改合格将会对您的相关内容进行下架处理并扣除信誉分12分！',
                            from:'关键字监控小助手',
                            to:i.userid,
                            status:'0'
                        }
                        messageService.addMessage(messageData,function(err,data){
                            if (err) {
                                console.log(err)
                                callback(err)
                            } else {
                                console.log(data)
                            }
                        })
                    })
                    
                    

                }
            }
        })

    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

module.exports = {
    addKeyword: addKeyword,
    deleteKeyword: deleteKeyword,
    updateKeyword: updateKeyword,
    selectKeyword: selectKeyword,
    videoKeyword: videoKeyword,
    articleKeyword:articleKeyword


};