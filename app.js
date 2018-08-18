// CARSHOW

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Car         = require("./models/car"),
    Comment     = require("./models/comment");
    
// Connect to Database
mongoose.connect("mongodb://localhost:27017/carShow", {useNewUrlParser:true});

app.use(bodyParser.urlencoded({encoded: true})); //copy-paste this line
app.set("view engine", "ejs"); //expect ejs in rendering
app.use(express.static(__dirname + "/public")); //to access public folder


// ROOT ROUTE - Go to index (FOR NOW)
app.get('/',function(req,res){
    res.redirect("/cars");
});


// INDEX ROUTE - Show overview all cars
app.get("/cars",function(req,res){
    // get all cars from db
    Car.find({},function(err,allCars){
        if(err){
            console.log(err);
        }else{ 
            // pass cars data into index page
            res.render("index",{cars:allCars});
        }
    })
});


// NEW ROUTE
app.get("/cars/new",function(req,res){
    res.render("new");
});


// CREATE ROUTE
app.post("/cars",function(req,res){
    var brand = req.body.brand;
    var model = req.body.model;
    var image = req.body.image;
    var newCar = {brand:brand, model:model, image:image};
    
    Car.create(newCar, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/cars");
        }
    })
});


// SHOW ROUTE
app.get("/cars/:id",function(req,res){
    Car.findById(req.params.id,function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            res.render("show",{car:foundCar});
        }
    });
});


// START SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CARSHOW has started");
});