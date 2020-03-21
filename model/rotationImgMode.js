import mongoose from 'mongoose';
const rotationImgSchema = new mongoose.Schema({
    id: String,
    imgtitle:String,
    introduce:String,
    imgurl:String,
    createtime:{ type: Date, default: Date.now },
    userid:String,
}, {collection: 'rotationimg'});
module.exports = mongoose.model('rotationimg', rotationImgSchema);