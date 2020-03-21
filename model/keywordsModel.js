import mongoose from 'mongoose';
const keywordSchema = new mongoose.Schema({
    id: String,
    keyword:String,
    userid:String,
    createtime:{ type: Date, default: Date.now },
}, {collection: 'keyword'});
module.exports = mongoose.model('keyword', keywordSchema);