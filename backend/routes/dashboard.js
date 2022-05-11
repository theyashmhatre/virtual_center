const router = require("express").Router();
const mysqlConnection = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { generatePaginationValues } = require("../utils/utils");



router.get("/account-analytics", passport.authenticate("jwt", { session: false }), (req, res) => {

    mysqlConnection.query(`SELECT u.account_type_id as accountId, at.account_name as accountName, COUNT(c.challenge_id) as challengeCount FROM challenge c
     INNER JOIN user u 
     ON c.user_id = u.user_id 
     INNER JOIN account_type at 
     on u.account_type_id = at.account_type_id 
     GROUP BY u.account_type_id`, (sqlErr, result, fields) => {
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

router.get("/get-challenges/:accountName/:pageNum/:limit/:columnName/:order",
passport.authenticate("jwt", { session: false }),
(req, res) => {
    try {

        //columnName => on which table's column the sorting is to be performed  | order => 1 or -1, where 1 means ascending
        let { columnName, order, accountName } = req.params;
        let { limit, pageNum, offset } = generatePaginationValues(req);
  
        const sortingOrder = {
          "1": "ASC",
          "-1": "DESC",
        };
  
        const sortingQueries = (columnName, order) => {
          const queries = {
            postedOn: `SELECT c.* FROM challenge c
             INNER JOIN user u
             ON c.user_id = u.user_id
             INNER JOIN account_type a
             ON u.account_type_id = a.account_type_id
             AND c.is_deleted = 0 AND a.account_name = "${accountName}"
             ORDER BY c.posted_on ${sortingOrder[order]} LIMIT ? OFFSET ?`,
            endDate: `SELECT c.* FROM challenge c
            INNER JOIN user u
            ON c.user_id = u.user_id
            INNER JOIN account_type a
            ON u.account_type_id = a.account_type_id
            AND c.is_deleted = 0 AND a.account_name = "${accountName}"
            ORDER BY c.end_date ${sortingOrder[order]} LIMIT ? OFFSET ?`,
            status: `SELECT c.* FROM challenge c
            INNER JOIN user u
            ON c.user_id = u.user_id
            INNER JOIN account_type a
            ON u.account_type_id = a.account_type_id
            AND c.is_deleted = 0 AND a.account_name = "${accountName}" NOW() < c.end_date AND c.is_deleted = 0 LIMIT ? OFFSET ?`
          };
  
          return queries[columnName];
        };
  
        //checks if either columnName or order have invalid values. replaces them with default values which will return a list in descending order of creation date
        if (!sortingQueries(columnName, order) || (order !== "-1" && order !== "1")) {
          columnName = "postedOn";
          order = "-1";
        }
  
        mysqlConnection.query(
  
          sortingQueries(columnName, order),
  
          [limit, offset],
          (sqlErr, result, fields) => {
  
            if (sqlErr) {
              return res.status(500).json({
                main: "Something went wrong. Please try again.",
                devError: sqlErr,
                devMsg: "Error occured while fetching challenges from db",
              });
  
            } else if (!result.length) {
              return res.status(200).json({ challenges_count: result.length, main: "No challenges found." });
  
            } else {
              let data = {
                challenges_count: result.length,
                page_number: pageNum,
                challenge_list: result,
              };
  
              res.status(200).json(data);
            }
          }
        );
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: error,
          devMsg: "Error occured while fetching challenges",
        });
      }
})



module.exports = router;