// MIDDLEWARE

var Car     = require("../models/car"),
    Comment = require("../models/comment"),
    middlewareObj = {};


middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


middlewareObj.checkCarOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Car.findById(req.params.id,function(err,foundCar){
            if(err){
                // car not found
                res.redirect("back");
            }else{
                if(!foundCar){
                    // car not found
                    return res.redirect("back");
                }
                
                //check if person who created car same one trying to edit/delete
                if(foundCar.author.id.equals(req.user._id)){
                    next();
                }else{
                    // not allowed - not owner
                    res.redirect("back");
                }
            }
        });
    } else {
        // not logged in - needs to login
        res.redirect("/login");
    }
}


middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                // comment not found
                console.log(err);
                res.redirect("back");
            }else{
                if(!foundComment){
                    // comment not found
                    console.log(err);
                    return res.redirect("back");
                }
                
                //check if person who created comment same one trying to edit/delete
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    // not allowed - not owner
                    console.log(err);
                    res.redirect("back");
                }
            }
        });
    } else {
        // not logged in - needs to login
        res.redirect("/login");
    }
}


module.exports = middlewareObj;