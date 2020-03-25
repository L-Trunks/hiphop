import mongoose from 'mongoose';
const noticeSchema = new mongoose.Schema({
    userid:String,
    videoid:String,
    type:String,
    createtime:{ type: Date, default: Date.now },
    from:String,
    to:String,
    title:String,
    commmentInfo:String,
    parentid:String
}, {collection: 'notice'});
module.exports = mongoose.model('notice', noticeSchema);
//type 0:点赞 1:收藏 2:评论