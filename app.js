// CARSHOW

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Car         = require("./models/car"),
    Comment     = require("./models/comment"),
    User        = require("./models/user");
    
var carRoutes       = require("./routes/cars"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes   = require("./routes/index");
    
    
// DATABASE
mongoose.connect("mongodb://localhost:27017/carShow", {useNewUrlParser:true});


// MISC CONFIG
app.use(bodyParser.urlencoded({encoded: true})); //copy-paste this line
app.set("view engine", "ejs"); //expect ejs in rendering
app.use(express.static(__dirname + "/public")); //to access public folder
app.use(methodOverride("_method")); //utilize method-override (use PUT in RESTful routes - update)


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


// ROUTES
app.use("/cars",carRoutes);
app.use("/cars/:id/comments",commentRoutes);
app.use(indexRoutes);


// START SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("CARSHOW has started");
});