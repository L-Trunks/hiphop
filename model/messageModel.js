import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    id: String,
    message:String,
    from:String,
    to:String,
    status:String,
    createtime:{ type: Date, default: Date.now },
}, {collection: 'message'});
module.exports = mongoose.model('message', messageSchema);

//status　0: 未读　1:已读