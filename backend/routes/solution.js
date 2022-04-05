const router = require("express").Router();
const express = require("express");
const mysqlConnection = require("../config/dbConnection");
const createSolutionValidation = require("../utils/validation/solution");
const { generateCurrentDateTime } = require("../utils/utils");
const passport = require("passport");
const { fields } = require("../config/multerConfig");

router.get("/", (req, res) => {
  res.status(200).send("Solution");
});

router.post(
  "/create-solution",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      console.log(req.body);

      const { errors, isValid } = createSolutionValidation(req, res);

      if (!isValid) return res.status(400).json(errors);

      const {
        challengeId,
        solutionTitle,
        solutionDescription,
        supportingMedia,
      } = req.body;

      console.log(res.req.user)
      const postedOn = generateCurrentDateTime();

      const newIdea = {
        challenge_id: challengeId,
        user_id: res.req.user.user_id,
        title: solutionTitle,
        description: solutionDescription,
        posted_on: postedOn,
      };

      mysqlConnection.query(
        `INSERT INTO solution SET ?`,
        newIdea,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            return mysqlConnection.rollback(function () {
              throw sqlErr;
            });
          }

          return res
            .status(201)
            .json({ devMsg: "New solution created successfully" });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        main: "Something went wrong",
        devError: error,
        devMsg: "Error occured while creating solution",
      });
    }
  }
);

router.get(
  "/get-single-solution/:solutionId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      let { solutionId } = req.params;
      if (!solutionId)
        return res.status(400).json({
          main: "Invalid Request",
          devMsg: "No Solution id found",
        });

      //query to find single solution
      //Selects all the fields from the solution
      //checks for the common records in solution(Table) with challenge_id & solution_id
      mysqlConnection.query(
        `SELECT * FROM solution WHERE solution_id="${solutionId}"`,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong",
              devError: sqlErr,
              devMsg: "Error occured while fetching solution from db",
            });
          } else if (!result[0]) {
            console.log("No solution found");
            return res.status(200).json({
              main: "Solution you were looking for doesn't exist.",
              devError: "Solution not found in database",
            });
          } else {
            let solution = result[0];
            console.log("Solution fetched", result);
            return res.status(200).json(solution);
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        main: "Something went wrong",
        devError: error,
        devMsg: "Error occured while fetching solution",
      });
    }
  }
);

router.get(
  "/get-solutions/:challengeId",
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
        `SELECT * FROM solution WHERE challenge_id=${challengeId}`,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong",
              devError: sqlErr,
              devMsg: "Error occured while fetching solution from db",
            });
          } else if (!result.length) {
            return res.status(200).json({ main: "No solutions found" });
          } else {
            let solutions = result;
            return res.status(200).json(solutions);
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        main: "Something went wrong",
        devError: error,
        devMsg: "Error occured while fetching solutions",
      });
    }
  }
);

router.get(
  "/get-solutions/:challengeId/:pageNum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const { challengeId, pageNum } = req.params; //current page number

      const limit = 5; //number of items to be sent per request

      const offset = (pageNum - 1) * limit; //number of rows to skip before selecting records

      mysqlConnection.query(
        `SELECT * from solution WHERE challenge_id=${challengeId} LIMIT ? OFFSET ? `,
        [limit, offset],
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching solutions from db",
            });
          } else if (!result.length) {
            return res.status(200).json({ main: "No solutions found." });
          } else {
            let data = {
              solutions_count: result.length,
              page_number: pageNum,
              solution_list: result,
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
        devMsg: "Error occured while fetching solutions",
      });
    }
  }
);

router.post("/:solutionId/like",
 passport.authenticate("jwt", {session:false}),
  (req,res) =>{
    try{
      const { solutionId } = req.params;
      const userId = res.req.user.user_id;

      if (!solutionId || !userId || solutionId == null || userId == null) 
      return res.status(400).json({ 
        main: "Something went wrong. Please try again", 
        devMsg: `Either offeringId or userId is invalid. 
        OfferingId: ${offeringId} userId: ${userId}` })

      const newLike = {
        solution_id: solutionId,
        user_id: userId
      };

      mysqlConnection.query(`INSERT INTO solution_like SET ?`,
      newLike, 
      (sqlErr, result, fields) => {
        if (sqlErr) {
          return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while inserting like into db",
          });
      } else {
        res.status(200).json({main: "Solution Liked Successfully"});
        }
      });
    }catch(error){
      return res.status(500).json({
        main:"Something went wrong. Please try again.",
        devError:error,
        devMsg:"Error occured while adding like"
      });
    }
});

router.post("/:solutionId/comment", 
passport.authenticate("jwt", { session: false }), 
(req, res) => {
  try{
    const { solutionId } = req.params;
    const { commentText } = req.body;
    const userId = res.req.user.user_id;

    if (!solutionId || !userId || solutionId == null || userId == null || !commentText) 
    return res.status(400).json({ 
      main: "Something went wrong. Please try again", 
      devMsg: `Either solutionId, userId, commentText is invalid. 
      SolutionId: ${solutionId} userId: ${userId} commentText: ${commentText}` })

      const newComment = {
        user_id: userId,
        solution_id: solutionId,
        comment_text: commentText,
        posted_on: generateCurrentDateTime()
      };

      mysqlConnection.query(`INSERT INTO solution_comment SET ?`, 
      newComment,
      (sqlErr, result, fields) => {
        if(sqlErr) {
          return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: sqlErr,
            devMsg: "Error occured while adding comment to db",
        });
        } else {
          return res.status(201).json({ main: "Comment added successfully" });
        }
      })
  }catch(error){
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while adding comment to db",
  });
  }
});

router.post(":solutionId/update-comment", 
passport.authenticate("jwt", { session: false }), 
(req,res) => {
  try{

    const { solutionId } = req.params;
    const { commentText } = req.body;

    if (!solutionId || !userId || solutionId == null || userId == null || !commentText) 
    return res.status(400).json({ 
      main: "Something went wrong. Please try again", 
      devMsg: `Either solutionId, commentText is invalid. 
      SolutionId: ${solutionId} commentText: ${commentText}` })   
      
    mysqlConnection.query(`UPDATE solution_comment SET comment_text = "${commentText}" WHERE solution_id = "${solutionId}`, 
    (sqlErr, result, fields) => {
      if(sqlErr){
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: sqlErr,
          devMsg: "Error occured while adding comment to db",
      });
      } else {
        return res.status(201).json({ main: "Comment added successfully" });
      }
    })  
  } catch(error){

  }
})


router.post("/:solutionId/upvote",
passport.authenticate("jwt", { session: false }), 
(req, res) => {
  try{
    const { solutionId } = req.params;
    const userId = res.req.user.user_id;

    const newUpvote = {
      user_id: userId,
      solution_id: solutionId,
      upvotes:1
    }

    mysqlConnection.query(`SELECT * FROM solution_upvote WHERE user_id=${userId} AND solution_id=${solutionId}`,
    (sqlErr, result, fields) => {
      if(sqlErr) {
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: sqlErr,
          devMsg: "Error occured while adding upvotes to db",
      });
      } else if(!result[0]) {
        mysqlConnection.query(`INSERT INTO solution_upvote SET ?`,
        newUpvote,
        (sqlErr, result, fields) => {
          if(sqlErr) {
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while adding upvotes to db",
          });
          } else {
            return res.status(201).json({ main: "Upvoted successfully" });
          }
        });
      } else {
        mysqlConnection.query(`UPDATE solution_upvote SET upvotes=1 WHERE user_id=${userId} AND solution_id=${solutionId}`,
        (sqlErr, result, fields) => {
          if(sqlErr) {
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while adding upvotes to db",
          });
          } else {
            return res.status(201).json({ main: "Upvoted successfully" });
          }
        });
      }
    })
  } catch(error){
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while adding upvotes to db",
  });
  }
});

router.post("/:solutionId/downvote",
passport.authenticate("jwt", { session: false }), 
(req, res) => {
  try{
    const { solutionId } = req.params;
    const userId = res.req.user.user_id;

    const newDownvote = {
      user_id: userId,
      solution_id: solutionId,
      upvotes:-1
    }

    mysqlConnection.query(`SELECT * FROM solution_upvote WHERE user_id="${userId}" AND solution_id="${solutionId}"`,
    (sqlErr, result, fields) => {
      if(sqlErr) {
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: sqlErr,
          devMsg: "Error occured while adding downvotes to db",
      });
      } else if(!result[0]) {
        mysqlConnection.query(`INSERT INTO solution_upvote SET ?`,
        newDownvote,
        (sqlErr, result, fields) => {
          if(sqlErr) {
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while adding downvotes to db",
          });
          } else {
            return res.status(201).json({ main: "Downvoted successfully" });
          }
        });
      } else {
        mysqlConnection.query(`UPDATE solution_upvote SET upvotes=-1 WHERE user_id="${userId}" AND solution_id="${solutionId}"`,
        (sqlErr, result, fields) => {
          if(sqlErr) {
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while adding downvotes to db",
          });
          } else {
            return res.status(201).json({ main: "Downvoted successfully" });
          }
        });
      }
    })
  } catch(error){
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while adding Downvotes to db",
  });
  }
});

router.get("/upvotes",
 passport.authenticate("jwt", { sessoin: false }),
 (req,res) => {
   const { userId } = res.req.user.user_id;
   try{
      mysqlConnection.query(`SELECT * FROM solution_upvote WHERE user_id=${userId}`,
      (sqlErr, result, fields) => {
        if(sqlErr){
          return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: sqlErr,
            devMsg: "Error occured while fetching upvotes from db",
        });
        } else if (!result[0]){
          return res.status(200).json({
            main:"No upvotes found",
            devMsg:"No upvotes found with the userId from db"
          })
        }
      })

   } catch(err){
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while fetching upvotes from db",
  });
   }
 })


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
        AND u.user_id = i.user_id
        GROUP BY u.user_id;`,
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
