var express = require("express");
var router= express.Router();
var passport = require("passport");
var User = require("../models/users");
var middlewareObj = require("../middleware");

router.get("/",function(req,res){
   res.render("landing");
});


router.get("/register",function(req, res) {
   res.render("register"); 
});

router.post("/register",function(req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   User.register(new User({username:req.body.username}),req.body.password,function(err,user){
       if(err){
          console.log(err);
          return res.render("register");
      }
      
       passport.authenticate("local")(req,res,function(){
          req.flash("success","Welcome to the world of campgrounds "+req.user.username);
          res.redirect("/campgrounds");
      });
   })
});

router.get("/login",function(req, res) {
   res.render("login"); 
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }),function(req,res){
});

router.get("/logout", function(req, res) {
    req.flash("success","Logged you out!");
   req.logout();
   res.redirect("/");
});




module.exports = router;