const router = require('express').Router();
const express = require("express");
const mysqlConnection = require("../dbConnection");

router.get("/", (req, res) => {
    res.status(200).send("Idea");
});


module.exports = router;