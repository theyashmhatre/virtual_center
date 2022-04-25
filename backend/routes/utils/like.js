const router = require("express").Router();
const mysqlConnection = require("../../config/dbConnection");
const passport = require("passport");
const { types } = require('../../utils/constants');


router.post("/like/:postId/:typeId", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { postId, typeId } = req.params;
        const userId = res.req.user.user_id;

        if (!typeId || !postId || !userId || postId == null || userId == null || typeId == null) 
        return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either postId or typeId or userId is invalid. PostId: ${postId}  typeId: ${typeId} userId: ${userId}` })

        const newLike = {
            user_id: userId,
            post_id: postId,
            type_id: typeId
        };

        mysqlConnection.query(`INSERT IGNORE INTO likes SET ? `, newLike, (sqlErr, result, fields) => {
            if (sqlErr) {
                console.log(sqlErr)
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while inserting like into db",
                });
            } else {
                res.status(200).json({ main: types[typeId] + " Liked Successfully" });
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while adding like",
        });
    }
});

router.post("/unlike/:postId/:typeId", passport.authenticate("jwt", { session: false }), (req, res) => {

    try {
        const { postId, typeId } = req.params;
        const userId = res.req.user.user_id;


        if (!typeId || !postId || !userId || postId == null || userId == null || typeId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either postId or typeId or userId is invalid. PostId: ${postId}  typeId: ${typeId} userId: ${userId}` })

        mysqlConnection.query(`DELETE FROM likes WHERE user_id = ${userId} AND post_id = ${postId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while removing like from db",
                });
            } else {
                res.status(200).json({ main: types[typeId] + " Unliked Successfully" });
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

//returns the information of likes for corresponding post
router.get("/get-likes/:postId/:typeId", passport.authenticate("jwt", { session: false }), (req, res) => {
    try{

        const { postId, typeId } = req.params;
        const userId = res.req.user.user_id;

        if (!typeId || !postId || !userId || postId == null || userId == null || typeId == null) return res.status(400).json({ main: "Something went wrong. Please try again", devMsg: `Either postId or typeId or userId is invalid. PostId: ${postId}  typeId: ${typeId} userId: ${userId}` })


        //returns no of likes for a post, and the status of like whether user has liked the post or not
        mysqlConnection.query(`SELECT COUNT(*) as isLiked FROM likes WHERE user_id = ${userId} AND post_id = ${postId} AND type_id = ${typeId} ; SELECT COUNT(user_id) as noOfLikes FROM likes WHERE post_id = ${postId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
            if(sqlErr){
                return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while fetching likes from db",
                });
            } else{
                let data = {
                    isLiked: result[0][0].isLiked,
                    noOfLikes: result[1][0].noOfLikes
                }
                res.status(200).json(data);
            }
        })

    } catch(error){
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while getting likes",
        });
    }
})

module.exports = router;