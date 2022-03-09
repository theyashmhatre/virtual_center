const router = require('express').Router();
const mysqlConnection = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmpty = require("is-empty");
const validateRegisterParams = require("../utils/validation/register");
const validateLoginParams = require("../utils/validation/login");
const passport = require('passport');

router.get("/", (req, res) => {
    mysqlConnection.query("Select * from user", (err, rows, fields) => {
        if (!err) {
            res.status(200).send(rows);
        } else {
            console.log(err);
            res.status(400);
        }
    })
});

router.post("/register", (req, res) => {

    let {firstName, lastName, email, password} = req.body;
    const {errors, isValid} = validateRegisterParams(req.body); //validating all parameters before registering user

    if (!isValid) return res.status(400).json(errors);

    mysqlConnection.query(`SELECT * from user where email="${email}"`, function (err, result, fields) {     
        if (err) {console.log(err.code, err.sqlMessage);}

        if (!isEmpty(result)) {         //check if user email already exists

            return res.status(400).json({email: "Email already exists"});

        } else {        //generate passwordHash and create user on database

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) console.log("bcrypt error",err);

                    var currTime = new Date();
                    const newDate = new Date();
                    newDate.setTime(currTime.getTime() + (330 * 60 * 1000));

                    const creationDate = new Date(newDate.toLocaleString("en-US", {timeZone: 'Asia/Kolkata'}))
                    .toISOString()             //2022-09-03T12:12:38.000Z
                        .replace(/T/, ' ')    // replace T with a space
                        .replace(/\..+/, '');   // delete the dot and everything after => 2022-09-03 12:28:55 => YYYY-MM-DD HH-MM-SS
                    const user = {
                        FirstName: firstName,
                        LastName:lastName,
                        email:email,
                        password:hash,
                        CreationDate: creationDate,
                    };

                    mysqlConnection.query(`INSERT INTO user SET ?`, user, function (err, result, fields) {
                        if (err) {console.log(err);}

                        else{
                            console.log("User Created");
                            return res.status(201).send("New user Created");
                        }
                    });
                });
            });
            
        }
    });
    
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;

    const {errors, isValid} = validateLoginParams(req.body);        //validating email and password

    //Check validation
    if (!isValid) return res.status(400).json(errors);

    mysqlConnection.query(`SELECT * from user where email = "${email}"`, function (err, row, fields) {
        if (err) console.log("Login error on searching for user", err);

        user = row[0];

        if (!user) {
            return res.status(404).json({emailNotFound: "Email not found"});
        }

        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched, Create JWT Payload
                const payload = {
                    id: user.userId,
                    email: user.email,
                    name: user.name
                };

                //Sign token
                jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err,token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send("Profile page accessed!");
    }
);

router.post("/forgotPassword", (req, res) => {
    console.log("Forgot Password");
    res.status(200).send("Forgot Password");
});


module.exports = router;