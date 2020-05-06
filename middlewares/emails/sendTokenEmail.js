const nodemailer = require('nodemailer');

module.exports = () => {
    return (req,res,next) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_ADDRESS,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          
          let mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: res.locals.userToken.email,
            subject: 'Jelszó módosítás!',
            html: '<h1>Új jelszó</h1>' + `<p>A következő e-mail címhez: ${res.locals.userToken.email} új jelszót</p>` +
            "<p>az alábbi linken keresztül módosíthatod:</p>" + '<span>http://' + process.env.IP_ADDRESS + "/forgot/" + res.locals.userToken.token
            + "</span><p>Link következő 1 órában aktív</p>"
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              return next();
            }
          });
    }
}