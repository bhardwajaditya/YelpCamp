var express= require("express");
var app = express();
var BodyParser= require("body-parser")

app.set("view engine","ejs");
app.use(BodyParser.urlencoded({extended : true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var campgrounds=[
            {name:"Salmon Creek",image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f3c070a4e5b4b9_340.jpg"},
            {name:"Granite Hill",image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f3c070a4e5b4b9_340.jpg"},
            {name:"Mount Goat's Rest",image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f3c070a4e5b4b9_340.jpg"},
            {name:"Salmon Creek",image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f3c070a4e5b4b9_340.jpg"},
            {name:"Granite Hill",image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f3c070a4e5b4b9_340.jpg"},
            {name:"Mount Goat's Rest",image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f3c070a4e5b4b9_340.jpg"}
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

app.get("/rest",function(req, res) {
    var data = {
    "Fruits": [
      "apple",
      "orange"    ]
  };
   res.json(data) ;
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started!!");
})