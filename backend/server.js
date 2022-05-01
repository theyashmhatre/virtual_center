require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/user"));
app.use("/api/solution", require("./routes/solution"));
app.use("/api/challenge", require("./routes/challenge/challenge"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/offering", require("./routes/offering/offering"));
app.use("/api/utils/comment", require("./routes/utils/comment"));
app.use("/api/search", require("./routes/search"));
app.use("/api/utils/like",require("./routes/utils/like"));
app.use("/api/utils/upvote" ,require("./routes/utils/upvote"));

// Passport Middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

// Function to serve all static files
// inside public directory.
app.use(express.static('assets'));

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' });
});


app.listen(4000, function() {
    console.log("App listening on 4000");
});