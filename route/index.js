const registerMw = require("../middlewares/userform/registerMw");

module.exports = function(app,con){

    app.get("/", (req,res) =>{
        res.render("home/home");
    });

    app.post("/register", 
    registerMw(con)
    );

};