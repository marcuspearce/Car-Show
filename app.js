// CARSHOW

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
// Connect to Database
//mongoose.connect("mongodb://localhost:27017/carShow", {useNewUrlParser:true});

app.use(bodyParser.urlencoded({encoded: true})); //copy-paste this line
app.set("view engine", "ejs"); //expect ejs in rendering


// ROUTE ROUTE
app.get('/',function(req,res){
    res.render("home");
});


// INDEX ROUTE
app.get("/cars",function(req,res){
    res.render("index");
});


// NEW ROUTE
app.get("/cars/new",function(req,res){
    res.render("new");
});


// CREATE ROUTE
app.post("/cars/new",function(req,res){
    res.send("create route!");
});


// SHOW ROUTE
app.get("/cars/:id",function(req,res){
    res.render("show");
});


// START SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CARSHOW has started");
});