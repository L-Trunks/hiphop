import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const rotationImgSchema = new mongoose.Schema({
    id: String,
    imgtitle:String,
    introduce:String,
    imgurl:String,
    createtime:{ type: Date, default: Date.now },
    userid:Schema.Types.ObjectId,
    status:String,
}, {collection: 'rotationimg'});
module.exports = mongoose.model('rotationimg', rotationImgSchema);
//Status状态　0:未上架　1:已上架　2:上架中 3:公告上架中 4:公告下架