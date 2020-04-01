import mongoose from 'mongoose';
const letterSchema = new mongoose.Schema({
    from:String,
    to:String,
    letter:String,
    createtime:{ type: Date, default: Date.now },
}, {collection: 'letter'});
module.exports = mongoose.model('letter', letterSchema);