import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    id: String,
    nickname: String,
    username: String,
    password: String,
    introduce: String,
    birthday: String,
    imgurl: String,
    createtime: { type: Date, default: Date.now },
    mail: String,
    phone: String,
    permission: String,
}, { collection: 'user' });
module.exports = mongoose.model('user', userSchema);
//permission
// 0:普通用户　1:管理员 2:街舞大神(优质内容发布者) 　4:被封禁  6:申请认证中