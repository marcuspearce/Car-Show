// CARSHOW

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
// Connect to Database
mongoose.connect("mongodb://localhost:27017/carShow", {useNewUrlParser:true});

app.use(bodyParser.urlencoded({encoded: true})); //copy-paste this line
app.set("view engine", "ejs"); //expect ejs in rendering
app.use(express.static(__dirname + "/public")); //to access public folder


// CAR SCHEMA
var carSchema = new mongoose.Schema({
    brand:String,
    model:String,
    image:String
});
var Car = mongoose.model("Car",carSchema);


// TEMPORARY ADDING TO DATABASE
// Car.create(
//      {
//          brand:"Aston Martin",
//          model:"DBS",
//          image:"data:image/jpeg;base64,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"
//      },
//      function(err, car){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEW CAR: ");
//           console.log(car);
//       }
//     });



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