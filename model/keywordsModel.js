import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const keywordSchema = new mongoose.Schema({
    id: String,
    keyword:String,
    userid:Schema.Types.ObjectId,
    createtime:{ type: Date, default: Date.now },
}, {collection: 'keyword'});
module.exports = mongoose.model('keyword', keywordSchema);