import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const matchSchema = new mongoose.Schema({
    title:String,
    article:String,
    imgurl:String,
    starttime:String,
    endtime:String,
    address:String,
    phone:String,
    createtime:{ type: Date, default: Date.now },
    userid:Schema.Types.ObjectId,
    goodscount:{ type: Number, default: 0 },
    lookscount:{ type: Number, default: 0 }
}, {collection: 'match'});
module.exports = mongoose.model('match', matchSchema);