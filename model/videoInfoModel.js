import mongoose from 'mongoose';
const videoInfoSchema = new mongoose.Schema({
    userid:String,
    videoid:String,
    type:String,
    createtime:{ type: Date, default: Date.now },
    from:String,
    to:String,
    title:String,
    commmentInfo:String,
    parentid:String
}, {collection: 'videoInfo'});
module.exports = mongoose.model('videoInfo', videoInfoSchema);
//type 0:点赞 1:收藏 2:评论