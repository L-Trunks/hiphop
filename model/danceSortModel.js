import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const danceSortSchema = new mongoose.Schema({
    id: String,
    sortname:String,
    introduce:String,
    createtime:{ type: Date, default: Date.now },
    userid:Schema.Types.ObjectId,
    status:String
}, {collection: 'danceSort'});
module.exports = mongoose.model('danceSort', danceSortSchema);
//status  0:未上架　1:已上架