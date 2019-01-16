var express = require("express");
var router= express.Router({mergeParams:true});
var Campground = require("../models/campgrounds");
var Comment   = require("../models/comments");

router.get("/comments/new",isLoggedIn,function(req, res) {
    res.render("newComment",{id:req.params.id});
});

router.post("/comments",isLoggedIn,function(req, res) {
    var id= req.params.id;
    var url="/campgrounds/"+id;
   Campground.findOne({_id:id}).populate("comments").exec(function(err, camp) {
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    comment.author.id=req.user._id;
                                    comment.author.username = req.user.username;
                                    comment.save();
                                    camp.comments.push(comment);
                                    camp.save();
                                    console.log("Created new comment");
                                }
                            });
            
            res.redirect(url);
        }
    })
});



function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;