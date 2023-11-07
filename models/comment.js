const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: String,
    date: Date,
});

module.exports = mongoose.model("Comment", commentSchema);