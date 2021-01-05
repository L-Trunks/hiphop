import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const articleInfoSchema = new mongoose.Schema({
    userid:Schema.Types.ObjectId,
    articleid:Schema.Types.ObjectId,
    type:String,
    createtime:{ type: Date, default: Date.now },
    from:Schema.Types.ObjectId,
    to:Schema.Types.ObjectId,
    title:String,
    commentinfo:String,
    parentid:String
}, {collection: 'articleInfo'});
module.exports = mongoose.model('articleInfo', articleInfoSchema);
//type 0:点赞 1:收藏 2:评论