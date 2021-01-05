import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const videoSchema = new mongoose.Schema({
    id: String,
    videotitle: String,
    introduce: String,
    videourl: String,
    firsturl:String,
    createtime: { type: Date, default: Date.now },
    userid: Schema.Types.ObjectId,
    sortid: Schema.Types.ObjectId,
    goodscount:{ type: Number, default: 0 },
    commentscount:{ type: Number, default: 0 },
    collectscount:{ type: Number, default: 0 },
    lookscount:{ type: Number, default: 0 }
}, { collection: 'video' });
module.exports = mongoose.model('video', videoSchema);