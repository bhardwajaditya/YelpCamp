var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Aditya:inverter@cluster0-kulfh.mongodb.net/yelpcamp");

var CampgroundSchema= new mongoose.Schema({
  name:String,
  image:String,
  description: String,
  author: {
        id:{
            type:  mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
  comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground",CampgroundSchema);