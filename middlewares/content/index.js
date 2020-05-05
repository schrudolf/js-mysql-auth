module.exports = (con) => {
    return (req,res,next) => {
        res.render("home/index");
    }
}