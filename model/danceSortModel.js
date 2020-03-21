import mongoose from 'mongoose';
const danceSortSchema = new mongoose.Schema({
    id: String,
    sortname:String,
    introduce:String,
    createtime:{ type: Date, default: Date.now },
    userid:String
}, {collection: 'danceSort'});
module.exports = mongoose.model('danceSort', danceSortSchema);