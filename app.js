const express = require("express");
const app = express();
const con = require("./db/connect");
const flash = require('connect-flash');
const session = require('express-session')


require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.static('files'))
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'test cookie',
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

//Database connect
con.connect((err) =>{
    if(err){
        return console.log(err);
    }
    console.log("Database connected!")
});

// Connect flash
app.use(flash());


// Global variables
app.use(function(req,res,next) {
    res.locals.errorMsg = req.flash('error_msg');
    res.locals.successMsg = req.flash('success_msg');
    next();
})

// clear db and load new
// require("./cleardb")(con);

//Load routes
require('./route/index')(app,con);

const PORT = 3000;
app.listen(80, process.env.IP_ADDRESS, () =>{
    console.log(`Server Online | PORT: ${PORT}`);
});

