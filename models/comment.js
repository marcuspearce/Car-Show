var mongoose = require("mongoose");

// COMMENT SCHEMA
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);