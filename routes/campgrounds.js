var express = require("express");
var router= express.Router();
var Campground = require("../models/campgrounds");

router.get("/",function(req,res){
       Campground.find({},function(err,camp){
           if(err){
               console.log(err);
           }
           else{
               res.render("campgrounds",{campgrounds:camp});
           }
       });
    //   res.render("campgrounds",{campgrounds:campgrounds});
});

router.post("/",isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description = req.body.description;
    var author={
        id: req.user._id,
        username:req.user.username
    }
    Campground.create({name:name,image:image,description:description,author:author},function(err,camp){
       if(err){
           console.log(err);
       } 
       else{
           console.log(camp);
       }
    });
    
   res.redirect("/campgrounds") ;
});

router.get("/new",isLoggedIn,function(req, res) {
   res.render("new",{currentUser:req.user}); 
});

router.get("/:id", function(req,res){
    var id= req.params.id;
    var url="/campgrounds/"+id+"/comments";
    Campground.findOne({_id:id}).populate("comments").exec(function(err, camp) {
        if(err){
            console.log(err);
        }
        else{

            res.render("show",{camp:camp,url:url});
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