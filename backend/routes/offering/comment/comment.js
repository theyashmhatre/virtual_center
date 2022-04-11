const router = require('express').Router();
const mysqlConnection = require("../../../config/dbConnection");
const { generatePaginationValues } = require('../../../utils/utils');
const passport = require("passport");


router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { offeringId, commentText } = req.body;
        const userId = res.req.user.user_id;

        if (!offeringId || !userId || offeringId == null || userId == null || !commentText)
            return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either offeringId, userId, commentText is invalid. OfferingId: ${offeringId} userId: ${userId} commentText: ${commentText}` })

        const newComment = {
            user_id: userId,
            offering_id: offeringId,
            comment_text: commentText,
        };

        mysqlConnection.query(`SELECT * FROM offering_comment WHERE user_id = ${userId} AND offering_id = ${offeringId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while checking if user has liked the post",
                });

            } else if (result.length) {
                return res.status(200).json({
                    main: "Each user is allowed to post a single comment on each offering.",
                    devMsg: "User's comment already exists on the particular offering"
                });
            } else {
                mysqlConnection.query(`INSERT INTO offering_comment SET ?`, newComment, (sqlErr, result, fields) => {
                    if (sqlErr) {
                        return res.status(500).json({
                            main: "Something went wrong. Please try again.",
                            devError: sqlErr,
                            devMsg: "Error occured while adding comment to db",
                        });

                    } else {
                        return res.status(201).json({ main: "Comment added successfully" });
                    }
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while adding comment to db",
        });
    }
});

//returns all comments (paginated)
router.get("/multiple/:offeringId/:pageNum/:limit", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { offeringId } = req.params;
        const userId = res.req.user.user_id;

        let { limit, pageNum, offset } = generatePaginationValues(req);

        if (!offeringId)
            return res
                .status(400)
                .json({ main: "Something went wrong. Please try again", devMsg: "No offering id found" });


        //returns a list of comments
        //having comment info, user's employee_name, display_picture and email, totalLikes, isLiked variable which indicates if a user has liked the particular comment or not
        //INNER JOIN tables offering_comment on user to fetch each comment with the comment creator's name,email and dp
        //LEFT JOIN on offering_comment_upvote to fetch totalLikes of each comment
        //LEFT JOIN on offering_comment_upvote again to check if each comment has been liked by the current user

        mysqlConnection.query(

            `SELECT c.*, IF(v.user_id is NOT NULL,1,0) as isLiked, u.employee_name, u.email, u.display_picture, IF(ocv.offering_comment_id is NOT NULL,COUNT(*),0) as totalLikes
            FROM offering_comment c
            INNER JOIN user u 
            ON c.user_id = u.user_id
            LEFT JOIN
            offering_comment_upvote ocv
            ON c.offering_comment_id = ocv.offering_comment_id
            LEFT JOIN 
            offering_comment_upvote v 
            ON c.offering_comment_id = v.offering_comment_id AND v.user_id = ${userId}
            where c.offering_id = ${offeringId}
            GROUP BY v.offering_comment_id
            ORDER BY c.posted_on DESC
            LIMIT ? OFFSET ?`,

            [limit, offset], (sqlErr, result, fields) => {

                if (sqlErr) {
                    return res.status(500).json({
                        main: "Something went wrong. Please try again.",
                        devError: sqlErr,
                        devMsg: "Error occured while fetching comments from db",
                    });

                } else if (!result.length) {
                    return res.status(200).json({ comments_count: result.length, main: "No comments found." });

                } else {
                    mysqlConnection.query(
                        `SELECT * FROM offering_comment oc INNER JOIN user u ON oc.user_id = u.user_id WHERE oc.user_id = ${res.req.user.user_id} AND oc.offering_id = ${offeringId}`,
                        (sqlErr2, result2, fields2) => {
                            if (sqlErr2) {
                                return res.status(500).json({
                                    main: "Something went wrong. Please try again.",
                                    devError: sqlErr2,
                                    devMsg: "Error occured while fetching single comment of user from db",
                                });
                            } else {

                                let data = {
                                    comments_count: result.length,
                                    page_number: pageNum,
                                    comments_list: result,
                                    user_comment: result2[0]
                                };

                                res.status(200).json(data);
                            }
                        });
                }
            });

    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while fetching comments from db",
        });
    }
});


router.post("/upvote", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { commentId } = req.body;
        const userId = res.req.user.user_id;


        if (!commentId || !userId || commentId == null || userId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either commentId or userId is invalid. OfferingId: ${commentId} userId: ${userId}` });

        const newUpvote = {
            offering_comment_id: commentId,
            user_id: userId
        };

        mysqlConnection.query(`INSERT IGNORE INTO offering_comment_upvote SET ? `, newUpvote, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while inserting comment upvote into db",
                });
            } else {
                res.status(200).json({ main: "Offering comment upvoted Successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while upvoting",
        });
    }

});

router.post("/downvote", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { commentId } = req.body;
        const userId = res.req.user.user_id;


        if (!commentId || !userId || commentId == null || userId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either commentId or userId is invalid. OfferingId: ${commentId} userId: ${userId}` });

        mysqlConnection.query(`DELETE FROM offering_comment_upvote WHERE user_id=${userId} AND offering_comment_id = ${commentId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while inserting downvote for comment into db",
                });
            } else {
                res.status(200).json({ main: "Offering comment downvoted successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while downvoting comment",
        });
    }

});


//checks if a user has upvoted a particular comment
router.get("/check-upvote/:userId/:commentId", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        const { userId, commentId } = req.params;

        if (!commentId || !userId || commentId == null || userId == null)
            return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either commentId or userId is invalid. OfferingId: ${commentId} userId: ${userId}` })


        mysqlConnection.query(`SELECT * from offering_comment_upvote where offering_comment_id = ${commentId} AND user_id = ${userId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while checking if user has upvoted the comment",
                });

            } else {
                const hasUpvoted = result.length > 0 ? true : false;
                return res.status(200).json({ isUpvoted: hasUpvoted });
            }
        });

    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while executing check upvote api",
        });
    }
});

//returns totalUpvotes for a particular comment
router.get("/:commentId/upvotes/count", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        const { commentId } = req.params;

        if (!commentId || commentId == null)
            return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `commentId is invalid. CommentId: ${commentId}` });

        mysqlConnection.query(`SELECT COUNT(*) as totalUpvotes from offering_comment_upvote where offering_comment_id = ${commentId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while checking total number of likes on an offering",
                });

            } else {
                console.log(result);
                let result2 = result[0];
                return res.status(200).json({ totalUpvotes: result2.totalUpvotes });
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