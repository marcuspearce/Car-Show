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
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome to Car Show " + user.username + "!");
            res.redirect("/cars");
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
        successRedirect:"/cars",
        failureRedirect:"/login",
    }), function(req,res){
});


// LOGOUT ROUTE
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/cars"); // IF TWO REDIRECTS THEN LOSE FLASH
});


module.exports = router;