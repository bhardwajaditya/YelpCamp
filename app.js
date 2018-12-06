var express= require("express");
var app = express();
var BodyParser= require("body-parser")
var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelpcamp");

app.set("view engine","ejs");
app.use(BodyParser.urlencoded({extended : true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Campground.create( {name:"Mount Rest",image:"https://cdn.pixabay.com/photo/2015/06/08/15/12/tents-801926__340.jpg"},function(err,camp){
//     if(err){
//         console.log(err);
//     }  
//     else{
//         console.log(camp);
//     }
// });


app.get("/",function(req,res){
   res.render("landing");
});

app.get("/campgrounds",function(req,res){
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

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description = req.body.description;
    Campground.create({name:name,image:image,description:description},function(err,camp){
       if(err){
           console.log(err);
       } 
       else{
           console.log(camp);
       }
    });
    
   res.redirect("/campgrounds") ;
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new"); 
});

app.get("/campgrounds/:id",function(req,res){
    var id= req.params.id;
    Campground.find({_id:id},function(err, camp) {
        if(err){
            console.log(err);
        }
        else{
            console.log(camp);
            res.render("show",{camp:camp});
        }
    })
    
});

app.get("/getcamp",function(req,res){
       Campground.find({},function(err,camp){
           if(err){
               console.log(err);
           }
           else{
               res.send(camp);
           }
       });
    //   res.render("campgrounds",{campgrounds:campgrounds});
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started!!");
})