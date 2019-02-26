var express = require("express");
var router= express.Router({mergeParams:true});
var Campground = require("../models/campgrounds");
var Comment   = require("../models/comments");
var middlewareObj = require("../middleware");

router.get("/comments/new",middlewareObj.isLoggedIn,function(req, res) {
    res.render("newComment",{id:req.params.id});
});

router.post("/comments",middlewareObj.isLoggedIn,function(req, res) {
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

router.get("/:cid/edit",function(req, res) {
   var id = req.params.cid;
   
    Comment.findOne({_id:id}).exec(function(err, comment) {
        if(err)
        console.log(err);
        else
        res.render("cedit",{comment:comment, id:req.params.id});
    });
   });
   
router.put("/comments/:cid",middlewareObj.checkCommentOwnership,function(req,res){
   var id = req.params.cid;
   Comment.findByIdAndUpdate(id,req.body.comment,function(err,comment){
       if(err){
           res.redirect("/campgrounds");
       }
       else{
           res.redirect("/campgrounds/"+req.params.id);
       }
   })
});

router.delete("/comments/:cid",middlewareObj.checkCommentOwnership,function(req,res){
   var id = req.params.cid;
   Comment.findByIdAndRemove(id,function(err,comment){
      if(err)
      console.log(err);
      else
      res.redirect("/campgrounds/"+req.params.id);
   });
});




module.exports = router;