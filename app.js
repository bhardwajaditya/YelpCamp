var express= require("express");
var app = express();
var BodyParser= require("body-parser")
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelpcamp");

app.set("view engine","ejs");
app.use(BodyParser.urlencoded({extended : true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var CampgroundSchema= new mongoose.Schema({
  name:String,
  image:String
});

var Campground = mongoose.model("Campground",CampgroundSchema);

Campground.create({
    name:"Salmon Creek",
    image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg"
},function(err,camp){
    if(err){
        console.log(err);
    }  
    else{
        console.log(camp);
    }
});

var campgrounds=[
            {name:"Salmon Creek",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg"},
            {name:"Granite Hill",image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
            {name:"Mount Goat's Rest",image:"https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg"},
            {name:"Salmon Creek",image:"https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg"},
            {name:"Granite Hill",image:"https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg"},
            {name:"Mount Goat's Rest",image:"https://cdn.pixabay.com/photo/2016/03/30/02/57/camping-1289930__340.jpg"}
       ] 
app.get("/",function(req,res){
   res.render("landing");
});

app.get("/campgrounds",function(req,res){
   
       res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    campgrounds.push({name:name,image:image});
   res.redirect("/campgrounds") ;
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new"); 
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started!!");
})