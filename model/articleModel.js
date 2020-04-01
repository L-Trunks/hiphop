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
    goodscount:{ type: Number, default: 0 },
    commentscount:{ type: Number, default: 0 },
    collectscount:{ type: Number, default: 0 },
    lookscount:{ type: Number, default: 0 }
}, {collection: 'article'});
module.exports = mongoose.model('article', articleSchema);