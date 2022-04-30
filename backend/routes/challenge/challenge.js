const router = require("express").Router();
const mysqlConnection = require("../../config/dbConnection");
const {
  createChallengeValidation,
  editChallengeValidation,
} = require("../../utils/validation/challenge");
const passport = require("passport");
const { generatePaginationValues } = require("../../utils/utils");
const { roles } = require("../../utils/constants");

router.get("/", (req, res) => {
  res.status(200).send("Challenge");
});

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const { errors, isValid } = createChallengeValidation(req, res);

      console.log(errors);
      if (!isValid) return res.status(400).json(errors);

      let {
        challengeTitle,
        challengeDescription,
        coverImage,
        endDate,
        tags,
        cloudProvider,
        supportingMedia,
        reward,
      } = req.body;

      const newChallenge = {
        title: challengeTitle,
        description: challengeDescription,
        user_id: res.req.user.user_id,
        cover_image: coverImage,
        tags: tags,
        cloud_provider: cloudProvider,
        end_date: endDate,
        status: true,
      };

      mysqlConnection.query(`INSERT INTO challenge SET ?`, newChallenge, (sqlErr, result, fields) => {
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
            .json({ devMsg: "New challenge created successfully" });
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

router.post(
  "/edit/:challengeId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      let { challengeId } = req.params;

      if (!challengeId)
        return res
          .status(400)
          .json({ main: "Invalid Request", devMsg: "No challenge id found" });

      const { errors, isValid } = editChallengeValidation(req, res);

      if (!isValid) return res.status(400).json(errors);

      const {
        challengeTitle,
        challengeDescription,
        tags,
        cloudProvider,
        endDate,
        supportingMedia,
        reward,
        status,
      } = req.body;

      const updatedChallenge = {
        title: challengeTitle,
        description: challengeDescription,
        tags: tags,
        cloud_provider: cloudProvider,
        end_date: endDate,
      };

      //query to find if the challenge exists
      mysqlConnection.query(
        `SELECT * from challenge where challenge_id = ${challengeId}`,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching challenge from db",
            });
          } else if (!result.length) {
            //if no challenge found
            return res.status(200).json({
              main: "No such challenge exists",
              devMsg: "Challenge ID is invalid",
            });
          } else {
            // Confirm that user is either super admin or the admin who created this challenge
            if (result[0].user_id != res.req.user.user_id) {
              if (res.req.user.role != roles["super_admin"]) {
                return res.status(200).json({
                  main: "You don't have rights to update",
                  devMsg: "User is niether super admin nor the challenge creator",
                });
              }
            }

            //Storing updated challenge into db
            mysqlConnection.query(
              `UPDATE challenge SET ? WHERE challenge_id = ?`,
              [updatedChallenge, challengeId],
              (sqlErr, result, fields) => {
                if (sqlErr) {
                  console.log(sqlErr);
                  return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while updating challenge in db",
                  });
                } else {
                  res
                    .status(200)
                    .json({ main: "Challenge updated Successfully." });
                }
              }
            );
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while updating challenge",
      });
    }
  }
);

//fetches all challenges(paginated) created by a particular user
router.get("/user/:userId/:pageNum/:limit", passport.authenticate("jwt", { session: false }), (req, res) => {
  try {

    let { limit, pageNum, offset } = generatePaginationValues(req);
    let { userId } = req.params;

    if (!userId || isNaN(userId)) return res.status(400).json({ main: "Invalid request", devMsg: `UserId is invalid: ${userId}` });

    mysqlConnection.query(`SELECT * from challenge WHERE user_id = ${userId} LIMIT ? OFFSET ?`, [limit, offset], (sqlErr, result, fields) => {

      if (sqlErr) {
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: sqlErr,
          devMsg: "Error occured while fetching challenges created by a particular user from db",
        });

      } else if (!result.length) {
        return res.status(200).json({ challenges_count: result.length, main: "No challenges found." });

      } else {
        let data = {
          challenges_count: result.length,
          page_number: pageNum,
          challenge_list: result,
        };

        res.status(200).json(data);
      }
    });

  } catch (error) {
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while getting user's created challenges",
    });
  }
});

router.get(
  "/single/:challengeId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      let { challengeId } = req.params;

      if (!challengeId)
        return res
          .status(400)
          .json({ main: "Invalid Request", devMsg: "No challenge id found" });

      //query to find if the challenge exists
      mysqlConnection.query(
        `SELECT c.*,a.account_type_id as accountTypeId, a.account_name as accountName
         from challenge c 
         INNER JOIN user u ON c.user_id = u.user_id 
         INNER JOIN account_type a ON a.account_type_id = u.account_type_id 
         where c.challenge_id = ${challengeId}`,
         
        (sqlErr, result, fields) => {

          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching challenge from db",
            });

          } else if (!result.length) {
            //if no challenge found with the given challengeID

            return res.status(200).json({
              main: "Challenge you were looking for doesn't exist.",
              devError: "Challenge not found in database",
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
        devMsg: "Error occured while fetching challenge",
      });
    }
  }
);


//returns multiple challenges(paginated) with sorting

router.get(
  "/multiple/:pageNum/:limit/:columnName/:order",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {

      //columnName => on which table's column the sorting is to be performed  | order => 1 or -1, where 1 means ascending
      let { columnName, order } = req.params;
      let { limit, pageNum, offset } = generatePaginationValues(req);

      const sortingOrder = {
        "1": "ASC",
        "-1": "DESC",
      };

      const sortingQueries = (columnName, order) => {
        const queries = {
          postedOn: `SELECT * FROM challenge ORDER BY posted_on ${sortingOrder[order]} LIMIT ? OFFSET ?`,
          endDate: `SELECT * FROM challenge ORDER BY end_date ${sortingOrder[order]} LIMIT ? OFFSET ?`,
          status: `SELECT * FROM challenge WHERE NOW() < end_date LIMIT ? OFFSET ?`
        };

        return queries[columnName];
      };

      //checks if either columnName or order have invalid values. replaces them with default values which will return a list in descending order of creation date
      if (!sortingQueries(columnName, order) || (order !== "-1" && order !== "1")) {
        columnName = "postedOn";
        order = "-1";
      }

      mysqlConnection.query(

        sortingQueries(columnName, order),

        [limit, offset],
        (sqlErr, result, fields) => {

          if (sqlErr) {
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching challenges from db",
            });

          } else if (!result.length) {
            return res.status(200).json({ challenges_count: result.length, main: "No challenges found." });

          } else {
            let data = {
              challenges_count: result.length,
              page_number: pageNum,
              challenge_list: result,
            };

            res.status(200).json(data);
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while fetching challenges",
      });
    }
  }
);

router.get(
  "/challenges-using-tags/:tagsArray/:pageNum/:limit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      let { tagsArray } = req.params;

      tagsArray = JSON.parse(tagsArray);
      let tagString = tagsArray.join("|");

      let { limit, pageNum, offset } = generatePaginationValues(req);

      if (!tagsArray)
        return res
          .status(400)
          .json({ main: "Invalid Request", devMsg: "No tag found in request" });

      mysqlConnection.query(
        `SELECT * from challenge where tags REGEXP "${tagString}" LIMIT ? OFFSET ?`,   //e.g. tagString = tagExample|anothertag|great
        [limit, offset],
        (sqlErr, result, fields) => {

          if (sqlErr) {

            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching challenge from db",
            });

          } else if (!result.length) {
            return res.status(200).json({ challenges_count: result.length, main: "No challenges found." });

          } else {
            let data = {
              challenges_count: result.length,
              challenge_list: result,
            };
            return res.status(200).json(data);
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while fetching challenges using tags",
      });
    }
  }
);

router.delete(
  "/delete/:challengeId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const { challengeId } = req.params;

      if (!challengeId)
        return res
          .status(400)
          .json({ main: "Invalid Request", devMsg: "No challenge id found" });

      //query to find if the challenge exists
      mysqlConnection.query(
        `SELECT * from challenge where challenge_id = ${challengeId}`,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching challenge from db",
            });
          } else if (!result.length) {
            //if no challenge found
            return res.status(200).json({ main: "Invalid Challenge ID." });
          } else if (res.req.user.user_id !== result[0].user_id && res.req.user.role != roles["super_admin"]) {
            //if user requesting the deletion if not the creator
            res
              .status(401)
              .json({
                main: "You are not allowed to perform this operation.",
                devMsg:
                  "Request Unauthorised. Mismatch of user ID and challenge creator ID",
              });
          } else {
            mysqlConnection.query(
              `DELETE from challenge WHERE challenge_id = ${challengeId}`,
              (sqlErr, result, fields) => {
                if (sqlErr) {
                  console.log(sqlErr);
                  return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while deleting challenge from db",
                  });
                } else {
                  res
                    .status(200)
                    .json({ main: "Challenge deleted successfully." });
                }
              }
            );
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        main: "Something went wrong. Please try again.  ",
        devError: error,
        devMsg: "Error occured while deleting challenge.",
      });
    }
  }
);

module.exports = router;
