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

router.get("/most-submissions/:year",
passport.authenticate("jwt", { session: false }),
(req,res) => {
    const { year } = req.params;
    mysqlConnection.query(`SELECT c.title AS name, COUNT(s.challenge_id) AS noOfSubmissions
    FROM challenge c 
    INNER JOIN solution s 
    ON c.challenge_id = s.challenge_id 
    WHERE YEAR(s.posted_on) = ${year}  
    GROUP BY c.challenge_id 
    ORDER BY COUNT(s.challenge_id) DESC`,
    (sqlErr, result, fields) => {
        if(sqlErr){
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching solution from db",
            });
        } else if(!result[0]){
            return res.status(200).json({main:"No challenges found"})
        } else{
            let data = {
                challenges_count: result.length,
                challenge_list: result
            }
            return res.status(200).json(data)
        }
    })
});




module.exports = router;