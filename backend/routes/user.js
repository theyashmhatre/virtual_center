const router = require('express').Router();
const mysqlConnection = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterParams = require("../utils/validation/register");
const validateLoginParams = require("../utils/validation/login");
const passport = require('passport');
const {isEmptyObject} = require("../utils/utils");
const validateForgotPasswordParams = require('../utils/validation/forgotPassword');

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

    let {firstName, lastName, email, password, securityQuestionId, securityQuestionAnswer} = req.body;
    const {errors, isValid} = validateRegisterParams(req.body); //validating all parameters before registering user

    if (!isValid) return res.status(400).json(errors);

    mysqlConnection.query(`SELECT * from user where email="${email}"`, function (error, result, fields) {     
        if (error) {
            console.log(error.code, error.sqlMessage);
            res.status(500).json({main: "Something went wrong. Please try again", devError: error, devMsg: "MySql query error"});
        }

        if (!isEmptyObject(result)) {         //check if user email already exists

            return res.status(400).json({email: "Email already exists"});

        } else {        //generate passwordHash and create user on database

            bcrypt.genSalt(10, (err, salt) => {

                //encrypting user's password
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        console.log("bcrypt error for password",err);
                        res.status(500).json({main: "Something went wrong", devError: err, devMsg: "Error while encrypting password using bcrypt library"});
                    }

                    let userName = email.substring(0, email.indexOf("@")) + parseInt(Math.random() * (999 - 1) + 1);       //creates a default username using content before '@' from the email + a random digit from 1 to 999
                    userName = userName.replace(/[^a-zA-Z0-9 ]/g, '');      // eliminates special characters, if any

                    var currTime = new Date();
                    const newDate = new Date();
                    newDate.setTime(currTime.getTime() + (330 * 60 * 1000));

                    const creationDate = new Date(newDate.toLocaleString("en-US", {timeZone: 'Asia/Kolkata'}))
                    .toISOString()             //2022-09-03T12:12:38.000Z
                        .replace(/T/, ' ')    // replace T with a space
                        .replace(/\..+/, '');   // delete the dot and everything after => 2022-09-03 12:28:55 => YYYY-MM-DD HH-MM-SS

                    
                    //encrypting security question's answer
                    bcrypt.hash(securityQuestionAnswer, salt, (err, ans_hash) => {
                        if (err) {
                            console.log("bcrypt error for password", err);
                            res.status(500).json({main: "Something went wrong", devError: err,devMsg: "Error while encrypting security answer using bcrypt library"});
                        }

                        const user = {
                            first_name: firstName,
                            last_name:lastName,
                            email:email,
                            password:hash,
                            creation_date: creationDate,
                            username: userName,
                            security_question_id: securityQuestionId,
                            security_question_answer: ans_hash
                        };

                        //adding user to database
                        mysqlConnection.query(`INSERT INTO user SET ?`, user, function (sqlErr, result, fields) {
                            if (sqlErr) {
                                console.log(sqlErr);
                                res.status(500).json({main: "Something went wrong", devError: sqlErr, devMsg: "Error occured while adding user into db"});
                            }

                            else{
                                console.log("User Created");
                                return res.status(201).json({devMsg: "New user created successfully"});
                            }
                        });
                    });
                });
            });
            
        }
    });
    
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;

    //validating email and password
    const {errors, isValid} = validateLoginParams(req.body);

    //Check validation
    if (!isValid) return res.status(400).json(errors);

    mysqlConnection.query(`SELECT * from user where email = "${email}"`, function (error, row, fields) {
        if (error) {
            console.log(error.code, error.sqlMessage);
            res.status(500).json({main: "Something went wrong. Please try again", devError: error, devMsg: "MySql query error"});
        }

        let user = row[0];

        if (!user) {
            return res.status(404).json({main: "Email not found"});
        }

        //Check password    
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // user password verified, Create JWT Payload
                const payload = {
                    id: user.user_id,
                    email: user.email,
                    name: user.first_name + " " + user.last_name
                };

                //Sign token
                jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err,token) => {

                        if (err) {
                            console.log(err);
                            res.status(500).json({main: "Something went wrong. Please try again", devError: err, devMsg: "Error while signing jwt token"});
                        }

                        //returns jwt token to be stored in browser's sessionStorage
                        res.status(200).json({
                            success: true,
                            token: token
                        });
                    }
                );
            } else {
                return res.status(400).json({ error: "Password incorrect" });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).json({devError: error, devMsg: "Error occured while comparing passwords"});
        });
    });
});

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.status(200).send("Profile page accessed!");
    }
);

router.post("/forgotPassword", (req, res) => {
    const {email, securityQuestionId, securityQuestionAnswer, password} = req.body;

    const {errors, isValid} = validateForgotPasswordParams(req.body);

    //Check validation
    if (!isValid) return res.status(400).json(errors);

    mysqlConnection.query(`SELECT * from user where email = "${email}"`, (error, rows, fields) => {

        if (error) {
            console.log(error);
            res.status(500).json({main: "Something went wrong. Please try again", devError: error, devMsg: "MySql query error"});
        } else {
            user = rows[0];

            //checks if user selected question matches with the one selected at the time of registration
            if (parseInt(securityQuestionId) !== user.security_question_id) return res.status(400).json({error: "Something went wrong"});

            //compares user's current answer with the one stored in the database
            bcrypt.compare(securityQuestionAnswer, user.security_question_answer).then((isMatch) => {
                if (!isMatch) return res.status(400).json({main: "Wrong credentials. Please retry", devMsg: "Answers do not match"});

                //sending email with a unique link


            }).catch((err) => {
                return res.status(400).json({main: "Something went wrong ", devError: err, devMsg: "Error occured while comparing user's answers"});
            });
        }
    });
});


router.get("/securityQuestions", (req, res) => {
    mysqlConnection.query("Select question_id as securityQuestionId, question_text as securityQuestionText from security_question", (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500).json({main: "Something went wrong. Please try again", devError: error, devMsg: "MySql query error"});;
        } else {
            //return list containing multiple objects having securityQuestionId and securityQuestionText as keys
            res.status(200).send(rows);      
        }
    });
});

module.exports = router;