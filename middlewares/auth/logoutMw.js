const Msg = require("../../Message/userForms");

module.exports = () => {
    return (req,res,next) => {
        if(req.session.logged){
            req.flash("success_msg", Msg.successLogout)
            res.redirect("/login");
            return setTimeout(function(){
                req.session.destroy();
                return next();
            },1000)
        } res.redirect("/login");
        return next();
    }
}