const registerMw = require("../middlewares/userform/registerMw");
const loginMw = require("../middlewares/userform/loginMw");

// Emails
const sendSuccessreg = require("../middlewares/emails/sendSuccessReg");

module.exports = function(app,con){

    app.get("/", (req,res) =>{
        res.render("home/home");
    });

    app.get("/register", (req,res)=>{
        res.render("user/register")
    })

    app.get("/login", (req,res)=>{
        res.render("user/login")
    })

    app.get("/forgot", (req,res)=>{
        res.render("user/forgot")
    })

    app.post("/register", 
    registerMw(con),
    sendSuccessreg());

    app.post("/login", 
    loginMw(con));

    app.get("/home", (req,res)=>{
        res.render("home/index");
    })

};