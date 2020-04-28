const express = require("express");
const app = express();
const con = require("./db/connect");

require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.static('files'))
app.use(express.urlencoded({ extended: true }))

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