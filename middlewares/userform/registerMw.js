module.exports = (con) => {
    return (req,res,next) => {
        const {email, password, password2} = req.body;
        if(!email | !password | !password2){
            return console.log("Nem adtál meg minden adatot");
        }
        if(password.length < 6){
            return console.log("Jelszó minimum 6 karakteres kell hogy legyen");
        }
        if(password !== password2){
            return console.log("Nem egyeznek a jelszó");
        }
        res.render("home/home");
    };
}