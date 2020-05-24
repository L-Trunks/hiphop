import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const roomSchema = new mongoose.Schema({
    title:String,
    introduce:String,
    imgurl:String,
    createtime:{ type: Date, default: Date.now },
    userid:Schema.Types.ObjectId,
    status:String
}, {collection: 'room'});
module.exports = mongoose.model('room', roomSchema);
//status　0房间开启中　1 房间关闭