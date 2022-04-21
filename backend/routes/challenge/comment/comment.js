const router = require('express').Router();
const mysqlConnection = require("../../../config/dbConnection");
const { generatePaginationValues } = require('../../../utils/utils');
const passport = require("passport");
const { types } = require('../../../utils/constants');
const typeId = types.challenge;


router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { challengeId, commentText } = req.body;
        const userId = res.req.user.user_id;

        if (!challengeId || !userId || challengeId == null || userId == null || !commentText)
            return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either challengeId, userId, commentText is invalid. ChallengeId: ${challengeId} userId: ${userId} commentText: ${commentText}` });

        const newComment = {
            user_id: userId,
            post_id: challengeId,
            type_id: typeId,
            comment_text: commentText,
        };

        mysqlConnection.query(`INSERT INTO comment SET ?`, newComment, (sqlErr, result, fields) => {
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
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while adding comment to db",
        });
    }
});

//returns all comments (paginated)
router.get("/multiple/:challengeId/:pageNum/:limit", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { challengeId } = req.params;
        const userId = res.req.user.user_id;

        let { limit, pageNum, offset } = generatePaginationValues(req);

        if (!challengeId)
            return res
                .status(400)
                .json({ main: "Something went wrong. Please try again", devMsg: "No challenge id found" });


        //returns a list of comments
        //having comment info, user's employee_name, display_picture and email, totalLikes, isLiked variable which indicates if a user has liked the particular comment or not
        //INNER JOIN tables comment on user to fetch each comment with the comment creator's name,email and dp
        //LEFT JOIN on upvote to fetch totalLikes of each comment
        //LEFT JOIN on upvote again to check if each comment has been liked by the current user

        mysqlConnection.query(

            `SELECT c.*, IF(v.user_id is NOT NULL,1,0) as isLiked, u.employee_name, u.email, u.display_picture, IF(upv.comment_id is NOT NULL,COUNT(*),0) as totalLikes
            FROM comment c
            INNER JOIN user u
            ON c.user_id = u.user_id
            LEFT JOIN
            upvote upv
            ON c.comment_id = upv.comment_id AND upv.type_id = ${typeId}
            LEFT JOIN
            upvote v
            ON c.comment_id = v.comment_id AND v.user_id = ${userId} AND v.type_id = ${typeId}
            where c.post_id = ${challengeId} AND c.type_id = ${typeId}
            GROUP BY c.comment_id
            ORDER BY c.posted_on DESC
            LIMIT ? OFFSET ?
            `,

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
                    let data = {
                        comments_count: result.length,
                        page_number: pageNum,
                        comments_list: result
                    };

                    res.status(200).json(data);
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


        if (!commentId || !userId || commentId == null || userId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either commentId or userId is invalid. Chall: ${commentId} userId: ${userId}` });

        const newUpvote = {
            comment_id: commentId,
            user_id: userId,
            type_id: typeId
        };

        mysqlConnection.query(`INSERT IGNORE INTO upvote SET ? `, newUpvote, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while inserting comment upvote into db",
                });
            } else {
                res.status(200).json({ main: "comment upvoted Successfully" });
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


        if (!commentId || !userId || commentId == null || userId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either commentId or userId is invalid. CommentId: ${commentId} userId: ${userId}` });

        mysqlConnection.query(`DELETE FROM upvote WHERE user_id=${userId} AND comment_id = ${commentId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while inserting downvote for comment into db",
                });
            } else {
                res.status(200).json({ main: "comment downvoted successfully" });
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
            return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either commentId or userId is invalid. CommentId: ${commentId} userId: ${userId}` });


        mysqlConnection.query(`SELECT * from upvote where comment_id = ${commentId} AND user_id = ${userId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
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

        mysqlConnection.query(`SELECT COUNT(*) as totalUpvotes from upvote where comment_id = ${commentId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while checking total number of likes on an challenge",
                });

            } else {
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