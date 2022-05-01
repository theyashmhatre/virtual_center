const router = require("express").Router();
const mysqlConnection = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateRegisterParams,
  validateLoginParams,
  validateForgotPasswordParams,
  updateProfileValidation
} = require("../utils/validation/user");
const passport = require("passport");
const {
  isEmptyObject,
  passwordsValidation,
} = require("../utils/utils");
const { generateCurrentDateTime } = require("../utils/utils");
const { roles } = require("../utils/constants");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

router.get("/", (req, res) => {
  mysqlConnection.query("Select * from user", (err, rows, fields) => {
    if (!err) {
      res.status(200).send(rows);
    } else {
      console.log(err);
      res.status(400);
    }
  });
});

router.post("/register", (req, res) => {
  let {
    employeeName,
    email,
    password,
    username,
    contactNumber,
    securityQuestionId,
    securityQuestionAnswer,
    accountTypeId,
  } = req.body;
  console.log(req.body);
  const { errors, isValid } = validateRegisterParams(req.body); //validating all parameters before registering user

  if (!isValid) return res.status(400).json(errors);

  mysqlConnection.query(
    `SELECT * from user where email="${email}" OR username=${username}`,
    function (error, result, fields) {
      if (error) {
        console.log(error.code, error.sqlMessage);
        res.status(500).json({
          main: "Something went wrong. Please try again",
          devError: error,
          devMsg: "MySql query error",
        });
      }

      if (!isEmptyObject(result)) {
        //check if user email already exists
        if (result[0].email === email)
          return res.status(400).json({ email: "Email already exists" });

        //check if username already exists
        if (result[0].username === username)
          return res.status(400).json({ username: "Username already exists" });
      } else {
        //generate passwordHash and create user on database

        bcrypt.genSalt(10, (err, salt) => {
          //encrypting user's password
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              console.log("bcrypt error for password", err);
              res.status(500).json({
                main: "Something went wrong. Please try again.",
                devError: err,
                devMsg: "Error while encrypting password using bcrypt library",
              });
            }

            //encrypting security question's answer
            bcrypt.hash(securityQuestionAnswer, salt, (err, ans_hash) => {
              if (err) {
                console.log("bcrypt error for password", err);
                res.status(500).json({
                  main: "Something went wrong. Please try again.",
                  devError: err,
                  devMsg:
                    "Error while encrypting security answer using bcrypt library",
                });
              }

              const user = {
                employee_name: employeeName,
                email: email,
                password: hash,
                username: username,
                contact_number: contactNumber,
                security_question_id: securityQuestionId,
                security_question_answer: ans_hash,
                account_type_id: accountTypeId
              };

              // mysqlConnection.query(`SELECT * from user where account_type_id = ${accountTypeId}`, (sqlErr, result, fields) => {
              //   if (sqlErr) {
              //     console.log(sqlErr);
              //     res.status(500).json({
              //       main: "Something went wrong. Please try again.",
              //       devError: sqlErr,
              //       devMsg: "Error occured while adding user into db",
              //     });
              //   } else if (!result[0]) {
              //     user.role = "admin";
              //   } else {
              //     user.role = "employee";
              //   }

                user.role = roles["user"];

                console.log(result);

                //adding user to database
                mysqlConnection.query(
                  `INSERT INTO user SET ?`,
                  user,
                  (sqlErr, result, fields) => {
                    if (sqlErr) {
                      console.log(sqlErr);
                      res.status(500).json({
                        main: "Something went wrong. Please try again.",
                        devError: sqlErr,
                        devMsg: "Error occured while adding user into db",
                      });
                    } else {
                      console.log("User Created");
                      return res
                        .status(201)
                        .json({ devMsg: "New user created successfully" });
                    }
                  }
                );
              // });
            });
          });
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  //validating email and password
  const { errors, isValid } = validateLoginParams(req.body);

  //Check validation
  if (!isValid) return res.status(400).json(errors);

  mysqlConnection.query(
    `SELECT * from user where username = ${username}`,
    function (error, row, fields) {
      if (error) {
        console.log(error.code, error.sqlMessage);
        res.status(500).json({
          main: "Something went wrong. Please try again",
          devError: error,
          devMsg: "MySql query error",
        });
      }

      let user = row[0];

      if (!user) {
        return res
          .status(404)
          .json({ main: "User does not exist. Please register and continue" });
      }

      //Check password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // user password verified, Create JWT Payload
            const payload = {
              id: user.user_id,
              username: username,
              email: user.email,
              name: user.employee_name,
              role: user.role
            };

            //Sign token
            jwt.sign(
              payload,
              process.env.secretOrKey,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({
                    main: "Something went wrong. Please try again",
                    devError: err,
                    devMsg: "Error while signing jwt token",
                  });
                }

                mysqlConnection.query(`INSERT INTO login_history SET username=${username}, status = 1`, (sqlErr, result, fields) => {
                  if (err) {
                    console.log(err);
                    res.status(500).json({
                      main: "Something went wrong. Please try again",
                      devError: err,
                      devMsg: "Error while signing jwt token",
                    });
                  }

                  //returns jwt token to be stored in browser's sessionStorage
                  res.status(200).json({
                    success: true,
                    token: token,
                  });
                });
              }
            );
          } else {
            mysqlConnection.query(`INSERT INTO login_history SET username=${username}, status = 0`,(sqlErr, result, fields) => {
              return res
                .status(400)
                .json({ main: "The password that you've entered is incorrect." });
            });
            
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            devError: error,
            devMsg: "Error occured while comparing passwords",
          });
        });
    }
  );
});

router.get(
  "/profile/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    try {
      const { userId } = req.params;

      if (!userId)
        return res
          .status(400)
          .json({ main: "Invalid Request", devMsg: "No user id found" });


      mysqlConnection.query(
        `SELECT user_id, employee_name, email, username, display_picture,
        location, contact_number, creation_date, a.account_name as accountName,
        security_question_id, role, status FROM user u
        INNER JOIN account_type a ON a.account_type_id = u.account_type_id
        where u.user_id = ${userId}`,
        (sqlErr, result, fields) => {
        
          if (sqlErr) {

          return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: sqlErr,
            devMsg: "Error occured while fetching user from db",
          });

        } else if (!result.length) {

          //if no challenge found with the given challengeID
          console.log("No challenge found");
          return res.status(200).json({
            main: "User you were looking for doesn't exist.",
            devError: "User not found in database",
          });

        } else {
          let user = result[0];

          return res.status(200).json(user);
        }
      });

    } catch (error) {
      return res.status(500).json({
        main: "Something went wrong. Please try again.",
        devError: error,
        devMsg: "Error occured while fetching user"
      });
    }
  }
);

router.post("/update-profile", passport.authenticate("jwt", { session: false }) , (req, res) => {
  try{

    let {
      employeeName,
      email,
      contactNumber,
      location,
      displayPicture
    } = req.body;

    let userId = res.req.user.user_id;

    const { errors, isValid } = updateProfileValidation(req.body);  //validating all parameters before updating user

    if (!isValid) return res.status(400).json(errors);

    const updatedProfile = {
      employee_name: employeeName,
      email: email,
      contact_number: contactNumber,
      location: location,
      display_picture: displayPicture
    }

    mysqlConnection.query(
      `SELECT *FROM user WHERE user_id = ${userId}`,
      (sqlErr, result, fields) => {
        if(sqlErr){
          return res.status(500).json({
            main: "Something went wrong. Please try again.",
            devError: sqlErr,
            devMsg: "Error occured while fetching user from db",
          });
        } else if(!result[0]){
          //no user found
          return res.status(200).json({
            main: "No such user exists",
            devMsg: "User ID is invalid",
          });
        } else{
          
          if(result[0].user_id != res.req.user.user_id){
            return res.status(200).json({
              main: "You don't have rights to update",
              devMsg: "User is Unauthorized",
            });
          }

          //storing updating user into db
          mysqlConnection.query(
            `UPDATE user SET ? WHERE user_id = ?`,
            [updatedProfile, userId],
            (sqlErr, result, fields) => {
              if(sqlErr){
                console.log(sqlErr);
                  return res.status(500).json({
                    main: "Something went wrong. Please try again.",
                    devError: sqlErr,
                    devMsg: "Error occured while updating challenge in db",
                  });
              } else{
                res.status(200).json({
                  main: "User updated Successfully"
                })
              }
            }
          )
        }
      }
    )
  } catch(error){
    return res.status(500).json({
      main: "Something went wrong. Please try again.",
      devError: error,
      devMsg: "Error occured while updating user profile",
    });
  }
})


router.post("/forgot-password", (req, res) => {
  const { email, securityQuestionId, securityQuestionAnswer } = req.body;

  const { errors, isValid } = validateForgotPasswordParams(req.body);

  //   Check validation
  if (!isValid) return res.status(400).json(errors);

  mysqlConnection.query(
    `SELECT * from user where email = "${email}"`,
    (error, rows, fields) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          main: "Something went wrong. Please try again",
          devError: error,
          devMsg: "MySql query error",
        });
      } else {
        user = rows[0];

        if (!user) {
          return res.status(404).json({ main: "Email not found" });
        }

        //checks if user selected question matches with the one selected at the time of registration
        if (parseInt(securityQuestionId) !== user.security_question_id)
          return res
            .status(400)
            .json({ main: "Wrong Credentials. Please retry" });

        //compares user's current answer with the one stored in the database
        bcrypt
          .compare(securityQuestionAnswer, user.security_question_answer)
          .then((isMatch) => {
            if (!isMatch) {
              return res.status(400).json({
                main: "Wrong credentials. Please retry",
                devMsg: "Answers do not match",
              });
            }

            try {
              //User exists and now create a One Time Link which is valid for 15minutes
              const token = crypto.randomBytes(32).toString("hex");
              console.log(token);
              const link = `http://localhost:1234/user/reset-password/${user.username}/${token}`;

              var currTime = new Date();
              const newTime = new Date();
              newTime.setTime(currTime.getTime() + 15 * 60000); //Expiry time will be 15 minutes

              const expiryTime = newTime
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

              mysqlConnection.query(
                `UPDATE user SET reset_token="${token}", token_expiry_time="${expiryTime}" WHERE email="${email}"`,
                (err, result, fields) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("User Token Generated");
                  }
                }
              );

              //Initializing the mail service
              var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.AUTH_EMAIL,
                  pass: process.env.AUTH_PASS,
                },
              });

              //Message in the mail with reset-password link
              var mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: "Link for Reset the Password",
                text:
                  "You are receiving this because you (or someone else) have requested the reset of your password for your account \n\n" +
                  "Please click on the following link, or paste this into your browser to complete the process within 15 minutes of receiving it: \n\n" +
                  `${link} \n\n` +
                  "If you did not request this  ,please ignore this email and your password will remain unchanged \n\n",
              };

              //Sending the mail
              transporter.sendMail(mailOptions, (err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json({
                    main: "Something went wrong ",
                    devError: err,
                    devMsg: "Error while sending the mail",
                  });
                } else {
                  console.log("Email sent successfully" + result);
                  return res.status(200).json({ main: "Recovery mail sent!" });
                }
              });
            } catch (err) {
              console.log(err);
            }
          })
          .catch((err) => {
            return res.status(400).json({
              main: "Something went wrong. Please try again. ",
              devError: err,
              devMsg: "Error occured while comparing user's answers",
            });
          });
      }
    }
  );
});

router.post("/reset-password/:username/:token", (req, res) => {
  const { username, token } = req.params;
  const { password, confirmPassword } = req.body;

  mysqlConnection.query(
    `SELECT * FROM user WHERE username="${username}"`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        user = rows[0];

        if (!user) {
          return res.status(400).json({ main: "Invalid Link" });
        }

        //Converting dateTime String into Date() Object
        const curTime = new Date();
        const expiryDateTime = user.expiry_time.toISOString();
        let expiryDateTimeParts = expiryDateTime.split(/\D+/);
        expiryDateTimeParts[1]--;
        const expiryDateTimeObject = new Date(...expiryDateTimeParts);

        //Checking the expiry of the link
        if (expiryDateTimeObject.getTime() < curTime.getTime()) {
          return res.status(400).json({ main: "Link expired" });
        }

        //Validating the link
        if (token !== user.token) {
          return res.status(400).json({ main: "Invalid link" });
        }
      }

      let errors = {};

      errors = passwordsValidation(password, confirmPassword, errors);

      //Check validation
      if (!isEmptyObject(errors)) return res.status(400).json(errors);

      bcrypt.genSalt(10, (err, salt) => {
        //encrypting user's password
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) console.log("bcrypt error for password", err);
          mysqlConnection.query(
            `UPDATE user SET password = "${hash}" WHERE username = "${username}"`,
            (err, result, fields) => {
              if (err) {
                console.log(err);
              } else {
                console.log("User Password Updated");
                return res.status(201).json({ main: "Password is updated" });
              }
            }
          );
        });
      });
    }
  );
});

router.post("/change-password", passport.authenticate("jwt", { session: false }), (req, res) => {
  try{

    const { password, confirmPassword } = req.body;
    const userId = res.req.user.user_id;

    let errors = {};

      errors = passwordsValidation(password, confirmPassword, errors);

      //Check validation
      if (!isEmptyObject(errors)) return res.status(400).json(errors);

      bcrypt.genSalt(10, (err, salt) => {
        //encrypting user's password
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) console.log("bcrypt error for password", err);
          mysqlConnection.query(
            `UPDATE user SET password = "${hash}" WHERE user_id = "${userId}"`,
            (err, result, fields) => {
              if (err) {
                console.log(err);
              } else {
                console.log("User Password Updated");
                return res.status(201).json({ main: "Password is updated" });
              }
            }
          );
        });
      });
  } catch(error){
    console.log(error);
    return res.status(500).json({
      main: "Something went wrong",
      devError: error,
      devMsg: "Error occured while changing user's password",
    });
  }
})

router.get("/get-security-questions", (req, res) => {
  mysqlConnection.query(
    "Select question_id as securityQuestionId, question_text as securityQuestionText from security_question",
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          main: "Something went wrong. Please try again",
          devError: error,
          devMsg: "MySql query error",
        });
      } else {
        //return list containing multiple objects having securityQuestionId and securityQuestionText
        res.status(200).send(rows);
      }
    }
  );
});

router.get("/get-account-types", (req, res) => {
  mysqlConnection.query(
    "Select account_type_id as accountId, account_name as accountName from account_type",
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          main: "Something went wrong. Please try again",
          devError: error,
          devMsg: "MySql query error",
        });
      } else {
        //return list containing multiple objects having accountId and accountName
        res.status(200).send(rows);
      }
    }
  );
});

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

module.exports = router;
