const router = require('express').Router();
const mysqlConnection = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmpty = require("is-empty");
const validateRegisterParams = require("../utils/validation/register");
const validateLoginParams = require("../utils/validation/login");

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

    let {name, email, password} = req.body;
    const {errors, isValid} = validateRegisterParams(req.body); //validating all parameters before registering user

    if (!isValid) return res.status(400).json(errors);

    mysqlConnection.query(`SELECT * from user where email="${email}"`, function (err, result, fields) {     
        if (err) {console.log(err.code, err.sqlMessage);}

        if (!isEmpty(result)) {         //check if user email already exists

            return res.status(400).json({email: "Email already exists"})

        } else {        //generate passwordHash and create user on database

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) console.log("bcrypt error",err);

                    const creationDate = new Date().toISOString().split('T')[0];
                    const user = {
                        name:name,
                        email:email,
                        password:hash,
                        CreationDate: creationDate,

                    }

                    mysqlConnection.query(`INSERT INTO user SET ?`, user, function (err, result, fields) {
                        if (err) {console.log(err);}

                        else{
                            console.log("User Created");
                            return res.status(201).send("New user Created");
                        }
                    })
                })
            })
            
        }
    })
    
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
            return res.status(404).json({emailNotFound: "Email not found in our database"});
        }

        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched, Create JWT Payload
                const payload = {
                id: user.id,
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
                            token: "Bearer" + token
                        });
                    }
                )
            } else {
                return res.status(400).json({ passwordincorrect: "Password incorrect" })
            }
        })
    })
});

router.post("/forgotPassword", (req, res) => {
    console.log("Forgot Password");
    res.status(200).send("Forgot Password");
})


module.exports = router;