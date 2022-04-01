const router = require("express").Router();
const express = require("express");
const mysqlConnection = require("../config/dbConnection");
const createSolutionValidation = require("../utils/validation/solution");
const { generateCurrentDateTime } = require("../utils/utils");
const passport = require("passport");

router.get("/", (req, res) => {
  res.status(200).send("Idea");
});

router.post(
  "/create-idea",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      console.log(req.body);

      const { errors, isValid } = createSolutionValidation(req);

      if (!isValid) return res.status(400).json(errors);

      const {
        challengeId,
        userId,
        ideaTitle,
        ideaDescription,
        supportingMedia,
      } = req.body;

      const postedOn = generateCurrentDateTime();

      const newIdea = {
        challenge_id: challengeId,
        user_id: userId,
        title: ideaTitle,
        description: ideaDescription,
        posted_on: postedOn,
      };

      mysqlConnection.query(
        `INSERT INTO idea SET ?`,
        newIdea,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            return mysqlConnection.rollback(function () {
              throw sqlErr;
            });
          }

          return res
            .status(201)
            .json({ devMsg: "New idea created successfully" });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        main: "Something went wrong",
        devError: error,
        devMsg: "Error occured while creating challenge",
      });
    }
  }
);

router.get(
  "/get-single-idea/:ideaId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      let { ideaId } = req.params;
      if (!ideaId)
        return res.status(400).json({
          main: "Invalid Request",
          devMsg: "No Idea id found",
        });

      //query to find single idea
      //Selects all the fields from the idea
      //checks for the common records in idea(Table) with challenge_id & idea_id
      mysqlConnection.query(
        `SELECT * FROM idea WHERE idea_id="${ideaId}"`,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong",
              devError: sqlErr,
              devMsg: "Error occured while fetching idea from db",
            });
          } else if (!result[0]) {
            console.log("No idea found");
            return res.status(200).json({
              main: "Idea you were looking for doesn't exist.",
              devError: "Idea not found in database",
            });
          } else {
            let idea = result[0];
            console.log("Idea fetched", result);
            return res.status(200).json(idea);
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        main: "Something went wrong",
        devError: error,
        devMsg: "Error occured while fetching challenge",
      });
    }
  }
);

router.get(
  "/get-ideas/:challengeId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      let { challengeId } = req.params;

      if (!challengeId)
        return res.status(400).json({
          main: "Invalid Request",
          devMsg: "No challenge id found",
        });

      //Selects all fields from the challenges
      mysqlConnection.query(
        `SELECT * FROM idea WHERE challenge_id=${challengeId}`,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong",
              devError: sqlErr,
              devMsg: "Error occured while fetching idea from db",
            });
          } else if (!result.length) {
            return res.status(200).json({ main: "No ideas found" });
          } else {
            let ideas = result;
            return res.status(200).json(ideas);
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        main: "Something went wrong",
        devError: error,
        devMsg: "Error occured while fetching ideas",
      });
    }
  }
);

router.get(
  "/get-ideas/:challengeId/:pageNum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const { challengeId, pageNum } = req.params; //current page number

      const limit = 5; //number of items to be sent per request

      const offset = (pageNum - 1) * limit; //number of rows to skip before selecting records

      mysqlConnection.query(
        `SELECT * from idea WHERE challenge_id=${challengeId} LIMIT ? OFFSET ? `,
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
            return res.status(200).json({ main: "No ideas found." });
          } else {
            let data = {
              ideas_count: result.length,
              page_number: pageNum,
              idea_list: result,
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
        devMsg: "Error occured while fetching ideas",
      });
    }
  }
);

router.get(
  "/get-solvers/:accountId",
  passport.authenticate("jwt", { sessoin: false }),
  (req, res) => {
    try {
      let { accountId } = req.params;
      if (!accountId)
        return res.status(400).json({
          main: "Invalid Request",
          devMsg: "There is no account type for given ID",
        });

      mysqlConnection.query(
        `SELECT u.email from user u, account_type a, idea i 
        WHERE u.account_type_id = a.account_type_id
        AND u.user_id = i.idea_id 
        GROUP BY u.user_id`,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching solvers from db",
            });
          } else if (!result.length) {
            return res.status(200).json({ main: "No solvers found." });
          } else {
            console.log(result)
            let solvers = result;
            return res.status(200).json(solvers);
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while fetching solvers using accountId",
      });
    }
  }
);


module.exports = router;
