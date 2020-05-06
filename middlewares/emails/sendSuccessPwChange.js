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
            subject: 'Sikeres jelszó módosítás!',
            html: '<h1>Sikeresen módosítottad jelszavadat!</h1>' + `<p>email: ${res.locals.userEmail}</p>` +
            "<p>Most már bejelentkezhetsz az új jelszóval: </p>" + '<span>http://' + process.env.IP_ADDRESS + "/login oldalon</span>"
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