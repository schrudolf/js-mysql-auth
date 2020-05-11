const registerMw = require("../middlewares/userform/registerMw");
const loginMw = require("../middlewares/userform/loginMw");
const indexMw = require("../middlewares/content/index");
const userProfile = require("../middlewares/content/userProfile");
const logoutMw = require("../middlewares/auth/logoutMw");
const forgotMw = require("../middlewares/userform/forgotMw");
const reqToken = require("../middlewares/auth/reqTokenMw");
const saveNewPasswordMw = require("../middlewares/auth/saveNewPasswordMw");

// Auth
const checkUserLoginMw = require("../middlewares/auth/checkUserLoginMw");
// Emails
const sendSuccessReg = require("../middlewares/emails/sendSuccessReg");
const sendTokenEmail = require("../middlewares/emails/sendTokenEmail");
const SuccessPwChange = require("../middlewares/emails/sendSuccessPwChange");


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

    app.get("/forgot/:token",
        reqToken(con))

    app.post("/forgot/:token/new", 
        saveNewPasswordMw(con),
        SuccessPwChange());  

    app.post("/register", 
        registerMw(con),
        sendSuccessReg());

    app.post("/login", 
        loginMw(con));

    app.post("/forgot", 
        forgotMw(con),
        sendTokenEmail());

    app.get("/logout",
        logoutMw());

    app.get("/user/index", 
        checkUserLoginMw(),
        indexMw(con));

    app.get("/user/profile", 
        checkUserLoginMw(),
        userProfile(con));



};