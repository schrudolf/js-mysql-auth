const Msg = require("../../Message/userForms");

module.exports = () => {
    return (req,res,next) => {
        if(req.session.logged){
            req.flash("success_msg", Msg.successLogout)
            res.redirect("/login");
            return setTimeout(function(){
                return req.session.destroy();
            },1000)
        } return res.redirect("/login");
    }
}