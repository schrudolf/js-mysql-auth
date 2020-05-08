const Msg = require("../../Message/userForms");

module.exports = (con) => {
    return (req,res,next) => {
        const reqToken = req.params.token;
        con.query('SELECT * FROM usertoken WHERE token=? LIMIT 1', reqToken, (err,userToken)=>{
            if(err){
                res.redirect("/forgot");
               return next(err);
            }
            if(userToken.length === 0){
                req.flash("error_msg", Msg.notFound);
                return res.redirect("/forgot");
            }
            if(userToken[0].expire < Date.now()){
                con.query('DELETE FROM usertoken WHERE token=?', userToken[0].token);
                req.flash("error_msg", Msg.expired);
                return res.redirect("/forgot");
            }
                res.render("user/newPw", {token: reqToken});
                return next();
        });    
    }
}