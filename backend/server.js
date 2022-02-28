require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysqlConnection = require("./dbConnection");

app.use(express.json());
app.use(bodyParser.json());

app.use("/user", require("./routes/user"));
app.use("/idea", require("./routes/idea"));
app.use("/challenge", require("./routes/challenge"));


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' });
});


app.listen(4000, function() {
    console.log("App listening on 4000");
});