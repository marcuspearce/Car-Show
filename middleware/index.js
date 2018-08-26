// MIDDLEWARE

var Car     = require("../models/car"),
    Comment = require("../models/comment"),
    middlewareObj = {};


middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
};


middlewareObj.checkCarOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Car.findById(req.params.id,function(err,foundCar){
            if(err){
                // car not found
                req.flash("error", "Car not found :c");
                res.redirect("back");
            }else{
                if(!foundCar){
                    // car not found
                    req.flash("error","Car not found :c");
                    return res.redirect("back");
                }
                
                //check if person who created car same one trying to edit/delete
                if(foundCar.author.id.equals(req.user._id)){
                    next();
                }else{
                    // not allowed - not owner
                    req.flash("error","You don't have permission to do that!");
                    res.redirect("/cars/" + req.params.id); //only if tries to hardcode
                }
            }
        });
    } else {
        // not logged in - needs to login
        req.flash("error","You need to be logged in to do that!");
        res.redirect("/login");
    }
}


middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                req.flash("error","Comment not found :c");
                res.redirect("back");
            }else{
                if(!foundComment){
                    req.flash("error","Comment not found :c");
                    return res.redirect("back");
                }
                
                //check if person who created comment same one trying to edit/delete
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    // not allowed - not owner
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        // not logged in - needs to login
        req.flash("error","You need to be logged in to do that!");
        res.redirect("/login");
    }
}


module.exports = middlewareObj;