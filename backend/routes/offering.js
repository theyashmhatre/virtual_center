const router = require('express').Router();
const express = require("express");
const mysqlConnection = require("../config/dbConnection");
const { route } = require('./user');
const { createChallengeValidation, editChallengeValidation } = require("../utils/validation/challenge");
const upload = require("../config/multerConfig");
const { generateCurrentDateTime, generatePaginationValues } = require('../utils/utils');
const passport = require("passport");
const e = require('express');

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


router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {

        mysqlConnection.query(`SELECT o.*, count(ol.offering_id) from offering o INNER JOIN offering_like ol ON ol.offering_id = o.offering_id WHERE ol.user_id = ${res.req.user.user_id}`,
            (sqlErr, result, fields) => {
                if (sqlErr) {
                    return res.status(500).json({
                        main: "Something went wrong. Please try again.",
                        devError: sqlErr,
                        devMsg: "Error occured while checking total number of likes on an offering",
                    });

                } else {
                    console.log(result);
                    return res.status(200).json(result);
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


router.post("/comment", passport.authenticate("jwt", { session: false }), (req, res) => {

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


router.get("/:offeringId/comments/multiple/:pageNum/:limit", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { offeringId } = req.params;
        const userId = res.req.user.user_id;

        let { limit, pageNum, offset } = generatePaginationValues(req);

        if (!offeringId)
            return res
                .status(400)
                .json({ main: "Something went wrong. Please try again", devMsg: "No offering id found" });

        //SELECT oc.*, u.employee_name, u.display_picture, u.email, COUNT(ocv.offering_comment_id) as isLiked from offering_comment oc INNER JOIN user u ON oc.user_id = u.user_id LEFT JOIN offering_comment_upvote ocv ON ocv.user_id = oc.user_id where oc.offering_id = ${offeringId} ORDER BY posted_on DESC LIMIT ? OFFSET ?
        //SELECT oc.*, u.employee_name, u.display_picture, u.email from offering_comment oc INNER JOIN user u ON oc.user_id = u.user_id where oc.offering_id = ${offeringId} ORDER BY posted_on DESC LIMIT ? OFFSET ?

        mysqlConnection.query(
            `SELECT c.*, IF(v.user_id is NOT NULL,1,0) as isLiked 
            FROM offering_comment c 
            LEFT JOIN 
            offering_comment_upvote v 
            ON c.offering_comment_id = v.offering_comment_id AND v.user_id = ${userId}
            where c.offering_id = ${offeringId} 
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


router.post("/comment/upvote", passport.authenticate("jwt", { session: false }), (req, res) => {

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

router.post("/comment/downvote", passport.authenticate("jwt", { session: false }), (req, res) => {

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


router.get("/comment/check-upvote/:userId/:commentId", passport.authenticate("jwt", { session: false }), (req, res) => {
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




module.exports = router;