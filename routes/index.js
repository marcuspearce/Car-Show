// MISC ROUTES

var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User    = require("../models/user");


// ROOT ROUTE - Go to index (FOR NOW)
router.get('/',function(req,res){
    res.redirect("/cars");
});


// AUTH ROUTES


// SHOW REGISTER FORM
router.get("/register",function(req,res){
    res.render("auth/register");
});


// REGISTER LOGIC
router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("cars/show");
        }
        passport.authenticate("local")(req,res,function(){
            //console.log("REGISTERED " + newUser.username);
            res.redirect("/");
        });
    });
});


// SHOW LOGIN FORM
router.get("/login",function(req,res){
    res.render("auth/login");
});


// LOGIN LOGIC
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/login"
        // FOR BELOW TO WORK INCORPORATE FLASH MESSAGES LATER
        // successFlash: "Welcome back!",
        // failureFlash: "Invalid username or password"
    }), function(req,res){
});


// LOGOUT ROUTE
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});


module.exports = router;