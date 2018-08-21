// COMMENTS ROUTES

var express = require("express"),
    router  = express.Router({mergeParams:true}), // allows routes to access /:id in routes
    Car     = require("../models/car"),
    Comment = require("../models/comment"),
    middleware = require("../middleware/index");


// NEW COMMENT - show form for new comment
router.get("/new",middleware.isLoggedIn,function(req,res){
    Car.findById(req.params.id,function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{car:foundCar});
        }
    });
});


// CREATE COMMENT - add new comment to database
router.post("/",middleware.isLoggedIn,function(req,res){
    Car.findById(req.params.id,function(err,foundCar){
        if(err){
            console.log(err);
            res.redirect("/cars"); //if goes wrong can't GET this route
        }else{
            Comment.create(req.body.comment,function(err,newComment){
                if(err){
                    console.log(err);
                }else{
                    // add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    
                    newComment.save();
                    foundCar.comments.push(newComment);
                    foundCar.save();
                    res.redirect("/cars/" + foundCar._id);
                }
            });
        }
    });
});


// EDIT COMMENT - show form to edit comment
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {car_id:req.params.id,comment:foundComment});
        }
    });
});


// UPDATE COMMENT - submit route for edit
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/cars/" + req.params.id);
        }
    });
});


// DESTROY COMMENT - remove comment from db
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/cars/" + req.params.id);
        }
    });
});


module.exports = router;