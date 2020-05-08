const Msg = require("../../Message/userForms");
const TokenGen = require('uuid-token-generator');

module.exports = (con) => {
    return (req,res,next) => {
        const email = req.body.email;
        if(!email){
            res.locals.errorMsg.push(Msg.empty)
            return res.render("user/forgot");
        }
        con.query("SELECT * FROM users WHERE email=? LIMIT 1", [email], async (err,user) =>{
            if(user.length === 0){
                res.locals.errorMsg.push(Msg.emailNotExist)
                return res.render("user/forgot");
            }
            try{
                const token = await new TokenGen(256, TokenGen.BASE62);
                const newToken = await token.generate();
                const dateNow = await Date.now() + 3600000; // 3600000 = 1hour
                const newUserToken = {
                    userid: user[0].id,
                    token: newToken,
                    expire: dateNow
                }
                await con.query("INSERT INTO usertoken SET ?", newUserToken);
                res.locals.successMsg.push(Msg.forgotPwEmail)
                res.locals.userToken = {
                    token: newToken,
                    email: email
                }
                res.render("user/forgot");
                return next();
            } catch(err){
                return next(err);
            }
        }) 
    }
}