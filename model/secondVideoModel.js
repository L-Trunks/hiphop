import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const secondVideoSchema = new mongoose.Schema({
    videoid:Schema.Types.ObjectId,
    createtime:{ type: Date, default: Date.now },
    from:Schema.Types.ObjectId,
    to:Schema.Types.ObjectId,
    commentinfo:String,
    parentid:String
}, {collection: 'secondVideo'});
module.exports = mongoose.model('secondVideo', secondVideoSchema);
//type 0:点赞 1:收藏 2:评论