// CARS ROUTES

var express = require("express"),
    router  = express.Router(),
    Car     = require("../models/car"),
    middleware = require("../middleware/index");


// INDEX ROUTE - Show overview all cars
router.get("/",function(req,res){
    // get all cars from db
    Car.find({},function(err,allCars){
        if(err){
            console.log(err);
        }else{ 
            // pass cars data into index page
            res.render("cars/index",{cars:allCars});
        }
    })
});


// NEW ROUTE - Show form to add new car
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("cars/new");
});


// CREATE ROUTE - Add new car to database
router.post("/",middleware.isLoggedIn,function(req,res){
    var brand = req.body.brand;
    var model = req.body.model;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCar = {brand:brand, model:model, image:image, author:author};
    
    Car.create(newCar, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/cars");
        }
    })
});


// SHOW ROUTE - More detailed page about single car
router.get("/:id",function(req,res){
    Car.findById(req.params.id).populate("comments").exec(function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            res.render("cars/show",{car:foundCar});
        }
    });
});


// EDIT ROUTE - Show form to edit car info
router.get("/:id/edit",middleware.checkCarOwnership,function(req,res){
    Car.findById(req.params.id,function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            res.render("cars/edit",{car:foundCar});
        }
    });
});


// UPDATE ROUTE - Submit route for edit
router.put("/:id",middleware.checkCarOwnership,function(req,res){
    Car.findByIdAndUpdate(req.params.id,req.body.car,function(err,updatedCar){
        if(err){
            res.redirect("/");
        }else{
            res.redirect("/cars/" + req.params.id);
        }
    });
});


// DESTROY ROUTE - Remove car
router.delete("/:id",middleware.checkCarOwnership,function(req,res){
    Car.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    });
});


module.exports = router;