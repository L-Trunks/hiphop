import mongoose from 'mongoose';
const articleSchema = new mongoose.Schema({
    id: String,
    nickname:String,
    title:String,
    article:String,
    sortid:String,
    createtime:{ type: Date, default: Date.now },
    articlepermission:Boolean,
    banreason:String,
    userid:String,
    goodscount:Number,
    commentscount:Number,
    collectscount:Number
}, {collection: 'article'});
module.exports = mongoose.model('article', articleSchema);