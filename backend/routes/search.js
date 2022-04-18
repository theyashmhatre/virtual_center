const router = require("express").Router();
const mysqlConnection = require("../config/dbConnection");
const passport = require("passport");
const { generatePaginationValues } = require("../utils/utils");


router.get("/challenge/:queryString/:pageNum/:limit", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { queryString } = req.params;

        let { limit, pageNum, offset } = generatePaginationValues(req);

        if (!queryString)
            return res
                .status(400)
                .json({
                    main: "Invalid Request",
                    devMsg: "No query string id found",
                });

        if (!pageNum)
            return res
                .status(400)
                .json({
                    main: "Invalid Request",
                    devMsg: "No page number found in the request",
                });

        //query to search for challenges using a query string
        //checks if the queried string in present in either title or description of any of the challenges and returns a list of challenge objects as challege_list
        mysqlConnection.query(
            `SELECT * from challenge where description LIKE "%${queryString}%" OR title LIKE "%${queryString}%" ORDER BY posted_on DESC LIMIT ? OFFSET ?`,
            [limit, offset],
            (sqlErr, result, fields) => {
                if (sqlErr) {
                    console.log(sqlErr);
                    return res.status(500).json({
                        main: "Something went wrong. Please try again.",
                        devError: sqlErr,
                        devMsg:
                            "Error occured while searching challenges using a query string",
                    });
                } else if (!result.length) {
                    return res.status(200).json({ challenges_count: result.length, main: "No challenges found" });
                } else {
                    let data = {
                        challenges_count: result.length,
                        challenge_list: result,
                    };

                    res.status(200).json(data);
                }
            }
        );
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while searching for challenges",
        });
    }
});


router.get("/all/:queryString/:pageNum/:limit", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { queryString } = req.params;

        let { limit, pageNum, offset } = generatePaginationValues(req);

        if (!queryString)
            return res
                .status(400)
                .json({
                    main: "Invalid Request",
                    devMsg: "No query string id found",
                });
        if (!pageNum)
            return res
                .status(400)
                .json({
                    main: "Invalid Request",
                    devMsg: "No page number found in the request",
                });

        //this query performs a search operation across multiple table i.e. challenges, offerings, ideas
        // returns a union of all the results
        //for each table, it checks if the queried string is present in either title or description of the respective entity
        mysqlConnection.query(
            `
            SELECT s.* from (
                SELECT "challenge" as type, c.challenge_id as id, c.title as title, c.description as description from challenge c WHERE c.description LIKE "%${queryString}%" OR c.title LIKE "%${queryString}%" 
                UNION ALL 
                SELECT "offering" as type, o.offering_id as id, o.title as title, o.description as desciption from offering o WHERE o.description LIKE "%${queryString}%" OR o.title LIKE "%${queryString}%"
            ) as s
            ORDER BY s.type
            LIMIT ? OFFSET ?`,
            [limit, offset],

            (sqlErr, result, fields) => {
                if (sqlErr) {
                    console.log(sqlErr);
                    return res.status(500).json({
                        main: "Something went wrong. Please try again.",
                        devError: sqlErr,
                        devMsg:
                            "Error occured while searching challenges using a query string",
                    });
                } else if (!result.length) {
                    return res.status(200).json({ result_count: result.length, main: "No challenges found" });
                } else {
                    let data = {
                        result_count: result.length,
                        result_list: result,
                    };

                    return res.status(200).json(data);
                }
            }
        );
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while searching",
        });
    }
});




module.exports = router;