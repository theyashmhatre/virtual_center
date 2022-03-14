const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mysqlConnection = require("../config/dbConnection");


//extracts jwt token from the cookie which is passed in req
const cookieExtractor = req => {
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies.AUTH_TOKEN;
    }

    return jwt;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.secretOrKey;

module.exports = passport => {

    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            console.log(jwt_payload);
            mysqlConnection.query(`SELECT * from user where user_id = ${jwt_payload.id}`, function (err, row, fields) {

                if (err) console.log(err);

                else {
                    const user = row[0];
                    console.log(user, jwt_payload);
                    if (user) {

                        return done(null, user);
                    }
                    return done(null, false);
                }
            });
        })  
        
    );
};