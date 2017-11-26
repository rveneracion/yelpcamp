var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("./comments/new",{campground:campground});
        }
    });
});

router.post("/", isLoggedIn, function(req,res){
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

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

