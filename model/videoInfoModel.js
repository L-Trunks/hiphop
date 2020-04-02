import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const videoInfoSchema = new mongoose.Schema({
    userid:Schema.Types.ObjectId,
    videoid:Schema.Types.ObjectId,
    type:String,
    createtime:{ type: Date, default: Date.now },
    from:Schema.Types.ObjectId,
    to:Schema.Types.ObjectId,
    title:String,
    commmentInfo:String,
    parentid:Schema.Types.ObjectId
}, {collection: 'videoInfo'});
module.exports = mongoose.model('videoInfo', videoInfoSchema);
//type 0:点赞 1:收藏 2:评论