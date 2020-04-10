import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const verifySchema = new mongoose.Schema({
    name:String,
    introduce:String,
    type:String,
    phone:String,
    idcard:String,
    imgurl:String,
    createtime:{ type: Date, default: Date.now },
    userid:Schema.Types.ObjectId,
    status:String
}, {collection: 'verify'});
module.exports = mongoose.model('verify', verifySchema);
//status　0认证中　1 认证失败　2认证成功