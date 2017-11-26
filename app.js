var express    = require("express"),     //express framework
    mongoose   = require("mongoose"),    //mongo database connector
    bodyParser = require("body-parser"), //to parse body from POST requests
    request    = require('request'),     //to request data from external APIs
    app        = express(),              //instantiate express
    passport   = require("passport"),
    localStrategy = require('passport-local'),
    User       = require("./models/user"),
    seedDB     = require("./seeds");     //module for seeding database

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")


mongoose.connect("mongodb://mongo/yelp_camp",{useMongoClient:true})
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

//passport config
app.use(require("express-session")({
    secret: "Fidgetfidgetfidget!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass the current logged in user to
//all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//routes
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

//seed the database
seedDB();

//schema setup
var Campground = require("./models/campground");
var Comment = require("./models/comment");

//////////////////////////////////////////////
// START server
//////////////////////////////////////////////
app.listen(3000,function(){
    console.log("express YelpCamp server started on port 3000");
});

