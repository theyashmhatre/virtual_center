require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const mysqlConnection = require("./config/dbConnection");
var cookieParser = require('cookie-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/user", require("./routes/user"));
app.use("/idea", require("./routes/idea"));
app.use("/challenge", require("./routes/challenge"));

// Passport Middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' });
});


app.listen(4000, function() {
    console.log("App listening on 4000");
});