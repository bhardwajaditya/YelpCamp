var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelpcamp");

var CampgroundSchema= new mongoose.Schema({
  name:String,
  image:String,
  description: String,
  comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground",CampgroundSchema);