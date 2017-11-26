var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//CAMPGROUNDS routes
router.get("/",function(req,res){
    //REST: INDEX route
    Campground.find({},function(err,campgrounds){
        if (err) {
            console.log("ERROR RETRIEVING CAMPGROUNDS:");
            console.log(err);
        }
        else {
            res.render("./campgrounds/index",{campgrounds:campgrounds});
        }
    });
});

router.post("/", isLoggedIn, function(req,res){
    //REST: CREATE route
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name, image:image, description:description};
    Campground.create( newCampground, function(err, campground){
        if(err){
            console.log("ERROR CREATING CAMPGROUND:");
            console.log(err);
        }
        else {
            console.log("CAMPGROUND CREATED");
            console.log(campground);
        }
    });

    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});


router.get("/new", isLoggedIn, function(req, res){
    //REST: NEW route
    res.render("./campgrounds/new.ejs");
});

router.get("/:id", function(req,res){
    //REST: SHOW
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log("ERROR WHEN SHOWING:");
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            res.render("./campgrounds/show",{campground: campground});
            console.log(campground);
        }
    });
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
