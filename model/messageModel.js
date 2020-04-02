import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const messageSchema = new mongoose.Schema({
    id: String,
    message:String,
    from:Schema.Types.ObjectId,
    to:Schema.Types.ObjectId,
    status:String,
    createtime:{ type: Date, default: Date.now },
}, {collection: 'message'});
module.exports = mongoose.model('message', messageSchema);

//status　0: 未读　1:已读