require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
var cookieParser = require('cookie-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

app.use("/api/user", require("./routes/user"));
app.use("/api/solution", require("./routes/solution"));
app.use("/api/challenge", require("./routes/challenge/challenge"));
app.use("/api/challenge/comment", require("./routes/challenge/comment/comment"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/offering", require("./routes/offering/offering"));
app.use("/api/offering/comment", require("./routes/offering/comment/comment"));
app.use("/api/search", require("./routes/search"));

// Passport Middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

// Function to serve all static files
// inside public directory.
app.use(express.static('assets'));
app.use('/public/images', express.static('images'));

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' });
});


app.listen(4000, function() {
    console.log("App listening on 4000");
});