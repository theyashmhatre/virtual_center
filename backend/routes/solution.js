const router = require("express").Router();
const mysqlConnection = require("../config/dbConnection");
const createSolutionValidation = require("../utils/validation/solution");
const { generatePaginationValues } = require("../utils/utils");
const passport = require("passport");

router.get("/", (req, res) => {
  res.status(200).send("Solution");
});

router.post(
  "/create-solution",
    passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {

      console.log(req.body)
      const { errors, isValid } = createSolutionValidation(req, res);

      if (!isValid) return res.status(400).json(errors);

      const {
        challengeId,
        solutionTitle,
        solutionDescription,
        supportingMedia,
        teamMembers,
        attachment
      } = req.body;

      console.log(res.req.user)

      const newIdea = {
        challenge_id: challengeId,
        user_id: res.req.user.user_id,
        title: solutionTitle,
        description: solutionDescription,
        attachment:attachment
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

        mysqlConnection.query(`INSERT INTO user_team (username, solution_id) VALUES ?`,[teamMembers.map(item => [item, result.insertId])],
        (sqlErr, result, fields) => {
          if (sqlErr) {
            return mysqlConnection.rollback(function () {
              throw sqlErr;
            });
          }
        });
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
  "/get-solutions/:challengeId/:pageNum/:limit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const { challengeId } = req.params; //current page number

      let { limit, pageNum, offset } = generatePaginationValues(req);

      if(!challengeId)
      return res
      .status(400)
      .json({ main: "Something went wrong. Please try again", devMsg: "No challenge id found" });

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

router.post("/like/:solutionId",
 passport.authenticate("jwt", {session:false}),
  (req,res) =>{
    try{
      const { solutionId } = req.params;
      const userId = res.req.user.user_id;

      if (!solutionId || !userId || solutionId == null || userId == null) 
      return res.status(400).json({ 
        main: "Something went wrong. Please try again", 
        devMsg: `Either solutionId or userId is invalid. 
        solutionId: ${solutionId} userId: ${userId}` })

      const newLike = {
        post_id: solutionId,
        user_id: userId,
        type_id: 2
      };

      mysqlConnection.query(`SELECT * FROM likes WHERE user_id=${userId} AND post_id=${solutionId} AND type_id = 2`,
      (sqlErr, result, fields) => {
        if (sqlErr) {
          return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while inserting like into db",
          });
      } else if(!result[0]){
        mysqlConnection.query(`INSERT INTO likes SET ?`,
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
        })
      } else {
        // var likes = result[0].likes ^ 1; 
        mysqlConnection.query(`DELETE FROM likes WHERE user_id=${userId} AND post_id=${solutionId} AND type_id = 2`,
        (sqlErr, result, fields) => {
          if(sqlErr) {
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while updating like to db",
          });
          } else {
            return res.status(201).json({ main: "Solution unliked successfully" });
          }
        });
      }
      })
    }catch(error){
      return res.status(500).json({
        main:"Something went wrong. Please try again.",
        devError:error,
        devMsg:"Error occured while adding like"
      });
    }
});

router.get("/get-likes/:solutionId",
passport.authenticate("jwt", { session: false }), 
(req, res) => {
  try{

    const { solutionId } = req.params;
    const userId = res.req.user.user_id;

    if (!solutionId || !userId || solutionId == null || userId == null)
            return res.status(400).json({ main: "Something went wrong. Please try again",
             devMsg: `Either solutionId or userId is invalid. SolutionId: ${solutionId} userId: ${userId}` })

    let noOfLikes = 0;
    mysqlConnection.query(`SELECT COUNT(*) as likesCount from likes where post_id = ${solutionId} AND type_id = 2`,
    (sqlErr, result, fields) => {
      if (sqlErr) {
        return res.status(500).json({
           main: "Something went wrong. Please try again.",
           devError: sqlErr,
           devMsg: "Error occured while checking if user has liked the post",
    });
  } else {
    noOfLikes = (!result[0]) ? 0 : (result[0].likesCount)
  }
    })

    mysqlConnection.query(`SELECT COUNT(*) as likesCount from likes where post_id = ${solutionId} AND user_id = ${userId} AND type_id = 2`,
     (sqlErr, result, fields) => {
      if (sqlErr) {
          return res.status(500).json({
             main: "Something went wrong. Please try again.",
             devError: sqlErr,
             devMsg: "Error occured while checking if user has liked the post",
      });
      } else {
      const { likesCount } = result[0];
      console.log(result)
      const isLiked = likesCount > 0 ? true : false;
      return res.status(201).json({ isLiked: isLiked, noOfLikes: noOfLikes });
     }
  });  
  } catch(err){
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while executing check like api",
  });
  }
})

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
        post_id: solutionId,
        type_id: 2,
        comment_text: commentText
      };
     
      mysqlConnection.query(`INSERT INTO comment SET ?`, 
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
      });
  }catch(error){
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while adding comment to db",
  });
  }
});

router.get(
  "/get-comments/:solutionId/:pageNum/:limit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const { solutionId } = req.params; //current page number

      let { limit, pageNum, offset } = generatePaginationValues(req);

      if(!solutionId)
      return res
      .status(400)
      .json({ main: "Something went wrong. Please try again", devMsg: "No solution id found" });
      

      mysqlConnection.query(
        `SELECT c.*, u.employee_name, u.email, u.display_picture
         FROM comment c
         INNER JOIN user u
         ON c.user_id = u.user_id
         WHERE c.post_id = ${solutionId} AND type_id = 2
         ORDER BY c.posted_on DESC
         LIMIT ? OFFSET ?
         `,
        [limit, offset],
        (sqlErr, result, fields) => {
          if (sqlErr) {
            console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching solution comments from db",
            });
          } else if (!result.length) {
            return res.status(200).json({ main: "No solution comments found." });
          } else {
            let data = {
              comments_count: result.length,
              page_number: pageNum,
              comments_list: result,
            };
            return res.status(200).json(data);
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while fetching solution comments",
      });
    }
  }
);



router.post("/upvote/:commentId",
passport.authenticate("jwt", { session: false }), 
(req, res) => {
  try{
    const { commentId } = req.params;
    const userId = res.req.user.user_id;

    if (!commentId || !userId || commentId == null || userId == null)
            return res.status(400).json({ main: "Something went wrong. Please try again",
             devMsg: `Either commentId or userId is invalid. CommentId: ${commentId} userId: ${userId}` })

    const newUpvote = {
      user_id: userId,
      comment_id: commentId,
      upvotes:1
    }

    mysqlConnection.query(`SELECT * FROM upvote WHERE user_id=${userId} AND comment_id=${commentId}`,
    (sqlErr, result, fields) => {
      if(sqlErr) {
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: sqlErr,
          devMsg: "Error occured while adding upvotes to db",
      });
      } else if(!result[0]) {
        mysqlConnection.query(`INSERT INTO upvote SET ?`,
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
        mysqlConnection.query(`UPDATE upvote SET upvotes=1 WHERE user_id=${userId} AND solution_comment_id=${commentId}`,
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

router.post("/downvote/:commentId",
passport.authenticate("jwt", { session: false }), 
(req, res) => {
  try{

    const { commentId } = req.params;
    const userId = res.req.user.user_id;

    if (!commentId || !userId || commentId == null || userId == null)
            return res.status(400).json({ main: "Something went wrong. Please try again",
             devMsg: `Either commentId or userId is invalid. CommentId: ${commentId} userId: ${userId}` })

    const newDownvote = {
      user_id: userId,
      comment_id: commentId,
      upvotes:-1
    }

    mysqlConnection.query(`SELECT * FROM upvote WHERE user_id="${userId}" AND comment_id="${commentId}"`,
    (sqlErr, result, fields) => {
      if(sqlErr) {
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: sqlErr,
          devMsg: "Error occured while adding downvotes to db",
      });
      } else if(!result[0]) {
        mysqlConnection.query(`INSERT INTO upvote SET ?`,
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
        mysqlConnection.query(`UPDATE upvote SET upvotes=-1 WHERE user_id="${userId}" AND comment_id="${commentId}"`,
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


router.get("/get-upvotes/:commentId",
 passport.authenticate("jwt", { sessoin: false }),
 (req,res) => {
   const { commentId } = req.params;
   const userId = res.req.user.user_id;

   if (!commentId || !userId || commentId == null || userId == null)
   return res.status(400).json({ main: "Something went wrong. Please try again",
    devMsg: `Either commentId or userId is invalid. CommentId: ${commentId} userId: ${userId}` })

   try{

      let voteStatus = ""; // Gives the status of the vote for respective user and comment 

      mysqlConnection.query(`SELECT upvotes from upvote WHERE user_id=${userId} AND comment_id=${commentId}`,
      (sqlErr, result, fields) => {
        if(sqlErr){
          return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: sqlErr,
            devMsg: "Error occured while fetching upvotes from db",
        });
        } else {
          voteStatus = (!result[0]) ? "None" : (result[0].upvotes === 1 ? "UpVote" : "DownVote")
        }
      })

      mysqlConnection.query(`SELECT comment_id, sum(upvotes) as votes FROM upvote WHERE comment_id=${commentId}`,
      (sqlErr, result, fields) => {
        if(sqlErr){
          return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: sqlErr,
            devMsg: "Error occured while fetching upvotes from db",
        });
        } else if (!result[0].votes){
          return res.status(200).json({
            main:"No upvotes found",
            devMsg:"No upvotes found with the commentId from db"
          })
        } else {
          result[0].voteStatus = voteStatus;
          return res.status(200).json({result});
        }
      })

   } catch(err){
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: err,
      devMsg: "Error occured while fetching upvotes from db",
  });
   }
 });

router.get("/get-comments/:solutionId",
  passport.authenticate("jwt", { sessoin: false }),
  (req,res) => {
    const { solutionId } = req.params;

    if (!solutionId || solutionId == null )
            return res.status(400).json({ main: "Something went wrong. Please try again",
             devMsg: `SolutionId is invalid. solutionId: ${solutionId}` })
    
    try{
      mysqlConnection.query(
        `SELECT * FROM comment WHERE post_id=${solutionId} AND type_id = 2 ORDER BY posted_on DESC`,
        (sqlErr, result, fields) => {
          if(sqlErr){
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching upvotes from db",
            });
          } else if(!result[0]){
            return res.status(200).json({main:"No comments found"})
          } else{
            return res.status(200).json({
              count: result.length,
              comments: result
            });
        }
      });
    } catch(err){
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while fetching upvotes from db",
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
        `SELECT u.* from user u, solution s
        WHERE u.account_type_id = ${accountId}
        AND u.user_id = s.user_id
        GROUP BY u.user_id;`,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching solvers from db",
            });
          } else if (!result.length) {
            return res.status(200).json({
              solvers_count: 0,
              main: "No solvers found."
            });
          } else {
            console.log(result)
            let solvers = result;
            return res.status(200).json({
              solvers_count: result.length,
              solvers: solvers,
            });
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
