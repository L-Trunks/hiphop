import mongoose from 'mongoose';
const postingsSchema = new mongoose.Schema({
    id: String,
    nickname:String,
    title:String,
    article:String,
    sortid:String,
    createtime:{ type: Date, default: Date.now },
    articlepermission:Boolean,
    banreason:String,
    userid:String
}, {collection: 'postings'});
module.exports = mongoose.model('postings', postingsSchema);