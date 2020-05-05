const Msg = require("../../Message/userForms");

module.exports = () =>{
    return (req,res,next) => {
        if(!req.session.logged){
            req.flash("error_msg", Msg.checkUserLogin);
            return res.redirect("/login");
        } next()
    }
}