module.exports = function(app,con){

    app.get("/", (req,res) =>{
        res.render("home");
    });
}