var mongoose = require("mongoose");

// CAR SCHEMA
var carSchema = new mongoose.Schema({
    brand:String,
    model:String,
    image:String,
    comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});
module.exports = mongoose.model("Car",carSchema);