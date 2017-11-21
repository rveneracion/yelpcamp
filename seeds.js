var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

//seed data
var data = [
    {
        name:"01 Camp Alpha",

        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=800&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus luctus quam quis scelerisque. Maecenas nec ullamcorper nisl. Phasellus et pellentesque magna. Sed arcu sem, convallis in vehicula at, mollis vitae sapien. Phasellus id vestibulum arcu. Sed eget justo ac massa efficitur accumsan a a velit. Curabitur elementum velit vitae risus mattis, quis tincidunt diam accumsan. Fusce mattis auctor sapien, quis sodales ante placerat vel. Quisque vel tortor eu sem luctus lacinia."

    },
    {
        name:"02 Camp Bravo",
        image: "https://images.unsplash.com/photo-1493105011473-ed7bd4948f12?auto=format&fit=crop&w=800&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus luctus quam quis scelerisque. Maecenas nec ullamcorper nisl. Phasellus et pellentesque magna. Sed arcu sem, convallis in vehicula at, mollis vitae sapien. Phasellus id vestibulum arcu. Sed eget justo ac massa efficitur accumsan a a velit. Curabitur elementum velit vitae risus mattis, quis tincidunt diam accumsan. Fusce mattis auctor sapien, quis sodales ante placerat vel. Quisque vel tortor eu sem luctus lacinia."
    },
    {
        name:"03 Camp Charlie",
        image: "https://images.unsplash.com/photo-1468869196565-78ea346a98ee?auto=format&fit=crop&w=800&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus luctus quam quis scelerisque. Maecenas nec ullamcorper nisl. Phasellus et pellentesque magna. Sed arcu sem, convallis in vehicula at, mollis vitae sapien. Phasellus id vestibulum arcu. Sed eget justo ac massa efficitur accumsan a a velit. Curabitur elementum velit vitae risus mattis, quis tincidunt diam accumsan. Fusce mattis auctor sapien, quis sodales ante placerat vel. Quisque vel tortor eu sem luctus lacinia."
    },
    {
        name:"04 Camp Delta",
        image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=800&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus luctus quam quis scelerisque. Maecenas nec ullamcorper nisl. Phasellus et pellentesque magna. Sed arcu sem, convallis in vehicula at, mollis vitae sapien. Phasellus id vestibulum arcu. Sed eget justo ac massa efficitur accumsan a a velit. Curabitur elementum velit vitae risus mattis, quis tincidunt diam accumsan. Fusce mattis auctor sapien, quis sodales ante placerat vel. Quisque vel tortor eu sem luctus lacinia."
    },
    {
        name:"05 Camp Echo",
        image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=800&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus luctus quam quis scelerisque. Maecenas nec ullamcorper nisl. Phasellus et pellentesque magna. Sed arcu sem, convallis in vehicula at, mollis vitae sapien. Phasellus id vestibulum arcu. Sed eget justo ac massa efficitur accumsan a a velit. Curabitur elementum velit vitae risus mattis, quis tincidunt diam accumsan. Fusce mattis auctor sapien, quis sodales ante placerat vel. Quisque vel tortor eu sem luctus lacinia."
    },
    {
        name:"06 Camp Foxtrot",
        image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus luctus quam quis scelerisque. Maecenas nec ullamcorper nisl. Phasellus et pellentesque magna. Sed arcu sem, convallis in vehicula at, mollis vitae sapien. Phasellus id vestibulum arcu. Sed eget justo ac massa efficitur accumsan a a velit. Curabitur elementum velit vitae risus mattis, quis tincidunt diam accumsan. Fusce mattis auctor sapien, quis sodales ante placerat vel. Quisque vel tortor eu sem luctus lacinia."
    },
    {
        name:"07 Camp Golf",
        image: "https://images.unsplash.com/photo-1460230574880-9d3903edc9d6?auto=format&fit=crop&w=800&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus luctus quam quis scelerisque. Maecenas nec ullamcorper nisl. Phasellus et pellentesque magna. Sed arcu sem, convallis in vehicula at, mollis vitae sapien. Phasellus id vestibulum arcu. Sed eget justo ac massa efficitur accumsan a a velit. Curabitur elementum velit vitae risus mattis, quis tincidunt diam accumsan. Fusce mattis auctor sapien, quis sodales ante placerat vel. Quisque vel tortor eu sem luctus lacinia."
    }
]

function seedDB(){
    //clear the database
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        } else {
            console.log("campgrounds removed");

            //add new testdata
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added campground");
                        Comment.create({
                            author: "Fred Flintstone",
                            text:"All I can say about this place is Yabba dabba doo!!"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save(function(err){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        console.log("comment added");
                                    }
                                });
                            }

                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
