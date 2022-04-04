const router = require("express").Router();
const express = require("express");
const mysqlConnection = require("../config/dbConnection");
const { route } = require("./user");
const {
  createChallengeValidation,
  editChallengeValidation,
} = require("../utils/validation/challenge");
const upload = require("../config/multerConfig");
const passport = require("passport");
const { off } = require("../config/dbConnection");

router.get("/", (req, res) => {
  res.status(200).send("Challenge");
});

router.post(
  "/create",
  [
    passport.authenticate("jwt", { session: false }),
    upload.single("coverImage"),
  ],
  (req, res) => {
    try {
      const { errors, isValid } = createChallengeValidation(req, res);

      if (!isValid) return res.status(400).json(errors);

      let {
        challengeTitle,
        challengeDescription,
        endDate,
        tags,
        supportingMedia,
        reward,
      } = req.body;

      const newChallenge = {
        title: challengeTitle,
        description: challengeDescription,
        user_id: res.req.user.user_id,
        cover_image: req.file.filename,
        end_date: endDate,
        status: true,
      };

      tags = tags.split(",").map(function (tag) {
        return [tag.trim()];
      });

      //MySQL transaction begins
      mysqlConnection.beginTransaction(function (err) {
        if (err) {
          return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: sqlErr,
            devMsg: "Error occured while adding challenge into db",
          });
        }

        //Inserting all tags into 'tag' table. Ignore a tag if already inserted. 'name' in Tag table should be set to unique.
        mysqlConnection.query(`INSERT IGNORE INTO tag (name) VALUES ?`, [tags], (sqlErr, result, fields) => {
          if (sqlErr) {
            return mysqlConnection.rollback(function () {
              throw sqlErr;
            });
          }

          //Creating a new challenge
          mysqlConnection.query(
            `INSERT INTO challenge SET ?`,
            newChallenge,
            (sqlErr, result, fields) => {
              if (sqlErr) {
                return mysqlConnection.rollback(function () {
                  throw sqlErr;
                });
              }

              newChallengeId = result.insertId;

              //Individually inserting challenge_id and tag_id of each of the tags associated with the challenge inside a 'tag_map' table
              mysqlConnection.query(
                `INSERT INTO tag_map (challenge_id, tag_id) SELECT ${newChallengeId}, t.tag_id from tag t WHERE t.name IN ?`,
                [[tags]],
                (sqlErr, result, fields) => {
                  if (sqlErr) {
                    return mysqlConnection.rollback(function () {
                      throw sqlErr;
                    });
                  }

                  //Commit transaction
                  //All the changes by the previous queries will be accepted into the database only if this function executes else everything returns back to original state
                  mysqlConnection.commit(function (error) {
                    if (error) {
                      return mysqlConnection.rollback(function () {
                        throw error;
                      });
                    }

                    return res
                      .status(201)
                      .json({ devMsg: "New challenge created successfully" });
                  });
                });
            });
        });
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
        userId,
        endDate,
        supportingMedia,
        reward,
        status,
      } = req.body;

      const updatedChallenge = {
        title: challengeTitle,
        description: challengeDescription,
        user_id: userId,
        end_date: endDate,
        status: status,
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
            //if no challenge found with the given challengeID

            console.log("No challenge found");
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

router.get(
  "/multiple/:pageNum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const { pageNum } = req.params; //current page number

      const limit = 9; //number of items to be sent per request

      const offset = (pageNum - 1) * limit; //number of rows to skip before selecting records

      mysqlConnection.query(
        `SELECT * from challenge LIMIT ? OFFSET ?`,
        [limit, offset],
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
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
  "/challenges-using-tags/:tagsArray",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      let { tagsArray } = req.params;

      tagsArray = JSON.parse(tagsArray);

      if (!tagsArray)
        return res
          .status(400)
          .json({ main: "Invalid Request", devMsg: "No tag found in request" });

      //Selects all fields from challenges
      //checks for intersecting records in tag_map & tag table, tag_map & challenge table
      //works as an Union (OR) query for multiple tags
      mysqlConnection.query(
        `SELECT c.* from tag_map tm, challenge c, tag t 
            WHERE tm.tag_id = t.tag_id 
            AND (t.name IN ?) 
            AND c.challenge_id = tm.challenge_id 
            GROUP BY c.challenge_id`,

        [[tagsArray]],
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
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
              page_number: pageNum,
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

router.get(
  "/search/:queryString/:pageNum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const { queryString, pageNum } = req.params;

      const limit = 6; //number of items to be sent per request

      const offset = (pageNum - 1) * limit; //number of rows to skip before selecting records

      if (!queryString)
        return res
          .status(400)
          .json({
            main: "Invalid Request",
            devMsg: "No query string id found",
          });
      if (!pageNum)
        return res
          .status(400)
          .json({
            main: "Invalid Request",
            devMsg: "No page number found in the request",
          });

      //query to search for challenges using a query string
      //checks if the queried string in present in either title or description of any of the challenges and returns a list of challenge objects as challege_list
      mysqlConnection.query(
        `SELECT * from challenge where description LIKE "%${queryString}%" OR title LIKE "%${queryString}%" LIMIT ? OFFSET ?`,
        [limit, offset],
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg:
                "Error occured while searching challenges using a query string",
            });
          } else if (!result.length) {
            return res.status(200).json({ challenges_count: result.length, main: "No challenges found" });
          } else {
            let data = {
              challenges_count: result.length,
              challenge_list: result,
            };

            res.status(200).json(data);
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while searching for challenges",
      });
    }
  }
);

router.get(
  "/search/all/:queryString/:pageNum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const { queryString, pageNum } = req.params;

      const limit = 100; //number of items to be sent per request

      const offset = (pageNum - 1) * limit; //number of rows to skip before selecting records

      if (!queryString)
        return res
          .status(400)
          .json({
            main: "Invalid Request",
            devMsg: "No query string id found",
          });
      if (!pageNum)
        return res
          .status(400)
          .json({
            main: "Invalid Request",
            devMsg: "No page number found in the request",
          });

      //this query performs a search operation across multiple table i.e. challenges, offerings, ideas
      // returns a union of all the results
      //for each table, it checks if the queried string is present in either title or description of the respective entity
      mysqlConnection.query(
        `
            SELECT s.* from (
                SELECT "challenge" as type, c.challenge_id as id, c.title as title, c.description as description from challenge c WHERE c.description LIKE "%${queryString}%" OR c.title LIKE "%${queryString}%" 
                UNION ALL 
                SELECT "offering" as type, o.offering_id as id, o.title as title, o.description as desciption from offering o WHERE o.description LIKE "%${queryString}%" OR o.title LIKE "%${queryString}%"
            ) as s
            ORDER BY s.type
            LIMIT ? OFFSET ?`,
        [limit, offset],

        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg:
                "Error occured while searching challenges using a query string",
            });
          } else if (!result.length) {
            return res.status(200).json({ result_count: result.length, main: "No challenges found" });
          } else {
            let data = {
              result_count: result.length,
              result_list: result,
            };

            return res.status(200).json(data);
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while searching",
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
          } else if (res.req.user.username !== result[0].username) {
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
