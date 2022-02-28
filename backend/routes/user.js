const router = require('express').Router();
const express = require("express");
const mysqlConnection = require("../dbConnection");

router.get("/", (req, res) => {
    mysqlConnection.query("Select * from user", (err, rows, fields) => {
        if (!err) {
            res.status(200).send(rows);
        } else {
            console.log(err);
            res.status(400);
        }
    })
});

router.post("/login", (req, res) => {
    console.log("login");
    res.status(200).send("login");
});

router.post("/register", (req, res) => {
    console.log("register");
    res.status(200).send("login");
});

router.post("/forgotPassword", (req, res) => {
    console.log("Forgot Password");
    res.status(200).send("Forgot Password");
})


module.exports = router;