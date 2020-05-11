module.exports = (con) => {
    return (req,res,next) => {
        res.render("home/userprofile");
        return next();
    }
}