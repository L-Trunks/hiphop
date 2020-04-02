import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const noticeSchema = new mongoose.Schema({
    createtime:{ type: Date, default: Date.now },
    from:Schema.Types.ObjectId,
    to:Schema.Types.ObjectId,
}, {collection: 'notice'});
module.exports = mongoose.model('notice', noticeSchema);