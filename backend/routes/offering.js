const router = require('express').Router();
const express = require("express");
const mysqlConnection = require("../config/dbConnection");
const { route } = require('./user');
const { createChallengeValidation, editChallengeValidation } = require("../utils/validation/challenge");
const upload = require("../config/multerConfig");
const { generateCurrentDateTime } = require('../utils/utils');
const passport = require("passport");
const e = require('express');

router.get("/multiple/:pageNum", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {

        const { pageNum } = req.params;      //current page number

        const limit = 12;        //number of items to be sent per request

        const offset = (pageNum - 1) * limit;       //number of rows to skip before selecting records

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
                .json({ main: "Invalid Request", devMsg: "No offering id found" });

        //query to find if the challenge exists
        mysqlConnection.query(
            `SELECT * from offering where offering_id = ${id}`,
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

        mysqlConnection.query(`INSERT INTO offering_like SET ?`, newLike, (sqlErr, result, fields) => {
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


router.get("/check-like/:userId/:offeringId", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {
        const { userId, offeringId } = req.params;

        if (!offeringId || !userId || offeringId == null || userId == null)
            return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either offeringId or userId is invalid. OfferingId: ${offeringId} userId: ${userId}` })

        const data = {
            offering_id: offeringId,
            user_id: userId
        };
        mysqlConnection.query(`SELECT COUNT(*) as likesCount from offering_like where offering_id = ${offeringId} AND user_id = ${userId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while checking if user has liked the post",
                });

            } else {
                const { likesCount } = result[0];
                const hasLiked = likesCount > 0 ? true : false;
                return res.status(201).json({ main: hasLiked });
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
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while adding comment to db",
        });
    }
});


router.get("/get-comments/:offeringId/:pageNum", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { offeringId, pageNum } = req.params;

        const limit = 8; //number of items to be sent per request

        const offset = (pageNum - 1) * limit; //number of rows to skip before selecting records

        if (!offeringId)
            return res
                .status(400)
                .json({ main: "Invalid Request", devMsg: "No offering id found" });
        
        mysqlConnection.query(`SELECT * from offering_comment where offering_id = ${offeringId} LIMIT ? OFFSET ?`, [limit,offset], (sqlErr, result, fields) => {
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
                    comments_list: result,
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




module.exports = router;