const router = require("express").Router();
const mysqlConnection = require("../config/dbConnection");
const passport = require("passport");
const { roles } = require("../utils/constants");

router.get("/get-users", passport.authenticate("jwt", { session: false }), (req, res) => {
    mysqlConnection.query(
      `SELECT u.user_id, u.employee_name, u.email, u.username, u.display_picture,
      u.location, u.contact_number, u.creation_date, u.role, u.status,
      a.account_name as account_type from user u
      inner join account_type a
      on a.account_type_id = u.account_type_id
      where u.role = ${roles["user"]}`,
      (err, rows, fields) => {
        if(err){
          res.status(500).json({
            main: "Something went wrong. Please try again",
            devError: err,
            devMsg: "MySql query error",
          })
        } else if(!rows[0]){
          res.status(200).json({
            main:"No Users Found",
          });
        } else {
          //return all the users
          res.status(200).json(rows);
        }
      }
    );
  });
  
  router.get("/get-admins", passport.authenticate("jwt", { session: false }), (req, res) => {
    mysqlConnection.query(
      `SELECT u.user_id, u.employee_name, u.email, u.username, u.display_picture,
      u.location, u.contact_number, u.creation_date, u.role, u.status,
      a.account_name as account_type from user u
      inner join account_type a
      on a.account_type_id = u.account_type_id
      where u.role = ${roles["admin"]}`,
      (err, rows, fields) => {
        if(err){
          res.status(500).json({
            main: "Something went wrong. Please try again",
            devError: err,
            devMsg: "MySql query error",
        })
        } else if(!rows[0]){
          res.status(200).json({main:"No Admins Found"})
        } else{
          //return all the admins
          res.status(200).json(rows);
        }
      }
    );
  });
  
  //Changing the status of the user or admin to active i.e, 1
  router.post("/active/:username", passport.authenticate("jwt", { session: false }), (req, res) => {
    try{
      let { username } = req.params;
  
      if(!username)
      return res.status(400).json({
        main: "Invalid request",
        devMsg: "No username found"
      })
  
      if(res.req.user.role != roles["super_admin"]){
        return res.status(200).json({
          main: "You don't have rights to update",
          devMsg: "User is not super admin",
         })
      }
      mysqlConnection.query(`UPDATE user SET status = 1 WHERE username = ?`,
      [username],
      (sqlErr, result, fields) => {
        if(sqlErr){
          res.status(500).json({
            main: "Something went wrong. Please try again",
            devError: sqlErr,
            devMsg: "MySql query error",
        })
      } else {
        res
          .status(200)
          .json({ main: "Status updated to Active Successfully." });
      }
    }
  )}catch(error){
      return res.status(500).json({
        main: "Something went wrong. Please try again",
        devError: error,
        devMsg: "Error occured while updating the status",
      })
    }
  })
  
  //Changing the status of the user or admin to inactive i.e, 0
  router.post("/inactive/:username", passport.authenticate("jwt", { session: false }), (req, res) => {
    try{
      let { username } = req.params;
  
      if(!username)
      return res.status(400).json({
        main: "Invalid request",
        devMsg: "No username found"
      })
  
      if(res.req.user.role != roles["super_admin"]){
        return res.status(200).json({
          main: "You don't have rights to update",
          devMsg: "User is not super admin",
         })
      }
      mysqlConnection.query(`UPDATE user SET status = 0 WHERE username = ?`,
      [username],
      (sqlErr, result, fields) => {
        if(sqlErr){
          res.status(500).json({
            main: "Something went wrong. Please try again",
            devError: sqlErr,
            devMsg: "MySql query error",
        })
      } else {
        res
          .status(200)
          .json({ main: "Status updated to Inactive Successfully." });
      }
    }
  )}catch(error){
      return res.status(500).json({
        main: "Something went wrong. Please try again",
        devError: error,
        devMsg: "Error occured while updating the status",
      })
    }
  })
  
  router.post("/change-to-admin/:username", passport.authenticate("jwt", { session: false }), (req, res) => {
    try{
      let { username } = req.params;
  
      if(!username || username == null)
      return res.status(400).json({
        main: "Invalid request",
        devMsg: `Username is invalid. Username: ${username}`
      })
  
      if(res.req.user.role != roles["super_admin"]){
        return res.status(200).json({
          main: "You don't have rights to update",
          devMsg: "User is not super admin",
         })
      }
  
      mysqlConnection.query(`
      SELECT u.employee_name, a.account_name FROM user u
      INNER JOIN account_type a 
      ON a.account_type_id = u.account_type_id AND u.role = ${roles["admin"]} AND
       a.account_type_id IN (SELECT account_type_id FROM user WHERE username = ?)
      `,[username],
      (sqlErr, result, fields) => {
        if(sqlErr){
          res.status(500).json({
            main: "Something went wrong. Please try again",
            devError: sqlErr,
            devMsg: "MySql query error",
        })
      }else if(result.length > 0){
          return res.status(200).json({
            main: result[0].employee_name + " is admin of the " + result[0].account_name + ". Each account can have only one admin",
            devMsg: "Already an admin exists in db for the given accountType"
          })
        } else {
          mysqlConnection.query(`UPDATE user SET role = ? WHERE username = ?`,
          [roles["admin"], username],
          (sqlErr, result, fields) => {
            if(sqlErr){
              res.status(500).json({
                main: "Something went wrong. Please try again",
                devError: sqlErr,
                devMsg: "MySql query error",
            })
          } else {
            res
              .status(200)
              .json({ main: "Role updated to Admin Successfully." });
          }
          })
        }
      })
    }catch(error){
      console.log(error)
      return res.status(500).json({
        main: "Something went wrong. Please try again",
        devError: error,
        devMsg: "Error occured while making user as an admin",
      })
    }
  })
  
  router.post("/change-to-user/:username", passport.authenticate("jwt", { session: false }), (req, res) => {
    try{
      let { username, accountName } = req.params;
  
      if(!username || username == null)
      return res.status(400).json({
        main: "Invalid request",
        devMsg: `Username is invalid. Username: ${username}`
      })
  
      if(res.req.user.role != roles["super_admin"]){
        return res.status(200).json({
          main: "You don't have rights to update",
          devMsg: "User is not super admin",
         })
      }
  
          mysqlConnection.query(`UPDATE user SET role = ? WHERE username = ?`,
            [roles["user"], username],
            (sqlErr, result, fields) => {
              if(sqlErr){
                res.status(500).json({
                  main: "Something went wrong. Please try again",
                  devError: sqlErr,
                  devMsg: "MySql query error",
              })
            } else {
              res
                .status(200)
                .json({ main: "Role updated to User Successfully." });
            }
          })
  
    }catch(error){
      console.log(error)
      return res.status(500).json({
        main: "Something went wrong. Please try again",
        devError: error,
        devMsg: "Error occured while making user as an admin",
      })
    }
  })
  

module.exports = router;