const router = require("express").Router();
const mysqlConnection = require("../config/dbConnection");
const { createSolutionValidation, editSolutionValidation, messageValidation } = require("../utils/validation/solution");
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

      const { errors, isValid } = createSolutionValidation(req, res);

      if (!isValid) return res.status(400).json(errors);

      let {
        challengeId,
        solutionTitle,
        solutionDescription,
        supportingMedia,
        teamMembers,
        attachment
      } = req.body;

      // console.log(res.req.user);

      teamMembers = [...teamMembers, parseInt(res.req.user.username)];

      //Handling UnRegistered Members
      mysqlConnection.query(
        `SELECT username FROM user`,
        (sqlErr, result, fields) => {
          if(sqlErr){
            return res.status(500).json({
              main: "Something went wrong",
              devError: sqlErr,
              devMsg: "Error occured while fetching users from db",
            });
          } else if(result.length > 0){
            let users = result.map(item => parseInt(item.username))
            // console.log(users)
            let unRegisteredMembers = teamMembers.filter(item => users.indexOf(parseInt(item)) === -1);
            if(unRegisteredMembers.length > 0){
              res.status(400).json({
                main: "These Members are not registered",
                devMsg: unRegisteredMembers
              });
            } else {
              //If All the team members are valid then create a solution
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
            }
          } else {
            res.status(500).json({
              main: "Something went wrong"
            });
          }
        });
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

router.post(
  "/edit/:solutionId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try{
      let { solutionId } = req.params;

      if(!solutionId)
        return res.status(400).json({
          main: "Invalid Request",
          devMsg: "No Solution id found",
        });

      const { errors, isValid } = editSolutionValidation(req, res);

      if (!isValid) return res.status(400).json(errors);
  

      let {
        solutionTitle,
        solutionDescription,
        attachment
      } = req.body;
      
      const updatedSolution = {
        title: solutionTitle,
        description: solutionDescription,
        attachment: attachment
      }

      mysqlConnection.query(
        `SELECT * FROM solution WHERE solution_id = ${solutionId}`,
        (sqlErr, result, fields) => {
          if (sqlErr) {
            return res.status(500).json({
              main: "Something went wrong. Please try again.",
              devError: sqlErr,
              devMsg: "Error occured while fetching solution from db",
            });
        } else if(!result.length){
           //if no solution found
           return res.status(400).json({
            main: "No such solution exists",
            devMsg: "Solution ID is invalid",
          });
        } else {

          let username = parseInt(res.req.user.username);

          mysqlConnection.query(
            `SELECT username FROM user_team WHERE solution_id = ${solutionId}`,
            (sqlErr, result, fields) => {
              if (sqlErr) {
                return res.status(500).json({
                  main: "Something went wrong. Please try again.",
                  devError: sqlErr,
                  devMsg: "Error occured while fetching solution team members from db",
                });
            } else if(!result.length){
                //if no team members found
            return res.status(400).json({
              main: "No such team members exists",
              devMsg: "Team Members not found in db",
            });
            } else{
              console.log(result);
              let teamMembers = result.map(item => parseInt(item.username));
              // if user is not a team member
              if(teamMembers.indexOf(username) == -1){
                  return res.status(400).json({
                    main: "You don't have rights to update",
                    devMsg: "User is niether co-owner nor the team member",
                  })
              } else{

                //Storing updated solution into db
                mysqlConnection.query(
                `UPDATE solution SET ?  WHERE solution_id = ?`,
                [updatedSolution, solutionId],
                (sqlErr, result, fields) => {
                  if (sqlErr) {
                    console.log(sqlErr);
                    return res.status(500).json({
                      main: "Something went wrong. Please try again.",
                      devError: sqlErr,
                      devMsg: "Error occured while updating solution in db",
                    });
                  } else {
                    res
                      .status(200)
                      .json({ main: "Solution updated Successfully." });
                  }
                })
              }
            }
            })
        }
        })
    } catch(error){
      console.log(error);
      return res.status(500).json({
        main: "Something went wrong",
        devError: error,
        devMsg: "Error occured while editing solution",
      });
    }
  }
)

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
        `SELECT u.employee_name, u.email, u.display_picture, s.* 
        FROM solution s
        INNER JOIN user u
        ON u.user_id = s.user_id
        WHERE s.solution_id = "${solutionId}"
        `,
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

router.get("/get-team-members/:solutionId", passport.authenticate("jwt", { session: false }), (req,res) => {
  try{

    let { solutionId } = req.params;

    if(!solutionId)
    return res.status(400).json({
      main: "Invalid Request",
      devMsg: "No solution id found",
    });

    mysqlConnection.query(`SELECT u.employee_name, u.email, u.display_picture, ut.* 
    FROM user_team ut
    INNER JOIN user u
    ON ut.username = u.username AND ut.solution_id = ${solutionId}`,
    (sqlErr, result, fields) => {
      if(sqlErr){
        console.log(sqlErr);
            return res.status(500).json({
              main: "Something went wrong",
              devError: sqlErr,
              devMsg: "Error occured while fetching solution from db",
            });
      } else if(!result[0]){
        return res.status(200).json({main: "No team members exists for this solution",
        devError: "Team Members not found in database",})
      } else{
        return res.status(200).json({
          teamSize: result.length,
          teamMembers: result
        })
      }
    })

  } catch(error){
    console.log(error);
    return res.status(500).json({
      main: "Something went wrong",
      devError: error,
      devMsg: "Error occured while fetching team members",
    });
  }
})

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
        `SELECT u.employee_name, u.email, u.display_picture, s.* 
        FROM user u
        INNER JOIN user_team ut
        ON u.username = ut.username
        INNER JOIN solution s
        ON s.challenge_id = ${challengeId}`,
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
        `SELECT u.employee_name, u.email, u.display_picture, u.employee_name, s.* 
        FROM user u
        INNER JOIN solution s
        ON u.user_id = s.user_id
        WHERE s.challenge_id = ${challengeId} LIMIT ? OFFSET ?`,
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



router.get(
  "/get-solvers/:accountId",
  passport.authenticate("jwt", { session: false }),
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
