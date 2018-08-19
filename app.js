// CARSHOW

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    Car         = require("./models/car"),
    Comment     = require("./models/comment"),
    User        = require("./models/user");
    
// DATABASE
mongoose.connect("mongodb://localhost:27017/carShow", {useNewUrlParser:true});

// MISC CONFIG
app.use(bodyParser.urlencoded({encoded: true})); //copy-paste this line
app.set("view engine", "ejs"); //expect ejs in rendering
app.use(express.static(__dirname + "/public")); //to access public folder


// PASSPORT CONFIG
app.use(require("express-session")({
    secret:"top secret",
    resave:"false",
    saveUninitialized:"false"
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Used on every route - pass in currentUser (used in header to see if logged in)
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});



// ROOT ROUTE - Go to index (FOR NOW)
app.get('/',function(req,res){
    res.redirect("/cars");
});


// CAR ROUTES


// INDEX ROUTE - Show overview all cars
app.get("/cars",function(req,res){
    // get all cars from db
    Car.find({},function(err,allCars){
        if(err){
            console.log(err);
        }else{ 
            // pass cars data into index page
            res.render("cars/index",{cars:allCars});
        }
    })
});


// NEW ROUTE
app.get("/cars/new",function(req,res){
    res.render("cars/new");
});


// CREATE ROUTE
app.post("/cars",function(req,res){
    var brand = req.body.brand;
    var model = req.body.model;
    var image = req.body.image;
    var newCar = {brand:brand, model:model, image:image};
    
    Car.create(newCar, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/cars");
        }
    })
});


// SHOW ROUTE
app.get("/cars/:id",function(req,res){
    Car.findById(req.params.id).populate("comments").exec(function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            res.render("cars/show",{car:foundCar});
        }
    });
});


// COMMENTS ROUTES


// NEW COMMENT
app.get("/cars/:id/comments/new",function(req,res){
    Car.findById(req.params.id,function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{car:foundCar});
        }
    });
});


// CREATE COMMENT
app.post("/cars/:id/comments",function(req,res){
    Car.findById(req.params.id,function(err,foundCar){
        if(err){
            console.log(err);
            res.redirect("/cars"); //if goes wrong can't GET this route
        }else{
            Comment.create(req.body.comment,function(err,newComment){
                if(err){
                    console.log(err);
                }else{
                    foundCar.comments.push(newComment);
                    foundCar.save();
                    res.redirect("/cars/" + foundCar._id);
                }
            });
        }
    });
});


// AUTH ROUTES


// SHOW REGISTER FORM
app.get("/register",function(req,res){
    res.render("auth/register");
});


// REGISTER LOGIC
app.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("cars/show");
        }
        passport.authenticate("local")(req,res,function(){
            //console.log("REGISTERED " + newUser.username);
            res.redirect("/");
        });
    });
});


// SHOW LOGIN FORM
app.get("/login",function(req,res){
    res.render("auth/login");
});


// LOGIN LOGIC
app.post("/login",passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/login"
        // FOR BELOW TO WORK INCORPORATE FLASH MESSAGES LATER
        // successFlash: "Welcome back!",
        // failureFlash: "Invalid username or password"
    }), function(req,res){
});


// START SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CARSHOW has started");
});