import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    id: String,
    nickname:String,
    username: String,
    password: String,
    introduce:String,
    birthday:String,
    createtime:{ type: Date, default: Date.now },
    mail:String,
    permission:String
}, {collection: 'user'});
module.exports = mongoose.model('user', userSchema);

//permission
// 0:普通用户　1:管理员 2:街舞大神(优质内容发布者) 3:普通用户被封禁　4:管理员被封禁 5:街舞大神被封禁