import mongoose from 'mongoose';
const noticeSchema = new mongoose.Schema({
    createtime:{ type: Date, default: Date.now },
    from:String,
    to:String,
}, {collection: 'notice'});
module.exports = mongoose.model('notice', noticeSchema);