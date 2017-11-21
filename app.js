var express    = require("express"),     //express framework
    mongoose   = require("mongoose"),    //mongo database connector
    bodyParser = require("body-parser"), //to parse body from POST requests
    request    = require('request'),     //to request data from external APIs
    app        = express(),              //instantiate express
    seedDB     = require("./seeds");     //module for seeding database


mongoose.connect("mongodb://172.17.0.2/yelp_camp",{useMongoClient:true})
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

//seed the database
seedDB();

//schema setup
var Campground = require("./models/campground");
var Comment = require("./models/comment");

app.get("/",function(req,res){
    res.render("landing");
});


//   __   ___  __  ___                                          
//  |__) |__  /__`  |                                           
//  |  \ |___ .__/  |                                           
//                                                              
//  .. __              __   __   __   __             __   __  ..
//  ''/  `  /\   |\/| |__) / _` |__) /  \ |  | |\ | |  \ /__` ''
//    \__, /~~\  |  | |    \__> |  \ \__/ \__/ | \| |__/ .__/   
//                                                              
app.get("/campgrounds",function(req,res){
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

app.post("/campgrounds", function(req,res){
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


app.get("/campgrounds/new", function(req, res){
    //REST: NEW route
    res.render("./campgrounds/new.ejs");
});

app.get("/campgrounds/:id", function(req,res){
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

app.get("/campgrounds/:id/comments/new",function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("./comments/new",{campground:campground});
        }
    });
});

app.post("/campgrounds/:id/comments",function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            Comment.create({
                text: req.body.comment.text,
                author: req.body.comment.author
            },function(err, comment){
                campground.comments.push(comment);
                campground.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("comment added");
                        res.redirect("/campgrounds/" + req.params.id + "#comments");
                    }
                });
            });
        }
    });
});

app.listen(3000,function(){
    console.log("express YelpCamp server started on port 3000");
});

