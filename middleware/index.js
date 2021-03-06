var Campground = require("../models/campgrounds");
var Comment   = require("../models/comments");
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findOne({_id:req.params.cid}).exec(function(err, comment) {
        if(err){
            res.redirect('back');
        }
        else{
            console.log(comment);
            if(comment.author.id.equals(req.user._id)){
            next();
            }
            else{
                req.flash("error","You need to be logged in");
                res.redirect("back");
            }
        }
    });
}
}

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findOne({_id:req.params.id}).populate("comments").exec(function(err, camp) {
        if(err){
            res.redirect('back');
        }
        else{
            if(camp.author.id.equals(req.user._id)){
            next();
            }
            else{
                req.flash("error","You need to be logged in");
                res.redirect("back");
            }
        }
    });
}
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please log in first");
    res.redirect("/login");
}

module.exports = middlewareObj;