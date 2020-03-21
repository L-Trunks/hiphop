import mongoose from 'mongoose';
const videoSchema = new mongoose.Schema({
    id: String,
    videotitle:String,
    introduce:String,
    videourl:String,
    createtime:{ type: Date, default: Date.now },
    userid:String,
    sortid:String,
    goodscount:Number,
    commentscount:Number,
    collectcount:Number
}, {collection: 'video'});
module.exports = mongoose.model('video', videoSchema);