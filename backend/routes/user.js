const router = require("express").Router();
const mysqlConnection = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterParams = require("../utils/validation/register");
const validateLoginParams = require("../utils/validation/login");
const passport = require("passport");
const { isEmptyObject } = require("../utils/utils");
const validateForgotPasswordParams = require("../utils/validation/forgotPassword");
const nodemailer = require("nodemailer");
const { passwordsValidation } = require("../utils/utils");

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
    firstName,
    lastName,
    email,
    password,
    securityQuestionId,
    securityQuestionAnswer,
  } = req.body;
  const { errors, isValid } = validateRegisterParams(req.body); //validating all parameters before registering user

  if (!isValid) return res.status(400).json(errors);

  mysqlConnection.query(
    `SELECT * from user where email="${email}"`,
    function (err, result, fields) {
      if (err) {
        console.log(err.code, err.sqlMessage);
      }

      if (!isEmptyObject(result)) {
        //check if user email already exists

        return res.status(400).json({ error: "Email already exists" });
      } else {
        //generate passwordHash and create user on database

        bcrypt.genSalt(10, (err, salt) => {
          //encrypting user's password
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) console.log("bcrypt error for password", err);

            let userName =
              email.substring(0, email.indexOf("@")) +
              parseInt(Math.random() * (999 - 1) + 1); //creates a default username using content before '@' from the email + a random digit from 1 to 999
            userName = userName.replace(/[^a-zA-Z0-9 ]/g, ""); // eliminates special characters, if any

            var currTime = new Date();
            const newDate = new Date();
            newDate.setTime(currTime.getTime() + 330 * 60 * 1000);

            const creationDate = new Date(
              newDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
            )
              .toISOString() //2022-09-03T12:12:38.000Z
              .replace(/T/, " ") // replace T with a space
              .replace(/\..+/, ""); // delete the dot and everything after => 2022-09-03 12:28:55 => YYYY-MM-DD HH-MM-SS

            //encrypting security question's answer
            bcrypt.hash(securityQuestionAnswer, salt, (err, ans_hash) => {
              if (err) console.log("bcrypt error for security answer", err);

              const user = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: hash,
                creation_date: creationDate,
                username: userName,
                security_question_id: securityQuestionId,
                security_question_answer: ans_hash,
              };

              //adding user to database
              mysqlConnection.query(
                `INSERT INTO user SET ?`,
                user,
                function (err, result, fields) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("User Created");
                    return res.status(201).send("New user Created");
                  }
                }
              );
            });
          });
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  //validating email and password
  const { errors, isValid } = validateLoginParams(req.body);

  //Check validation
  if (!isValid) return res.status(400).json(errors);

  mysqlConnection.query(
    `SELECT * from user where email = "${email}"`,
    function (err, row, fields) {
      if (err) console.log("Login error on searching for user", err);

      let user = row[0];

      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }

      //Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // user password verified, Create JWT Payload
          const payload = {
            id: user.user_id,
            email: user.email,
            name: user.first_name + " " + user.last_name,
          };

          //Sign token
          jwt.sign(
            payload,
            process.env.secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              //sets the jwt token as a cookie
              res.cookie("AUTH_TOKEN", token, {
                httpOnly: true,
                maxAge: 31556926,
              });

              res.status(200).json({ success: true });
            }
          );
        } else {
          return res.status(400).json({ err: "Password incorrect" });
        }
      });
    }
  );
});

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send("Profile page accessed!");
  }
);

router.post("/forgotPassword", (req, res) => {
  const { email, securityQuestionId, securityQuestionAnswer } = req.body;

  const { errors, isValid } = validateForgotPasswordParams(req.body);

  //   Check validation
  if (!isValid) return res.status(400).json(errors);

  mysqlConnection.query(
    `SELECT * from user where email = "${email}"`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(400);
      } else {
        user = rows[0];

        //checks if user selected question matches with the one selected at the time of registration
        if (parseInt(securityQuestionId) !== user.security_question_id)
          return res.status(400).json({ err: "Something went wrong" });

        //compares user's current answer with the one stored in the database
        bcrypt
          .compare(securityQuestionAnswer, user.security_question_answer)
          .then((isMatch) => {
            if (!isMatch)
              return res.status(400).json({ err: "Answers do not match." });

            //User exists and now create a One Time Link which is valid for 15minutes
            const key = process.env.secretOrKey;
            const payload = {
              email: user.email,
              id: user.user_id,
            };
            const token = jwt.sign(payload, key, { expiresIn: "15m" });
            const link = `http://localhost:4000/user/reset-password/${user.user_id}/${token}`;
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS,
              },
            });

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

            transporter.sendMail(mailOptions, (err, result) => {
              if (err) {
                console.log(err);
                return res
                  .status(400)
                  .json({ err: "Something went wrong " + err });
              } else {
                console.log("Email sent successfully" + result);
                return res.status(200).json({ msg: "Recovery mail sent!" });
              }
            });
          })
          .catch((err) => {
            return res.status(400).json({ err: "Something went wrong " + err });
          });
      }
    }
  );
});

router.post("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  const { password, password2 } = req.body;
  const key = process.env.secretOrKey;
  jwt.verify(token, key, (err, payload) => {
    if (err) {
      console.error(err);
      return res.status(400);
    } else {
      let errors = {};

      errors = passwordsValidation(password, password2, errors);

      //Check validation
      if (isEmptyObject(errors)) return res.status(400).json(errors);

      let { email } = payload;

      bcrypt.genSalt(10, (err, salt) => {
        //encrypting user's password
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) console.log("bcrypt error for password", err);
          mysqlConnection.query(
            `UPDATE user SET password = "${hash}" WHERE email = "${email}"`,
            (err, result, fields) => {
              if (err) {
                console.log(err);
              } else {
                console.log("User Password Updated");
                return res.status(201).send("Password is updated");
              }
            }
          );
        });
      });
    }
  });
});

router.post("/otp", (req, res) => {
  const { email } = req.body;
  mysqlConnection.query(
    `SELECT * from user where email="${email}"`,
    function (err, result, fields) {
      if (err) {
        console.log(err.code, err.sqlMessage);
      }

      if (isEmptyObject(result)) {
        //check if user email doesn't exists
        return res.status(400).json({ error: "Email doesn't exists" });
      } else {
        var rndOtp = Math.floor(Math.random() * (999999 - 100000)) + 100000; //Generates a random 6-digit number

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,
          },
        });

        var mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: "OTP for Resetting the Password",
          text: "The OTP to reset the password is " + rndOtp,
        };

        transporter.sendMail(mailOptions, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ err: "Something went wrong " + err });
          } else {
            console.log("Email sent successfully" + result);
            return res.status(200).json({ OTP: rndOtp });
          }
        });
      }
    }
  );
});

router.get("/securityQuestions", (req, res) => {
  mysqlConnection.query(
    "Select question_id as securityQuestionId, question_text as securityQuestionText from security_question",
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(400);
      } else {
        //return list containing multiple objects having securityQuestionId and securityQuestionText as keys
        res.status(200).send(rows);
      }
    }
  );
});

module.exports = router;
