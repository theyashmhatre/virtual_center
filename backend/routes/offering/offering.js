const router = require('express').Router();
const mysqlConnection = require("../../config/dbConnection");
const { generatePaginationValues } = require('../../utils/utils');
const passport = require("passport");

//get all offerings(paginated)

router.get("/multiple/:pageNum/:limit", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {

        let { limit, pageNum, offset } = generatePaginationValues(req);

        mysqlConnection.query(`SELECT * from offering LIMIT ? OFFSET ?`, [limit, offset], (sqlErr, result, fields) => {

            if (sqlErr) {
                console.log(sqlErr);
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while fetching offerings from db",
                });

            } else if (!result.length) {

                return res.status(200).json({ offerings_count: result.length, main: "No Offerings found." });

            } else {
                let data = {
                    offerings_count: result.length,
                    page_number: pageNum,
                    offerings_list: result
                };

                res.status(200).json(data);
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while fetching offerings",
        });
    }
});

router.get("/single/:offeringId", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        const { offeringId } = req.params;

        if (!offeringId)
            return res
                .status(400)
                .json({ main: "Something went wrong. Please try again", devMsg: "No offering id found" });

        //query to find if the challenge exists
        mysqlConnection.query(

            `SELECT * from offering where offering_id = ${offeringId}`,
            (sqlErr, result, fields) => {
                if (sqlErr) {
                    return res.status(500).json({
                        main: "Something went wrong. Please try again.",
                        devError: sqlErr,
                        devMsg: "Error occured while fetching offering from db",
                    });
                } else if (!result.length) {
                    //if no challenge found with the given challengeID

                    return res.status(200).json({
                        main: "Offering you were looking for doesn't exist.",
                        devError: "Offering not found in database",
                    });
                } else {
                    let challenge = result[0];

                    return res.status(200).json(challenge);
                }
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while fetching single offering",
        });
    }
});

router.post("/like", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { offeringId } = req.body;
        const userId = res.req.user.user_id;


        if (!offeringId || !userId || offeringId == null || userId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either offeringId or userId is invalid. OfferingId: ${offeringId} userId: ${userId}` })

        const newLike = {
            offering_id: offeringId,
            user_id: userId
        };

        mysqlConnection.query(`INSERT IGNORE INTO offering_like SET ? `, newLike, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while inserting like into db",
                });
            } else {
                res.status(200).json({ main: "Offering Liked Successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while adding like",
        });
    }

});

router.post("/dislike", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { offeringId } = req.body;
        const userId = res.req.user.user_id;


        if (!offeringId || !userId || offeringId == null || userId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either offeringId or userId is invalid. OfferingId: ${offeringId} userId: ${userId}` })

        mysqlConnection.query(`DELETE FROM offering_like WHERE user_id=${userId} AND offering_id = ${offeringId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while inserting dislike into db",
                });
            } else {
                res.status(200).json({ main: "Offering disliked successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while adding like",
        });
    }

});


//checks if a user has liked an offering
router.get("/check-like/:userId/:offeringId", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        const { userId, offeringId } = req.params;

        if (!offeringId || !userId || offeringId == null || userId == null)
            return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either offeringId or userId is invalid. OfferingId: ${offeringId} userId: ${userId}` })

        const data = {
            offering_id: offeringId,
            user_id: userId
        };
        mysqlConnection.query(`SELECT * from offering_like where offering_id = ${offeringId} AND user_id = ${userId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while checking if user has liked the post",
                });

            } else {
                const hasLiked = result.length > 0 ? true : false;
                return res.status(200).json({ isLiked: hasLiked });
            }
        });

    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while executing check like api",
        });
    }
});

//get total count of likes on a particular offering
router.get("/:offeringId/likes/count", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        const { offeringId } = req.params;

        if (!offeringId || offeringId == null)
            return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `offeringId is invalid. OfferingId: ${offeringId}` });

        mysqlConnection.query(`SELECT COUNT(*) as totalLikes from offering_like where offering_id = ${offeringId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while checking total number of likes on an offering",
                });

            } else {
                console.log(result);
                return res.status(200).json({ totalLikes: result[0].totalLikes });
            }
        });

    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while executing count like api",
        });
    }
});




module.exports = router;