const Msg = require("../../Message/userForms");
const bcrypt = require('bcryptjs');

module.exports = (con) => {
    return (req,res,next) => {
        const {email, password} = req.body;
        if(!email | !password){
            res.locals.errorMsg.push(Msg.empty);
            return res.render("user/login");
        }
        con.query("SELECT * FROM users WHERE email=? LIMIT 1", email, async (err,user) =>{
            if(err){
                console.log(err);
            }
            if(user.length === 0){
                res.locals.errorMsg.push(Msg.emailNotExist);
                return res.render("user/login");
            }
            try{
                if(await bcrypt.compare(password, user[0].password)){
                    req.flash("success_msg", Msg.successLogin);
                    req.session.logged = true;
                    return res.redirect("/home");
                }else {
                res.locals.errorMsg.push(Msg.badPwd);
                res.render("user/login");
                return next();
                }
            } catch (err) {
                console.log(err);
            }
        })
    }
}