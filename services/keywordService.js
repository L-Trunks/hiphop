import KEYWORDMODEL from '../model/keywordsModel'
import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import VIDEOMODEL from '../model/videoModel'
import ARTICLEMODEL from '../model/articleModel'
import USERMODEL from '../model/userModel'
import ARTICLEINFOMODEL from '../model/articleInfoModel'
import VIDEOINFOMODEL from '../model/videoInfoModel'
import SECONDCOMMENTMODEL from '../model/secondCommentModel'
import SECONDVIDEOMODEL from '../model/secondVideoModel'
// import messageService from '../services/messageService'
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

        KEYWORDMODEL.update({ _id: mongoose.Types.ObjectId(wordData['_id']) }, { $set: wordData }, (err, data) => {
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
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "keywordUser"
                },
            }, {
                $match: wordData

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

//视频　文章 用户信息 评论关键字监控

function videoKeyword(wordData, callback) {
    CONNECT.connect().then(res => {
        // let keywords = []
        // let selectKeyArr = []
        KEYWORDMODEL.find((err, data) => {
            if (err) {
                callback(err)
            } else {
                for (let i in data) {

                    VIDEOMODEL.find({
                        $or: [{
                            videotitle: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }, {
                            introduce: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }]
                    }, function (err, videodata) {
                        if (videodata == 0) {
                            if (data[Object.keys(data).length - 1] == data[i]) {
                                mongoose.disconnect()
                                callback(err, {})
                            }
                        } else {
                            for (let j in videodata) {
                                let titleTmp = String(videodata[j].videotitle)
                                let introTmp = String(videodata[j].introduce)
                                console.log(titleTmp, introTmp)
                                titleTmp = titleTmp.replace(data[i].keyword, '***')
                                introTmp = introTmp.replace(data[i].keyword, '***')
                                videodata[j].videotitle = titleTmp;
                                videodata[j].introduce = introTmp;
                                const video = new VIDEOMODEL(videodata[j])
                                video.save();
                                if (data[Object.keys(data).length - 1] == data[i] && videodata[Object.keys(videodata).length - 1] == videodata[j]) {
                                    mongoose.disconnect()
                                    callback(err, {})
                                }
                            }
                        }



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
        KEYWORDMODEL.find((err, data) => {
            if (err) {
                callback(err)
            } else {

                for (let i in data) {

                    ARTICLEMODEL.find({
                        $or: [{
                            title: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }, {
                            article: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }]
                    }, function (err, articledata) {
                        if (articledata == 0) {
                            if (data[Object.keys(data).length - 1] == data[i]) {
                                mongoose.disconnect()
                                callback(err, {})
                            }
                        } else {
                            for (let j in articledata) {

                                let titleTmp = String(articledata[j].title)
                                let introTmp = String(articledata[j].article)
                                console.log(titleTmp, introTmp)
                                titleTmp = titleTmp.replace(data[i].keyword, '***')
                                introTmp = introTmp.replace(data[i].keyword, '***')
                                articledata[j].title = titleTmp;
                                articledata[j].article = introTmp;
                                const article = new ARTICLEMODEL(articledata[j])
                                article.save();
                                if (data[Object.keys(data).length - 1] == data[i] && articledata[Object.keys(articledata).length - 1] == articledata[j]) {
                                    mongoose.disconnect()
                                    callback(err, {})
                                }
                            }

                        }
                    })
                }
            }
        })

    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

function userKeyword(wordData, callback) {
    CONNECT.connect().then(res => {
        KEYWORDMODEL.find((err, data) => {
            if (err) {
                callback(err)
            } else {

                for (let i in data) {

                    USERMODEL.find({
                        $or: [{
                            nickname: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }, {
                            introduce: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }]
                    }, function (err, seconddata) {
                        if (seconddata == 0) {
                            if (data[Object.keys(data).length - 1] == data[i]) {
                                mongoose.disconnect()
                                callback(err, {})
                            }
                        } else {
                            for (let j in seconddata) {
                                let titleTmp = String(seconddata[j].nickname)
                                let introTmp = String(seconddata[j].introduce)
                                console.log(titleTmp, introTmp)
                                titleTmp = titleTmp.replace(data[i].keyword, '***')
                                introTmp = introTmp.replace(data[i].keyword, '***')
                                seconddata[j].nickname = titleTmp;
                                seconddata[j].introduce = introTmp;
                                const article = new USERMODEL(seconddata[j])
                                article.save();
                                if (data[Object.keys(data).length - 1] == data[i] && seconddata[Object.keys(seconddata).length - 1] == seconddata[j]) {
                                    mongoose.disconnect()
                                    callback(err, {})
                                }
                            }
                        }
                    })
                }
            }
        })

    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

//
function articleInfoKeyword(wordData, callback) {
    CONNECT.connect().then(res => {
        KEYWORDMODEL.find((err, data) => {
            if (err) {
                callback(err)
            } else {

                for (let i in data) {

                    ARTICLEINFOMODEL.find({
                        $or: [{
                            nickname: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }, {
                            introduce: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }]
                    }, function (err, seconddata) {
                        if (seconddata == 0) {
                            if (data[Object.keys(data).length - 1] == data[i]) {
                                mongoose.disconnect()
                                callback(err, {})
                            }
                        } else {
                            for (let j in seconddata) {
                                let titleTmp = String(seconddata[j].commentinfo)
                                console.log(titleTmp)
                                titleTmp = titleTmp.replace(data[i].keyword, '***')
                                seconddata[j].commentinfo = titleTmp;
                                const article = new ARTICLEINFOMODEL(seconddata[j])
                                article.save();
                                if (data[Object.keys(data).length - 1] == data[i] && seconddata[Object.keys(seconddata).length - 1] == seconddata[j]) {
                                    mongoose.disconnect()
                                    callback(err, {})
                                }
                            }
                        }
                    })
                }
            }
        })

    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

function videoInfoKeyword(wordData, callback) {
    CONNECT.connect().then(res => {
        KEYWORDMODEL.find((err, data) => {
            if (err) {
                callback(err)
            } else {

                for (let i in data) {

                    VIDEOINFOMODEL.find({
                        $or: [{
                            nickname: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }, {
                            introduce: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }]
                    }, function (err, seconddata) {
                        if (seconddata == 0) {
                            if (data[Object.keys(data).length - 1] == data[i]) {
                                mongoose.disconnect()
                                callback(err, {})
                            }
                        } else {
                            for (let j in seconddata) {
                                let titleTmp = String(seconddata[j].commentinfo)
                                console.log(titleTmp)
                                titleTmp = titleTmp.replace(data[i].keyword, '***')
                                seconddata[j].commentinfo = titleTmp;
                                const article = new VIDEOINFOMODEL(seconddata[j])
                                article.save();
                                if (data[Object.keys(data).length - 1] == data[i] && seconddata[Object.keys(seconddata).length - 1] == seconddata[j]) {
                                    mongoose.disconnect()
                                    callback(err, {})
                                }
                            }
                        }
                    })
                }
            }
        })

    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

function secondArticleKeyword(wordData, callback) {
    CONNECT.connect().then(res => {
        KEYWORDMODEL.find((err, data) => {
            if (err) {
                callback(err)
            } else {

                for (let i in data) {

                    SECONDCOMMENTMODEL.find({
                        $or: [{
                            nickname: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }, {
                            introduce: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }]
                    }, function (err, seconddata) {
                        if (seconddata == 0) {
                            if (data[Object.keys(data).length - 1] == data[i]) {
                                mongoose.disconnect()
                                callback(err, {})
                            }
                        } else {
                            for (let j in seconddata) {
                                let titleTmp = String(seconddata[j].commentinfo)
                                console.log(titleTmp)
                                titleTmp = titleTmp.replace(data[i].keyword, '***')
                                seconddata[j].commentinfo = titleTmp;
                                const article = new SECONDCOMMENTMODEL(seconddata[j])
                                article.save();
                                if (data[Object.keys(data).length - 1] == data[i] && seconddata[Object.keys(seconddata).length - 1] == seconddata[j]) {
                                    mongoose.disconnect()
                                    callback(err, {})
                                }
                            }
                        }
                    })
                }
            }
        })

    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}

function secondVideoKeyword(wordData, callback) {
    CONNECT.connect().then(res => {
        KEYWORDMODEL.find((err, data) => {
            if (err) {
                callback(err)
            } else {

                for (let i in data) {

                    SECONDVIDEOMODEL.find({
                        $or: [{
                            nickname: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }, {
                            introduce: {
                                $regex: data[i].keyword,
                                $options: 'gi'
                            }
                        }]
                    }, function (err, seconddata) {
                        if (seconddata == 0) {
                            if (data[Object.keys(data).length - 1] == data[i]) {
                                mongoose.disconnect()
                                callback(err, {})
                            }
                        } else {
                            for (let j in seconddata) {
                                let titleTmp = String(seconddata[j].commentinfo)
                                console.log(titleTmp)
                                titleTmp = titleTmp.replace(data[i].keyword, '***')
                                seconddata[j].commentinfo = titleTmp;
                                const article = new SECONDVIDEOMODEL(seconddata[j])
                                article.save();
                                if (data[Object.keys(data).length - 1] == data[i] && seconddata[Object.keys(seconddata).length - 1] == seconddata[j]) {
                                    mongoose.disconnect()
                                    callback(err, {})
                                }
                            }
                        }
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
    articleKeyword: articleKeyword,
    userKeyword: userKeyword,
    articleInfoKeyword: articleInfoKeyword,
    videoInfoKeyword: videoInfoKeyword,
    secondArticleKeyword: secondArticleKeyword,
    secondVideoKeyword: secondVideoKeyword

};