import mongoose from 'mongoose';
const articleInfoSchema = new mongoose.Schema({
    userid:String,
    articleid:String,
    type:String,
    createtime:{ type: Date, default: Date.now },
    from:String,
    to:String,
    title:String,
    commmentInfo:String,
    parentid:String
}, {collection: 'articleInfo'});
module.exports = mongoose.model('articleInfo', articleInfoSchema);
//type 0:点赞 1:收藏 2:评论