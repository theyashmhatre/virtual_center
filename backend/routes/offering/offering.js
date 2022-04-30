const router = require('express').Router();
const mysqlConnection = require("../../config/dbConnection");
const { generatePaginationValues } = require('../../utils/utils');
const passport = require("passport");
const { types } = require('../../utils/constants');
const { createOfferingValidation } = require('../../utils/validation/offering');
const { off } = require('../../config/dbConnection');
const { roles } = require("../../utils/constants")
const typeId = types.offering;

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        try {
            const { errors, isValid } = createOfferingValidation(req, res);

            if (!isValid) return res.status(400).json(errors);

            let {
                offeringTitle,
                offeringDescription,
                attachment,
                ownerName,
                ownerEmail,
                industryName
            } = req.body;

            const newOffering = {
                title: offeringTitle,
                description: offeringDescription,
                attachment: attachment,
                owner_name: ownerName,
                owner_email: ownerEmail,
                industry_name: industryName
            };

            mysqlConnection.query(`INSERT INTO offering SET ?`, newOffering, (sqlErr, result, fields) => {
                if (sqlErr) {
                    return res.status(500).json({
                        main: "Something went wrong. Please try again.",
                        devError: sqlErr,
                        devMsg: "Error occured while adding challenge into db",
                    });
                }

                else {
                    return res
                        .status(201)
                        .json({ devMsg: "New offering created successfully" });
                }
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                main: "Something went wrong. Please try again.",
                devError: error,
                devMsg: "Error occured while creating challenge",
            });
        }
    }
);

router.post("/edit/:offeringId",
passport.authenticate("jwt", { session: false }),
(req,res) => {
    try{
        let { offeringId } = req.params;

        if(!offeringId)
            return res
            .status(400)
            .json({ main: "Invalid Request", devMsg: "No offering id found" });

        const { errors, isValid } = editChallengeValidation(req, res);

        if (!isValid) return res.status(400).json(errors);


        let {
            offeringTitle,
            offeringDescription,
            attachment,
            ownerName,
            ownerEmail,
            industryName
        } = req.body;

        const updatedOffering = {
            title: offeringTitle,
            description: offeringDescription,
            attachment: attachment,
            owner_name: ownerName,
            owner_email: ownerEmail,
            industry_name: industryName
        };

        

      //query to find if the offering exists
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
            //if no offering found
            return res.status(200).json({
              main: "No such offering exists",
              devMsg: "Offering ID is invalid",
            });
          } else {
            // Confirm that user is super admin or the admin who created this offering
              if (res.req.user.role != roles["super_admin"]) {
                return res.status(200).json({
                  main: "You don't have rights to update",
                  devMsg: "User is not super admin",
                });
              }
            }

            //Storing updated offering into db
            mysqlConnection.query(
              `UPDATE offering SET ? WHERE offering_id = ?`,
              [updatedChallenge, challengeId],
              (sqlErr, result, fields) => {
                if (sqlErr) {
                  console.log(sqlErr);
                  return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while updating offering in db",
                  });
                } else {
                  res
                    .status(200)
                    .json({ main: "Offering updated Successfully." });
                }
              }
            );
          }
      );


    } catch(error){
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while updating offering",
          });
    }
}
);

router.delete(
"/delete/:offeringId",
passport.authenticate("jwt", { session: false}),
(req, res) => {
    try{

        const { offeringId } = req.params;

        if(!offeringId)
            return res
            .status(400)
            .json({ main: "Invalid Request", devMsg: "No offering id found" });
        
        //query to find if the offering exists
        mysqlConnection.query(
            `SELECT * FROM offering WHERE offering_id = ${offeringId}`,
            (sqlErr, result, fields) => {
                if (sqlErr) {
                    console.log(sqlErr);
                    return res.status(500).json({
                      main: "Something went wrong. Please try again.",
                      devError: sqlErr,
                      devMsg: "Error occured while fetching offering from db",
                    });
            } else if(!result.length){
                //if on offering found
                return res.status(200).json({ main:"Invalid Offering ID."})
            } else if(res.req.user.role !== roles["super_admin"]){
                //if user  or admin requesting the deletion if not the creator 
            res
            .status(401)
            .json({
              main: "You are not allowed to perform this operation.",
              devMsg:
                "Request Unauthorised. Mismatch of user ID and offering creator ID",
            });
            } else {
                mysqlConnection.query(
                    `UPDATE offering SET is_deleted = 1 WHERE offering_id = ${offeringId}`,
                    (sqlErr, result, fields) => {
                        if(sqlErr){
                            console.log(sqlErr);
                            return res.status(500).json({
                              main: "Something went wrong. Please try again.",
                              devError: sqlErr,
                              devMsg: "Error occured while deleting offering from db",
                            }); 
                        } else {
                            res.status(200)
                            .json({main:" Offering deleted successfully."});
                        }
                    }
                )
            }
            })

    } catch(error){
        return res.status(500).json({
            main: "Something went wrong. Please try again.  ",
            devError: error,
            devMsg: "Error occured while deleting offering.",
          });
    }
})

//get all offerings(paginated)
router.get("/multiple/:pageNum/:limit", passport.authenticate("jwt", { session: false }), (req, res) => {
    try {

        let { limit, pageNum, offset } = generatePaginationValues(req);

        mysqlConnection.query(`SELECT * from offering WHERE is_deleted = 0 LIMIT ? OFFSET ?`, [limit, offset], (sqlErr, result, fields) => {

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
            user_id: userId,
            post_id: offeringId,
            type_id: typeId
        };

        mysqlConnection.query(`INSERT IGNORE INTO likes SET ? `, newLike, (sqlErr, result, fields) => {
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

        mysqlConnection.query(`DELETE FROM likes WHERE user_id=${userId} AND post_id = ${offeringId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
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
        mysqlConnection.query(`SELECT * from likes where post_id = ${offeringId} AND user_id = ${userId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
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

        mysqlConnection.query(`SELECT COUNT(*) as totalLikes from likes where post_id = ${offeringId} AND type_id = ${typeId}`, (sqlErr, result, fields) => {
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

//returns deleted offerings which can be only seen by super_Admin
router.get("/deleted-offerings/:pageNum/:limit", passport.authenticate("jwt", { session: false }), (req,res) => {
    try{
      let { limit, pageNum, offset } = generatePaginationValues(req);
  
      mysqlConnection.query(`SELECT * from offering WHERE is_deleted = 1 LIMIT ? OFFSET ?`, [limit, offset], (sqlErr, result, fields) => {
  
        if (sqlErr) {
          return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: sqlErr,
            devMsg: "Error occured while fetching offering from db",
          });
  
        } else if (!result.length) {
          return res.status(200).json({ offerings_count: result.length, main: "No deleted offerings found." });
  
        } else {
          let data = {
            offerings_count: result.length,
            page_number: pageNum,
            offering_list: result,
          };
  
          res.status(200).json(data);
        }
      });
    } catch(error){
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while getting deleted offerings",
      });
    }
  })



module.exports = router;