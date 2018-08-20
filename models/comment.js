var mongoose = require("mongoose");

// COMMENT SCHEMA
var commentSchema = mongoose.Schema({
    text: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //model refered to when using objectId
        },
        username:String
    }
});

module.exports = mongoose.model("Comment", commentSchema);