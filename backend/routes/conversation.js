const router = require("express").Router();
const mysqlConnection = require("../config/dbConnection");
const { messageValidation } = require("../utils/validation/solution");
const passport = require("passport");
const { reset } = require("nodemon");


//Sending a message to a solver in the solvers page, toUser is the userId of the user to whom the message to be sent
router.post("/send-message/:toUser",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  try{

    const { errors, isValid } = messageValidation(req, res);

    if (!isValid) return res.status(400).json(errors);

    let { toUser } = req.params;
    let fromUser = res.req.user.user_id;

    let { message } = req.body;

    let newMessage = {
      from_user_id: fromUser,
      to_user_id: toUser,
      message: message
    }
    
    mysqlConnection.query(`INSERT INTO conversation SET ?`,
    [newMessage],
    (sqlErr, result, fields) => {
      if (sqlErr) {
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: sqlErr,
          devMsg: "Error occured while fetching solvers from db",
        });
      } 
      return res.status(200).json({
        main:"Message is added sucessfully"
      })
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while sending message",
    });
  }
})

//
router.get("/all",
passport.authenticate("jwt", { session: false }),
(req, res) => {
    try{

        let toUser = res.req.user.user_id;

        mysqlConnection.query(`
            SELECT u.user_id, u.employee_name, u.display_picture, SUM(c.is_read = 0) as unreadMsg FROM conversation c
            INNER JOIN user u
            ON u.user_id = c.from_user_id
            WHERE c.to_user_id = ?
            GROUP BY from_user_id
            UNION
            SELECT u.user_id, u.employee_name, u.display_picture, 0 as unreadMsg FROM conversation c
            INNER JOIN user u
            ON u.user_id = c.to_user_id
            WHERE c.from_user_id = ? AND c.to_user_id NOT IN (
                SELECT from_user_id from conversation
            )
            GROUP BY to_user_id
        `,
        [toUser, toUser],
        (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                  main: "Something went wrong. Please try again.",
                  devError: sqlErr,
                  devMsg: "Error occured while fetching solvers from db",
                });
            } else if(!result[0]){
                return res.status(200).json({
                    count: 0,
                    main: "No messages found"
                })
            } else{
                return res.status(200).json({
                  count: result.length,
                  conversations: result
                })
            }
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: error,
          devMsg: "Error occured while sending message",
        });
    }
})

router.get("/user-details/:userId",
passport.authenticate("jwt", { session: false }),
(req, res) => {
    try{

        let { userId } = req.params;

        mysqlConnection.query(`SELECT user_id, employee_name, display_picture FROM user WHERE user_id = ?`,
        [userId],
        (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                  main: "Something went wrong. Please try again.",
                  devError: sqlErr,
                  devMsg: "Error occured while fetching solvers from db",
                });
              } else if(!result[0]){
                  res.status(400).json({
                      main: "No user found",
                      devMsg: "No user found in db"
                  })
              } else{
                  return res.status(200).json(result[0]);
              }
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: error,
          devMsg: "Error occured while sending message",
        }); 
    }
})


//solverId denotes the solver's userId
router.get("/get-messages/:solverId",
passport.authenticate("jwt", { session: false }),
(req, res) => {
  try{

    let { solverId } = req.params;
    let userId = res.req.user.user_id;
    // console.log(userId);

    if(!solverId)
    return res.status(400).json({
      main: "Invalid Request",
      devMsg: "No solverId found"
    })

    mysqlConnection.query(`SELECT * FROM conversation
     WHERE (from_user_id = ${solverId} AND to_user_id = ${userId}) OR 
     (from_user_id = ${userId} AND to_user_id = ${solverId}) 
     ORDER BY timestamp`,
    [solverId, userId],
    (sqlErr, result, fields) => {
      if (sqlErr) {
        return res.status(500).json({
          main: "Something went wrong. Please try again.",
          devError: sqlErr,
          devMsg: "Error occured while fetching solvers from db",
        });
      } else if(!result[0]){
        return res.status(200).json({
          count: 0,
          main:"No conversations exists",
          devMsg: "There are no messages found in db"
      })
      } else{
        return res.status(200).json({
          count: result.length,
          messages: result
        });
      }
    })
  } catch(error){
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while sending message",
    });
  }
})

router.post("/mark-all-unread/:solverId",
passport.authenticate("jwt", { session: false }),
(req, res) => {
    try{
        let { solverId } = req.params;
        let userId = res.req.user.user_id;
        mysqlConnection.query(`
            UPDATE conversation SET is_read = 1 WHERE from_user_id = ? AND to_user_id = ? AND is_read = 0;
            SELECT ROW_COUNT();
        `,
        [solverId, userId],
        (sqlErr, result, fields) => {
            if (sqlErr) {
                return res.status(500).json({
                  main: "Something went wrong. Please try again.",
                  devError: sqlErr,
                  devMsg: "Error occured while fetching solvers from db",
                });
              } else{
                  return res.status(200).json({
                    main: "Marked all the unread messages",
                    totalUnread: result.affectedRows,
                  })
              }
        })

    }catch(error){
        return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: error,
            devMsg: "Error occured while sending message",
          }); 
    }
})

module.exports = router;