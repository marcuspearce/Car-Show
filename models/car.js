var mongoose = require("mongoose");

// CAR SCHEMA
var carSchema = new mongoose.Schema({
    brand:String,
    model:String,
    image:String
});
module.exports = mongoose.model("Car",carSchema);