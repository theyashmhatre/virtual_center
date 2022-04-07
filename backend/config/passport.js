const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mysqlConnection = require("../config/dbConnection");


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;
opts.algorithms = ['HS256'];

module.exports = passport => {

    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            mysqlConnection.query(`SELECT * from user where username = ${jwt_payload.username}`, function (err, row, fields) {

                if (err) done(null, false);  //returns unauthorized 404 code

                else {
                    const user = row[0];
                    if (user) {

                        return done(null, user);
                    }
                    return done(null, false);
                }
            });
        })

    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });
      
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
};