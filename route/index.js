const registerMw = require("../middlewares/userform/registerMw");

module.exports = function(app,con){

    app.get("/", (req,res) =>{
        res.render("home/home");
    });

    app.get("/register", (req,res)=>{
        res.render("user/register")
    })

    app.post("/register", 
    registerMw(con)
    );

};