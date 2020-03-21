import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import VIDEOMODEL from '../model/videoModel'
import ARTICLEMODEL from '../model/articleModel'
import mongoose from 'mongoose';
//视频搜索
function getResultVideoList(searchData, callback) {
    CONNECT.connect().then(res => {
        let _num = searchData.page_size;//每页几条
        let _total = 0;
        let _skip = searchData.page_no * _num;
        let keyword = searchData.keyword //从URL中传来的 keyword参数
        let reg = new RegExp(keyword, 'i') //不区分大小写
        VIDEOMODEL.count(_filter, function (err, doc) { // 查询总条数（用于分页）
            if (err) {
                console.log(err)
            } else {
                _total = doc
            }
        })
        VIDEOMODEL.find(
            {
                $or: [ //多条件，数组
                    { videotitle: { $regex: reg ,$options: '$i'} },
                    { introduce: { $regex: reg ,$options: '$i'} }
                ]
            },
            {
                password: 0 // 返回结果不包含密码字段
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
                sort: { _id: -1 },// 按照 _id倒序排列
            }
        ).exec(function (err, data) { // 回调
            mongoose.disconnect()
            if (err) {
                console.log(err)
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
        })
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
//文章搜索
function getResultArticleList(searchData, callback) {
    CONNECT.connect().then(res => {
        let _num = searchData.page_size;//每页几条
        let _total = 0;
        let _skip = searchData.page_no * _num;
        let keyword = searchData.keyword //从URL中传来的 keyword参数
        let reg = new RegExp(keyword, 'i') //不区分大小写
        ARTICLEMODEL.count(_filter, function (err, doc) { // 查询总条数（用于分页）
            if (err) {
                console.log(err)
            } else {
                _total = doc
            }
        })
        ARTICLEMODEL.find(
            {
                $or: [ //多条件，数组
                    { title: { $regex: reg ,$options: '$i'} },
                    { article: { $regex: reg,$options: '$i' } },
                    { nickname: { $regex: reg ,$options: '$i'} },
                    
                ]
            },
            {
                password: 0 // 返回结果不包含密码字段
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
                sort: { _id: -1 },// 按照 _id倒序排列
            }
        ).exec(function (err, data) { // 回调
            mongoose.disconnect()
            if (err) {
                console.log(err)
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
        })
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })
}
module.exports = {
    getResultVideoList: getResultVideoList,
    getResultArticleList:getResultArticleList
}