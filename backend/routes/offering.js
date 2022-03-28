const router = require('express').Router();
const express = require("express");
const mysqlConnection = require("../config/dbConnection");
const { route } = require('./user');
const { createChallengeValidation, editChallengeValidation } = require("../utils/validation/challenge");
const upload = require("../config/multerConfig");
const { generateCurrentDateTime } = require('../utils/utils');
const passport = require("passport");
const e = require('express');

router.get("/get-offerings/:pageNum", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {

        const { pageNum } = req.params;      //current page number

        const limit = 6;        //number of items to be sent per request

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

                return res.status(200).json({ main: "No Offerings found." });

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


router.post("/comment", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { offeringId, commentText } = req.body;
        const userId = res.req.user.user_id;

        if (!offeringId || !userId || offeringId == null || userId == null || !commentText) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either offeringId, userId, commentText is invalid. OfferingId: ${offeringId} userId: ${userId} commentText: ${commentText}` })

        const newComment = {
            user_id: userId,
            offering_id: offeringId,
            comment_text: commentText,
            posted_on: generateCurrentDateTime()
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



module.exports = router;