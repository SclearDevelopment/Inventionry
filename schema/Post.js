
const mongoose = require('mongoose');
 
const PostSchema = new mongoose.Schema({
    idea: String,
    country: Number,
    phone: Number,
    id:Number,
    ip: String
}, {timestamps: true});


const Post = mongoose.model('Post', PostSchema);
module.exports = Post;