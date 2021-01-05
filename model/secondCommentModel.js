import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const secondCommentSchema = new mongoose.Schema({
    articleid:Schema.Types.ObjectId,
    createtime:{ type: Date, default: Date.now },
    from:Schema.Types.ObjectId,
    to:Schema.Types.ObjectId,
    commentinfo:String,
    parentid:String
}, {collection: 'secondComment'});
module.exports = mongoose.model('secondComment', secondCommentSchema);
//type 0:点赞 1:收藏 2:评论