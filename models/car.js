var mongoose = require("mongoose");

// CAR SCHEMA
var carSchema = new mongoose.Schema({
    brand:String,
    model:String,
    image:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //model refered to when using objectId
        },
        username:String
    },
    comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});
module.exports = mongoose.model("Car",carSchema);