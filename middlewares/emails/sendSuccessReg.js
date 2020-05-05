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
            to: res.locals.userEmail,
            subject: 'Sikeresen regisztráltál az oldalra!',
            html: '<h1>Sikeres regisztráció!</h1>' + `<p>Az oldalon regisztrált email: ${res.locals.userEmail}</p>` +
            "<p>Most már bejelentkezhetsz:</p>" + '<span>http://' + process.env.IP_ADDRESS + "/ oldalon</span>"
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}