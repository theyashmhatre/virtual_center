const mysql = require("mysql");


var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user : "root",
    password: "password",
    database: "virtualcenter",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected to MySQL Database");
    } else {
        console.log("Error while connecting to database", err);
    }
});

module.exports = mysqlConnection;