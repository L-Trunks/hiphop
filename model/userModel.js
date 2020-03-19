import mongoose from 'mongoose';
const registerSchema = new mongoose.Schema({
    id: String,
    mail: String,
    password: String,
    role:Array
}, {collection: 'user'});
module.exports = mongoose.model('user', registerSchema);