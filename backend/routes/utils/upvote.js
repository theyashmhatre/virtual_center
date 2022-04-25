const router = require("express").Router();
const mysqlConnection = require("../../config/dbConnection");
const passport = require("passport");
const { types } = require('../../utils/constants');

router.post("/upvote/:commentId/:typeId", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { commentId, typeId } = req.params;
        const userId = res.req.user.user_id;

        if (!typeId || !commentId || !userId || commentId == null || userId == null || typeId == null) 
        return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either commentId or typeId or userId is invalid. commentId: ${commentId}  typeId: ${typeId} userId: ${userId}` })

        const newLike = {
            user_id: userId,
            comment_id: commentId,
            type_id: typeId
        };

        mysqlConnection.query(`INSERT IGNORE INTO upvote SET ? `, newLike, (sqlErr, result, fields) => {
            if (sqlErr) {
                console.log(sqlErr)
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while inserting upvote into db",
                });
            } else {
                res.status(200).json({ main: types[typeId] + " Comment Upvoted Successfully" });
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while adding upvote",
        });
    }
});

//to undo the upvote
router.post("/downvote/:commentId/:typeId", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { commentId, typeId } = req.params;
        const userId = res.req.user.user_id;


        if (!typeId || !commentId || !userId || commentId == null || userId == null || typeId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either commentId or typeId or userId is invalid. commentId: ${commentId}  typeId: ${typeId} userId: ${userId}` })

        mysqlConnection.query(`DELETE FROM upvote WHERE user_id = ${userId} AND comment_id = ${commentId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while removing upvote from db",
                });
            } else {
                res.status(200).json({ main: types[typeId] + " Comment, undo the upvote Successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while adding upvote",
        });
    }
});

//returns the information of upvotes for corresponding post
router.get("/get-upvotes/:commentId/:typeId", passport.authenticate("jwt", { session: false }), (req, res) => {
    try{

        const { commentId, typeId } = req.params;
        const userId = res.req.user.user_id;

        if (!typeId || !commentId || !userId || commentId == null || userId == null || typeId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either commentId or typeId or userId is invalid. commentId: ${commentId}  typeId: ${typeId} userId: ${userId}` })

        // console.log(commentId, typeId, userId)
        // res.status(200).json({main:'done'})

        //returns no of upvotes for a post, and the status of upvote whether user has upvotes the comment or not
        mysqlConnection.query(`SELECT COUNT(*) as isUpvoted FROM upvote WHERE user_id = ${userId} AND comment_id = ${commentId} AND type_id = ${typeId} ; SELECT COUNT(user_id) as noOfUpvotes FROM upvote WHERE comment_id = ${commentId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
            if(sqlErr){
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while fetching upvotes from db",
                });
            } else{
                let data = {
                    isUpvoted: result[0][0].isUpvoted,
                    noOfUpvotes: result[1][0].noOfUpvotes
                }
                res.status(200).json(data);
            }
        });

    } catch(error){
        console.log(error)
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while getting upvotes",
        });
    }
})

module.exports = router;