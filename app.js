const app = require("express")();
const con = require("./db/connect");

require('dotenv').config();
app.set('view engine', 'ejs');

//Database connect
con.connect((err) =>{
    if(err){
        return console.log(err);
    }
    console.log("Database connected!")
});


//Load routes
require('./route/index')(app,con);

const PORT = 3000;
app.listen(PORT, process.env.IP_ADDRESS, () =>{
    console.log("Online | Port: " + PORT);
});