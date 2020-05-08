const Msg = require("../../Message/userForms");
const bcrypt = require('bcryptjs');

module.exports = (con) => {
    return (req,res,next) =>{
        const {password, password2} = req.body;
        const token = req.params.token;
        if(!password | !password2){
            res.locals.errorMsg.push(Msg.empty);
            return res.render("user/newPw", {token: token});
        }
        if(password !== password2){
            res.locals.errorMsg.push(Msg.noMatch);
            return res.render("user/newPw", {token: token});
        }
        if(password.length < 6){
            res.locals.errorMsg.push(Msg.pwdL);
            return res.render("user/newPw", {token: token});
        }
        con.query("SELECT * FROM usertoken WHERE token=? LIMIT 1", token, (err,userToken) =>{
            if(err){
                return next(err);
            }
            con.query("SELECT * FROM users WHERE id=? LIMIT 1", userToken[0].userid, (err,tokenUser) =>{
                if(err){
                    return next(err);
                }
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err){
                            return next(err);
                        } 
                        const newPassword = hash;
                        con.query("UPDATE users SET password=? WHERE id=?", [newPassword,userToken[0].userid],(err,result)=>{
                            if(err){
                                return next(err);
                            }else {
                                con.query('DELETE FROM usertoken WHERE token=?', userToken[0].token);
                                req.flash("success_msg", Msg.successPwChange);
                                res.locals.userEmail = tokenUser[0].email;
                                res.redirect("/login");
                                return next();
                                }
                            });
                        });
                    })
            })
        })
    }
}