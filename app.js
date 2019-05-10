var express= require("express");
var app = express();
var flash = require("connect-flash");
var BodyParser= require("body-parser")
var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var User = require("./models/users");
var methodOverride = require("method-override");
var Comment   = require("./models/comments");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var seedDB = require("./seeds");

var campgroundsRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/auth")
// seedDB();
mongoose.connect("mongodb+srv://Aditya:inverter@cluster0-kulfh.mongodb.net/yelpcamp");

app.set("view engine","ejs");
app.use(BodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname+"/public"));
app.use(flash());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require("express-session")({
    secret:"Welcome to the yelpcamp",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(authRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id",commentRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started!!");
})