const Msg = require("../../Message/userForms");
const bcrypt = require('bcryptjs');

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
                const token = await bcrypt.hashSync('secrettoken', 10);
                const newToken = await token.replace(/\//g, '');
                const dateNow = await Date.now() + 3600000; //1hour
                const newUserToken = {
                    userid: user[0].id,
                    token: newToken,
                    expire: dateNow
                }
                await con.query("INSERT INTO usertoken SET ?", newUserToken);
                res.locals.successMsg.push(Msg.forgotPwEmail)
                return res.render("user/forgot");
            } catch(err){
                console.log(err);
            }
        }) 
    }
}