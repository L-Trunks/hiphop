import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const letterSchema = new mongoose.Schema({
    from:Schema.Types.ObjectId,
    to:Schema.Types.ObjectId,
    letter:String,
    createtime:{ type: Date, default: Date.now },
}, {collection: 'letter'});
module.exports = mongoose.model('letter', letterSchema);