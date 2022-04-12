const router = require("express").Router();
const mysqlConnection = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");


router.get("/account-analytics", passport.authenticate("jwt", { session: false }), (req, res) => {

    mysqlConnection.query(`SELECT u.account_type_id as accountId, at.account_name as accountName, COUNT(c.challenge_id) as challengeCount FROM challenge c INNER JOIN user u ON c.user_id = u.user_id INNER JOIN account_type at on u.account_type_id = at.account_type_id GROUP BY u.account_type_id`, (sqlErr, result, fields) => {
        if (sqlErr) {
            return res.status(500).json({
                main: "Something went wrong. Please try again.",
                devError: sqlErr,
                devMsg: "Error occured while fetching comments from db",
            });

        } else{
            return res.status(200).json(result);
        }
    });
});




module.exports = router;